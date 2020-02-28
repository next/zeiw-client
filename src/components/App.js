import { Howl, Howler } from 'howler'

import Cookies from 'js-cookie/dist/js.cookie.min.mjs'
import MicroModal from 'micromodal'
import Swal from 'sweetalert2/dist/sweetalert2.all.js'
import io from 'socket.io-client'

const isNative = window._zeiwNative !== undefined
const isDev = 'development' === process.env.NODE_ENV

const $ = (selector, parent = document) => parent.querySelector(selector)

export default () => {
  let ctx
  let user
  let canvas
  let username

  let cl = false
  // eslint-disable-next-line no-unused-vars
  let gc = false
  let kd = false
  let nd = false

  const keys = {}

  let jgl = false
  let tab = 'home'

  canvas = $('#canvas')
  ctx = canvas.getContext('2d')

  const server =
    localStorage.server !== undefined
      ? localStorage.server
      : isDev
      ? 'ws://localhost:9000'
      : 'wss://live.pnfc.re'

  const endpoint = isDev ? 'http://localhost:3000' : '/api'

  const socket = io(server, {
    transports: ['websocket']
  })

  localStorage.server = server
  setSocketEvents()

  const Toast = Swal.mixin({
    toast: true,
    timer: 3000,
    position: 'top-end',
    timerProgressBar: true,
    showConfirmButton: false,
    onOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  function updateChecker() {
    Toast.fire(
      {
        title: 'Checking for updates ...',
        icon: 'info'
      },
      Swal.showLoading()
    )
    fetch(
      `https://api.github.com/repos/next/zeiw-client/commits/${
        'true' === localStorage.beta ? 'canary' : 'master'
      }`,
      {
        headers: { 'If-None-Match': '' }
      }
    )
      .then(response => response.json())
      .then(({ sha }) => {
        if (sha !== _zeiwBuild.commitHash) {
          Toast.fire({
            timer: null,
            icon: 'info',
            showConfirmButton: true,
            confirmButtonText: 'Update',
            title: `Patch ${sha.substring(0, 7)} Available`
          }).then(() => {
            location.reload()
          })
        } else {
          Toast.fire({
            icon: 'success',
            title: "Nice! You're up to date."
          })
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  setInterval(() => {
    if ('home' === tab) {
      socket.emit('getOnline')
    }

    socket.emit('latency', Date.now(), startTime => {
      const ping = Date.now() - startTime
      $('#ping').innerHTML = `${ping} ms`
    })
  }, 3000)

  MicroModal.init({
    awaitCloseAnimation: true,
    disableScroll: true
  })

  if (!isDev) {
    new Howl({
      loop: true,
      volume: 0.5,
      autoplay: true,
      src: ['https://play.pnfc.re/audio/music.mp3']
    })
  }

  if (localStorage.auth !== undefined) {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      try {
        const response = await fetch(`${endpoint}/v1/user`, {
          mode: 'cors',
          headers: {
            Authorization: localStorage.auth
          }
        })

        const { avatar, uname, flags } = await response.json()

        username = uname

        if ('' === location.hash) {
          Toast.fire({
            icon: 'success',
            title: `Welcome back, ${uname}!`
          })
        } else {
          joinGame()
        }

        $('#user').addEventListener('click', () => {
          MicroModal.show('modal-ps', {
            awaitCloseAnimation: true,
            disableScroll: true
          })
        })

        $('#pfp').src = avatar
        $('#uname').textContent = uname

        flags.forEach(e => {
          switch (e) {
            case 'DEV':
              $('#dev').classList.remove('hidden')
              break
            case 'MOD':
              $('#mod').classList.remove('hidden')
              break
            case 'BETA':
              $('#tp').classList.remove('hidden')
              break
            case 'PHOENIX_RIDERS':
              $('#pr').classList.remove('hidden')
              break
            case 'WINTER_DRAGONS':
              $('#wd').classList.remove('hidden')
              break
            case 'DEMON_BRIGADE':
              $('#db').classList.remove('hidden')
          }
        })
      } catch (error) {
        Toast.fire({
          title: 'Uh-oh! Please log in again!',
          icon: 'error'
        })

        localStorage.removeItem('auth')
        console.error(error)
      }
    })()
  }

  async function setFaction(id) {
    try {
      const response = await fetch(`${endpoint}/v1/user`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          Authorization: localStorage.auth,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          faction: id
        })
      })

      await response.text()

      Toast.fire({
        title: 'Welcome to the club!',
        icon: 'success'
      })

      $('#pr').classList.add('hidden')
      $('#wd').classList.add('hidden')
      $('#db').classList.add('hidden')

      switch (id) {
        case 0:
          $('#pr').classList.remove('hidden')
          break
        case 1:
          $('#wd').classList.remove('hidden')
          break
        case 2:
          $('#db').classList.remove('hidden')
      }
    } catch (error) {
      Toast.fire({
        title: 'Failed to set faction!',
        icon: 'error'
      })

      console.error(error)
    }
  }

  function presenceUpdate(s, t, e) {
    if (isNative) {
      t = t || false
      e = e || false

      const a = {
        details: 'Competitive Pong',
        assets: {
          large_image: 'zeiw',
          large_text: 'ZEIW'
        },
        state: s
      }

      if (t) {
        a.timestamps = {}
        a.timestamps.start = t
        if (e) {
          a.timestamps.end = e
        }
      }

      _zeiwNative.setDiscordPresence(a)
    }
  }

  const audioSwitch = $('#audio')

  if ('true' === localStorage.audio) {
    audioSwitch.checked = true
    Howler.mute(false)
  } else {
    localStorage.audio = false
    Howler.mute(true)
  }

  function switchAudio({ target }) {
    if (target.checked) {
      localStorage.audio = true
      Howler.mute(false)
    } else {
      localStorage.audio = false
      Howler.mute(true)
    }
  }

  audioSwitch.addEventListener('change', switchAudio, false)

  const betaSwitch = $('#beta')

  if ('true' === localStorage.beta) {
    betaSwitch.checked = true
  } else {
    betaSwitch.checked = false
  }

  function switchBeta({ target }) {
    if (target.checked) {
      localStorage.beta = true
      Cookies.set('nf_ab', 'canary')

      location.reload()
    } else {
      localStorage.beta = false
      Cookies.set('nf_ab', 'master')

      location.reload()
    }
  }

  betaSwitch.addEventListener('change', switchBeta, false)

  function tabTo(t) {
    const ct = tab
    tab = t

    $(`#${ct}`).className = 'dtc tc v-mid hidden'
    $(`#${t}`).className = 'dtc tc v-mid'
  }

  function goHome() {
    if (user.game) {
      user.leaveGame()
    }

    presenceUpdate('Staring at the Menu Screen')
    history.replaceState(null, null, ' ')
    tabTo('home')

    $('#pcpb').style.display = 'none'
  }

  function authUser() {
    if (isNative) {
      _zeiwNative
        .getDiscordOauthCode()
        .then(code => {
          const el = document.createElement('iframe')

          el.src = `${endpoint}/v1/login/?code=${encodeURIComponent(code)}`
          document.body.appendChild(el)

          addEventListener('storage', () => {
            if (localStorage.auth !== undefined) {
              location.reload()
            }
          })
        })
        .catch(error => {
          Toast.fire({
            icon: 'error',
            title: 'Something went wrong!'
          })

          console.error(error)
        })
    } else {
      const left = window.screenX + (window.outerWidth - 500) / 2
      const top = window.screenY + (window.outerHeight - 500) / 2.5

      const authWindow = window.open(
        `${endpoint}/v1/login`,
        'zeiwLogin',
        `width=500,height=500,left=${left},top=${top}`
      )

      setInterval(() => {
        if (authWindow.closed) {
          location.reload()
        }
      }, 500)
    }
  }

  function signOut() {
    Swal.fire({
      icon: 'warning',
      title: 'Log out',
      showCancelButton: true,
      text: 'Are you really sure?',
      confirmButtonColor: '#f04747'
    }).then(({ value }) => {
      if (value) {
        localStorage.removeItem('auth')
        location.reload()
      }
    })
  }

  function factoryReset() {
    Swal.fire({
      icon: 'warning',
      title: 'Factory reset',
      showCancelButton: true,
      confirmButtonColor: '#f04747',
      text: 'This will completely wipe your client!'
    }).then(({ value }) => {
      if (value) {
        Object.keys(Cookies.get()).forEach(cookieName => {
          Cookies.remove(cookieName)
        })
        localStorage.clear()
        location.reload()
      }
    })
  }

  function keydown(e) {
    if (!kd && 'message' === tab) {
      cl = true
    }

    kd = true

    keys[e.keyCode] = true
    ;(keys.shift = e.shiftKey),
      (keys.meta = e.metaKey),
      (keys.ctrl = e.ctrlKey),
      (keys.alt = e.altKey)

    hotkeys()
  }

  function keyup(e) {
    kd = false

    if ('Escape' === e.key && 'home' !== tab && !jgl) {
      goHome()
    }

    if (cl) {
      cl = false
      goHome()
    }

    delete keys[e.keyCode]
    ;(keys.shift = e.shiftKey),
      (keys.meta = e.metaKey),
      (keys.ctrl = e.ctrlKey),
      (keys.alt = e.altKey)

    hotkeys()
  }

  function hotkeys() {
    if (user && user.game && ('playing' === user.game.status || 'readying' === user.game.status)) {
      if (keys[87] || keys[38]) {
        user.paddle.dir = -1
      } else if (keys[83] || keys[40]) {
        user.paddle.dir = 1
      } else {
        user.paddle.dir = 0
      }
    }
  }

  function draw() {
    if (user && user.game && ('playing' === user.game.status || 'readying' === user.game.status)) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      user.paddle.y += user.paddle.dir * user.paddle.spd

      socket.emit('paddle', user.paddle)
      socket.emit('ball')

      drawBall(user.game.ball)

      drawPaddle(user.game.p1)
      drawPaddle(user.game.p2)
    }

    requestAnimationFrame(draw)
  }

  function waitMsg(msg) {
    $('#wait').children[0].textContent = msg
    tabTo('wait')
  }

  function setSocketEvents() {
    socket.on('load', ({ id, w, h }) => {
      user = new User(id)

      canvas.width = w
      canvas.height = h

      socket.on('uonl', u => {
        $('#online').innerHTML = `${u} CONNECTED`
      })

      draw()
    })

    socket.on('err', err => {
      Toast.fire({
        title: err,
        icon: 'error'
      })
    })

    socket.on('gameUpdate', g => {
      jgl = false

      user.game = Object.assign({}, g)

      if (g.hosted) {
        self.location.href = `#${g.code}`

        const port = '' !== location.port ? `:${location.port}` : ''
        const url = `${location.protocol}//${location.hostname + port}/#${g.code}`

        $('#pcpb').style.display = 'block'
        $('#wait').children[0].textContent = `Party URL: ${url}`

        $('#pcpb').addEventListener('click', () => {
          navigator.clipboard
            .writeText(url)
            .then(() => {
              Toast.fire({
                title: 'Copied to clipboard!',
                icon: 'success'
              })
            })
            .catch(() => {
              Toast.fire({
                title: 'Something went wrong!',
                icon: 'error'
              })
            })
        })
      }

      if (!nd) {
        if (user.game.p1.id === user.id) {
          user.paddle = user.game.p1
        } else {
          user.paddle = user.game.p2
        }

        if ('disconnected' === user.game.status) {
          Toast.fire({
            title: 'Opponent left the game!',
            icon: 'error'
          })
          goHome()
        }

        if (null !== user.game) {
          $('#stopwatch').innerHTML = user.game.secs
        }
      }
    })

    socket.on('gameTimeUpdate', d => {
      $('#stopwatch').innerHTML = d
    })

    socket.on('paddle', p => {
      if (!nd && user.game) {
        user.game[p.player] = Object.assign(user.game[p.player], p)
      }
    })

    socket.on('ball', b => {
      if (!nd && user.game) {
        user.game.ball = b
      }
    })

    socket.on('hit-p1', () => {
      if (!isDev && !nd && user.game) {
        new Howl({ src: ['https://play.pnfc.re/audio/hit-p1.mp3'] })
      }
    })

    socket.on('hit-p2', () => {
      if (!isDev && !nd && user.game) {
        new Howl({ src: ['https://play.pnfc.re/audio/hit-p2.mp3'] })
      }
    })

    socket.on('end', id => {
      const msg = user.id === id ? 'You Win' : 'You Lose'
      user.leaveGame(msg)
      nd = true
    })

    socket.on('failjoin', msg => {
      history.replaceState(null, null, ' ')
      tabTo('home')

      Toast.fire({
        title: msg,
        icon: 'error'
      })
    })

    socket.on('disconnection', () => {
      Toast.fire({
        title: 'Opponent left the game!',
        icon: 'error'
      })

      goHome()
    })

    socket.on('clientTrigger', t => {
      if ('gameready' === t) {
        user.startGame()
      }

      if ('readyuped' === t) {
        const cd = $('#countdown')

        cd.style.display = 'flex'
        cd.textContent = 'GO'

        setTimeout(() => {
          cd.style.display = 'none'
        }, 1000)
      }
    })
  }

  class User {
    constructor(id) {
      this.id = id
      this.game = null
      this.paddle = null
      this.previousGameOpponentId = null
    }

    findGame(opponentId) {
      if (!user.game) {
        jgl = true
        gc = false

        if (opponentId !== undefined) {
          socket.emit('findGame', this.id, opponentId)
        } else {
          socket.emit('findGame', this.id)
        }

        waitMsg('Matchmaking')
        $('#pcpb').style.display = 'none'

        presenceUpdate('Mode: 1v1 (Waiting ...)', Number(new Date()))
      } else {
        Toast.fire({
          title: 'Already in a game!',
          icon: 'error'
        })
      }
    }

    startGame() {
      username = username === undefined ? 'Guest' : username

      $('#you').innerHTML = username

      if (username !== undefined) {
        socket.emit('opponent username', username)
      }

      socket.on('opponent username', msg => {
        $('#opponent').innerHTML = msg
      })

      tabTo('game')

      const self = this

      if (this.game.p1.id === this.id) {
        this.previousGameOpponentId = this.game.p2.id
      } else {
        this.previousGameOpponentId = this.game.p1.id
      }

      nd = false

      $('#game').classList.remove('hidden')
      $('#game').children[1].classList.remove('hidden')

      presenceUpdate('Mode: 1v1 (Readying ...)', Number(new Date()), Number(new Date()) + 3100)

      countdown(3, () => {
        self.readyUp()
      })
    }

    readyUp() {
      if (this.game && 'readying' === this.game.status) {
        socket.emit('readyup', {
          p: this.paddle.player
        })

        presenceUpdate('Mode: 1v1 (In Game)', Number(new Date()))
      }
    }

    leaveGame(msg) {
      user.game = null
      socket.emit('leaveGame')

      if (msg !== undefined) {
        Swal.fire({
          title: msg,
          showCancelButton: true,
          hideClass: { popup: '' },
          allowOutsideClick: false,
          text: 'Do you want a rematch?',
          cancelButtonText: 'Return Home',
          showClass: { popup: '', icon: '' },
          icon: 'You Win' === msg ? 'success' : 'error'
        }).then(({ value, dismiss }) => {
          if (value) {
            goHome()
            user.findGame(user.previousGameOpponentId)
          } else if (Swal.DismissReason.cancel === dismiss) {
            goHome()
          }
        })
      }

      if ('You Win' === msg) {
        presenceUpdate('Mode: 1v1 (VICTORY!)')
      } else {
        presenceUpdate('Mode: 1v1 (Loss)')
      }

      gc = true
    }

    host() {
      if (!user.game) {
        jgl = true
        gc = false

        tabTo('wait')
        socket.emit('host')

        presenceUpdate('Mode: 1v1 (Hosting ...)', Number(new Date()))
      } else {
        Toast.fire({
          title: 'Already in a game!',
          icon: 'error'
        })
      }
    }

    join(c) {
      if (!user.game) {
        jgl = true
        gc = false

        if (c.includes('#')) {
          c = c.split('#')[1]
        }

        waitMsg('Joining')
        socket.emit('join', encodeURIComponent(c))
      } else {
        Toast.fire({
          title: 'Already in a game!',
          icon: 'error'
        })
      }
    }
  }

  function drawPaddle(p) {
    if (0 > p.y - p.h / 2) {
      p.y = p.h / 2
    } else if (p.y + p.h / 2 > canvas.height) {
      p.y = canvas.height - p.h / 2
    }

    ctx.fillStyle = p.id === user.id ? '#ff9900' : '#eeeeee'
    ctx.fillRect(p.x - p.w / 2, p.y - p.h / 2, p.w, p.h)
  }

  function drawBall({ color, x, y, r }) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  function countdown(sec, callback) {
    const cd = $('#countdown')

    cd.style.display = 'flex'
    cd.textContent = sec

    const int = setInterval(() => {
      sec--
      if (0 === sec) {
        clearInterval(int)

        if (callback) {
          callback()
        }

        cd.style.display = 'none'
        return
      }
      cd.textContent = sec
    }, 1000)
  }

  function joinGame() {
    Swal.fire({
      input: 'text',
      inputAttributes: {
        required: true,
        spellCheck: 'false',
        autoComplete: 'off',
        placeholder: 'abcd123'
      },
      title: 'Join a game',
      showCancelButton: true,
      confirmButtonText: 'Connect',
      inputValue: location.hash.slice(1)
    }).then(({ value }) => {
      if (value) {
        user.join(value)
      }
    })
  }

  $('#user').addEventListener('click', () => {
    if (localStorage.auth === undefined) {
      Swal.fire({
        icon: 'info',
        title: 'Authenticate',
        showCancelButton: true,
        confirmButtonText: 'Login',
        text: 'Sign in with Discord and unlock new features!'
      }).then(({ value }) => {
        if (value) {
          authUser()
        }
      })
    }
  })

  function chooseServer() {
    Swal.fire({
      input: 'text',
      inputAttributes: {
        required: true,
        spellCheck: 'false',
        autoComplete: 'off'
      },
      showCancelButton: true,
      title: 'Connect to a server',
      confirmButtonText: 'Connect',
      inputValue: localStorage.server
    }).then(({ value }) => {
      if (value) {
        localStorage.server = value
        location.reload()
      }
    })
  }

  addEventListener('keyup', keyup)
  addEventListener('keydown', keydown)

  $('#goHome').addEventListener('click', () => goHome())
  $('#logout').addEventListener('click', () => signOut())
  $('#prc').addEventListener('click', () => setFaction(0))
  $('#wdc').addEventListener('click', () => setFaction(1))
  $('#dbc').addEventListener('click', () => setFaction(2))
  $('#joinBtn').addEventListener('click', () => joinGame())
  $('#hostBtn').addEventListener('click', () => user.host())
  $('#reset').addEventListener('click', () => factoryReset())
  $('#server').addEventListener('click', () => chooseServer())
  $('#build').addEventListener('click', () => updateChecker())
  $('#playBtn').addEventListener('click', () => user.findGame())
  $('#discord').addEventListener('click', () => open('https://discord.gg/h7NxqBe', '_blank'))

  onkeyup = ({ which }) => {
    if ('home' === tab && !Swal.isVisible()) {
      if (49 === which) {
        user.findGame()
      } else if (50 === which) {
        user.host()
      } else if (51 === which) {
        joinGame()
      }
    }
  }
}

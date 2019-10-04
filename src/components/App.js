import 'unfetch/polyfill'
import { $, $$ } from '@zeiw/trump'
import { Howl, Howler } from 'howler'
import io from 'socket.io-client'
import MicroModal from 'micromodal'
import Swal from 'sweetalert2/dist/sweetalert2.all.js'

export default () => {
  window.GLOBAL_ENV = {
    API: 'localhost' === location.hostname ? 'https://api.zeiw.me' : '/api',
    COMMIT: _zeiwBuild.commitHash.substring(0, 7),
    DEBUG: 'true' === localStorage.getItem('debugMode') ? true : false,
    LIVE: 'wss://live.zeiw.me',
    RELEASE: 'true' === localStorage.getItem('beta') ? 'canary' : 'master',
    TOKEN: localStorage.getItem('auth')
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500
  })

  const keys = {}
  let canvas
  let cl = false
  let ctx
  let gc = false
  let jgl = false
  let kd = false
  let native = false
  let nd = false
  let socket
  let tab = 'home'
  let user
  let username

  function updateChecker() {
    Toast.fire(
      {
        title: 'Checking for updates ...',
        type: 'info'
      },
      Swal.showLoading()
    )
    fetch(
      `https://api.github.com/repos/next/zeiw-client/commits/${GLOBAL_ENV.RELEASE}`,
      {
        headers: { 'If-None-Match': '' }
      }
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}`)
        }
        return response.json()
      })
      .then(({ sha }) => {
        if (sha !== _zeiwBuild.commitHash) {
          let patch = sha.substring(0, 7)
          Toast.fire({
            confirmButtonText: 'Update',
            showConfirmButton: true,
            timer: null,
            title: `Patch ${patch} Available`,
            type: 'info'
          }).then(() => {
            location.reload()
          })
        } else {
          Toast.fire({
            title: "Nice! You're up to date.",
            type: 'success'
          })
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  addEventListener('load', () => {
    const handleThemeUpdate = cssVars => {
      const root = $(':root')
      const keys = Object.keys(cssVars)
      keys.forEach(key => {
        root.style.setProperty(key, cssVars[key])
      })
    }

    const themeSwitchers = $$('[data-color]')

    themeSwitchers.forEach(item => {
      item.addEventListener('click', ({ target }) => {
        const color = target.getAttribute('data-color')
        handleThemeUpdate({
          '--primary': color
        })
        localStorage.setItem('theme', color)
      })
    })

    if (null !== localStorage.getItem('theme')) {
      handleThemeUpdate({
        '--primary': localStorage.getItem('theme')
      })
    }

    if ('localhost' === location.hostname) {
      $('.devMode').classList.remove('hidden')
    }

    setInterval(() => {
      updateChecker()
    }, 20 * 60 * 1000)

    $('#build').addEventListener('click', () => {
      updateChecker()
    })

    MicroModal.init({
      awaitCloseAnimation: true,
      disableScroll: true
    })

    $('#build').innerHTML = `${GLOBAL_ENV.RELEASE}@${GLOBAL_ENV.COMMIT}`

    new Howl({
      src: ['https://cdn.zeiw.me/music.mp3'],
      autoplay: true,
      volume: 0.5,
      loop: true
    })

    if ('true' === localStorage.getItem('silent')) {
      Howler.mute(true)
    }

    if (null !== GLOBAL_ENV.TOKEN) {
      fetch(`${GLOBAL_ENV.API}/v1/user/`, {
        mode: 'cors',
        headers: { Authorization: GLOBAL_ENV.TOKEN }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error ${response.status}`)
          }
          return response.json()
        })
        .then(({ avatar, uname, flags }) => {
          Toast.fire({
            type: 'success',
            title: `Welcome back, ${uname}!`
          })
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
                $('.devMode').classList.remove('hidden')
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
        })
        .catch(error => {
          Toast.fire({
            title: 'Uh-oh! Please log in again!',
            type: 'error'
          })
          localStorage.removeItem('auth')
          console.error(error)
        })
    }

    if ('true' === localStorage.getItem('devMode')) {
      socket = io.connect('ws://localhost:1337')
      $('#flag').classList.add('hidden')
    } else {
      socket = io.connect(GLOBAL_ENV.LIVE)
      $('#flag').classList.remove('hidden')
    }

    setSocketEvents()

    canvas = $('#canvas')
    ctx = canvas.getContext('2d')

    addEventListener('keydown', keydown)
    addEventListener('keyup', keyup)

    socket.emit('getOnline')

    setInterval(() => {
      if ('home' === tab) {
        socket.emit('getOnline')
      }
      socket.emit('latency', Date.now(), startTime => {
        const ping = Date.now() - startTime
        $('#ping').innerHTML = ping
        $('#ping').classList.remove('loading')
      })
    }, 3500)

    const primary =
      'background:#070B13;color:#fff;display:block;padding:0.5em 1em;font-size:1em'
    const alert =
      'background:#FFCC4D;color:#000;display:block;padding:0.5em 1em;font-size:1em'

    if (window._zeiwNative !== undefined) {
      native = true
      let c = process.versions['chrome']
      let e = process.versions['electron']
      let n = process.versions['node']
      console.log(
        `${`%c🌑︎ Chrome ${c} ~ Electron ${e} ~ Node ${n}`.padEnd(61)}🚧`,
        primary
      )
    }
    console.log(`%c🌑︎ Client Hash:  ${_zeiwBuild.commitHash} 📌`, primary)
    if (native) {
      console.log(
        `%c🌑︎ Desktop Hash: ${_zeiwNative.buildEnv.nativeVersion} 📌`,
        primary
      )
    }
    console.log(
      '%c🌑︎ Hackers may entice you to paste code here. Stay aware! ⚠️',
      alert
    )

    if (GLOBAL_ENV.DEBUG) {
      console.table(GLOBAL_ENV)
    }
  })

  function f(c) {
    Toast.fire(
      {
        title: 'Contacting servers ...',
        type: 'info'
      },
      Swal.showLoading()
    )
    const headers = {
      method: 'PATCH',
      mode: 'cors',
      headers: { Authorization: GLOBAL_ENV.TOKEN },
      body: JSON.stringify({ faction: c })
    }
    fetch(`${GLOBAL_ENV.API}/v1/user/`, headers)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}`)
        }
        return response.json()
      })
      .then(() => {
        Toast.fire({
          title: 'Welcome to the club!',
          type: 'success'
        })
        $('#pr').classList.add('hidden')
        $('#wd').classList.add('hidden')
        $('#db').classList.add('hidden')
        switch (c) {
          case 0:
            $('#pr').classList.remove('hidden')
            break
          case 1:
            $('#wd').classList.remove('hidden')
            break
          case 2:
            $('#db').classList.remove('hidden')
        }
      })
      .catch(error => {
        Toast.fire({
          title: 'Failed to set faction!',
          type: 'error'
        }),
          console.error(error)
      })
  }

  function presenceUpdate(s, t, e) {
    if (native) {
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

  const audio = localStorage.getItem('silent')
  const audioSwitch = $('#audio')
  if (audio) {
    document.documentElement.setAttribute('audio', audio)
    audioSwitch.checked = 'true' !== audio
  } else {
    audioSwitch.checked = true
  }
  function switchAudio({ target }) {
    if (true === target.checked) {
      localStorage.setItem('silent', false)
      Howler.mute(false)
    } else {
      localStorage.setItem('silent', true)
      Howler.mute(true)
    }
  }
  audioSwitch.addEventListener('change', switchAudio, false)

  const beta = localStorage.getItem('beta')
  const betaSwitch = $('#beta')
  if (beta) {
    betaSwitch.checked = 'true' === beta
  } else {
    betaSwitch.checked = false
  }
  function switchBeta({ target }) {
    const timeNow = new Date()
    timeNow.setFullYear(timeNow.getFullYear() + 10)
    if (true === target.checked) {
      localStorage.setItem('beta', true)
      document.cookie = `nf_ab=canary; Expires=${timeNow.toUTCString()}`
      location.reload()
    } else {
      localStorage.setItem('beta', false)
      document.cookie = `nf_ab=master; Expires=${timeNow.toUTCString()}`
      location.reload()
    }
  }
  betaSwitch.addEventListener('change', switchBeta, false)

  const devMode = localStorage.getItem('devMode')
  const devModeSwitch = $('#devMode')
  if (devMode) {
    devModeSwitch.checked = 'true' === devMode
  } else {
    devModeSwitch.checked = false
  }
  function switchDevMode({ target }) {
    if (true === target.checked) {
      localStorage.setItem('devMode', true)
      location.reload()
    } else {
      localStorage.setItem('devMode', false)
      location.reload()
    }
  }
  devModeSwitch.addEventListener('change', switchDevMode, false)

  const debugMode = localStorage.getItem('debugMode')
  const debugModeSwitch = $('#debugMode')
  if (debugMode) {
    debugModeSwitch.checked = 'true' === debugMode
  } else {
    debugModeSwitch.checked = false
  }
  function switchDebugMode({ target }) {
    if (true === target.checked) {
      localStorage.setItem('debugMode', true)
      location.reload()
    } else {
      localStorage.setItem('debugMode', false)
      location.reload()
    }
  }
  debugModeSwitch.addEventListener('change', switchDebugMode, false)

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
    tabTo('home')
    self.location.href = '#'

    $('#pcpb').style.display = 'none'
  }

  function au() {
    if (native) {
      _zeiwNative
        .getDiscordOauthCode()
        .then(code => {
          const el = document.createElement('iframe')
          // prettier-ignore
          el.src = GLOBAL_ENV.API + `/v1/login/?code=${encodeURIComponent(code)}`
          document.body.appendChild(el)
          addEventListener('storage', () => {
            if (localStorage.auth !== undefined) {
              location.reload()
            }
          })
        })
        .catch(({ kind }) => {
          if ('net' === kind) {
            Swal.fire({
              allowOutsideClick: false,
              confirmButtonText: 'Restart ZEIW',
              text:
                "We couldn't connect to Discord. Make sure your Discord app is running.",
              title: 'Authorization failed',
              type: 'error'
            }).then(() => {
              location.reload()
            })
          } else {
            Swal.fire({
              allowOutsideClick: false,
              confirmButtonText: 'Restart ZEIW',
              text: 'You can login by authorizing ZEIW on Discord.',
              title: 'Authorization failed',
              type: 'error'
            }).then(() => {
              location.reload()
            })
          }
        })
    } else {
      const w = open(
        `${GLOBAL_ENV.API}/v1/login/`,
        'ZEIW Login',
        'menubar=no,location=no,resizable=no,scrollbars=yes,status=yes,width=550,height=850'
      )
      setInterval(() => {
        if (w.closed) {
          location.reload()
        }
      }, 500)
    }
  }

  function signOut() {
    Swal.fire({
      confirmButtonColor: '#f04747',
      showCancelButton: true,
      text: 'Are you really sure?',
      title: 'Log out',
      type: 'warning'
    }).then(({ value }) => {
      if (value) {
        localStorage.removeItem('auth')
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
      goHome()
      cl = false
    }
    delete keys[e.keyCode]
    ;(keys.shift = e.shiftKey),
      (keys.meta = e.metaKey),
      (keys.ctrl = e.ctrlKey),
      (keys.alt = e.altKey)
    hotkeys()
  }

  function hotkeys() {
    if (
      user &&
      user.game &&
      ('playing' === user.game.status || 'readying' === user.game.status)
    ) {
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
    if (
      user &&
      user.game &&
      ('playing' === user.game.status || 'readying' === user.game.status)
    ) {
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
    const w = $('#wait')
    w.children[0].textContent = msg
    tabTo('wait')
  }

  function setSocketEvents() {
    socket.on('load', ({ id, w, h, uonl }) => {
      user = new User(id)
      canvas.width = w
      canvas.height = h
      const onlineusers = uonl
      $('#online').innerHTML = `${onlineusers} ONLINE`
      $('#online').classList.remove('loading')
      draw()
    })

    socket.on('uonl', u => {
      $('#online').innerHTML = `${u} ONLINE`
    })

    socket.on('err', err => {
      Toast.fire({
        title: err,
        type: 'error'
      })
    })

    socket.on('gameUpdate', g => {
      user.game = Object.assign({}, g)
      jgl = false
      if (true === g.hosted) {
        const c = g.code
        const host = location.hostname
        self.location.href = `#${c}`
        const url = `https://${host}/#${c}`
        $('#pcpb').style.display = 'block'
        $('#wait').children[0].textContent = `Party URL: ${host}/#${c}`
        $('#pcpb').addEventListener('click', () => {
          navigator.clipboard
            .writeText(url)
            .then(() => {
              Toast.fire({
                title: 'Copied to clipboard!',
                type: 'success'
              })
            })
            .catch(() => {
              Toast.fire({
                title: 'Something went wrong!',
                type: 'error'
              })
            })
        })
      }

      if (!nd) {
        if (user.id === user.game.p1.id) {
          user.paddle = user.game.p1
        } else {
          user.paddle = user.game.p2
        }
        if ('disconnected' === user.game.status) {
          Toast.fire({
            title: 'Opponent left the game!',
            type: 'error'
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
      if (!nd && user.game) {
        const p1 = new Howl({
          src: ['https://cdn.zeiw.me/hit-p1.mp3']
        })
        p1.play()
      }
    })

    socket.on('hit-p2', () => {
      if (!nd && user.game) {
        const p2 = new Howl({
          src: ['https://cdn.zeiw.me/hit-p2.mp3']
        })
        p2.play()
      }
    })

    socket.on('end', id => {
      const msg = user.id === id ? 'You Win' : 'You Lose'
      nd = true
      user.leaveGame(msg)
    })

    socket.on('failjoin', msg => {
      tabTo('home')
      self.location.href = '#'
      Toast.fire({
        title: msg,
        type: 'error'
      })
    })

    socket.on('disconnection', () => {
      Toast.fire({
        title: 'Opponent left the game!',
        type: 'error'
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
      this.paddle = null
      this.game = null
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
        $('#pcpb').style.display = 'none'
        waitMsg('Matchmaking')
        presenceUpdate('Mode: 1v1 (Waiting...)', Number(new Date()))
      } else {
        Toast.fire({
          title: 'Already in a game!',
          type: 'error'
        })
      }
    }

    startGame() {
      username = null !== GLOBAL_ENV.TOKEN ? $('#uname').textContent : 'Guest'

      if (username) {
        socket.emit('opponent username', username)
      }

      socket.on('opponent username', msg => {
        $('#opponent').innerHTML = msg
      })

      tabTo('game')
      const self = this
      if (this.id === this.game.p1.id) {
        this.previousGameOpponentId = this.game.p2.id
      } else {
        this.previousGameOpponentId = this.game.p1.id
      }
      nd = false
      $('#game').classList.remove('hidden')
      $('#game').children[1].classList.remove('hidden')
      presenceUpdate(
        'Mode: 1v1 (Readying...)',
        Number(new Date()),
        Number(new Date()) + 3100
      )
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
      socket.emit('leaveGame')
      user.game = null
      if (msg !== undefined) {
        message(msg)
        switch (msg) {
          case 'You Win':
            presenceUpdate('Mode: 1v1 (VICTORY!)')
            if (!gc) {
              const win = new Howl({
                src: ['https://cdn.zeiw.me/win.mp3']
              })
              win.play()
            }
            break
          case 'You Lose':
            presenceUpdate('Mode: 1v1 (Loss)')
            if (!gc) {
              const lose = new Howl({
                src: ['https://cdn.zeiw.me/loss.mp3']
              })
              lose.play()
            }
            break
          default:
            break
        }
        gc = true
      }
    }

    host() {
      if (!user.game) {
        jgl = true
        gc = false
        socket.emit('host')
        tabTo('wait')
        presenceUpdate('Mode: 1v1 (Hosting...)', Number(new Date()))
      } else {
        Toast.fire({
          title: 'Already in a game!',
          type: 'error'
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
        $('#joinID').value = ''
        socket.emit('join', encodeURIComponent(c))
      } else {
        Toast.fire({
          title: 'Already in a game!',
          type: 'error'
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

  function message(msg) {
    Swal.fire({
      animation: false,
      allowOutsideClick: false,
      cancelButtonText: 'Return Home',
      showCancelButton: true,
      text: 'Do you want a rematch?',
      title: msg,
      type: 'question'
    }).then(({ value, dismiss }) => {
      if (value) {
        goHome()
        user.findGame(user.previousGameOpponentId)
      } else if (dismiss === Swal.DismissReason.cancel) {
        goHome()
      }
    })
  }

  function jm() {
    Swal.fire({
      title: 'Join a game',
      input: 'text',
      inputAttributes: {
        autoComplete: 'off',
        id: 'joinID',
        placeholder: 'abcd123',
        required: '',
        spellCheck: 'false'
      },
      inputValue: location.hash.slice(1),
      showCancelButton: true,
      confirmButtonText: 'Connect'
    })
      .then(({ value }) => {
        if (value) {
          user.join($('#joinID').value)
        }
      })
      .catch(error => {
        Swal.showValidationMessage(error)
      })
  }

  if ('' !== location.hash) {
    jm()
  }

  $('#latency').addEventListener('click', () => {
    Swal.fire(
      'Server Connection',
      "ZEIW is connected to a server in Gravelines, France. We currently don't offer any other locations."
    )
  })

  $('#user').addEventListener('click', () => {
    if (null === GLOBAL_ENV.TOKEN) {
      Swal.fire({
        confirmButtonText: 'Login',
        imageHeight: 200,
        imageUrl:
          'https://discordapp.com/assets/f8389ca1a741a115313bede9ac02e2c0.svg',
        showCancelButton: true,
        text: 'Sign in with Discord and unlock new features!',
        title: 'Authenticate'
      }).then(({ value }) => {
        if (value) {
          au()
        }
      })
    }
  })

  $('#discord').addEventListener('click', () =>
    open('https://discord.gg/h7NxqBe', '_blank')
  )
  $('#goHome').addEventListener('click', () => goHome())
  $('#hostBtn').addEventListener('click', () => user.host())
  $('#joinBtn').addEventListener('click', () => jm())
  $('#logout').addEventListener('click', () => signOut())
  $('#playBtn').addEventListener('click', () => user.findGame())

  $('#prc').addEventListener('click', () => f(0))
  $('#wdc').addEventListener('click', () => f(1))
  $('#dbc').addEventListener('click', () => f(2))

  onkeyup = ({ which }) => {
    if ('home' === tab && !Swal.isVisible()) {
      if (49 === which) {
        user.findGame()
      } else if (50 === which) {
        user.host()
      } else if (51 === which) {
        jm()
      }
    }
  }

  const pattern = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a'
  ]
  let current = 0

  const keyHandler = ({ key }) => {
    if (!pattern.includes(key) || key !== pattern[current]) {
      current = 0
      return
    }

    current++

    if (pattern.length === current) {
      current = 0
      open('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    }
  }

  addEventListener('keydown', keyHandler, false)
}

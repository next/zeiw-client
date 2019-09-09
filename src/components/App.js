import 'unfetch/polyfill'
import { $ } from '@zeiw/trump'
import { Howl, Howler } from 'howler'
import ClipboardJS from 'clipboard'
import io from 'socket.io-client'
import MicroModal from 'micromodal'
import Swal from 'sweetalert2/dist/sweetalert2.all.js'

export default () => {
  new ClipboardJS('.copy')

  const host = location.hostname
  const token = localStorage.getItem('auth')

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

  function modalInit() {
    MicroModal.init({
      disableScroll: true,
      awaitCloseAnimation: true
    })
  }

  function devCheck() {
    setInterval(() => {
      if (localStorage.getItem('devmode')) {
        $('#ds').classList.add('hidden')
        localStorage.removeItem('devmode')
      }
    }, 1000)
  }

  function updateManager() {
    setInterval(() => {
      fetch('https://api.github.com/repos/next/zeiw-client/commits/master')
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error ${response.status}`)
          }
          return response.json()
        })
        .then(({ sha }) => {
          if (sha !== _zeiwBuild.commitHash) {
            let patch = sha.substring(0, 7)
            $('#build').innerHTML = `Patch ${patch} Available`
            $('#build').addEventListener('click', () => {
              location.reload()
            })
          }
        })
        .catch(error => {
          console.error(error)
        })
    }, 20 * 60 * 1000)
  }

  addEventListener('load', () => {
    updateManager()

    // prettier-ignore
    $('#build').innerHTML = `<a href="https://github.com/next/zeiw-client/commit/${_zeiwBuild.commitHash}" target="_blank" rel="noopener noreferrer">${_zeiwBuild.commitHash.substring(0, 7)}</a>`
    $('#build').classList.remove('loading')

    new Howl({
      src: ['/sfx/music.mp3'],
      autoplay: true,
      volume: 0.5,
      loop: true
    })
    if ('true' === localStorage.getItem('audiomuted')) {
      Howler.mute(true)
    }
    let h
    if ('' !== location.hash) {
      h = location.hash.split('#')[1]
      $('#joinID').value = h
      jm()
    }

    if (null !== localStorage.getItem('auth')) {
      fetch('/api/v1/user', {
        mode: 'cors',
        headers: { authentication: token }
      })
        .then(e => e.json())
        .then(({ avatar, uname, flags }) => {
          $('#psb').setAttribute('data-micromodal-trigger', 'modal-ps')
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
        })
        .catch(({ message: e }) => {
          Swal.fire({
            position: 'top-end',
            type: 'error',
            title: 'Uh-oh! Please log in again!',
            showConfirmButton: false,
            timer: 1500
          })
          modalInit()
          localStorage.removeItem('auth')
          console.error(e)
        })
    } else {
      modalInit()
      devCheck()
    }
    socket = io.connect('wss://live.zeiw.me')
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
        $('#ping').innerHTML = `${ping} ms`
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
  })

  function f(c) {
    const headers = {
      method: 'PATCH',
      mode: 'cors',
      headers: { authentication: token },
      body: JSON.stringify({ faction: c })
    }
    fetch('/api/v1/user', headers)
      .then(c => c.json())
      .then(() => {
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Welcome to the club!',
          showConfirmButton: false,
          timer: 1500
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
      .catch(({ message: e }) => {
        Swal.fire({
          position: 'top-end',
          type: 'error',
          title: 'Failed to set faction!',
          showConfirmButton: false,
          timer: 1500
        }),
          console.error(e)
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

  const devmode = localStorage.getItem('devmode')
  const dmSwitch = $('#devmode')

  if (devmode) {
    dmSwitch.checked = 'true' === devmode
    if ('true' === devmode) {
      $('#ds').classList.remove('hidden')
    }
  } else {
    dmSwitch.checked = false
  }

  function devmodeu({ target }) {
    if (target.checked) {
      localStorage.setItem('devmode', true)
      $('#ds').classList.remove('hidden')
    } else {
      localStorage.setItem('devmode', false)
      $('#ds').classList.add('hidden')
    }
  }

  dmSwitch.addEventListener('change', devmodeu, false)

  const audio = localStorage.getItem('audiomuted')
  const audioSwitch = $('#audio')

  if (audio) {
    document.documentElement.setAttribute('data-audio', audio)
    audioSwitch.checked = 'true' !== audio
  } else {
    audioSwitch.checked = true
  }
  function switchAudio({ target }) {
    if (true === target.checked) {
      document.documentElement.setAttribute('data-audio', false)
      localStorage.setItem('audiomuted', false)
      Howler.mute(false)
    } else {
      document.documentElement.setAttribute('data-audio', true)
      localStorage.setItem('audiomuted', true)
      Howler.mute(true)
    }
  }
  audioSwitch.addEventListener('change', switchAudio, false)

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
          el.src = `https://api.zeiw.me/v1/login/?code=${encodeURIComponent(code)}`
          document.body.appendChild(el)
          addEventListener('storage', () => {
            if (localStorage.auth !== undefined) {
              location.reload()
            }
          })
        })
        .catch(({ kind }) => {
          if ('net' === kind) {
            MicroModal.show('modal-oauth-conn-error')
          } else {
            MicroModal.show('modal-oauth-unauth-error')
          }
        })
    } else {
      const w = open(
        'https://api.zeiw.me/v1/login/',
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
    localStorage.removeItem('auth')
    location.reload()
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
      user.leaveGame()
      goHome()
    }
    if (cl) {
      hmnh()
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
      Swal.fire({
        position: 'top-end',
        type: 'error',
        title: err,
        showConfirmButton: false,
        timer: 1500
      })
    })

    socket.on('gameUpdate', g => {
      user.game = Object.assign({}, g)
      jgl = false
      if (true === g.hosted) {
        const c = g.code
        self.location.href = `#${c}`
        const url = `https://${host}/#${c}`
        $('#pcpb').style.display = 'block'
        $('#wait').children[0].textContent = `Party URL: ${host}/#${c}`
        $('#pcpb').setAttribute('data-clipboard-text', url)
      }

      if (!nd) {
        if (user.id === user.game.p1.id) {
          user.paddle = user.game.p1
        } else {
          user.paddle = user.game.p2
        }
        if ('disconnected' === user.game.status) {
          Swal.fire({
            position: 'top-end',
            type: 'error',
            title: 'Opponent left the game!',
            showConfirmButton: false,
            timer: 1500
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
          src: ['/sfx/hit-hit.mp3']
        })
        p1.play()
      }
    })

    socket.on('hit-p2', () => {
      if (!nd && user.game) {
        const p2 = new Howl({
          src: ['/sfx/hit-p2.mp3']
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
      Swal.fire({
        position: 'top-end',
        type: 'error',
        title: msg,
        showConfirmButton: false,
        timer: 1500
      })
    })

    socket.on('disconnection', () => {
      Swal.fire({
        position: 'top-end',
        type: 'error',
        title: 'Opponent left the game!',
        showConfirmButton: false,
        timer: 1500
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
        Swal.fire({
          position: 'top-end',
          type: 'error',
          title: 'Already in a game!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }

    startGame() {
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
                src: ['/sfx/win.mp3']
              })
              win.play()
            }
            break
          case 'You Lose':
            presenceUpdate('Mode: 1v1 (Loss)')
            if (!gc) {
              const lose = new Howl({
                src: ['/sfx/loss.mp3']
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
        Swal.fire({
          position: 'top-end',
          type: 'error',
          title: 'Already in a game!',
          showConfirmButton: false,
          timer: 1500
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
        MicroModal.close('modal-mj')
        waitMsg('Joining')
        $('#joinID').value = ''
        socket.emit('join', encodeURIComponent(c))
      } else {
        Swal.fire({
          position: 'top-end',
          type: 'error',
          title: 'Already in a game!',
          showConfirmButton: false,
          timer: 1500
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
    ctx.fillStyle = p.id === user.id ? '#ff9900' : '#cccccc'
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
    $('#modal-rm-title').textContent = msg
    MicroModal.show('modal-rm')
  }

  function rematch() {
    goHome()
    user.findGame(user.previousGameOpponentId)
  }

  function jm() {
    MicroModal.show('modal-mj')
    $('#joinID').focus()
  }

  $('#discord').addEventListener('click', () =>
    open('https://discord.gg/h7NxqBe', '_blank')
  )
  $('#logoutBtn').addEventListener('click', () => signOut())
  $('#rh').addEventListener('click', () => goHome())
  $('#returnHome').addEventListener('click', () => goHome())
  $('#rematch').addEventListener('click', () => rematch())
  $('#dab').addEventListener('click', () => au())
  $('#playBtn').addEventListener('click', () => user.findGame())
  $('#tabJoinBtn').addEventListener('click', () => jm())
  $('#hostBtn').addEventListener('click', () => user.host())
  $('#joinBtn').addEventListener('click', () => user.join($('#joinID').value))
  $('#prc').addEventListener('click', () => f(0))
  $('#wdc').addEventListener('click', () => f(1))
  $('#dbc').addEventListener('click', () => f(2))
  $('#joinID').addEventListener('keyup', () => {
    if (13 === event.keyCode) {
      user.join($('#joinID').value)
    }
  })

  onkeyup = ({ which }) => {
    if ('home' === tab && !$('#modal-mj').classList.contains('is-open')) {
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

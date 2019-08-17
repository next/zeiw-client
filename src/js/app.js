import ClipboardJS from 'clipboard/dist/clipboard.min.js'
import MicroModal from 'micromodal/dist/micromodal.min.js'
import io from 'socket.io-client/dist/socket.io.slim.js'
import tippy from 'tippy.js/esm/index.min.js'
import { Howl, Howler } from 'howler/dist/howler.min.js'

console.log(
  `%c
8888888888P 8888888888 8888888 888       888
      d88P  888          888   888   o   888
     d88P   888          888   888  d8b  888
    d88P    8888888      888   888 d888b 888
   d88P     888          888   888d88888b888
  d88P      888          888   88888P Y88888
 d88P       888          888   8888P   Y8888
d8888888888 8888888888 8888888 888P     Y888
`,
  'color:#06f;font-weight:bold'
)

console.log(
  '%cHackers may entice you to paste code here. Stay aware.',
  'color:red;font-family:cursive;font-size:2em;font-weight:bold'
)

tippy.setDefaults({
  animation: 'fade',
  arrow: true,
  a11y: false
})

new ClipboardJS('.copy')

let canvas
let cl = false
let ctx
let gc = false
let jgl = false
let kd = false
const keys = {}
let native = false
let nd = false
let notifTimer
const notifs = {}
let socket
let tab = 'home'
let user

window.addEventListener('load', () => {
  new Howl({
    src: [
      'https://res.cloudinary.com/zeiw/video/upload/f_auto,q_auto/v1564827948/sound/theme.mp3'
    ],
    autoplay: true,
    volume: 0.5,
    loop: true
  })
  if ('true' === localStorage.getItem('audiomuted')) {
    Howler.mute(true)
  }
  let h
  if ('' !== window.location.hash) {
    h = window.location.hash.split('#')[1]
    document.getElementById('joinID').value = h
    jm()
  }

  if (null !== window.localStorage.getItem('auth')) {
    const r = new XMLHttpRequest()
    function ud() {
      let d
      if (4 === r.readyState) {
        if (200 === r.status) {
          d = JSON.parse(r.responseText)
          document
            .getElementById('psb')
            .setAttribute('data-micromodal-trigger', 'modal-ps')
          MicroModal.init({
            disableScroll: true,
            awaitCloseAnimation: true
          })
          document.getElementById('pfp').src = d.avatar
          document.getElementById('uname').textContent = d.uname
          d.flags.forEach(e => {
            switch (e) {
              case 'DEV':
                document.getElementById('dev').classList.remove('badgeh')
                document
                  .getElementsByClassName('devmode')
                  .item(0)
                  .classList.remove('hidden')
                break
              case 'MOD':
                document.getElementById('mod').classList.remove('badgeh')
                break
              case 'BETA':
                document.getElementById('tp').classList.remove('badgeh')
                break
              case 'PHOENIX_RIDERS':
                document.getElementById('pr').classList.remove('badgeh')
                break
              case 'WINTER_DRAGONS':
                document.getElementById('wd').classList.remove('badgeh')
                break
              case 'DEMON_BRIGADE':
                document.getElementById('db').classList.remove('badgeh')
                break
            }
          })
          if (!d.flags.includes('DEV')) {
            setInterval(() => {
              if (localStorage.getItem('devmode')) {
                document.getElementById('ds').classList.add('hidden')
                localStorage.removeItem('devmode')
              }
            }, 1000)
          }
        } else {
          notification(
            'Error',
            'Your user token is invalid. You may want to reauthenticate.',
            true
          )
          MicroModal.init({
            disableScroll: true,
            awaitCloseAnimation: true
          })
          window.localStorage.removeItem('auth')
          setInterval(() => {
            if (localStorage.getItem('devmode')) {
              document.getElementById('ds').classList.add('hidden')
              localStorage.removeItem('devmode')
            }
          }, 1000)
        }
      }
    }
    r.timeout = 3000
    const t = window.localStorage.getItem('auth')
    r.open('GET', 'https://api.zeiw.me/v1/user/')
    r.setRequestHeader('Authentication', t)
    r.send()
    r.onreadystatechange = ud
  } else {
    MicroModal.init({
      disableScroll: true,
      awaitCloseAnimation: true
    })
    setInterval(() => {
      if (localStorage.getItem('devmode')) {
        document.getElementById('ds').classList.add('hidden')
        localStorage.removeItem('devmode')
      }
    }, 1000)
  }
  socket = io.connect('wss://live.zeiw.me')
  setSocketEvents()
  socket.emit('latency', Date.now(), function(startTime) {
    var latency = Date.now() - startTime
    console.log(latency)
  })
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  window.addEventListener('keydown', keydown)
  window.addEventListener('keyup', keyup)
  socket.emit('getOnline')
  setInterval(() => {
    if ('home' === tab) {
      socket.emit('getOnline')
    }
  }, 3500)
  if (window._zeiwNative !== undefined) {
    native = true
  }
})

function f(c) {
  const r = new XMLHttpRequest()
  function ud() {
    if (4 === r.readyState) {
      if (200 !== r.status) {
        notification('Error', 'Failed to set faction', true)
      } else {
        notification(
          'Faction changed',
          'You have successfully switched faction.',
          false
        )
        document.getElementById('modal-fac').classList.remove('is-open')
        document.getElementById('pr').classList.add('badgeh')
        document.getElementById('wd').classList.add('badgeh')
        document.getElementById('db').classList.add('badgeh')
        switch (c) {
          case 0:
            document.getElementById('pr').classList.remove('badgeh')
            break
          case 1:
            document.getElementById('wd').classList.remove('badgeh')
            break
          case 2:
            document.getElementById('db').classList.remove('badgeh')
        }
      }
    }
  }
  r.timeout = 3000
  const t = window.localStorage.getItem('auth')
  r.open('PATCH', 'https://api.zeiw.me/v1/user/')
  r.setRequestHeader('Authentication', t)
  r.send(JSON.stringify({ faction: c }))
  r.onreadystatechange = ud
}

function notification(title, content, error) {
  if (
    document.getElementById('notification').offsetLeft <
    document.body.offsetWidth
  ) {
    notifs[Object.keys(notifs).length] = [title, content, error]
    return
  }
  document.getElementById(
    'notification'
  ).innerHTML = `<h3>${title}</h3><p>${content}</p>`
  if (error) {
    document.getElementById('notification').style.borderColor = '#f04747'
  } else {
    document.getElementById('notification').style.borderColor = '#19a974'
  }
  document.getElementById('notification').style.left = `calc(100% - ${
    document.getElementById('notification').offsetWidth
  }px)`
  notifTimer = setTimeout(() => {
    deleteNotification()
  }, 4000)
}

function deleteNotification() {
  document.getElementById('notification').style.left = 'calc(100% + 6px)'
  clearTimeout(notifTimer)
  if (0 < Object.keys(notifs).length) {
    const next = notifs[Object.keys(notifs)[0]]
    notification(next[0], next[1], next[2])
    delete notifs[Object.keys(notifs)[0]]
  }
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
const dmSwitch = document.querySelector('#devmode')

if (devmode) {
  dmSwitch.checked = 'true' === devmode
  if ('true' === devmode) {
    document.getElementById('ds').classList.remove('hidden')
  }
} else {
  dmSwitch.checked = false
}

function devmodeu({ target }) {
  if (target.checked) {
    localStorage.setItem('devmode', true)
    document.getElementById('ds').classList.remove('hidden')
  } else {
    localStorage.setItem('devmode', false)
    document.getElementById('ds').classList.add('hidden')
  }
}

dmSwitch.addEventListener('change', devmodeu, false)

const audio = localStorage.getItem('audiomuted')
const audioSwitch = document.querySelector('#audio')

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
  document.getElementById(ct).className = 'dtc tc v-mid hidden'
  document.getElementById(t).className = 'dtc tc v-mid'
}

function goHome() {
  if (user.game) {
    user.leaveGame()
  }
  hmnh()
  document.getElementById('pcpb').style.display = 'none'
}

function hmnh() {
  presenceUpdate('Staring at the Menu Screen')
  tabTo('home')
  self.location.href = '#'
}

function au() {
  if (native) {
    _zeiwNative
      .getDiscordOauthCode()
      .then(code => {
        const el = document.createElement('iframe')
        el.src = `https://api.zeiw.me/v1/login/?code=${encodeURIComponent(
          code
        )}`
        document.body.appendChild(el)
        window.addEventListener('storage', () => {
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
    const w = window.open(
      'https://api.zeiw.me/v1/login/',
      'ZEIW Login',
      'menubar=no,location=no,resizable=no,scrollbars=yes,status=yes,width=550,height=850'
    )
    setInterval(() => {
      if (w.closed) {
        window.location.reload()
      }
    }, 500)
  }
}

function signOut() {
  localStorage.removeItem('auth')
  window.location.reload()
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
  window.requestAnimationFrame(draw)
}

function waitMsg(msg) {
  const w = document.getElementById('wait')
  w.children[0].textContent = msg
  tabTo('wait')
}

function setSocketEvents() {
  socket.on('load', ({ id, w, h, uonl }) => {
    user = new User(id)
    canvas.width = w
    canvas.height = h
    const onlineusers = uonl
    document.getElementById('online').innerHTML = `${onlineusers} ONLINE`
    draw()
  })

  socket.on('err', err => {
    notification('Error', err, true)
  })

  socket.on('gameUpdate', g => {
    user.game = Object.assign({}, g)
    jgl = false
    if (true === g.hosted) {
      const c = g.code
      self.location.href = `#${c}`
      const url = `https://play.zeiw.me/#${c}`
      document.getElementById('pcpb').style.display = 'block'
      document.getElementById(
        'wait'
      ).children[0].textContent = `Party URL: ${url}`
      document.getElementById('pcpb').setAttribute('data-clipboard-text', url)
    }

    if (!nd) {
      if (user.id === user.game.p1.id) {
        user.paddle = user.game.p1
      } else {
        user.paddle = user.game.p2
      }
      if ('disconnected' === user.game.status) {
        notification(
          'Opponent Disconnected',
          'Your opponent has left the game.',
          true
        )
        user.leaveGame('You Win')
      }
      if (null !== user.game) {
        document.getElementById('stopwatch').innerHTML = user.game.secs
      }
    }
  })

  socket.on('gameTimeUpdate', d => {
    document.getElementById('stopwatch').innerHTML = d
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
        src: [
          'https://res.cloudinary.com/zeiw/video/upload/q_auto/v1564828068/sound/p1-hit.wav'
        ]
      })
      p1.play()
    }
  })

  socket.on('hit-p2', () => {
    if (!nd && user.game) {
      const p2 = new Howl({
        src: [
          'https://res.cloudinary.com/zeiw/video/upload/q_auto/v1564828067/sound/p2-hit.wav'
        ]
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
    notification('Error', msg, true)
  })

  socket.on('disconnection', () => {
    notification(
      'Opponent Disconnected',
      'Your opponent has left the game.',
      true
    )
    user.leaveGame('You Win')
  })

  socket.on('clientTrigger', t => {
    if ('gameready' === t) {
      user.startGame()
    }
    if ('readyuped' === t) {
      const cd = document.getElementById('countdown')
      cd.style.display = 'flex'
      cd.textContent = 'GO'
      setTimeout(() => {
        cd.style.display = 'none'
      }, 1000)
    }
  })

  socket.on('uonl', u => {
    document.getElementById('online').innerHTML = `${u} ONLINE`
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
      document.getElementById('pcpb').style.display = 'none'
      waitMsg('Matchmaking')
      presenceUpdate('Mode: 1v1 (Waiting...)', Number(new Date()))
    } else {
      notification('Error', 'You are already in a game.', true)
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
    document.getElementById('game').classList.remove('hidden')
    document.getElementById('game').children[1].classList.remove('hidden')
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
              src: [
                'https://res.cloudinary.com/zeiw/video/upload/q_auto/v1564828064/sound/win.wav'
              ]
            })
            win.play()
          }
          break
        case 'You Lose':
          presenceUpdate('Mode: 1v1 (Loss)')
          if (!gc) {
            const lose = new Howl({
              src: [
                'https://res.cloudinary.com/zeiw/video/upload/q_auto/v1564828066/sound/lose.wav'
              ]
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
      notification('Error', 'You are already in a game.', true)
    }
  }

  join(c) {
    if (!user.game) {
      jgl = true
      gc = false
      MicroModal.close('modal-mj')
      waitMsg('Joining')
      document.getElementById('joinID').value = ''
      socket.emit('join', encodeURIComponent(c))
    } else {
      notification('Error', 'You are already in a game.', true)
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
  const cd = document.getElementById('countdown')
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
  document.getElementById('modal-rm-title').textContent = msg
  MicroModal.show('modal-rm')
}

function rematch() {
  goHome()
  user.findGame(user.previousGameOpponentId)
}

function jm() {
  MicroModal.show('modal-mj')
  document.getElementById('joinID').focus()
}

document.getElementById('logoutBtn').addEventListener('click', () => signOut())
document.getElementById('rh').addEventListener('click', () => goHome())
document.getElementById('returnHome').addEventListener('click', () => goHome())
document.getElementById('rematch').addEventListener('click', () => rematch())
document.getElementById('dab').addEventListener('click', () => au())
document
  .getElementById('notification')
  .addEventListener('click', () => deleteNotification())
document
  .getElementById('playBtn')
  .addEventListener('click', () => user.findGame())
document.getElementById('tabJoinBtn').addEventListener('click', () => jm())
document.getElementById('hostBtn').addEventListener('click', () => user.host())
document
  .getElementById('joinBtn')
  .addEventListener('click', () =>
    user.join(document.getElementById('joinID').value)
  )
document.getElementById('prc').addEventListener('click', () => f(0))
document.getElementById('wdc').addEventListener('click', () => f(1))
document.getElementById('dbc').addEventListener('click', () => f(2))
document.getElementById('joinID').addEventListener('keyup', () => {
  if (13 === event.keyCode) {
    user.join(document.getElementById('joinID').value)
  }
})

document.onkeyup = ({ which }) => {
  if (
    'home' === tab &&
    !document.getElementById('modal-mj').classList.contains('is-open')
  ) {
    if (49 === which) {
      user.findGame()
    } else if (50 === which) {
      user.host()
    } else if (51 === which) {
      jm()
    }
  }
}

function updateOnlineStatus() {
  notification('Connection established', "We're glad you're back!", false)
}

function updateOfflineStatus() {
  goHome()
  notification('Connection lost', 'Please reconnect to the Internet.', true)
}

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOfflineStatus)

import 'unfetch/polyfill'
import { $ } from '@zeiw/trump'
import { Howl, Howler } from 'howler'
import ClipboardJS from 'clipboard'
import io from 'socket.io-client'
import MicroModal from 'micromodal'
import Swal from 'sweetalert2/dist/sweetalert2.all.js'
export default () => {
  new ClipboardJS('.copy')
  const e = location.hostname
  const t = localStorage.getItem('auth')
  const o = {}
  let i
  let a
  let n
  let s
  let d = !1
  let l = !1
  let r = !1
  let c = !1
  let m = !1
  let h = !1
  let p = 'home'
  function u(e) {
    const o = {
      method: 'PATCH',
      mode: 'cors',
      headers: { authentication: t },
      body: JSON.stringify({ faction: e })
    }
    fetch('/api/v1/user', o)
      .then(e => e.json())
      .then(() => {
        switch (
          (Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Welcome to the club!',
            showConfirmButton: !1,
            timer: 1500
          }),
          $('#pr').classList.add('hidden'),
          $('#wd').classList.add('hidden'),
          $('#db').classList.add('hidden'),
          e)
        ) {
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
          showConfirmButton: !1,
          timer: 1500
        }),
          console.error(e)
      })
  }
  function g(e, t, o) {
    if (m) {
      o = o || !1
      const i = {
        details: 'Competitive Pong',
        assets: { large_image: 'zeiw', large_text: 'ZEIW' },
        state: e
      }
      ;(t = t || !1) &&
        ((i.timestamps = {}),
        (i.timestamps.start = t),
        o && (i.timestamps.end = o)),
        _zeiwNative.setDiscordPresence(i)
    }
  }
  addEventListener('load', () => {
    let o
    ;(n = io.connect('wss://live.zeiw.me')),
      setInterval(() => {
        localStorage.getItem('devmode') &&
          ($('#ds').classList.add('hidden'), localStorage.removeItem('devmode'))
      }, 1e3),
      MicroModal.init({ disableScroll: !0, awaitCloseAnimation: !0 }),
      setInterval(() => {
        fetch('https://api.github.com/repos/next/zeiw-client/commits/master')
          .then(e => {
            if (!e.ok) throw new Error(`Error ${e.status}`)
            return e.json()
          })
          .then(({ sha: e }) => {
            if (e !== _zeiwBuild.commitHash) {
              let t = e.substring(0, 7)
              ;($('#build').innerHTML = `Patch ${t} Available`),
                $('#build').addEventListener('click', () => {
                  location.reload()
                })
            }
          })
          .catch(e => {
            console.error(e)
          })
      }, 12e5),
      ($(
        '#build'
      ).innerHTML = `<a href="https://github.com/next/zeiw-client/commit/${
        _zeiwBuild.commitHash
      }" target="_blank" rel="noopener noreferrer">${_zeiwBuild.commitHash.substring(
        0,
        7
      )}</a>`),
      $('#build').classList.remove('loading'),
      new Howl({
        src: ['../assets/sfx/music.mp3'],
        autoplay: !0,
        volume: 0.5,
        loop: !0
      }),
      'true' === localStorage.getItem('audiomuted') && Howler.mute(!0),
      '' !== location.hash &&
        ((o = location.hash.split('#')[1]), ($('#joinID').value = o), A()),
      null !== t &&
        fetch('/api/v1/user', { mode: 'cors', headers: { authentication: t } })
          .then(e => e.json())
          .then(({ avatar: e, uname: t, flags: o }) => {
            $('#psb').addEventListener('click', () => {
              MicroModal.show('modal-ps')
            }),
              MicroModal.init({ disableScroll: !0, awaitCloseAnimation: !0 }),
              ($('#pfp').src = e),
              ($('#uname').textContent = t),
              o.forEach(e => {
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
              showConfirmButton: !1,
              timer: 1500
            }),
              MicroModal.init({ disableScroll: !0, awaitCloseAnimation: !0 }),
              localStorage.removeItem('auth'),
              console.error(e)
          }),
      n.on('load', ({ id: e, w: t, h: o, uonl: a }) => {
        ;(s = new H(e)), (i.width = t), (i.height = o)
        const n = a
        ;($('#online').innerHTML = `${n} ONLINE`),
          $('#online').classList.remove('loading'),
          C()
      }),
      n.on('uonl', e => {
        $('#online').innerHTML = `${e} ONLINE`
      }),
      n.on('err', e => {
        Swal.fire({
          position: 'top-end',
          type: 'error',
          title: e,
          showConfirmButton: !1,
          timer: 1500
        })
      }),
      n.on('gameUpdate', t => {
        if (((s.game = Object.assign({}, t)), (r = !1), !0 === t.hosted)) {
          const o = t.code
          self.location.href = `#${o}`
          const i = `https://${e}/#${o}`
          ;($('#pcpb').style.display = 'block'),
            ($('#wait').children[0].textContent = `Party URL: ${e}/#${o}`),
            $('#pcpb').setAttribute('data-clipboard-text', i)
        }
        h ||
          (s.id === s.game.p1.id
            ? (s.paddle = s.game.p1)
            : (s.paddle = s.game.p2),
          'disconnected' === s.game.status &&
            (Swal.fire({
              position: 'top-end',
              type: 'error',
              title: 'Opponent left game!',
              showConfirmButton: !1,
              timer: 1500
            }),
            L()),
          null !== s.game && ($('#stopwatch').innerHTML = s.game.secs))
      }),
      n.on('gameTimeUpdate', e => {
        $('#stopwatch').innerHTML = e
      }),
      n.on('paddle', e => {
        !h && s.game && (s.game[e.player] = Object.assign(s.game[e.player], e))
      }),
      n.on('ball', e => {
        !h && s.game && (s.game.ball = e)
      }),
      n.on('hit-p1', () => {
        !h && s.game && new Howl({ src: ['../assets/sfx/hit-p1.mp3'] }).play()
      }),
      n.on('hit-p2', () => {
        !h && s.game && new Howl({ src: ['../assets/sfx/hit-p2.mp3'] }).play()
      }),
      n.on('end', e => {
        const t = s.id === e ? 'You Win' : 'You Lose'
        ;(h = !0), s.leaveGame(t)
      }),
      n.on('failjoin', e => {
        b('home'),
          (self.location.href = '#'),
          Swal.fire({
            position: 'top-end',
            type: 'error',
            title: e,
            showConfirmButton: !1,
            timer: 1500
          })
      }),
      n.on('disconnection', () => {
        Swal.fire({
          position: 'top-end',
          type: 'error',
          title: 'Opponent left the game!',
          showConfirmButton: !1,
          timer: 1500
        }),
          L()
      }),
      n.on('clientTrigger', e => {
        if (('gameready' === e && s.startGame(), 'readyuped' === e)) {
          const e = $('#countdown')
          ;(e.style.display = 'flex'),
            (e.textContent = 'GO'),
            setTimeout(() => {
              e.style.display = 'none'
            }, 1e3)
        }
      }),
      (i = $('#canvas')),
      (a = i.getContext('2d')),
      addEventListener('keydown', E),
      addEventListener('keyup', I),
      n.emit('getOnline'),
      setInterval(() => {
        'home' === p && n.emit('getOnline'),
          n.emit('latency', Date.now(), e => {
            const t = Date.now() - e
            ;($('#ping').innerHTML = `${t} ms`),
              $('#ping').classList.remove('loading')
          })
      }, 3500)
    const d =
      'background:#070B13;color:#fff;display:block;padding:0.5em 1em;font-size:1em'
    if (void 0 !== window._zeiwNative) {
      m = !0
      let e = process.versions.chrome
      let t = process.versions.electron
      let o = process.versions.node
      console.log(
        `${`%c🌑︎ Chrome ${e} ~ Electron ${t} ~ Node ${o}`.padEnd(61)}🚧`,
        d
      )
    }
    console.log(`%c🌑︎ Client Hash:  ${_zeiwBuild.commitHash} 📌`, d),
      m &&
        console.log(
          `%c🌑︎ Desktop Hash: ${_zeiwNative.buildEnv.nativeVersion} 📌`,
          d
        ),
      console.log(
        '%c🌑︎ Hackers may entice you to paste code here. Stay aware! ⚠️',
        'background:#FFCC4D;color:#000;display:block;padding:0.5em 1em;font-size:1em'
      )
  })
  const w = localStorage.getItem('devmode')
  const v = $('#devmode')
  w
    ? ((v.checked = 'true' === w),
      'true' === w && $('#ds').classList.remove('hidden'))
    : (v.checked = !1),
    v.addEventListener(
      'change',
      ({ target: e }) => {
        e.checked
          ? (localStorage.setItem('devmode', !0),
            $('#ds').classList.remove('hidden'))
          : (localStorage.setItem('devmode', !1),
            $('#ds').classList.add('hidden'))
      },
      !1
    )
  const f = localStorage.getItem('audiomuted')
  const y = $('#audio')
  function b(e) {
    const t = p
    ;(p = e),
      ($(`#${t}`).className = 'dtc tc v-mid hidden'),
      ($(`#${e}`).className = 'dtc tc v-mid')
  }
  function L() {
    s.game && s.leaveGame(), k(), ($('#pcpb').style.display = 'none')
  }
  function k() {
    g('Staring at the Menu Screen'), b('home'), (self.location.href = '#')
  }
  function E(e) {
    c || 'message' !== p || (d = !0),
      (c = !0),
      (o[e.keyCode] = !0),
      (o.shift = e.shiftKey),
      (o.meta = e.metaKey),
      (o.ctrl = e.ctrlKey),
      (o.alt = e.altKey),
      M()
  }
  function I(e) {
    ;(c = !1),
      'Escape' !== e.key || 'home' === p || r || (s.leaveGame(), L()),
      d && (k(), (d = !1)),
      delete o[e.keyCode],
      (o.shift = e.shiftKey),
      (o.meta = e.metaKey),
      (o.ctrl = e.ctrlKey),
      (o.alt = e.altKey),
      M()
  }
  function M() {
    s &&
      s.game &&
      ('playing' === s.game.status || 'readying' === s.game.status) &&
      (o[87] || o[38]
        ? (s.paddle.dir = -1)
        : o[83] || o[40]
        ? (s.paddle.dir = 1)
        : (s.paddle.dir = 0))
  }
  function C() {
    s &&
      s.game &&
      ('playing' === s.game.status || 'readying' === s.game.status) &&
      (a.clearRect(0, 0, i.width, i.height),
      (s.paddle.y += s.paddle.dir * s.paddle.spd),
      n.emit('paddle', s.paddle),
      n.emit('ball'),
      (({ color: e, x: t, y: o, r: i }) => {
        ;(a.fillStyle = e),
          a.beginPath(),
          a.arc(t, o, i, 0, 2 * Math.PI),
          a.fill()
      })(s.game.ball),
      D(s.game.p1),
      D(s.game.p2)),
      requestAnimationFrame(C)
  }
  function S(e) {
    ;($('#wait').children[0].textContent = e), b('wait')
  }
  f
    ? (document.documentElement.setAttribute('data-audio', f),
      (y.checked = 'true' !== f))
    : (y.checked = !0),
    y.addEventListener(
      'change',
      ({ target: e }) => {
        !0 === e.checked
          ? (document.documentElement.setAttribute('data-audio', !1),
            localStorage.setItem('audiomuted', !1),
            Howler.mute(!1))
          : (document.documentElement.setAttribute('data-audio', !0),
            localStorage.setItem('audiomuted', !0),
            Howler.mute(!0))
      },
      !1
    )
  class H {
    constructor(e) {
      ;(this.id = e),
        (this.paddle = null),
        (this.game = null),
        (this.previousGameOpponentId = null)
    }
    findGame(e) {
      s.game
        ? Swal.fire({
            position: 'top-end',
            type: 'error',
            title: 'Already in a game!',
            showConfirmButton: !1,
            timer: 1500
          })
        : ((r = !0),
          (l = !1),
          void 0 !== e
            ? n.emit('findGame', this.id, e)
            : n.emit('findGame', this.id),
          ($('#pcpb').style.display = 'none'),
          S('Matchmaking'),
          g('Mode: 1v1 (Waiting...)', Number(new Date())))
    }
    startGame() {
      b('game')
      const e = this
      this.id === this.game.p1.id
        ? (this.previousGameOpponentId = this.game.p2.id)
        : (this.previousGameOpponentId = this.game.p1.id),
        (h = !1),
        $('#game').classList.remove('hidden'),
        $('#game').children[1].classList.remove('hidden'),
        g(
          'Mode: 1v1 (Readying...)',
          Number(new Date()),
          Number(new Date()) + 3100
        ),
        ((e, t) => {
          const o = $('#countdown')
          ;(o.style.display = 'flex'), (o.textContent = e)
          const i = setInterval(() => {
            if (0 == --e)
              return clearInterval(i), t && t(), void (o.style.display = 'none')
            o.textContent = e
          }, 1e3)
        })(3, () => {
          e.readyUp()
        })
    }
    readyUp() {
      this.game &&
        'readying' === this.game.status &&
        (n.emit('readyup', { p: this.paddle.player }),
        g('Mode: 1v1 (In Game)', Number(new Date())))
    }
    leaveGame(e) {
      if ((n.emit('leaveGame'), (s.game = null), void 0 !== e)) {
        switch (
          ((e => {
            ;($('#modal-rm-title').textContent = e), MicroModal.show('modal-rm')
          })(e),
          e)
        ) {
          case 'You Win':
            g('Mode: 1v1 (VICTORY!)'),
              l || new Howl({ src: ['../assets/sfx/win.mp3'] }).play()
            break
          case 'You Lose':
            g('Mode: 1v1 (Loss)'),
              l || new Howl({ src: ['../assets/sfx/loss.mp3'] }).play()
        }
        l = !0
      }
    }
    host() {
      s.game
        ? Swal.fire({
            position: 'top-end',
            type: 'error',
            title: 'Already in a game!',
            showConfirmButton: !1,
            timer: 1500
          })
        : ((r = !0),
          (l = !1),
          n.emit('host'),
          b('wait'),
          g('Mode: 1v1 (Hosting...)', Number(new Date())))
    }
    join(e) {
      s.game
        ? Swal.fire({
            position: 'top-end',
            type: 'error',
            title: 'Already in a game!',
            showConfirmButton: !1,
            timer: 1500
          })
        : ((r = !0),
          (l = !1),
          e.includes('#') && (e = e.split('#')[1]),
          MicroModal.close('modal-mj'),
          S('Joining'),
          ($('#joinID').value = ''),
          n.emit('join', encodeURIComponent(e)))
    }
  }
  function D(e) {
    0 > e.y - e.h / 2
      ? (e.y = e.h / 2)
      : e.y + e.h / 2 > i.height && (e.y = i.height - e.h / 2),
      (a.fillStyle = e.id === s.id ? '#ff9900' : '#cccccc'),
      a.fillRect(e.x - e.w / 2, e.y - e.h / 2, e.w, e.h)
  }
  function A() {
    MicroModal.show('modal-mj'), $('#joinID').focus()
  }
  $('#discord').addEventListener('click', () =>
    open('https://discord.gg/h7NxqBe', '_blank')
  ),
    $('#logoutBtn').addEventListener(
      'click',
      () => (localStorage.removeItem('auth'), void location.reload())
    ),
    $('#rh').addEventListener('click', () => L()),
    $('#returnHome').addEventListener('click', () => L()),
    $('#rematch').addEventListener(
      'click',
      () => (L(), void s.findGame(s.previousGameOpponentId))
    ),
    $('#dab').addEventListener('click', () =>
      (() => {
        if (m)
          _zeiwNative
            .getDiscordOauthCode()
            .then(e => {
              const t = document.createElement('iframe')
              ;(t.src = `https://api.zeiw.me/v1/login/?code=${encodeURIComponent(
                e
              )}`),
                document.body.appendChild(t),
                addEventListener('storage', () => {
                  void 0 !== localStorage.auth && location.reload()
                })
            })
            .catch(({ kind: e }) => {
              'net' === e
                ? MicroModal.show('modal-oauth-conn-error')
                : MicroModal.show('modal-oauth-unauth-error')
            })
        else {
          const e = open(
            'https://api.zeiw.me/v1/login/',
            'ZEIW Login',
            'menubar=no,location=no,resizable=no,scrollbars=yes,status=yes,width=550,height=850'
          )
          setInterval(() => {
            e.closed && location.reload()
          }, 500)
        }
      })()
    ),
    $('#dbc').addEventListener('click', () => u(2)),
    $('#hostBtn').addEventListener('click', () => s.host()),
    $('#joinBtn').addEventListener('click', () => s.join($('#joinID').value)),
    $('#joinID').addEventListener('keyup', () => {
      13 === event.keyCode && s.join($('#joinID').value)
    }),
    $('#playBtn').addEventListener('click', () => s.findGame()),
    $('#prc').addEventListener('click', () => u(0)),
    $('#psb').addEventListener('click', () => {
      MicroModal.show('modal-da')
    }),
    $('#tabJoinBtn').addEventListener('click', () => A()),
    $('#wdc').addEventListener('click', () => u(1)),
    (onkeyup = ({ which: e }) => {
      'home' !== p ||
        $('#modal-mj').classList.contains('is-open') ||
        (49 === e ? s.findGame() : 50 === e ? s.host() : 51 === e && A())
    })
  const x = [
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
  let B = 0
  addEventListener(
    'keydown',
    ({ key: e }) => {
      x.includes(e) && e === x[B]
        ? (B++,
          x.length === B &&
            ((B = 0), open('https://www.youtube.com/watch?v=dQw4w9WgXcQ')))
        : (B = 0)
    },
    !1
  )
}

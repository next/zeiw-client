import 'unfetch/polyfill'
import { $ } from '@zeiw/trump'
import { Howl, Howler } from 'howler'
import ClipboardJS from 'clipboard'
import io from 'socket.io-client'
import MicroModal from 'micromodal'
import Noty from 'noty'
export default () => {
  new ClipboardJS('.copy')
  const e = location.hostname
  const t = localStorage.getItem('auth')
  const o = {}
  let a
  let n
  let i
  let s
  let d = !1
  let r = !1
  let l = !1
  let c = !1
  let m = !1
  let h = !1
  let p = 'home'
  function u(e) {
    const o = {
      mode: 'cors',
      headers: { mode: 'PATCH', authentication: t },
      body: JSON.stringify({ faction: e })
    }
    fetch('/api/v1/user', o)
      .then(e => e.json())
      .then(() => {
        switch (
          (new Noty({
            text: 'Faction set! Welcome to the club.',
            type: 'success'
          }).show(),
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
        new Noty({
          text: 'Failed to set faction! Please try again.',
          type: 'error'
        }).show(),
          console.error(e)
      })
  }
  function g(e, t, o) {
    if (m) {
      o = o || !1
      const a = {
        details: 'Competitive Pong',
        assets: { large_image: 'zeiw', large_text: 'ZEIW' },
        state: e
      }
      ;(t = t || !1) &&
        ((a.timestamps = {}),
        (a.timestamps.start = t),
        o && (a.timestamps.end = o)),
        _zeiwNative.setDiscordPresence(a)
    }
  }
  addEventListener('load', () => {
    let o
    ;(i = io.connect('wss://live.zeiw.me')),
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
            console.log(e)
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
        src: ['/sfx/music.mp3'],
        autoplay: !0,
        volume: 0.5,
        loop: !0
      }),
      'true' === localStorage.getItem('audiomuted') && Howler.mute(!0),
      '' !== location.hash &&
        ((o = location.hash.split('#')[1]), ($('#joinID').value = o), D()),
      null !== t &&
        fetch('/api/v1/user', { mode: 'cors', headers: { authentication: t } })
          .then(e => e.json())
          .then(({ avatar: e, uname: t, flags: o }) => {
            ;($('#pfp').src = e),
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
            new Noty({
              text: 'Invalid user token! Please try again.',
              type: 'error'
            }).show(),
              localStorage.removeItem('auth'),
              console.error(e)
          }),
      i.on('load', ({ id: e, w: t, h: o, uonl: n }) => {
        ;(s = new H(e)), (a.width = t), (a.height = o)
        const i = n
        ;($('#online').innerHTML = `${i} ONLINE`),
          $('#online').classList.remove('loading'),
          M()
      }),
      i.on('uonl', e => {
        $('#online').innerHTML = `${e} ONLINE`
      }),
      i.on('err', e => {
        new Noty({ text: `Error! ${e}`, type: 'error' }).show()
      }),
      i.on('gameUpdate', t => {
        if (((s.game = Object.assign({}, t)), (l = !1), !0 === t.hosted)) {
          const o = t.code
          self.location.href = `#${o}`
          const a = `https://${e}/#${o}`
          ;($('#pcpb').style.display = 'block'),
            ($('#wait').children[0].textContent = `Party URL: ${e}/#${o}`),
            $('#pcpb').setAttribute('data-clipboard-text', a)
        }
        h ||
          (s.id === s.game.p1.id
            ? (s.paddle = s.game.p1)
            : (s.paddle = s.game.p2),
          'disconnected' === s.game.status &&
            (new Noty({
              text: 'Opponent left the game!',
              type: 'error'
            }).show(),
            L()),
          null !== s.game && ($('#stopwatch').innerHTML = s.game.secs))
      }),
      i.on('gameTimeUpdate', e => {
        $('#stopwatch').innerHTML = e
      }),
      i.on('paddle', e => {
        !h && s.game && (s.game[e.player] = Object.assign(s.game[e.player], e))
      }),
      i.on('ball', e => {
        !h && s.game && (s.game.ball = e)
      }),
      i.on('hit-p1', () => {
        if (!h && s.game) {
          new Howl({
            src: ['/sfx/hit-p1.mp3']
          }).play()
        }
      }),
      i.on('hit-p2', () => {
        if (!h && s.game) {
          new Howl({
            src: ['/sfx/hit-p2.wav']
          }).play()
        }
      }),
      i.on('end', e => {
        const t = s.id === e ? 'You Win' : 'You Lose'
        ;(h = !0), s.leaveGame(t)
      }),
      i.on('failjoin', e => {
        b('home'),
          (self.location.href = '#'),
          new Noty({ text: `Error! ${e}`, type: 'error' }).show()
      }),
      i.on('disconnection', () => {
        new Noty({ text: 'Opponent left the game!', type: 'error' }).show(), L()
      }),
      i.on('clientTrigger', e => {
        if (('gameready' === e && s.startGame(), 'readyuped' === e)) {
          const e = $('#countdown')
          ;(e.style.display = 'flex'),
            (e.textContent = 'GO'),
            setTimeout(() => {
              e.style.display = 'none'
            }, 1e3)
        }
      }),
      (a = $('#canvas')),
      (n = a.getContext('2d')),
      addEventListener('keydown', E),
      addEventListener('keyup', I),
      i.emit('getOnline'),
      setInterval(() => {
        'home' === p && i.emit('getOnline'),
          i.emit('latency', Date.now(), e => {
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
  const y = localStorage.getItem('audiomuted')
  const f = $('#audio')
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
      N()
  }
  function I(e) {
    ;(c = !1),
      'Escape' !== e.key || 'home' === p || l || (s.leaveGame(), L()),
      d && (k(), (d = !1)),
      delete o[e.keyCode],
      (o.shift = e.shiftKey),
      (o.meta = e.metaKey),
      (o.ctrl = e.ctrlKey),
      (o.alt = e.altKey),
      N()
  }
  function N() {
    s &&
      s.game &&
      ('playing' === s.game.status || 'readying' === s.game.status) &&
      (o[87] || o[38]
        ? (s.paddle.dir = -1)
        : o[83] || o[40]
        ? (s.paddle.dir = 1)
        : (s.paddle.dir = 0))
  }
  function M() {
    s &&
      s.game &&
      ('playing' === s.game.status || 'readying' === s.game.status) &&
      (n.clearRect(0, 0, a.width, a.height),
      (s.paddle.y += s.paddle.dir * s.paddle.spd),
      i.emit('paddle', s.paddle),
      i.emit('ball'),
      (({ color: e, x: t, y: o, r: a }) => {
        ;(n.fillStyle = e),
          n.beginPath(),
          n.arc(t, o, a, 0, 2 * Math.PI),
          n.fill()
      })(s.game.ball),
      C(s.game.p1),
      C(s.game.p2)),
      requestAnimationFrame(M)
  }
  function x(e) {
    ;($('#wait').children[0].textContent = e), b('wait')
  }
  y
    ? (document.documentElement.setAttribute('data-audio', y),
      (f.checked = 'true' !== y))
    : (f.checked = !0),
    f.addEventListener(
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
        ? new Noty({ text: "You're already in a game!", type: 'error' }).show()
        : ((l = !0),
          (r = !1),
          void 0 !== e
            ? i.emit('findGame', this.id, e)
            : i.emit('findGame', this.id),
          ($('#pcpb').style.display = 'none'),
          x('Matchmaking'),
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
          const a = setInterval(() => {
            if (0 == --e)
              return clearInterval(a), t && t(), void (o.style.display = 'none')
            o.textContent = e
          }, 1e3)
        })(3, () => {
          e.readyUp()
        })
    }
    readyUp() {
      this.game &&
        'readying' === this.game.status &&
        (i.emit('readyup', { p: this.paddle.player }),
        g('Mode: 1v1 (In Game)', Number(new Date())))
    }
    leaveGame(e) {
      if ((i.emit('leaveGame'), (s.game = null), void 0 !== e)) {
        switch (
          ((e => {
            ;($('#modal-rm-title').textContent = e), MicroModal.show('modal-rm')
          })(e),
          e)
        ) {
          case 'You Win':
            g('Mode: 1v1 (VICTORY!)'),
              r ||
                new Howl({
                  src: ['/sfx/win.mp3']
                }).play()
            break
          case 'You Lose':
            g('Mode: 1v1 (Loss)'),
              r ||
                new Howl({
                  src: ['/sfx/loss.mp3']
                }).play()
        }
        r = !0
      }
    }
    host() {
      s.game
        ? new Noty({ text: "You're already in a game!", type: 'error' }).show()
        : ((l = !0),
          (r = !1),
          i.emit('host'),
          b('wait'),
          g('Mode: 1v1 (Hosting...)', Number(new Date())))
    }
    join(e) {
      s.game
        ? new Noty({ text: "You're already in a game!", type: 'error' }).show()
        : ((l = !0),
          (r = !1),
          e.includes('#') && (e = e.split('#')[1]),
          MicroModal.close('modal-mj'),
          x('Joining'),
          ($('#joinID').value = ''),
          i.emit('join', encodeURIComponent(e)))
    }
  }
  function C(e) {
    0 > e.y - e.h / 2
      ? (e.y = e.h / 2)
      : e.y + e.h / 2 > a.height && (e.y = a.height - e.h / 2),
      (n.fillStyle = e.id === s.id ? '#ff9900' : '#cccccc'),
      n.fillRect(e.x - e.w / 2, e.y - e.h / 2, e.w, e.h)
  }
  function D() {
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
    $('#playBtn').addEventListener('click', () => s.findGame()),
    $('#tabJoinBtn').addEventListener('click', () => D()),
    $('#hostBtn').addEventListener('click', () => s.host()),
    $('#joinBtn').addEventListener('click', () => s.join($('#joinID').value)),
    $('#prc').addEventListener('click', () => u(0)),
    $('#wdc').addEventListener('click', () => u(1)),
    $('#dbc').addEventListener('click', () => u(2)),
    $('#joinID').addEventListener('keyup', () => {
      13 === event.keyCode && s.join($('#joinID').value)
    }),
    (onkeyup = ({ which: e }) => {
      'home' !== p ||
        $('#modal-mj').classList.contains('is-open') ||
        (49 === e ? s.findGame() : 50 === e ? s.host() : 51 === e && D())
    })
  const S = [
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
  let z = 0
  addEventListener(
    'keydown',
    ({ key: e }) => {
      S.includes(e) && e === S[z]
        ? (z++,
          S.length === z &&
            ((z = 0), open('https://www.youtube.com/watch?v=dQw4w9WgXcQ')))
        : (z = 0)
    },
    !1
  )
}

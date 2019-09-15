import './index.css'
import About from './components/About'
import Account from './components/Account'
import Faction from './components/Faction'
import Find from './components/Find'
import Game from './components/Game'
import Host from './components/Host'
import Layout from './components/Layout'
import Main from './components/Main'
import NativeFrame from './components/NativeFrame'
import Nav from './components/Nav'
import Settings from './components/Settings'
import Tippy from './components/Tooltip.js'

const isNative = window._zeiwNative !== undefined

export default () => (
  <Layout>
    {isNative && <NativeFrame />}
    <Tippy content="Connection Info" placement="bottom">
      <div
        className="absolute top-2 right-2"
        id="latency"
        style={{
          alignItems: 'center',
          display: 'flex',
          whiteSpace: 'pre-wrap'
        }}
      >
        <span id="ping" className="loading dots" /> ms{' '}
        <img src="https://cdn.zeiw.me/france.png" height="16" />
      </div>
    </Tippy>
    <Tippy content="Current Build" placement="top">
      <div className="absolute bottom-2 right-2" id="build" />
    </Tippy>
    <div className="center">
      <div className="cf w-100">
        <Nav />
        <div className="fl w-90 vh-100 dt">
          <Find />
          <Host />
          <Game />
          <Main />
        </div>
        <About />
        <Account />
        <Faction />
        <Settings />
      </div>
    </div>
  </Layout>
)

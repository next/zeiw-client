import Layout from './components/Layout'
import Spinner from './components/Spinner'
import Modal from './components/Modal'
import Alert from './components/Alert'
import Find from './components/Find'
import Host from './components/Host'
import Game from './components/Game'
import Main from './components/Main'
import Nav from './components/Nav'

import About from './components/About'
import Account from './components/Account'
import Auth from './components/Auth'
import ConnErr from './components/ConnErr'
import Dev from './components/Dev'
import Faction from './components/Faction'
import Join from './components/Join'
import Logout from './components/Logout'
import Rematch from './components/Rematch'
import Settings from './components/Settings'
import UnauthErr from './components/UnauthErr'
import NativeFrame from './components/NativeFrame'

const isNative = window._zeiwNative !== undefined

export default () => (
  <Layout>
    {isNative && <NativeFrame />}
    <Modal />
    <Spinner />
    <Alert />
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
        <Auth />
        <ConnErr />
        <Dev />
        <Faction />
        <Join />
        <Logout />
        <Rematch />
        <Settings />
        <UnauthErr />
      </div>
    </div>
  </Layout>
)

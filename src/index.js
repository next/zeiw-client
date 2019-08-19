// import './components/App'
import Layout from './components/Layout'
import Tooltip from './components/Tooltip'
import Spinner from './components/Spinner'
import Modal from './components/Modal'
import Alert from './components/Alert'
import Find from './components/Find'
import Host from './components/Host'
import Game from './components/Game'
import Main from './components/Main'
import Nav from './components/Nav'

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

export default () => (
  <Layout>
    <Modal />
    <Spinner />
    <Tooltip />
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
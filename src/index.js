import './index.css'

import { Circle } from 'react-preloaders'

import Alert from './components/Alert'
import Build from './components/Build'
import Find from './components/Find'
import Game from './components/Game'
import Host from './components/Host'
import Layout from './components/Layout'
import Main from './components/Main'
import Nav from './components/Nav'
import Ping from './components/Ping'

import About from './components/About'
import Account from './components/Account'
import Auth from './components/Auth'
import ConnErr from './components/ConnErr'
import Dev from './components/Dev'
import Faction from './components/Faction'
import Join from './components/Join'
import Logout from './components/Logout'
import NativeFrame from './components/NativeFrame'
import Rematch from './components/Rematch'
import Settings from './components/Settings'
import UnauthErr from './components/UnauthErr'

const isNative = window._zeiwNative !== undefined

export default () => (
  <Layout>
    <Circle color={'#f90'} background={'#000'} />
    {isNative && <NativeFrame />}
    <Ping />
    <Build />
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

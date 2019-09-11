import './index.css'

import { Circle } from 'react-preloaders'

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
import Dev from './components/Dev'
import Faction from './components/Faction'
import NativeFrame from './components/NativeFrame'
import Settings from './components/Settings'

const isNative = window._zeiwNative !== undefined

export default () => (
  <Layout>
    <Circle color={'#f90'} background={'#000'} />
    {isNative && <NativeFrame />}
    <Ping />
    <Build />
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
        <Dev />
        <Faction />
        <Settings />
      </div>
    </div>
  </Layout>
)

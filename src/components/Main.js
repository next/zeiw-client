import Tippy from './Tooltip'

const Main = () => (
  <div className="dtc tc v-mid" id="home">
    <img className="w-30" src="https://cdn.zeiw.me/logo.png" />
    <h1 className="f4 ttu tracked mt0 mt4">
      <span className="loading dots" id="online" />
    </h1>
    <Tippy content="Find Match" placement="bottom">
      <img className="w4 bg br3 pa4 ma2 shadow-4" id="playBtn" src="https://cdn.zeiw.me/find.svg" />
    </Tippy>
    <Tippy content="Host Party" placement="bottom">
      <img className="w4 bg br3 pa4 ma2 shadow-4" id="hostBtn" src="https://cdn.zeiw.me/host.svg" />
    </Tippy>
    <Tippy content="Join Party" placement="bottom">
      <img className="w4 bg br3 pa4 ma2 shadow-4" id="joinBtn" src="https://cdn.zeiw.me/join.svg" />
    </Tippy>
  </div>
)

export default Main

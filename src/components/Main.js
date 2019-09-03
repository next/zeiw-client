import Tippy from './Tooltip'

const Main = () => (
  <div className="dtc tc v-mid" id="home">
    <img
      className="w-30"
      src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564824906/img/logo.png"
    />
    <h1 className="f4 ttu tracked mt0 mt4">
      <span className="loading dots" id="online" />
    </h1>
    <Tippy content="Find Match" placement="bottom">
      <img
        className="w4 bg br3 pa4 ma2 shadow-4"
        id="playBtn"
        src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825429/icon/find.svg"
      />
    </Tippy>
    <Tippy content="Host Party" placement="bottom">
      <img
        className="w4 bg br3 pa4 ma2 shadow-4"
        id="hostBtn"
        src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825427/icon/host.svg"
      />
    </Tippy>
    <Tippy content="Join Party" placement="bottom">
      <img
        className="w4 bg br3 pa4 ma2 shadow-4"
        id="tabJoinBtn"
        src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825425/icon/join.svg"
      />
    </Tippy>
  </div>
)

export default Main

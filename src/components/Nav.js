import Tippy from './Tooltip'

const Nav = () => (
  <div className="fl w-10 bg vh-100 dt">
    <div className="dtc v-mid tc">
      <Tippy content="Return Home" placement="right">
        <img className="w-50" id="goHome" src="https://cdn.zeiw.me/home.svg" />
      </Tippy>
      <Tippy content="Player Settings" placement="right">
        <img className="w-50" id="user" src="https://cdn.zeiw.me/player.svg" />
      </Tippy>
      <Tippy content="Game Settings" placement="right">
        <img
          className="w-50"
          data-micromodal-trigger="modal-gs"
          src="https://cdn.zeiw.me/settings.svg"
        />
      </Tippy>
      <Tippy content="About Game" placement="right">
        <img
          className="w-50"
          data-micromodal-trigger="modal-about"
          src="https://cdn.zeiw.me/info.svg"
        />
      </Tippy>
      <Tippy content="Join our Discord" placement="right">
        <img
          className="w-50"
          id="discord"
          src="https://cdn.zeiw.me/discord.svg"
        />
      </Tippy>
    </div>
  </div>
)

export default Nav

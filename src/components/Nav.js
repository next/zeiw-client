import Tippy from './Tooltip'

const Nav = () => (
  <div className="fl w-10 bg vh-100 dt">
    <div className="dtc v-mid tc">
      <Tippy content="Return Home" placement="right">
        <img
          id="rh"
          className="w-50"
          src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825249/icon/home.svg"
          style="display:block;margin:auto;margin-top:1rem!important"
        />
      </Tippy>
      <Tippy content="Player Settings" placement="right">
        <img
          id="psb"
          className="w-50"
          data-micromodal-trigger="modal-da"
          src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825220/icon/player.svg"
          style="display:block;margin:auto;margin-top:1rem!important"
        />
      </Tippy>
      <Tippy content="Game Settings" placement="right">
        <img
          className="w-50"
          data-micromodal-trigger="modal-gs"
          src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825185/icon/settings.svg"
          style="display:block;margin:auto;margin-top:1rem!important"
        />
      </Tippy>
      <Tippy content="Developer Tools" placement="right">
        <img
          id="ds"
          className="w-50 hidden"
          data-micromodal-trigger="modal-ds"
          src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825156/icon/code.svg"
          style="display:block;margin:auto;margin-top:1rem!important"
        />
      </Tippy>
      <Tippy content="About Game" placement="right">
        <img
          className="w-50"
          data-micromodal-trigger="modal-about"
          src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1566758472/icon/info.svg"
          style="display:block;margin:auto;margin-top:1rem!important"
        />
      </Tippy>
      <Tippy content="Join our Discord" placement="right">
        <img
          id="discord"
          className="w-50"
          src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825112/icon/discord.svg"
          style="display:block;margin:auto;margin-top:1rem!important"
        />
      </Tippy>
    </div>
  </div>
)

export default Nav

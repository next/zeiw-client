import discord from '../assets/svg/discord.svg'
import home from '../assets/svg/home.svg'
import info from '../assets/svg/info.svg'
import player from '../assets/svg/player.svg'
import settings from '../assets/svg/settings.svg'
import Tippy from './Tooltip'

const Nav = () => (
  <div className="fl w-10 bg vh-100 dt">
    <div className="dtc v-mid tc">
      <Tippy content="Return Home" placement="right">
        <img className="w-50" id="goHome" src={home} />
      </Tippy>
      <Tippy content="Player Settings" placement="right">
        <img className="w-50" id="user" src={player} />
      </Tippy>
      <Tippy content="Game Settings" placement="right">
        <img
          className="w-50"
          data-micromodal-trigger="modal-gs"
          src={settings}
        />
      </Tippy>
      <Tippy content="About Game" placement="right">
        <img
          className="w-50"
          data-micromodal-trigger="modal-about"
          src={info}
        />
      </Tippy>
      <Tippy content="Join our Discord" placement="right">
        <img className="w-50" id="discord" src={discord} />
      </Tippy>
    </div>
  </div>
)

export default Nav

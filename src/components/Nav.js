const Nav = () => (
  <div className="fl w-10 bg vh-100 dt">
    <div className="dtc v-mid tc">
      <ul style="list-style-type:none">
        <li>
          <img
            id="rh"
            className="w-50"
            data-tippy="Return Home"
            data-tippy-placement="right"
            src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825249/icon/home.svg"
            style="display:block;margin:auto;margin-top:1rem!important"
          />
        </li>
        <li>
          <img
            id="psb"
            className="w-50"
            data-micromodal-trigger="modal-da"
            data-tippy="Player Settings"
            data-tippy-placement="right"
            src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825220/icon/player.svg"
            style="display:block;margin:auto;margin-top:1rem!important"
          />
        </li>
        <li>
          <img
            className="w-50"
            data-micromodal-trigger="modal-gs"
            data-tippy="Game Settings"
            data-tippy-placement="right"
            src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825185/icon/settings.svg"
            style="display:block;margin:auto;margin-top:1rem!important"
          />
        </li>
        <li>
          <img
            id="ds"
            className="w-50 hidden"
            data-micromodal-trigger="modal-ds"
            data-tippy="Developer Tools"
            data-tippy-placement="right"
            src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825156/icon/code.svg"
            style="display:block;margin:auto;margin-top:1rem!important"
          />
        </li>
        <li>
          <img
            className="w-50"
            data-micromodal-trigger="modal-about"
            data-tippy="About Game"
            data-tippy-placement="right"
            src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1566758472/icon/info.svg"
            style="display:block;margin:auto;margin-top:1rem!important"
          />
        </li>
        <li>
          <img
            id="discord"
            className="w-50"
            data-tippy="Join our Discord"
            data-tippy-placement="right"
            src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825112/icon/discord.svg"
            style="display:block;margin:auto;margin-top:1rem!important"
          />
        </li>
      </ul>
    </div>
  </div>
)

export default Nav

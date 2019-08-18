const Nav = () => (
  <div className="fl w-10 bg vh-100 dt">
    <div className="dtc v-mid tc sidebar">
      <img
        alt=""
        className="w-50 pointer"
        data-tippy="Return Home"
        data-tippy-placement="right"
        id="rh"
        src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825249/icon/home.svg"
      />
      <br />
      <img
        alt=""
        className="w-50 pointer"
        data-micromodal-trigger="modal-da"
        data-tippy="Player Settings"
        data-tippy-placement="right"
        id="psb"
        src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825220/icon/player.svg"
      />
      <br />
      <img
        alt=""
        className="w-50 pointer"
        data-micromodal-trigger="modal-gs"
        data-tippy="Game Settings"
        data-tippy-placement="right"
        src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825185/icon/settings.svg"
      />
      <br />
      <img
        alt=""
        className="w-50 pointer hidden"
        data-micromodal-trigger="modal-ds"
        data-tippy="Developer Tools"
        data-tippy-placement="right"
        id="ds"
        src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825156/icon/code.svg"
      />
      <br />
      <a href="https://discord.gg/h7NxqBe" rel="noopener" target="_blank">
        <img
          alt=""
          className="w-50 pointer"
          data-tippy="Join our Discord"
          data-tippy-placement="right"
          src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825112/icon/discord.svg"
        />
      </a>
    </div>
  </div>
)

export default Nav

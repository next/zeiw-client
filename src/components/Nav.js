const Nav = () => (
  <div className="fl w-10 bg vh-100 dt">
    <div className="dtc v-mid tc sidebar">
      <div data-tippy="Return Home" data-tippy-placement="right" id="rh">
        <img
          alt=""
          className="w-50"
          src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825249/icon/home.svg"
        />
      </div>
      <div
        data-micromodal-trigger="modal-da"
        data-tippy="Player Settings"
        data-tippy-placement="right"
        id="psb"
      >
        <img
          alt=""
          className="w-50"
          src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825220/icon/player.svg"
        />
      </div>
      <div
        data-micromodal-trigger="modal-gs"
        data-tippy="Game Settings"
        data-tippy-placement="right"
      >
        <img
          alt=""
          className="w-50"
          src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825185/icon/settings.svg"
        />
      </div>
      <div
        data-micromodal-trigger="modal-ds"
        data-tippy="Developer Tools"
        data-tippy-placement="right"
      >
        <img
          alt=""
          className="w-50 hidden"
          id="ds"
          src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825156/icon/code.svg"
        />
      </div>
      <div
        data-micromodal-trigger="modal-about"
        data-tippy="About Game"
        data-tippy-placement="right"
      >
        <img
          alt=""
          className="w-50"
          src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1566758472/icon/info.svg"
        />
      </div>
      <div data-tippy="Join our Discord" data-tippy-placement="right">
        <a
          href="https://discord.gg/h7NxqBe"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            alt=""
            className="w-50"
            src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564825112/icon/discord.svg"
          />
        </a>
      </div>
    </div>
  </div>
)

export default Nav

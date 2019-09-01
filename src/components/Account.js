const Account = () => (
  <div aria-hidden="true" className="modal slide" id="modal-ps">
    <div className="overlay" data-micromodal-close tabIndex={-1}>
      <div className="container" role="dialog">
        <div className="header">
          <h2 className="title">Player Settings</h2>
          <button className="close" data-micromodal-close />
        </div>
        <div className="content center dt">
          <div className="dtc tc v-mid">
            <img className="br-100 pa1 ba b--black-10 w4" id="pfp" src="" />
            <h1 id="uname" />
            <div className="flex justify-center">
              <div
                className="badge badgeh ma2"
                data-tippy="ZEIW Developer"
                data-tippy-placement="top"
                id="dev"
              />
              <div
                className="badge badgeh ma2"
                data-tippy="ZEIW Moderator"
                data-tippy-placement="top"
                id="mod"
              />
              <div
                className="badge badgeh ma2"
                data-tippy="ZEIW Testpilot"
                data-tippy-placement="top"
                id="tp"
              />
              <div
                className="badge badgeh ma2"
                data-tippy="Phoenix Riders"
                data-tippy-placement="top"
                id="pr"
              />
              <div
                className="badge badgeh ma2"
                data-tippy="Winter Dragons"
                data-tippy-placement="top"
                id="wd"
              />
              <div
                className="badge badgeh ma2"
                data-tippy="Demon Brigade"
                data-tippy-placement="top"
                id="db"
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button
            className="btn btn-danger mr2"
            data-micromodal-trigger="modal-logout"
          >
            Sign Out
          </button>
          <button className="btn" data-micromodal-trigger="modal-fac">
            Choose Faction
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default Account

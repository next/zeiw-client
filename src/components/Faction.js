const Faction = () => (
  <div aria-hidden="true" className="modal slide" id="modal-fac">
    <div className="overlay" data-micromodal-close tabIndex={-1}>
      <div className="container" role="dialog">
        <div className="header">
          <h2 className="title">Choose Faction</h2>
          <button className="close pointer" data-micromodal-close />
        </div>
        <div className="content center dt">
          <div className="dtc tc">
            <div className="factions flex flex-row justify-center">
              <div
                className="badge ma2 pointer"
                data-tippy="Phoenix Riders"
                data-tippy-placement="top"
                id="prc"
              />
              <div
                className="badge ma2 pointer"
                data-tippy="Winter Dragons"
                data-tippy-placement="top"
                id="wdc"
              />
              <div
                className="badge ma2 pointer"
                data-tippy="Demon Brigade"
                data-tippy-placement="top"
                id="dbc"
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button className="btn" data-micromodal-close>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default Faction

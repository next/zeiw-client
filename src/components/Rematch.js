const Rematch = () => (
  <div aria-hidden="true" className="modal slide" id="modal-rm">
    <div className="overlay" data-micromodal-close tabIndex={-1}>
      <div className="container" role="dialog">
        <div className="header">
          <h2 className="title" id="modal-rm-title">
            Rematch?
          </h2>
          <button className="close pointer" data-micromodal-close />
        </div>
        <div className="content">Would you like to rematch?</div>
        <div className="footer">
          <button
            className="btn btn-primary"
            data-micromodal-close
            id="rematch"
          >
            Yes
          </button>
          <button className="btn" data-micromodal-close id="returnHome">
            Return Home
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default Rematch

const Join = () => (
  <div aria-hidden="true" className="modal slide" id="modal-mj">
    <div className="overlay" data-micromodal-close tabIndex={-1}>
      <div className="container" role="dialog">
        <div className="header">
          <h2 className="title">Join Party</h2>
          <button className="close pointer" data-micromodal-close />
        </div>
        <div className="content">
          <label htmlFor="joinID" />
          <input
            autoComplete="off"
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            id="joinID"
            placeholder="abcd123"
            required
            spellCheck="false"
            type="text"
          />
        </div>
        <div className="footer">
          <button className="btn btn-primary" id="joinBtn">
            Connect
          </button>
          <button className="btn" data-micromodal-close>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default Join

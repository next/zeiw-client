const Dev = () => (
  <div aria-hidden="true" className="modal slide" id="modal-ds">
    <div className="overlay" data-micromodal-close tabIndex={-1}>
      <div className="container" role="dialog">
        <div className="header">
          <h2 className="title">Developer Tools</h2>
          <button className="close pointer" data-micromodal-close />
        </div>
        <div className="content">
          <div className="designMode switch-wrapper">
            <p>Design Mode</p>
            <label className="switch" htmlFor="designMode">
              <input id="designMode" type="checkbox" />
              <span className="slider round" />
            </label>
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

export default Dev

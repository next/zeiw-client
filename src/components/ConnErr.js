const ConnErr = () => (
  <div aria-hidden="true" className="modal slide" id="modal-oauth-conn-error">
    <div className="overlay" data-micromodal-close tabIndex={-1}>
      <div className="container" role="dialog">
        <div className="header">
          <h2 className="title">Authorization Failed</h2>
          <button className="close" data-micromodal-close />
        </div>
        <div className="content">
          We couldn't connect to Discord. Make sure your Discord app is running.
        </div>
      </div>
    </div>
  </div>
)

export default ConnErr

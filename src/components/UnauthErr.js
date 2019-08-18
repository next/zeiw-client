const UnauthErr = () => (
  <div aria-hidden="true" className="modal slide" id="modal-oauth-unauth-error">
    <div className="overlay" data-micromodal-close tabIndex={-1}>
      <div className="container" role="dialog">
        <div className="header">
          <h2 className="title">Authorization Failed</h2>
          <button className="close pointer" data-micromodal-close />
        </div>
        <div className="content">
          You can login by authorizing ZEIW on Discord.
        </div>
      </div>
    </div>
  </div>
)

export default UnauthErr

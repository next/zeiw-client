const Logout = () => (
  <div aria-hidden="true" className="modal slide" id="modal-logout">
    <div className="overlay" data-micromodal-close tabIndex={-1}>
      <div className="container" role="dialog">
        <div className="header">
          <h2 className="title">Sign Out</h2>
          <button className="close" data-micromodal-close />
        </div>
        <div className="content">Are you sure you want to sign out?</div>
        <div className="footer">
          <button className="btn" data-micromodal-close>
            Close
          </button>
          <button className="btn btn-danger" id="logoutBtn">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default Logout

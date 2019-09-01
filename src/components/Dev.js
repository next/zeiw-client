const Dev = () => (
  <div aria-hidden="true" className="modal slide" id="modal-ds">
    <div className="overlay" data-micromodal-close tabIndex={-1}>
      <div className="container" role="dialog">
        <div className="header">
          <h2 className="title">Developer Tools</h2>
          <button className="close" data-micromodal-close />
        </div>
        <div className="content">Nothing here yet!</div>
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

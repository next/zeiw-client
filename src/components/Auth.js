const Auth = () => (
  <div aria-hidden="true" className="modal slide" id="modal-da">
    <div className="overlay" data-micromodal-close tabIndex={-1}>
      <div className="container" role="dialog">
        <div className="header">
          <h2 className="title">Authenticate</h2>
          <button className="close" data-micromodal-close />
        </div>
        <div className="content">
          <a
            className="no-underline white bg-blurple inline-flex items-center tc br2 pa2"
            href="#"
            id="dab"
          >
            Sign in with
            <img
              className="h1 pl1"
              src="https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564824906/img/discord.png"
            />
          </a>
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

export default Auth

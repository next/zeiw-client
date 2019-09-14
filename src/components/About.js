const About = () => (
  <div aria-hidden="true" className="modal slide" id="modal-about">
    <div className="overlay" data-micromodal-close tabIndex={-1}>
      <div className="container" role="dialog">
        <div className="header">
          <h2 className="title">About Game</h2>
          <button className="close" data-micromodal-close />
        </div>
        <div className="content">
          <div className="pa2">
            <p className="f5 lh-copy measure-wide">
              ZEIW is obviously inspired by Pong, with the main difference of
              being online — featuring social integrations of many kinds! Join
              the matchmaking queue to randomly be assigned an opponent, or host
              a party to compete against your friends. Also choose one of three
              factions and compete against other factions during events!
            </p>
          </div>
          <div className="pv4 ph3 tc">
            <a
              className="dib h2 w2 mr3 pa2"
              href="https://discord.gg/h7NxqBe"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="https://cdn.zeiw.me/discord_k7yw8p.svg" />
            </a>
            <a
              className="dib h2 w2 mr3 pa2"
              href="https://github.com/next"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="https://cdn.zeiw.me/github_wj1nnw.svg" />
            </a>
            <a
              className="dib h2 w2 mr3 pa2"
              href="https://medium.com/zeiw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="https://cdn.zeiw.me/medium_o9mzq9.svg" />
            </a>
            <a
              className="dib h2 w2 pa2"
              href="https://twitter.com/zeiwhq"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="https://cdn.zeiw.me/twitter_kre0nx.svg" />
            </a>
          </div>
          <div className="mid-gray">
            <small className="f6 db tc">
              Copyright © Next.{' '}
              <a
                href="https://github.com/next/zeiw-client/blob/master/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
              >
                MIT License
              </a>
              .
              <br />
              All trademarks are property of their respective owners.
              <br />
              <a
                href="https://zeiw.me/terms"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms
              </a>{' '}
              |{' '}
              <a
                href="https://zeiw.me/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy
              </a>{' '}
              |{' '}
              <a
                href="https://zeiw.me/security"
                target="_blank"
                rel="noopener noreferrer"
              >
                Security
              </a>{' '}
              |{' '}
              <a
                href="mailto:support@zeiw.me"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
            </small>
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

export default About

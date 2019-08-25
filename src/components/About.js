const About = () => (
  <div aria-hidden="true" className="modal slide" id="modal-about">
    <div className="overlay" data-micromodal-close tabIndex={-1}>
      <div className="container" role="dialog">
        <div className="header">
          <h2 className="title">About Game</h2>
          <button className="close pointer" data-micromodal-close />
        </div>
        <div className="content">
          <p>
            Pong: A two-dimensional sports game that simulates table tennis. The
            player controls an in-game paddle by moving it vertically across the
            left or right side of the screen. They can compete against another
            player controlling a second paddle on the opposing side. Players use
            the paddles to hit a ball back and forth.
          </p>
          <br />
          <p>
            ZEIW is obviously inspired by Pong, with the main difference of
            being online — featuring social integrations of many kinds! Join the
            matchmaking queue to randomly be assigned an opponent, or host a
            party to compete against your friends. Also choose one of three
            factions and compete against other factions during events!
          </p>
          <br />
          <p>
            We're 100%{' '}
            <a href="https://github.com/ZEIW" rel="noopener">
              open source
            </a>
            ! Contributions, issues and feature requests are welcome!
          </p>
          <br />
          <p>
            © ZEIW. All rights reserved. All trademarks are the property of
            their respective owners.
          </p>
          <br />
          <p>
            By using ZEIW, you agree to our{' '}
            <a href="https://zeiw.me/terms" rel="noopener">
              ToS
            </a>{' '}
            and{' '}
            <a href="https://zeiw.me/privacy" rel="noopener">
              Privacy Policy
            </a>
            .
          </p>
          <br />
          <p>
            Please contact <a href="mailto:support@zeiw.me">support@zeiw.me</a>{' '}
            with questions.
          </p>
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

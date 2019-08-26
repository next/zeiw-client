const About = () => (
  <div aria-hidden="true" className="modal slide" id="modal-about">
    <div className="overlay" data-micromodal-close tabIndex={-1}>
      <div className="container" role="dialog">
        <div className="header">
          <h2 className="title">About Game</h2>
          <button className="close pointer" data-micromodal-close />
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
          <h1 className="f4 bold center mw5">Important Links</h1>
          <ul className="list pl0 ml0 center mw5 ba b--light-silver br3">
            <li className="ph3 pv2 bb b--light-silver">
              <a href="https://zeiw.me/terms" rel="noopener" target="_blank">
                Terms of Service
              </a>
            </li>
            <li className="ph3 pv2 bb b--light-silver">
              <a href="https://zeiw.me/privacy" rel="noopener" target="_blank">
                Privacy Policy
              </a>
            </li>
            <li className="ph3 pv2 bb b--light-silver">
              <a href="https://zeiw.me/security" rel="noopener" target="_blank">
                Vulnerability Policy
              </a>
            </li>
            <li className="ph3 pv2">
              <a href="mailto:support@zeiw.me" rel="noopener" target="_blank">
                Contact Support
              </a>
            </li>
          </ul>
          <footer className="pv4 ph3 tc">
            <a
              className="link gray dib h2 w2 br-100 mr3 pa2 bg-near-white ba b--black-10"
              href="https://discord.gg/h7NxqBe"
              rel="noopener"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="1.414"
                clip-rule="evenodd"
              >
                <path
                  fill-rule="nonzero"
                  d="M13.487-.002c.936 0 1.693.758 1.738 1.65v14.35l-1.783-1.515-.98-.892-1.07-.93.446 1.47h-9.36c-.935 0-1.693-.71-1.693-1.65V1.65C.785.76 1.543 0 2.48 0h11zm-4.08 3.788h-.02l-.134.134c1.382.4 2.05 1.025 2.05 1.025-.89-.446-1.694-.668-2.496-.758-.58-.09-1.16-.044-1.65 0h-.132c-.312 0-.98.134-1.872.49-.312.134-.49.223-.49.223s.668-.668 2.14-1.025l-.09-.09s-1.115-.043-2.318.848c0 0-1.203 2.095-1.203 4.68 0 0 .668 1.158 2.495 1.203 0 0 .268-.356.535-.668-1.025-.312-1.426-.936-1.426-.936s.09.044.223.133h.04c.02 0 .03.01.04.02v.005c.01.01.02.02.04.02.22.09.44.178.62.267.31.134.71.268 1.2.357.62.09 1.33.134 2.14 0 .4-.09.8-.178 1.2-.357.26-.133.58-.267.93-.49 0 0-.4.624-1.47.936.22.312.53.668.53.668 1.83-.04 2.54-1.2 2.58-1.15 0-2.58-1.21-4.68-1.21-4.68-1.09-.81-2.11-.84-2.29-.84zm.113 2.942c.468 0 .847.4.847.89 0 .493-.38.892-.847.892-.467 0-.846-.4-.846-.89 0-.493.38-.892.846-.892zm-3.03 0c.467 0 .846.4.846.89 0 .493-.38.892-.846.892-.468 0-.847-.4-.847-.89 0-.493.38-.892.847-.892z"
                />
              </svg>
            </a>
            <a
              className="link gray dib br-100 h2 w2 mr3 pa2 bg-near-white ba b--black-10"
              href="https://github.com/ZEIW"
              rel="noopener"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="1.414"
                clip-rule="evenodd"
              >
                <path
                  fill-rule="nonzero"
                  d="M8 0C3.58 0 0 3.582 0 8c0 3.535 2.292 6.533 5.47 7.59.4.075.547-.172.547-.385 0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.924-.89-1.17-.89-1.17-.725-.496.056-.486.056-.486.803.056 1.225.824 1.225.824.714 1.223 1.873.87 2.33.665.072-.517.278-.87.507-1.07-1.777-.2-3.644-.888-3.644-3.953 0-.873.31-1.587.823-2.147-.09-.202-.36-1.015.07-2.117 0 0 .67-.215 2.2.82.64-.178 1.32-.266 2-.27.68.004 1.36.092 2 .27 1.52-1.035 2.19-.82 2.19-.82.43 1.102.16 1.915.08 2.117.51.56.82 1.274.82 2.147 0 3.073-1.87 3.75-3.65 3.947.28.24.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.14.46.55.38C13.71 14.53 16 11.53 16 8c0-4.418-3.582-8-8-8"
                />
              </svg>
            </a>
            <a
              className="link gray dib br-100 h2 w2 mr3 pa2 bg-near-white ba b--black-10"
              href="https://medium.com/zeiw"
              rel="noopener"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="1.414"
                clip-rule="evenodd"
              >
                <path
                  fill-rule="nonzero"
                  d="M11.824 12.628l-.276.45.798.398 2.744 1.372c.15.076.294.11.418.11.278 0 .467-.177.467-.492V5.883l-4.15 6.745zm4.096-8.67c-.004-.003 0-.01-.003-.012l-4.825-2.412c-.06-.03-.123-.038-.187-.044-.016 0-.03-.01-.047-.01-.184 0-.368.092-.467.254l-.24.39-.5.814-1.89 3.08 1.89 3.076.5.813.5.812.59.95 4.71-7.64c.02-.03.01-.06-.02-.08zm-6.27 7.045L7.17 6.97l-.295-.477-.294-.477-.25-.416v4.867l3.32 1.663.5.25.5.25-.5-.813-.5-.813zM.737 1.68L.59 1.608c-.085-.042-.166-.062-.24-.062-.206 0-.35.16-.35.427v10.162c0 .272.2.594.442.716l4.145 2.08c.107.06.208.08.3.08.257 0 .438-.2.438-.53V4.01c0-.02-.012-.04-.03-.047L.738 1.68z"
                />
              </svg>
            </a>
            <a
              className="link gray dib h2 w2 br-100 mr3 pa2 bg-near-white ba b--black-10"
              href="https://twitter.com/zeiwhq"
              rel="noopener"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="1.414"
                clip-rule="evenodd"
              >
                <path
                  fill-rule="nonzero"
                  d="M16 3.038c-.59.26-1.22.437-1.885.517.677-.407 1.198-1.05 1.443-1.816-.634.37-1.337.64-2.085.79-.598-.64-1.45-1.04-2.396-1.04-1.812 0-3.282 1.47-3.282 3.28 0 .26.03.51.085.75-2.728-.13-5.147-1.44-6.766-3.42C.83 2.58.67 3.14.67 3.75c0 1.14.58 2.143 1.46 2.732-.538-.017-1.045-.165-1.487-.41v.04c0 1.59 1.13 2.918 2.633 3.22-.276.074-.566.114-.865.114-.21 0-.41-.02-.61-.058.42 1.304 1.63 2.253 3.07 2.28-1.12.88-2.54 1.404-4.07 1.404-.26 0-.52-.015-.78-.045 1.46.93 3.18 1.474 5.04 1.474 6.04 0 9.34-5 9.34-9.33 0-.14 0-.28-.01-.42.64-.46 1.2-1.04 1.64-1.7z"
                />
              </svg>
            </a>
          </footer>
          <footer className="mid-gray">
            <small className="f6 db tc">
              Copyright © ZEIW (
              <a
                href="https://github.com/ZEIW/client/blob/master/LICENSE"
                rel="noopener"
                target="_blank"
              >
                MIT License
              </a>
              ).
              <br />
              All trademarks are property of their respective owners.
            </small>
          </footer>
          <footer className="pv4 ph3">
            <p className="f6 db tc">Build Hash</p>
            <pre className="f6 db tc">{_zeiwBuild.commitHash}</pre>
          </footer>
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

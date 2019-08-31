import { Component } from 'preact'
import initApp from './App'
import 'text-spinners'
import 'tachyons'
import 'inter-ui'

class Layout extends Component {
  componentDidMount() {
    initApp()
  }

  render(props) {
    return (
      <div>
        {props.children}
        <style>{`
        :root {
          --black: #111;
          --danger: #f04747;
          --gray: #ccc;
          --primary: #f90;
          --secondary: #06f;
          --success: #19a974;
          --white: #eee;
        }

        *,
        ::after,
        ::before {
          box-sizing: border-box;
          color: inherit;
          font-family: inherit;
          font-size: inherit;
          margin: 0;
          padding: 0;
        }

        body {
          animation: stars 30s linear infinite;
          background: url("https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564824906/img/stardust.png") var(--black);
          color: var(--white);
          font-family: "Inter", sans-serif;
          overflow: hidden;
        }

          @keyframes stars {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 798px -798px;
            }
          }

          * {
            cursor: default !important;
          }

          ::selection {
            background: var(--primary);
          }

          :focus {
            outline: 0;
          }

          img {
            -moz-user-select: none;
            -ms-user-select: none;
            -webkit-user-drag: none;
            -webkit-user-select: none;
            user-drag: none;
            user-select: none;
          }

          .hidden,
          .hidden > * {
            display: none !important;
          }

          .badgeh {
            display: none
          }

          .bg {
            background: var(--primary)
          }

          .bg-blurple {
            background-color: #7289da;
          }
          `}</style>
      </div>
    )
  }
}

export default Layout

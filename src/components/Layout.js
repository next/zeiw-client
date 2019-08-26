import { Component } from 'preact'
import initApp from './App'
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
        <style jsx global>{`
          :root {
            --primary: #ff9900;
            --secondary: #0066ff;
            --success: #19a974;
            --danger: #f04747;
            --white: #eeeeee;
            --gray: #cccccc;
            --black: #111111;
          }
          html {
            background: var(--black);
            font-family: Inter, sans-serif;
            color: var(--white);
            overflow: hidden;
          }
          body {
            background-image: url('https://res.cloudinary.com/zeiw/image/upload/q_auto/v1564824906/img/stardust.png');
            animation: stars 30s linear infinite;
          }
          @keyframes stars {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 798px -798px;
            }
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
          * {
            user-drag: none;
            user-select: none;
          }
          :focus {
            outline: none;
          }
          .hidden,
          .hidden > * {
            display: none !important;
          }
          .badgeh {
            display: none;
          }
          .bg {
            background: var(--primary);
          }
          .bg-blurple {
            background-color: #7289da;
          }
          [class^='tippy'] {
            backface-visibility: hidden;
            transform: translateZ(0) scale(1, 1);
          }
        `}</style>
      </div>
    )
  }
}

export default Layout

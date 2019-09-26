import 'tachyons'
import 'text-spinners'
import { Component } from 'preact'
import initApp from './App'

class Layout extends Component {
  componentDidMount() {
    initApp()
  }

  render({ children }) {
    return <div>{children}</div>
  }
}

export default Layout

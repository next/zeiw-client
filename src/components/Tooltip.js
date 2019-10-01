import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'

export default props => (
  <Tippy
    a11y={false}
    animation="fade"
    arrow={true}
    distance={7}
    hideOnClick={true}
    placement="top"
    {...props}
  />
)

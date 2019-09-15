import Tippy from '@tippy.js/react'

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

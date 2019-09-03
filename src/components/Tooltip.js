import Tippy from '@tippy.js/react'

export default props => (
  <Tippy
    a11y={false}
    arrow={true}
    animation="fade"
    hideOnClick={false}
    placement="top"
    {...props}
  />
)

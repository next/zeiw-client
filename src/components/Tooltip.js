import Tippy from '@tippy.js/react'

export default props => (
  <Tippy
    arrow={true}
    animation="fade"
    hideOnClick={false}
    placement="top"
    {...props}
  />
)

import Tippy from '@tippy.js/react'

export default props => (
  <Tippy
    a11y={false}
    placement="top"
    arrow={true}
    animation="fade"
    theme="bootstrap"
    distance={7}
    hideOnClick={false}
    {...props}
  />
)

import 'tippy.js/dist/tippy.css'

import Tippy from '@tippy.js/react'

export default (props) => (
  <Tippy
    arrow
    distance={7}
    placement='top'
    animation='fade'
    hideOnClick
    trigger='mouseenter'
    {...props}
  />
)

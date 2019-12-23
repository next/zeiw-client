import 'tippy.js/dist/tippy.css'

import Tippy from '@tippy.js/react'

export default props => (
  <Tippy
    arrow={true}
    distance={7}
    placement='top'
    animation='fade'
    hideOnClick={true}
    trigger='mouseenter'
    {...props}
  />
)

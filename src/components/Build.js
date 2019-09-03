import Tippy from './Tooltip'

const Build = () => (
  <Tippy content="Build" placement="left">
    <div className="absolute bottom-2 right-2 loading dots" id="build" />
  </Tippy>
)

export default Build

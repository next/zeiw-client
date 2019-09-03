import Tippy from './Tooltip'

const Ping = () => (
  <Tippy content="Latency" placement="left">
    <div className="absolute top-2 right-2 loading dots" id="ping" />
  </Tippy>
)

export default Ping

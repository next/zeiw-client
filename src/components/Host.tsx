import Tippy from "./Tooltip"
import { h } from "preact"

const Host = () => (
	<div className="dtc tc v-mid hidden" id="wait">
		<Tippy content="Copy to clipboard">
			<div id="pcpb" />
		</Tippy>
		<div className="spinner">
			<div className="cube1" />
			<div className="cube2" />
		</div>
	</div>
)

export default Host

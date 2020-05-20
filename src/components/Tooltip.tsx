import "tippy.js/dist/tippy.css"

import Tippy from "@tippyjs/react"
import { h } from "preact"

export default (props) => (
	<Tippy trigger="mouseenter" {...props}>
		{props.children}
	</Tippy>
)

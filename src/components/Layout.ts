import "tachyons"

import initApp from "./App"
import { useEffect } from "preact/hooks"

export default ({ children }) => {
	useEffect(() => initApp(), [])
	return children
}

import "./index.css"

import {
	Account,
	Faction,
	Find,
	Game,
	Host,
	Layout,
	Main,
	Native,
	Nav,
	Settings,
	Tippy,
} from "./components"

import { h } from "preact"

declare global {
	interface Window {
		_zeiwNative: any
	}
}

const isNative = window._zeiwNative !== undefined
const version = process.env.VERSION.substring(0, 7)
const release = localStorage.beta === "true" ? "canary" : "master"

export default () => (
	<Layout>
		{isNative && <Native />}

		<Tippy content="Latency" placement="bottom">
			<div className="absolute top-2 right-2" id="ping" />
		</Tippy>

		<Tippy content="Click to check for updates" placement="top">
			<div className="absolute bottom-2 right-2" id="build">
				{release}@{version}
			</div>
		</Tippy>

		<div className="center">
			<div className="cf w-100">
				<Nav />

				<div className="fl w-90 vh-100 dt">
					<Find />
					<Host />
					<Game />
					<Main />
				</div>

				<Account />
				<Faction />
				<Settings />
			</div>
		</div>
	</Layout>
)

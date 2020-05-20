import Tippy from "./Tooltip"
import { h } from "preact"

const Nav = () => (
	<div className="fl w-10 bg vh-100 dt">
		<div className="dtc v-mid tc">
			<Tippy content="Home" placement="right">
				<svg
					className="w-50"
					id="goHome"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
				</svg>
			</Tippy>
			<Tippy content="Profile" placement="right">
				<svg
					className="w-50"
					id="user"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<defs />
					<path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a3 3 0 110 6 3 3 0 010-6zm0 14c-2 0-5-1-6-3 0-2 4-3 6-3s6 1 6 3c-1 2-3 3-6 3z" />
				</svg>
			</Tippy>
			<Tippy content="Settings" placement="right">
				<svg
					className="w-50"
					data-micromodal-trigger="modal-gs"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<defs />
					<path d="M19 13a8 8 0 000-2l3-2-2-4h-1l-2 1-2-1-1-3h-4L9 5 7 6 5 5H4L2 9l3 2a8 8 0 000 2l-3 2 2 4h1l2-1 2 1 1 3h4l1-3 2-1 2 1h1l2-4-3-2zm-7 3a4 4 0 110-8 4 4 0 010 8z" />
				</svg>
			</Tippy>
			<Tippy content="Servers" placement="right">
				<svg
					className="w-50"
					id="server"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 56 56"
				>
					<defs />
					<path d="M25 46H11C5 46 0 41 0 35c0-4 3-8 6-10h1v-2a7 7 0 019-7l1 1a7 7 0 014 6 1 1 0 102 0c0-3-1-5-3-7 3-4 7-6 12-6 8 0 14 6 15 14h-4a1 1 0 000 2h5c4 1 8 5 8 10 0 6-4 10-10 10H25z" />
				</svg>
			</Tippy>
			<Tippy content="Discord" placement="right">
				<svg
					className="w-50"
					id="discord"
					xmlns="http://www.w3.org/2000/svg"
					fill-rule="evenodd"
					stroke-linejoin="round"
					stroke-miterlimit="1.4"
					clip-rule="evenodd"
					viewBox="0 0 16 16"
				>
					<defs />
					<path
						fill-rule="nonzero"
						d="M13.5 0c1 0 1.7.8 1.7 1.6V16l-1.8-1.5-1-1-1-.8.4 1.4H2.5c-1 0-1.7-.7-1.7-1.6V1.7C.8.7 1.5 0 2.5 0h11zm-4 3.8h-.1l-.1.1c1.3.4 2 1 2 1a7.2 7.2 0 00-4.1-.7H7a6 6 0 00-1.8.5l-.5.2s.6-.7 2.1-1v-.1s-1.2 0-2.4.8c0 0-1.2 2.1-1.2 4.7 0 0 .7 1.2 2.5 1.2l.5-.7c-1-.3-1.4-.9-1.4-.9L5 9h.1l.7.4 1.2.3H9l1.2-.3 1-.5s-.5.6-1.5.9l.5.7c1.8 0 2.5-1.2 2.6-1.2 0-2.6-1.2-4.7-1.2-4.7a4 4 0 00-2.3-.8zm0 3c.5 0 .9.3.9.8s-.4 1-.9 1a.9.9 0 01-.8-1c0-.5.4-.9.8-.9zm-3 0c.5 0 .8.3.8.8s-.3 1-.8 1a.9.9 0 01-.9-1c0-.5.4-.9.9-.9z"
					/>
				</svg>
			</Tippy>
		</div>
	</div>
)

export default Nav

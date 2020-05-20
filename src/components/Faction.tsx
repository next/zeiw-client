import Tippy from "./Tooltip"
import { h } from "preact"

const Faction = () => (
	<div aria-hidden="true" className="modal slide" id="modal-fac">
		<div className="overlay" data-micromodal-close tabIndex={-1}>
			<div className="container" role="dialog">
				<div className="header">
					<h2 className="title">Choose Faction</h2>
					<button className="close" data-micromodal-close />
				</div>
				<div className="content center dt">
					<div className="dtc tc">
						<div className="flex flex-row justify-center">
							<Tippy content="Phoenix Riders">
								<div className="badge ma2" id="prc" data-micromodal-close />
							</Tippy>
							<Tippy content="Winter Dragons">
								<div className="badge ma2" id="wdc" data-micromodal-close />
							</Tippy>
							<Tippy content="Demon Brigade">
								<div className="badge ma2" id="dbc" data-micromodal-close />
							</Tippy>
						</div>
					</div>
				</div>
				<div className="footer">
					<button className="btn" data-micromodal-close>
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
)

export default Faction

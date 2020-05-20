import Tippy from "./Tooltip"

const Account = () => (
	<div aria-hidden="true" className="modal slide" id="modal-ps">
		<div className="overlay" data-micromodal-close tabIndex={-1}>
			<div className="container" role="dialog">
				<div className="header">
					<h2 className="title">Profile</h2>
					<button className="close" data-micromodal-close />
				</div>
				<div className="content center dt">
					<div className="dtc tc v-mid">
						<img id="pfp" className="br-100 pa1 ba b--black-10 w4" />
						<h1 id="uname" />
						<div className="flex justify-center">
							<Tippy content="ZEIW Developer">
								<div className="badge hidden ma2" id="dev" />
							</Tippy>
							<Tippy content="ZEIW Moderator">
								<div className="badge hidden ma2" id="mod" />
							</Tippy>
							<Tippy content="ZEIW Testpilot">
								<div className="badge hidden ma2" id="tp" />
							</Tippy>
							<Tippy content="Phoenix Riders">
								<div className="badge hidden ma2" id="pr" />
							</Tippy>
							<Tippy content="Winter Dragons">
								<div className="badge hidden ma2" id="wd" />
							</Tippy>
							<Tippy content="Demon Brigade">
								<div className="badge hidden ma2" id="db" />
							</Tippy>
						</div>
					</div>
				</div>
				<div className="footer">
					<button className="btn btn-danger mr2" id="logout">
						Sign Out
					</button>
					<button className="btn" data-micromodal-trigger="modal-fac">
						Choose Faction
					</button>
				</div>
			</div>
		</div>
	</div>
)

export default Account

import React from 'react';
import { Link } from 'react-router-dom';

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

function Navigation({ clicker }) {
	function discordLoad() {
		// window.location.href = "https://discord.gg/8Q2eDgKdfr";
		window.open('https://discord.gg/8Q2eDgKdfr', '_blank');
	}

	return (
		<nav className="navBar">
			<nav className="navBarInner">
				<div className="navBarSpacer"></div>
				<div className="navBarLinks">
					<div className="links">
						<div className="pleaseWork">
							<Link to="/">
								<div className="navButton">Rankings</div>
							</Link>
							<Link to="/howtoplay">
								<div className="navButton">How To Play</div>
							</Link>
							<Link to="/rules">
								<div className="navButton">Rules</div>
							</Link>
							<Link to="/whatisdfl">
								<div className="navButton">DFL?</div>
							</Link>
							<Link to="/donate">
								<div className="navButton">Donate</div>
							</Link>
							<div className="navButton" onClick={discordLoad}>
								Discord
							</div>
							{/* <Link to="/load">
                <div className="navButton">Load</div>
              </Link> */}
						</div>
						<button className="btnMobileNavX" onClick={clicker}>
							<AiOutlineClose className="iconMobileNav" name="close-outline" />
						</button>
					</div>
					<div className="buttonDiv">
						<button className="btnMobileNavM" onClick={clicker}>
							<AiOutlineMenu className="iconMobileNav" name="menu-outline" />
						</button>
					</div>
				</div>
			</nav>
		</nav>
	);
}

export default Navigation;

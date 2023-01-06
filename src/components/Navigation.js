//Forever Discord Link: https://discord.gg/cXG8HvrYMG

import React from 'react';
import { Link } from 'react-router-dom';

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

function Navigation({ clicker }) {
	return (
		<nav className="navBar">
			<nav className="navBarInner">
				<div className="navBarSpacer"></div>
				<div className="navBarLinks">
					<div className="links">
						<Link to="/">
							<div className="navButton" onClick={clicker}>
								Rankings
							</div>
						</Link>
						<Link to="/whatisdfl">
							<div className="navButton" onClick={clicker}>
								DFL?
							</div>
						</Link>
						<Link to="/howtoplay">
							<div className="navButton" onClick={clicker}>
								How To Play
							</div>
						</Link>
						<Link to="/rules">
							<div className="navButton" onClick={clicker}>
								Rules
							</div>
						</Link>
						<Link to="/discord">
							<div className="navButton" onClick={clicker}>
								Discord
							</div>
						</Link>
						<Link to="/donate">
							<div className="navButton" onClick={clicker}>
								Donate
							</div>
						</Link>

						<button className="btnMobileNavX" onClick={clicker}>
							<AiOutlineClose className="iconMobileNav" name="close-outline" />
						</button>
					</div>
					<div className="buttonNav">
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

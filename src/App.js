//Import styles
import './App.css';
import './queries.css';

//Import Dependencies
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

//Import components
import Navigation from './components/Navigation.js';

//Import Pages
import Rankings from './pages/Rankings.js';
import HowToPlay from './pages/HowToPlay.js';
import Rules from './pages/Rules.js';
import Donate from './pages/Donate.js';
import WhatIsDFL from './pages/WhatIsDFL.js';
import Discord from './pages/Discord.js';

function App() {
	const year = new Date().getFullYear();
	const [players, setPlayers] = useState([1]);
	const [isActive, setActive] = useState(false);
	const toggleClass = () => {
		setActive(!isActive);
	};
	const getData = async () => {
		try {
			const response = await fetch('/players'); //returns a promise - fetch is not part of express, fetch is part of browser
			const players = await response.json(); //MUST BE THE NAME OF THE SETSTATE VARIABLE!!!
			setPlayers(players); //MUST BE THE NAME OF THE SETSTATE VARIABLE!!!
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
	}, []); //empty array = call only when the component is first mounted

	return (
		<div className="App">
			<header className={isActive ? 'Appheader nav-open' : 'Appheader'}>
				<div className="mainNav">
					<img src="./img/dfl_logo.png" alt="DFL Logo" className="logo"></img>
					<div className="navTitleBar">
						<h1>
							<span className="dfl">DFL</span>
							<span className="discordFight">DISCORD FIGHT</span>
							<span className="league"> LEAGUE</span>
						</h1>
						<Navigation clicker={toggleClass} />
					</div>
				</div>
			</header>
			<main className="Appmain">
				<Routes>
					<Route path="/" exact element={<Rankings players={players} />} />
					<Route path="/rules" exact element={<Rules />} />
					<Route path="/donate" exact element={<Donate />} />
					<Route path="/howtoplay" exact element={<HowToPlay />} />
					<Route path="/whatisdfl" exact element={<WhatIsDFL />} />
					<Route path="/discord" exact element={<Discord />} />
				</Routes>
			</main>
			<footer className="Appfooter">
				<span>&copy; {year} James Cole</span>
			</footer>
		</div>
	);
}

export default App;

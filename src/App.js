import './App.css';

//Import Dependencies
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

//Import components
import Navigation from './components/Navigation.js';

//Import Pages
import Rankings from './pages/Rankings.js';

function App() {
	const year = new Date().getFullYear();

	const [isActive, setActive] = useState(false);
	const toggleClass = () => {
		setActive(!isActive);
	};

	return (
		<div className="App">
			<header className={isActive ? 'Appheader nav-open' : 'Appheader'}>
				<img src="./img/dfl_logo.png" alt="DFL Logo" className="logo"></img>
				<div className="navTitleBar">
					<h1>
						<span>DISCORD FIGHT</span> LEAGUE
					</h1>
					<Navigation clicker={toggleClass} />
				</div>
			</header>
			<main className="Appmain">
				<Routes>
					<Route path="/" exact element={<Rankings />} />
				</Routes>
			</main>
			<footer className="Appfooter">
				<span>&copy; {year} James Cole</span>
			</footer>
		</div>
	);
}

export default App;

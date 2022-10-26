import React from 'react';
import Table from '../components/Table.js';
import { useState, useEffect } from 'react';

function Rankings() {
	const eliteArr = [];
	const mastersArr = [];
	const diamondArr = [];
	const goldArr = [];
	const silverArr = [];
	const bronzeArr = [];

	const [players, setPlayers] = useState([1]);

	const separateRankings = (players) => {
		players.forEach((element) => {
			if (element.division === 'Elite') {
				insertSorted(eliteArr, element);
			} else if (element.division === 'Masters') {
				insertSorted(mastersArr, element);
			} else if (element.division === 'Diamond') {
				insertSorted(diamondArr, element);
			} else if (element.division === 'Gold') {
				insertSorted(goldArr, element);
			} else if (element.division === 'Silver') {
				insertSorted(silverArr, element);
			} else if (element.division === 'Bronze') {
				insertSorted(bronzeArr, element);
			}
		});
	};

	//TODO: Code to handle ties
	//Insert Players into their division array based on bank value
	const insertSorted = (array, player) => {
		let low = 0;
		let high = array.length;

		while (low < high) {
			let mid = (low + high) >>> 1;
			if (array[mid].bank > player.bank) low = mid + 1;
			else high = mid;
		}
		array.splice(low, 0, player); //low - 1?
	};
	const getData = async () => {
		//WORKS ON HTTPS
		//need mode:cors to work on https
		//This route has an SSL certificate and is reverse proxied from
		//discordfightleague.com:59110/players
		const response = await fetch('https://players.discordfightleague.com/', {
			mode: 'cors',
		}); //returns a promise - fetch is not part of express, fetch is part of browser
		const players = await response.json(); //MUST BE THE NAME OF THE SETSTATE VARIABLE!!!
		setPlayers(players); //MUST BE THE NAME OF THE SETSTATE VARIABLE!!!
		console.log(response);
	};

	useEffect(() => {
		getData();
	}, []); //empty array = call only when the component is first mounted

	separateRankings(players);

	return (
		<article className="rankingsPage">
			<h2>Rankings</h2>

			<div className="elite">
				<div className="eliteTitle">
					<p>ELITE Division</p>
				</div>
				<Table players={eliteArr} specialTier={1} />
			</div>

			<div className="masters">
				<div className="mastersTitle">
					<p>Masters Division</p>
				</div>
				<Table players={mastersArr} specialTier={2} />
			</div>

			<div className="diamond">
				<div className="diamondTitle">
					<p>Diamond Division</p>
				</div>
				<Table players={diamondArr} specialTier={0} />
			</div>

			<div className="gold">
				<div className="goldTitle">
					<p>Gold Division</p>
				</div>
				<Table players={goldArr} specialTier={0} />
			</div>

			<div className="silver">
				<div className="silverTitle">
					<p>Silver Division</p>
				</div>
				<Table players={silverArr} specialTier={0} />
			</div>

			<div className="bronze">
				<div className="bronzeTitle">
					<p>Bronze Division</p>
				</div>
				<Table players={bronzeArr} specialTier={0} />
			</div>
		</article>
	);
}

export default Rankings;

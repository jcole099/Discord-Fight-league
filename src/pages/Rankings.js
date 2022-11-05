import React from 'react';
import Table from '../components/Table.js';
import { useState, useEffect } from 'react';

function Rankings() {
	let eliteArr = [];
	let mastersArr = [];
	let diamondArr = [];
	let goldArr = [];
	let silverArr = [];
	let bronzeArr = [];

	const [players, setPlayers] = useState([1]);

	const divideAndSort = (players) => {
		players.forEach((element) => {
			//find out what array they go into
			// let curArr = [];
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

	//TODO: not sure why the first function does not work, but the second does
	const insertSorted = (array, player) => {
		//expand array length to accomodate rank position
		while (array.length < player.rank) {
			array.push(player); //THIS ERRORS WHEN A BLANK PLACEHOLDER IS USED. NOT SURE WHY INSERTING A DUMMY PLAYER VALUE FIXES IT???
		}
		//place player into rank -1 position of array
		// array.splice(player.rank - 1, 1, player);
		array[player.rank - 1] = player;
	};

	//Insert Players into their division array based on bank value
	// const insertSorted = (array, player) => {
	// 	//index values
	// 	let low = 0;
	// 	let high = array.length;

	// 	//Sorting
	// 	while (low < high) {
	// 		let mid = (low + high) >>> 1; //floor(divide by 2)
	// 		if (array[mid].rank > player.rank) {
	// 			low = mid + 1;
	// 		} else {
	// 			high = mid;
	// 		}
	// 	}
	// 	//if equal, low is the index of the tie
	// 	//splice inserts cur it at the tie location and pushes everything down the array

	// 	array.splice(low, 0, player); //places ties unordered consecutively.
	// };

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

	//Divides players into their divisions, orders them based on rank
	divideAndSort(players);

	return (
		<article className="rankingsPage">
			<h2>Rankings</h2>

			<div className="elite">
				<div className="eliteTitle">
					<p>
						<b>Elite</b> Division
					</p>
				</div>
				<Table players={eliteArr} specialTier={1} />
			</div>

			<div className="masters">
				<div className="mastersTitle">
					<p>
						<b>Masters</b> Division
					</p>
				</div>
				<Table players={mastersArr} specialTier={2} />
			</div>

			<div className="diamond">
				<div className="diamondTitle">
					<p>
						<b>Diamond</b> Division
					</p>
				</div>
				<Table players={diamondArr} specialTier={0} />
			</div>

			<div className="gold">
				<div className="goldTitle">
					<p>
						<b>Gold</b> Division
					</p>
				</div>
				<Table players={goldArr} specialTier={0} />
			</div>

			<div className="silver">
				<div className="silverTitle">
					<p>
						<b>Silver</b> Division
					</p>
				</div>
				<Table players={silverArr} specialTier={0} />
			</div>

			<div className="bronze">
				<div className="bronzeTitle">
					<p>
						<b>Bronze</b> Division
					</p>
				</div>
				<Table players={bronzeArr} specialTier={3} />
			</div>
		</article>
	);
}

export default Rankings;

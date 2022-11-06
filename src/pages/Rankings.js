import React from 'react';
import Table from '../components/Table.js';

function Rankings({ players }) {
	let eliteArr = [];
	let mastersArr = [];
	let diamondArr = [];
	let goldArr = [];
	let silverArr = [];
	let bronzeArr = [];

	//Place players in their assigned division arrays
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

	//Place players in their appropriate location within division array
	const insertSorted = (array, player) => {
		//expand array length to accomodate rank position
		while (array.length < player.rank) {
			array.push(player); //THIS ERRORS WHEN A BLANK PLACEHOLDER IS USED. NOT SURE WHY INSERTING A DUMMY PLAYER VALUE FIXES IT???
		}
		array[player.rank - 1] = player;
	};

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

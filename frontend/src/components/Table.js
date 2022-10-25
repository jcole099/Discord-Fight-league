import React from 'react';
import Row from './Row.js';

function Table({ players, specialTier }) {
	//algorithm for determining positions of 33%,33%,33%
	//rankUpNum includes the index to rank up (plus everyone above this index)
	//rankDownNum include the index to rank down (plus everyone below them)
	let rankUpNum = Math.floor(players.length * 0.33);
	let rankDownNum = players.length - rankUpNum;
	rankUpNum -= 1;

	//elite tier doesnt use percentages, therefore hardcode location.
	if (specialTier === 1) {
		rankUpNum = -1;
		rankDownNum = 8;
	}

	//masters tier hardcodes top white line
	if (specialTier === 2) {
		rankUpNum = 1;
	}

	return (
		<table>
			<thead className="thead">
				<tr>
					<th>Rank</th>
					<th>Discord Name</th>
					<th>Bank</th>
					<th>Movement</th>
					<th>Last Season Rank</th>
				</tr>
			</thead>
			<tbody>
				{players.map((player, i) => {
					if (i === rankUpNum) {
						//logic for including rankup/down lines
						return (
							<Row
								player={player}
								key={player._id}
								rank={i + 1}
								rankup={true}
								rankdown={false}
							/>
						);
					} else if (i === rankDownNum) {
						return (
							<Row
								player={player}
								key={player._id}
								rank={i + 1}
								rankup={false}
								rankdown={true}
							/>
						);
					} else {
						return (
							<Row
								player={player}
								key={player._id}
								rank={i + 1}
								rankup={false}
								rankdown={false}
							/>
						);
					}
					//key is an internal React value, should be a string, doesn't get passed to element
				})}
			</tbody>
		</table>
	);
}
export default Table;

//test

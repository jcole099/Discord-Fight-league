import React from 'react';


function InactiveRow({ player }) {
	//LONG NAMES - gets first 15 characters of user name
	const checkNameLength = function (name) {
		let playerName = name;
		if (name.length > 15) {
			playerName = name.substring(0, 15);
			playerName += '...';
		}
		return playerName;
	};

	return (
		<tr className="row">
			<td>{checkNameLength(player.playerName)}</td>
			<td>
				{(() => {
					let rankings = player.rankingHistory;
					//get last season data of array
					let lastRank = rankings[rankings.length - 1];

					if (lastRank === 'new') {
						return <span>new</span>;
					}

					//Get season value"
					//iterate until ":"
					// let season = '';
					for (const letter of lastRank) {
						if (letter !== ':') {
							lastRank = lastRank.substring(1); //returns the string exluding index 0
							// season += letter; //not using the season yet
						} else {
							lastRank = lastRank.substring(1); //returns the string exluding index 0
							break;
						}
					}
					//detect first letter -> m = "Masters", r = "Ruby", etc...
					//Display: "Place:"
					let div = '';
					switch (lastRank[0]) {
						case 'e':
							div = 'Elite';
							break;
						case 'm':
							div = 'Masters';
							break;
						case 'd':
							div = 'Diamond';
							break;
						case 'g':
							div = 'Gold';
							break;
						case 's':
							div = 'Silver';
							break;
						case 'b':
							div = 'Bronze';
					}
					lastRank = lastRank.substring(1); //lastRank now includes the ranking within the division

					return (
						<span>
							{div}: {lastRank}
						</span>
					);
				})()}
			</td>
		</tr>
	);
}
export default InactiveRow;

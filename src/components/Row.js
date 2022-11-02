import React from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

function Row({ player, rank, rankup, rankdown }) {
	//LONG NAMES - gets first 15 characters of user name
	const checkNameLength = function (name) {
		let playerName = name;
		if (name.length > 15) {
			playerName = name.substring(0, 15);
			playerName += '...';
		}
		return playerName;
	};

	//Sets a className to TR to include rankup/rankdown borders
	let customClassName = 'playerRow';
	if (rankup === true) {
		customClassName = 'playerRowUp';
	} else if (rankdown === true) {
		customClassName = 'playerRowDown';
	} else {
		customClassName = 'playerRow';
	}

	return (
		<tr className="row">
			<td className={customClassName}>{rank}</td>
			<td className={customClassName}>{checkNameLength(player.playerName)}</td>
			<td className={customClassName}>{player.bank}</td>
			<td className={customClassName}>
				{(() => {
					if (player.movement >= 0) {
						return (
							<>
								<AiFillCaretUp className="upIcon" /> {player.movement}
							</>
						);
					} else if (player.movement < 0) {
						return (
							<>
								<AiFillCaretDown className="downIcon" />{' '}
								{Math.abs(player.movement)}
							</>
						);
					} else {
						return 0;
					}
				})()}
			</td>
			<td className={customClassName}>
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
export default Row;

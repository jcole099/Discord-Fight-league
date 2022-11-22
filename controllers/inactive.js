const Players = require('../models/Players');
const convertRankToPrevFormat = require('../helpers/convertRankToPrevFormat');
const Leaguestatus = require('../models/Leaguestatus');
const buildRanksHelper = require('../helpers/buildRanksHelper')

module.exports = {
	name: 'inactive',
	description: 'Sets your current status to inactive for the remainder of the season. WARNING: You will not be able to participate until the next season and will be deranked a division',
	restriction: '',
	dm: true,
	args: 0,
	usage: '',
	async execute(
		message,
		args,
		freezeBets,
		commands,
		myGuild,
		warRoom,
		adminRoom
	) {
		try {
			let player = await Players.findOne({ playerID: message.author.id });
			let oldDivision = player.division

            //Store current division in rankingsHistory
            let curSeason = await Leaguestatus.find();
			curSeason = curSeason[0].season;
            player.rankingHistory.push(convertRankToPrevFormat(curSeason, player.division, player.rank));


			//Remove Players role
			const someGuy = await myGuild.members.fetch(message.author.id);
			const playersRole = await myGuild.roles.cache.find(
				(role) => role.name === 'Players'
			);
			await someGuy.roles.remove(playersRole);

            //Remove division role
			const divisionRole = await myGuild.roles.cache.find(
				(role) => role.name === player.division
			);
			await someGuy.roles.remove(divisionRole);
            
            
            //Set division to innactive
            player.division = 'Inactive';

            await player.save();

			//Re rank leaving division
			buildRanksHelper(oldDivision);

			return await message.channel.send('**You have been placed on the inactive roster**.\nYour status will automatically be set to active at the start of the next season.');
		} catch (err) {
			console.error(err.message);
			return await message.channel.send(
				`Database error for !${this.name} command.  Please check to see if you are already a member. If not, please contact an Admin.`
			);
		}
	},
};

//message.channel.type: 1 for dm
//message.channel.type: 0 for chat
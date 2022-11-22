//COMMAND CAN ONLY BE USED IN A CHANNEL (ADMIN CHANNEL PREFERABLY)
//THIS COMMAND ALSO RERANKS PREVIOUS DIVISION AND NEW DIVISION
const Players = require('../models/Players');
const buildRanksHelper = require('../helpers/buildRanksHelper');

module.exports = {
	name: 'moveplayer',
	description: 'Manually moves a player into another division',
	restriction: 'admin',
	dm: false,
	args: 2,
	usage: '<player_id> <division>',
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
			//VALIDATION
			const divisionNames = [
				'Elite',
				'Masters',
				'Diamond',
				'Gold',
				'Silver',
				'Bronze',
			];
			if (!divisionNames.includes(args[1])) {
				return message.channel.send(
					'You did not provide a valid division (case sensitive).'
				);
			}
			if (isNaN(args[0])) {
				return message.channel.send(
					'You did not provide a valid player ID number'
				);
			}
			const userData = await Players.find({ playerID: args[0] });
			if (userData.length === 0) {
				return message.channel.send('No player found with that ID');
			}

			//SET DIVISION IN DATABASE
			const oldDivisionName = userData[0].division;
			buildRanksHelper(oldDivisionName); //reranks previous division
			userData[0].division = args[1];
			userData[0].save();
			buildRanksHelper(args[1]); //reranks new division

			//SET DIVISION ROLE IN DISCORD
			const oldDivision = await message.guild.roles.cache.find(
				(role) => role.name === oldDivisionName
			);
			const newDivision = await message.guild.roles.cache.find(
				(role) => role.name === args[1]
			);

			// await message.member.roles.add(newDivision);
			// await message.member.roles.remove(oldDivision);

			const playerToBeMoved = await myGuild.members.fetch(args[0])
			await playerToBeMoved.roles.add(newDivision);
			await playerToBeMoved.roles.remove(oldDivision);

			message.channel.send(
				`**${userData[0].playerName} moved to division: ${args[1]}!**`
			);
		} catch (err) {
			console.log(err);
			return await message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};

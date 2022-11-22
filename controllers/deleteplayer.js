//DELETES ALL ROLES, INCLUDING ADMIN

const Players = require('../models/Players');
const buildRanksHelper = require('../helpers/buildRanksHelper');

module.exports = {
	name: 'deleteplayer',
	description:
		'Removes a player from the league. All betting history will be permanently erased.',
	restriction: 'admin',
	dm: false,
	args: 1,
	usage: '<player_id>',
	async execute(
		message,
		args,
		freezeBets,
		commands,
		myGuild,
		warRoom,
		adminRoom
	) {
		if (isNaN(args[0])) {
			return message.channel.send(
				`Please ensure that the player ID is a valid number`
			);
		}
		try {
			//check if player exists
			const userData = await Players.findOne({ playerID: args[0] });
			if (userData == null) {
				return message.channel.send(
					"Player with that ID doesn't exist in the database"
				);
			}

			//Remove Discord Roles
			//if player is inactive, no roles need to be removed (already removed)
			if (userData.division !== 'Inactive') {
				const someGuy = await myGuild.members.fetch(args[0]);

				//remove players role
				const playersRole = await myGuild.roles.cache.find(
					(role) => role.name === 'Players'
				);
				await someGuy.roles.remove(playersRole);

				//Remove division role
				const divisionRole = await myGuild.roles.cache.find(
					(role) => role.name === userData.division
				);
				await someGuy.roles.remove(divisionRole);
			}


			//delete data
			await Players.deleteOne({ playerID: args[0] });
			let reply = '**Player removed**\n\n';
			reply += `Player ID: ${userData.playerID}\nPlayer Name: ${userData.playerName}`;

			// Rerank division
			buildRanksHelper(userData.division);

			return message.channel.send(reply);
		} catch (err) {
			console.log(err);
			return message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};

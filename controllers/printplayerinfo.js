const Players = require('../models/Players');

module.exports = {
	name: 'printplayerinfo',
	description:
		"View a player's database record.",
	restriction: '',
	dm: false,
	args: 0,
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
            let player = userData;
            let reply = `**Player name**: ${player.playerName}`;
            reply += `\n**Player ID**: ${player.playerID}`;
            reply += `\n**Is human**: ${player.isHuman}`;
            reply += `\n**Division**: ${player.division}`;
            reply += `\n**Rank**: ${player.rank}`;
            reply += `\n**Starting bank**: ${player.startingBank}`;
            reply += `\n**Current bank**: ${player.bank}`;
            reply += `\n**Movement**: ${player.movement}`;
            reply += `\n**Has strike**: ${player.strike}`;
            reply += `\n**Primary bets remaining**: ${player.primaryBetsRemaining}`;
            reply += `\n**Active bets**: ${(player.activeBets.length > 0) ? '' : '*None*'}`;
            for (let bet of player.activeBets) {
                reply += `\n- ${bet}`
            }
            reply += `\n**Previous bets**: ${(player.previousBets.length > 0) ? '' : '*None*'}`;
            for (let prevBet of player.previousBets) {
                reply += `\n- ${prevBet}`
            }
            reply += `\n**Rankings history**: ${(player.rankingHistory.length > 1) ? '' : '*None*'}`;
            if (player.rankingHistory.length > 1) {
                for (let prevRank of player.rankingHistory) {
                    reply += `\n- ${prevRank}`
                }
            }

			return message.channel.send(reply);
		} catch (err) {
			console.log(err);
			return message.channel.send(
				`Database error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};
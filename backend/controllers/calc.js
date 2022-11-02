module.exports = {
	name: 'calc',
	description: 'A tool for calculating the total return on a bet',
	restriction: '',
	dm: false,
	args: 2,
	usage: '<bet_amount> <odds>',
	execute(message, args) {
		try {
			let [bet, odds] = args;
			if (bet.startsWith('$')) bet = bet.slice(1);
			if (!isNaN(bet) && !isNaN(odds)) {
				if (odds >= 100 || odds <= -100) {
					if (bet > 0) {
						bet = parseInt(bet);
						bet = bet.toFixed(0);
						let answer = 0;
						if (odds >= 100) {
							answer = bet * (odds / 100);
						} else {
							answer = 100 * (bet / (odds * -1));
						}
						answer += Number(bet);
						answer = answer.toFixed(0);
						return message.channel.send(`Total return: $${answer}`);
					} else {
						return message.channel.send(
							`You provided an invalid betting amount, ${message.author}! \nEnsure that your betting amount is a **positive number**`
						);
					}
				} else {
					return message.channel.send(
						`You provided an invalid betting odds, ${message.author}! \nBetting odds should be >= 100 OR <= -100`
					);
				}
			} else {
				return message.channel.send(
					`You didn't provide appropriate arguments, ${message.author}! Ensure that the bet and the odds are **numbers**`
				);
			}
		} catch (err) {
			console.log(err);
			return message.channel.send(
				`Controller error for !${this.name} command. Please contact an Admin.`
			);
		}
	},
};

import React from 'react';

function Rules() {
	return (
		<>
			<article className="articlePage">
				<h2>Rules</h2>
				<div className="articleDescription">
					<h3>Terminology</h3>
					<ul>
						<li>
							Round - The week(s) leading up to a fight card. The UFC typically
							has a fight card every weekend, so Rounds are usually 1 week long.
						</li>
						<li>
							Season - A season in Discord Fight League is one calendar month.
							There are typically 4 Rounds within a season.
						</li>
						<li>
							Divisions - There are 6 divisions in Discord Fight League: Bronze,
							Silver, Gold, Diamond, Masters, and Elite.
						</li>
						<li>
							Bank - Refers to the gross amount of money accrued by a player
							during a season.
						</li>
						<li>
							Movement - Refers to the player&lsquo;s current rank in relation
							to the player&lsquo;s rank in the previous Round.
						</li>
					</ul>
					<div className="listBreaker"></div>
					<h3>General Betting</h3>
					<ul>
						<li>
							Players are awarded a stipend of $1,250 at the start of every
							Round. This stipend will be issued within 24 hours of the end of a
							fight card.
						</li>
						<li>
							Money earned from previous Rounds within a season will roll over
							into the following Rounds of the season.
						</li>
						<li>
							At the start of each season, all banks are reset and the Player
							starts off with $1,250.
						</li>
						<li>
							Players cannot bet on both sides of a betting line (ie, fighter
							and opponent).
						</li>
						<li>There is no limit to the amount of bets a player can place.</li>
						<li>
							All betting will freeze within an hour of the start of the first
							fight on the fight card. An advanced warned will notify all
							players of an upcoming freeze.
						</li>
						<li>
							A Player&lsquo;s bets must total at least $1250 per round. Failure
							to bet at least $1,250 per Round will result in a Strike against
							the player.
						</li>
						<li>
							If a player bets on a fight that later becomes cancelled, the
							player should delete their bet and replace it with another bet. If
							the cancelled fight is not removed from the player's bets by the
							time the betting lines are frozen, a betting line will be chosen
							at random on the player's behalf for the amount they betted on the
							cancelled fight. All cancelled fights will be posted in the
							announcements channel.
						</li>
					</ul>
					<div className="listBreaker"></div>
					<h3>Primary Bets</h3>
					<ul>
						<li>
							A primary bet is any bet that the user makes that is $250 or
							greater.
						</li>
						<li>
							Players must make at least 3 bets that qualify as Primary Bets per
							Round. Failure to make 3 Primary Bets per Round will result in a
							Strike against the player.
						</li>
					</ul>
					<div className="listBreaker"></div>
					<h3>Divisions</h3>
					<ul>
						<li>
							A player's divisional promotion/demotion will be determined by the
							player's rank within their division at the end of the season. The
							top 33% of a division will advance to the next tier. The middle
							33% of a division will remain in the same tier for next season.
							The bottom 33% will derank to the tier below.
						</li>
						<li>
							On the rankings page there is a dashed white line and a dashed red
							line within each division. At the end of the season, any player
							who is ranked above the white line will be promoted to the next
							tier. Any player who is below the red line will be demoted. Any
							player in between the lines will remain in their current division.
						</li>
						<li>
							The Elite division is fixed at 10 players. At the end of the
							season the 3 lowest players will derank into the Masters division.
							The highest 3 players from the Masters division will be placed
							into the ELITE division.
						</li>
						<li>
							All new players joining the league will automatically be placed in
							the Bronze division.
						</li>
					</ul>
					<div className="listBreaker"></div>
					<h3>Strikes</h3>
					<ul>
						<li>
							Strikes are a mechanism to ensure that the league remains healthy
							and dynamic.
						</li>
						<li>
							A Strike is incurred when a player fails to meet gameplay criteria
							for a Round. That is, not making their 3 Primary Bets for a given
							Round and/or for not betting the $1250 total minimum requirement
							for a Round.
						</li>
						<li>Strikes are reset at the end of every season.</li>
						<li>
							A player that receives their <b>first Strike</b> for the season:
						</li>
						<ol className="subList">
							<li>
								All bets placed during the Round that the Strike was invoked
								will be voided. The money bet will be returned back to the
								player.
							</li>
							<li>
								The $1250 stipend from the Round where the Strike was received
								will be refunded back to the league (ie, $1250 will be deducted
								from the player's bank)
							</li>
						</ol>
						<li>
							A player that receives their <b>second Strike</b> within a season
							will be considered inactive and will be removed from the league.
						</li>
						<li>
							A player that is removed from League rankings due to Strikes may
							immediately join the league again. They will be treated as a new
							player and will start from the Bronze division.
						</li>
					</ul>
					<div className="listBreaker"></div>
					{/* //FUTURE BOT IMPLEMENTATION
          <h3>Bots</h3>
					<ul>
						<li>
							Rome wasn't built in a day. The league will initially be populated
							by bots. The bots will use varying rudimentary algorithms to
							select their bets. As more and more human players populate the
							league, the bots will be phased out. Bots can be identified on the
							Rankings page with a '(b)' at the end of their Discord Names.
						</li>
					</ul> */}
					<h3>Commands</h3>
					<ul>
						<li>
							To use commands, type in the command name followed by any
							parameters.
							<li>
								Example #1: <b>!bet $400 2</b>
							</li>
							<li>
								Example #2: <b>!bank</b>
							</li>
							<li>
								Example #3: <b>!printpreviousbets dmc_run</b>
							</li>
						</li>
					</ul>
					<table className="commandTable">
						<tr>
							<th>Command</th>
							<th>Parameters</th>
							<th>Description</th>
						</tr>
						<tr>
							<td>
								<b>!bank</b>
							</td>
							<td className="parameterNone">None</td>
							<td>
								<i>Displays the amount left in a player's bank</i>
							</td>
						</tr>
						<tr>
							<td>
								<b>!bet</b>
							</td>
							<td>(bet&nbsp;amount)&nbsp;(index&nbsp;number)</td>
							<td>
								<i>Adds a bet</i>
							</td>
						</tr>
						<tr>
							<td>
								<b>!calc</b>
							</td>
							<td>(bet amount) (odds)</td>
							<td>
								<i>A tool for calculating the total return on a bet</i>
							</td>
						</tr>
						<tr>
							<td>
								<b>!deleteallbets</b>
							</td>
							<td className="parameterNone">None</td>
							<td>
								<i>Deletes all current bets</i>
							</td>
						</tr>
						<tr>
							<td>
								<b>!deletebet</b>
							</td>
							<td>(index number)</td>
							<td>
								<i>Deletes a current bet</i>
							</td>
						</tr>
						<tr>
							<td>
								<b>!help</b>
							</td>
							<td className="parameterNone">None</td>
							<td>
								<i>Displays a detailed list of commands</i>
							</td>
						</tr>
						<tr>
							<td>
								<b>!inactive</b>
							</td>
							<td className="parameterNone">None</td>
							<td>
								<i>
									Sets your current status to inactive for the remainder of the
									season. WARNING: You will not be able to participate until the
									next season and will be deranked a division
								</i>
							</td>
						</tr>
						<tr>
							<td>
								<b>!newplayer</b>
							</td>
							<td className="parameterNone">None</td>
							<td>
								<i>Join the league as a new player</i>
							</td>
						</tr>
						<tr>
							<td>
								<b>!printbets</b>
							</td>
							<td className="parameterNone">None</td>
							<td>
								<i>Displays all active bets</i>
							</td>
						</tr>
						<tr>
							<td>
								<b>!printlines</b>
							</td>
							<td className="parameterNone">None</td>
							<td>
								<i>Displays all active betting lines</i>
							</td>
						</tr>
						<tr>
							<td>
								<b>!printpreviousbets</b>
							</td>
							<td>(player name)</td>
							<td>
								<i>
									View a player's bets from the previous event (case sensitive).
									Optionally: do not include a player name to view your own
									previous bets
								</i>
							</td>
						</tr>
						<tr>
							<td>
								<b>!strikestatus</b>
							</td>
							<td className="parameterNone">None</td>
							<td>
								<i>Checks if you have a strike for this season</i>
							</td>
						</tr>
						<tr>
							<td>
								<b>!website</b>
							</td>
							<td className="parameterNone">None</td>
							<td>
								<i>Displays the url to the DFL website</i>
							</td>
						</tr>
					</table>
				</div>
			</article>
		</>
	);
}

export default Rules;

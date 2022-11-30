import React from 'react';

function HowToPlay() {
	return (
		<article className="articlePage">
			<h2>How To Play</h2>
			<div className="articleDescription">
				<ol>
					<li className="mainList">
						Join our <a href="/discord">Discord Server</a>
					</li>
					<div className="listBreaker"></div>
					<li className="mainList">Type &lsquo;!newplayer&lsquo; in chat</li>
					<div className="subList">
						<img
							src="./img/newplayer.png"
							alt="Type !newplayer in Discord"
						></img>
					</div>
					<div className="listBreaker"></div>
					<li className="mainList">
						Our friendly bot, &lsquo;ribas&lsquo;, will then send you a direct
						message with a list of commands to use and a description of how to
						use them. Note: the &lsquo;!newplayer&lsquo; command is the only
						command allowed to be placed inside a chatroom. All other commands
						will need to be sent to ribas via direct message.
					</li>
					<div className="listBreaker"></div>
					<li className="mainList">
						To see the current betting lines, type &lsquo;!printlines&lsquo; in
						the direct message window with ribas.
					</li>
					<div className="subList">
						<img
							src="./img/printlines.png"
							alt="Type !printlines in Discord"
						></img>
						<br></br>
						<p>
							The betting lines are composed of three critical peices of data:
						</p>
						<div className="secondIndent">
							<img
								src="./img/bettinglinebreakdown.png"
								alt="Betting Line Explained"
							></img>
							<ol>
								<li className="innerList">
									The first segment (black underline) represents the index of
									the betting line. We use indexes to place bets because it is
									easier than trying to remember how to spell, for example,
									&lsquo;Joanna Jedrzejczyk&lsquo;.
								</li>
								<li className="innerList">
									The second segment (red underline) is the name of the fighter
									whom the index number represents.
								</li>
								<li className="innerList">
									<p>
										The third segment (white underline) is the betting odds for
										the fighter. Discord Fight League uses the{' '}
										<b>American odds format</b>. In American odds, a negative
										number represents a betting favorite while a positive number
										represents a betting underdog.
									</p>
									<p>
										In the above Valentina Shevchenko betting line, in order to
										win $100 the player will need to bet $370. For another
										example, in the above betting lines example, Uriah Faber is
										a betting underdog. If a player betted $100 on Uriah Faber,
										the player would win $175.
									</p>
								</li>
							</ol>
						</div>
					</div>
					<div className="listBreaker"></div>
					<li className="mainList">
						To place a bet, type &lsquo;!bet&lsquo; followed by the bet amount
						and the index number of the fighter you want to place a bet on
						(syntax: !bet &lt;amount&gt; &lt;index&gt; ).
					</li>
					<div className="subList">
						<p>For example:</p>
						<img src="./img/placebet.png" alt="Placing a bet"></img>
						<br></br>
						<p>This would place a $250 bet on Uriah Faber.</p>
					</div>
					<div className="listBreaker"></div>
					<li className="mainList">
						To get a list of commands and their descriptions, just type{' '}
						<b>&lsquo;!help&lsquo;</b> in the direct message with ribas.
					</li>
					<div className="listBreaker"></div>
					<li className="mainList">
						That is all you need to get started ranking up through the
						competitive ladder! For more information on how to compete in the
						Discord Fight League, please see our{' '}
						<b>
							<a href="/rules">Rules</a>
						</b>{' '}
						section.
					</li>
				</ol>
			</div>
		</article>
	);
}

export default HowToPlay;

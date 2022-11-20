import React from 'react';
import InactiveRow from './InactiveRow.js';

function InactiveTable({ players }) {
	return (
		<table className='inactiveTable'>
			<thead className="thead">
				<tr>
					<th>Discord Name</th>
					<th>Last Season Rank</th>
				</tr>
			</thead>
			<tbody>
				{players.map((player) => {
                    return (
                        <InactiveRow
                            player={player}
                            key={player._id}
                        />
                    );
				})}
			</tbody>
		</table>
	);
}
export default InactiveTable;

//test

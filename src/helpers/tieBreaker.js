import getPreviousRankScore from './getPreviousRankScore';

//Receives division array object
//Returns a score based on previous season's division + rank within division

function tieBreaker(divisionArray) {
	//iterate through array to find tie chunks
	let prevBank = null;
	let chunkStart = 0;
	let chunkEnd = 0;
	let chunkFound = false;
	let tempArray = [];
	let rankScoreArray = [];
	for (let i = 0; i < divisionArray.length; i++) {
		let curBank = divisionArray[i].bank;

		//found a chunk
		if (curBank === prevBank) {
			chunkStart = i - 1;
			chunkFound = true;
		}

		//end of chunk - mid array
		if (chunkFound && curBank !== prevBank) {
			chunkFound = false;
			chunkEnd = i; //actual is i - 1, using i for exclusive end for slice method
			//<code here>
			tempArray = divisionArray.slice(chunkStart, chunkEnd);
			for (player of tempArray) {
			}
		}

		//end of chunk -end of array
		if (chunkFound && i === divisionArray.length - 1) {
			chunkFound = false;
			//dont need chunk end for slice method
			tempArray = divisionArray.slice(chunkStart); //slices to the end of array
		}
		//Need to be last line of code
		prevBank = divisionArray[i].bank;
	}

	function chunkSorter() {}
	//record index where tie chunk starts and ends
	//place each element in a temp array based on PrevRankScore
	//load that temp array into divisionArray

	return divisionArray;
}

export default tieBreaker;

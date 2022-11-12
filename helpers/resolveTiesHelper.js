//Breaks ties by analyzing previous rankings
//is called by concludeweek and buildranks

const scorePreviousRankingHelper = require('./scorePreviousRankingHelper');

module.exports = (orderedArray) => {
	try {
		let tieStart = -1;
		let tieEnd = orderedArray.length;
		let tieActive = false;
		for (let i = 1; i < orderedArray.length; i++) {
			prevEl = orderedArray[i - 1];
			curEl = orderedArray[i];

			// No tie currently ongoing, initialize tie start
			if (prevEl.startingBank === curEl.startingBank && !tieActive) {
				tieStart = i - 1;
				tieActive = true;
			}

			// reached end of tie
			if (tieActive && prevEl.startingBank !== curEl.startingBank) {
				tieEnd = i - 1;
				tieActive = false;
				let subArr = orderedArray.slice(tieStart, tieEnd + 1); //+1 not inclusive

				let orderedSubArr = [];
				for (let el of subArr) {
					let low = 0;
					let high = orderedSubArr.length;

					while (low < high) {
						let mid = (low + high) >>> 1;
						if (
							scorePreviousRankingHelper(orderedSubArr[mid]) >
							scorePreviousRankingHelper(el)
						) {
							low = mid + 1;
						} else {
							high = mid;
						}
					}
					orderedSubArr.splice(low, 0, el);
				}

				// insert sorted subarray into main arr
				for (let orEl of orderedSubArr) {
					orderedArray[tieStart] = orEl;
					tieStart += 1;
				}
				// Reached the end, els are still matching, this is the end of the tie
			} else if (tieActive && i === orderedArray.length - 1) {
				tieEnd = i;
				tieActive = false;
				let subArr = orderedArray.slice(tieStart, tieEnd + 1); //+1 not inclusive

				let orderedSubArr = [];
				for (let el of subArr) {
					let low = 0;
					let high = orderedSubArr.length;

					while (low < high) {
						let mid = (low + high) >>> 1;
						if (
							scorePreviousRankingHelper(orderedSubArr[mid]) >
							scorePreviousRankingHelper(el)
						) {
							low = mid + 1;
						} else {
							high = mid;
						}
					}
					orderedSubArr.splice(low, 0, el);
				}

				// insert sorted subarray into main arr
				for (let orEl of orderedSubArr) {
					orderedArray[tieStart] = orEl;
					tieStart += 1;
				}
			}
		}
		return orderedArray;
	} catch {
		console.log('resolveTiesHelper Error');
	}
};

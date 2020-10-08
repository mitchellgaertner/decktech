var util = {};

util.init = () => {
	console.log("hello");
}

util.readJson = (file, callback) => {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = () => {
		if (rawFile.readyState === 4 && rawFile.status === "200"){
			callback(rawFile.responseText);
		}
	}
	rawFile.send(null);
};

util.updateTable = (state) => {
	let decks = state.decks;
	let table = document.querySelector(".deckTable")
	table.innerHTML = "";
	decks.forEach((item, index) => {
		util.addRow(table, item, index);
	})
}

util.addRow = (table, item, index) => {
	let row = table.insertRow(index);
	let num = row.insertCell(0);
	let name = row.insertCell(1);
	let cmd = row.insertCell(2);
	num.innerHTML = index+1;
	name.innerHTML = item.name;
	cmd.innerHTML = item.entries.commanders[0].card_digest.name;
}

util.process = (state) => {
	let decks = state.decks;
	let processed = {};
	processed.allCards = util.getAll(decks);
	processed.shared = util.getShared(decks, processed.allCards);
	return processed;
}

// function processDecks(decks) {
// 	let arr = [];
// 	decks.forEach((item) => {
// 		let cards = util.getCards(item);
// 		cards.forEach((card) => {

// 		};
// 	});
// }

util.getAll = (decks) => {
	let all = new Set();
	decks.forEach(deck => {
		util.getCards(deck).forEach(card => {
			all.add(card);
		})
	})
	return Array.from(all);
};

//Excludes Basics
util.getCards = (deck) => {
	let cards = [];
	deck.entries.nonlands.forEach(item => {
		if (!item?.card_digest?.type_line.includes("Basic")) cards.push(item?.card_digest?.name);
	});
	deck.entries.lands.forEach(item => {
		if (!item?.card_digest?.type_line.includes("Basic")) cards.push(item?.card_digest?.name);
	});
	return cards;
}

util.getShared = (decks, fullList) => {
	let sharedList = [];
	fullList.forEach(card => {
		let shared = true;
		for (let i = 0; i < decks.length; i++){
			let cards = util.getCards(decks[i]);
			if (!cards.includes(card)) shared = false;
		}
		if (shared){
			sharedList.push(card);
		}
	})
	return sharedList;
}
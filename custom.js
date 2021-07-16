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

var deckteck = {};

deckteck.process = (state) => {
	let decks = state.decks;
	let processed = {};
	processed.allCards = deckteck.getAll(decks);
	processed.shared = deckteck.getShared(decks, processed.allCards);
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

deckteck.getAll = (decks) => {
	let all = new Set();
	decks.forEach(deck => {
		deckteck.getCards(deck).forEach(card => {
			all.add(card);
		})
	})
	return Array.from(all);
};

//Excludes Basics
deckteck.getCards = (deck) => {
	let cards = [];
	deck.entries.nonlands.forEach(item => {
		if (!item?.card_digest?.type_line.includes("Basic")) cards.push(item?.card_digest);
	});
	deck.entries.lands.forEach(item => {
		if (!item?.card_digest?.type_line.includes("Basic")) cards.push(item?.card_digest);
	});
	return cards;
}

deckteck.getShared = (decks, fullList) => {
	let sharedList = [];
	fullList.forEach(card => {
		let shared = true;
		for (let i = 0; i < decks.length; i++){
			let cards = deckteck.getCards(decks[i]);
			if (!cards.includes(card)) shared = false;
		}
		if (shared){
			sharedList.push(card);
		}
	})
	return sharedList;
}

deckteck.getTypes = (card) => {
	let typeLine = card.card_digest.type_line;

	if (typeLine.includes("Creature")){
		return "Creature";
	}
	if (typeLine.includes("Land")){
		return "Land";
	}
	if (typeLine.includes("Enchantment")){
		return "Enchantment";
	}
	if (typeLine.includes("Artifact")){
		return "Artifact";
	}
	if (typeLine.includes("Instant")){
		return "Instant";
	}
	if (typeLine.includes("Sorcery")){
		return "Sorcery";
	}
}
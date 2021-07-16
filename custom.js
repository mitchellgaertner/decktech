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
	// deck.entries.nonlands.forEach(item => {
	// 	if (!item?.card_digest?.type_line.includes("Basic")) cards.push(item);
	// });
	// deck.entries.lands.forEach(item => {
	// 	if (!item?.card_digest?.type_line.includes("Basic")) cards.push(item);
	// });
	deck.entries.nonlands.forEach(item => { cards.push(item) });
	deck.entries.lands.forEach(item => { cards.push(item) });
	return cards;
}

deckteck.getShared = (decks, fullList) => {
	let sharedList = [];
	fullList.forEach(card => {
		let shared = true;
		for (let i = 0; i < decks.length; i++){
			let cards = deckteck.getCards(decks[i]);
			if (!deckteck.includesCard(cards, card)) shared = false;
		}
		if (shared && !deckteck.includesCard(sharedList, card)){
			sharedList.push(card);
		}
	})
	return sharedList;
}

deckteck.includesCard = (deck, card) => {
	let includes = false;
	deck.forEach(item => {
		if (item.card_digest.name == card.card_digest.name){
			includes = true;
		}
	})
	return includes;
}

deckteck.getTypes = (card) => {
	let typeLine = card.card_digest.type_line;

	if (typeLine.includes("Creature")){
		return "creatures";
	}
	if (typeLine.includes("Instant")){
		return "instants";
	}
	if (typeLine.includes("Sorcery")){
		return "sorceries";
	}
	if (typeLine.includes("Land")){
		return "lands";
	}
	if (typeLine.includes("Enchantment")){
		return "enchantments";
	}
	if (typeLine.includes("Artifact")){
		return "artifacts";
	}

}
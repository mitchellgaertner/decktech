var deckteck = {};

import { Deck, EDHDeck } from "../deck.js";

deckteck.processShared = (state) => {
	let decks = state.decks;
	let processed = {};
	processed.allCards = deckteck.getAll(decks);

	processed.shared = deckteck.getShared(decks, processed.allCards);
	return processed;
}

deckteck.processDiff = (state) => {
	let decks = state.decks;
	let processed = {};
	processed.allCards = deckteck.getAll(decks);
	processed.shared = deckteck.getDiff(decks, processed.allCards);
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

deckteck.getDiff = (decks, fullList) => {

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

	if (typeLine.includes("Land")){
		return "lands";
	}
	if (typeLine.includes("Planeswalkers")){
		return "planeswalkers"
	}
	if (typeLine.includes("Creature")){
		return "creatures";
	}
	if (typeLine.includes("Instant")){
		return "instants";
	}
	if (typeLine.includes("Sorcery")){
		return "sorceries";
	}
	if (typeLine.includes("Enchantment")){
		return "enchantments";
	}
	if (typeLine.includes("Artifact")){
		return "artifacts";
	}
}

deckteck.jsonToEDHDeck = (deckJson) => {
	let commanders = [...deckJson.entries.commanders];
	let lands = [...deckJson.entries.lands];
	let nonlands = [...deckJson.entries.nonlands];

	let creatures = [];
	let artifacts = [];
	let enchantments = [];
	let planeswalkers = [];
	let instants = [];
	let sorceries = [];
	
	nonlands.forEach(card => {
		let type = deckteck.getTypes(card);
		if (type === "creatures") {
			creatures.push(card);
		} else if (type === artifacts) {
			artifacts.push(card);
		} else if (type === enchantments) {
			enchantments.push(card);
		} else if (type === planeswalkers) {
			planeswalkers.push(card);
		} else if (type === instants) {
			instants.push(card);
		} else if (type === sorceries) {
			sorceries.push(card);
		}
	});

	return new EDHDeck(creatures, artifacts, enchantments, planeswalkers, instants, sorceries, lands, commanders);
}
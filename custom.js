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
	console.log(decks);
}
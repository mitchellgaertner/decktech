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
		let row = "<tr>" + "<td>" + (index+1) + "</td><td>" + item.name + "</td></tr>"; 
		table.innerHTML += row;
	})
}
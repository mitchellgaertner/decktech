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

util.loadTypes = (types) => {
	//Creatures
	types.creatures.forEach(item => {
		document.querySelector(".sharedCreatures").innerHTML +=  `<li>${item}</li>`;
	});
	document.querySelector(".sharedCreatures").innerHTML +=  `<li>Total: ${types.creatures.length}</li>`;

	//Planeswalkers
	types.planeswalkers.forEach(item => {
		document.querySelector(".sharedPW").innerHTML +=  `<li>${item}</li>`;
	});
	document.querySelector(".sharedPW").innerHTML +=  `<li>Total: ${types.planeswalkers.length}</li>`;

	//Instants
	types.instants.forEach(item => {
		document.querySelector(".sharedInstants").innerHTML +=  `<li>${item}</li>`;
	});
	document.querySelector(".sharedInstants").innerHTML +=  `<li>Total: ${types.instants.length}</li>`;

	//Sorceries
	types.sorceries.forEach(item => {
		document.querySelector(".sharedSorceries").innerHTML +=  `<li>${item}</li>`;
	});
	document.querySelector(".sharedSorceries").innerHTML +=  `<li>Total: ${types.sorceries.length}</li>`;

	//Artifacts
	types.artifacts.forEach(item => {
		document.querySelector(".sharedArtifacts").innerHTML +=  `<li>${item}</li>`;
	});
	document.querySelector(".sharedArtifacts").innerHTML +=  `<li>Total: ${types.artifacts.length}</li>`;

	//Enchantments
	types.enchantments.forEach(item => {
		document.querySelector(".sharedEnchantments").innerHTML +=  `<li>${item}</li>`;
	});
	document.querySelector(".sharedEnchantments").innerHTML +=  `<li>Total: ${types.enchantments.length}</li>`;

	//Land
	types.lands.forEach(item => {
		document.querySelector(".sharedLands").innerHTML +=  `<li>${item}</li>`;
	});
	document.querySelector(".sharedLands").innerHTML +=  `<li>Total: ${types.lands.length}</li>`;

	document.querySelector(".sharedTotal").innerHTML = types.creatures.length 
														+ types.enchantments.length 
														+ types.instants.length 
														+ types.artifacts.length 
														+ types.sorceries.length 
														+ types.lands.length
														+ types.planeswalkers.length;
}


var appInit = function () {
	var state = {
		decks : [],
		loading : false
	};

	function onChange(event) {
		var reader = new FileReader();
		reader.onload = onReaderLoad;
		reader.readAsText(event.target.files[0]);
	}

	function onReaderLoad(event){
		let obj = JSON.parse(event.target.result);
		state.decks.push(obj);
		util.updateTable(state);
	}

	function handleFileSelect(event){
		event.stopPropagation();
		event.preventDefault();
		var reader = new FileReader();
		reader.onload = onReaderLoad;
		reader.readAsText(event.dataTransfer.files[0]);
	}

	function handleDragOver(event){
		event.stopPropagation();
		event.preventDefault();
		event.dataTransfer.dropEffect = 'copy';
	}

	var dropZone = document.querySelector(".uploadBox");
	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('drop', handleFileSelect, false);

	document.querySelector(".deckUploader").addEventListener('change', onChange);
	document.querySelector(".deckProcess").addEventListener('click', () => {
		let processed = deckteck.processShared(state);

		document.querySelector('.sharedCreatures').innerHTML = '';
		document.querySelector('.sharedInstants').innerHTML = '';
		document.querySelector('.sharedLands').innerHTML = '';
		document.querySelector('.sharedSorceries').innerHTML = '';
		document.querySelector('.sharedArtifacts').innerHTML = '';
		document.querySelector('.sharedEnchantments').innerHTML = '';
		document.querySelector('.sharedPW').innerHTML = '';
		
		let types = {
			creatures : [], 
			lands : [], 
			artifacts : [], 
			enchantments : [], 
			planeswalkers : [], 
			instants : [], 
			sorceries : []
		};

		processed.shared.forEach((item) => {
			types[deckteck.getTypes(item)].push(item.card_digest.name);
		});

		util.loadTypes(types);
	});

	document.querySelector(".deckProcessDiff").addEventListener('click', () => {
		let processed = deckteck.processShared(state);

		document.querySelector('.sharedCreatures').innerHTML = '';
		document.querySelector('.sharedInstants').innerHTML = '';
		document.querySelector('.sharedLands').innerHTML = '';
		document.querySelector('.sharedSorceries').innerHTML = '';
		document.querySelector('.sharedArtifacts').innerHTML = '';
		document.querySelector('.sharedEnchantments').innerHTML = '';
		document.querySelector('.sharedPW').innerHTML = '';
		
		let types = {
			creatures : [], 
			lands : [], 
			artifacts : [], 
			enchantments : [], 
			planeswalkers : [], 
			instants : [], 
			sorceries : []
		};

		processed.shared.forEach((item) => {
			types[deckteck.getTypes(item)].push(item.card_digest.name);
		});

		util.loadTypes(types);
	})
};
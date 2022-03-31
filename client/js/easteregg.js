let log = "";

const konamiCode = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";
const zeldasLullaby = "ArrowLeftArrowUpArrowRightArrowLeftArrowUpArrowRight";
const eponasSong = "ArrowUpArrowLeftArrowRightArrowUpArrowLeftArrowRight";
const songOfStorms = "aArrowDownArrowUpaArrowDownArrowUp";
const conditions = {konamiCode: konamiCode, zeldasLullaby: zeldasLullaby, eponasSong: eponasSong, songOfStorms: songOfStorms};

let selectedCode = "";
document.addEventListener("keydown", logKey);

function logKey(e) {
	if (e.key == 'B' || e.key == 'A') {
		log += e.key.toLowerCase();;
	} else {
		log += e.key;
	}
	for (const code in conditions) {
		if (log == conditions[code]) {
				selectedCode = code;
				const itemget = new Audio('../itemget.mp3');
				itemget.play();
				setTimeout(redirect, 2200);
		}
	}
	resetLog(e.key);
	console.log(log)
}

function resetLog(key, code) {
	willReset = true;
	for (const code in conditions) {
		if (conditions[code].startsWith(log)) {
			willReset = false;
		}
	}
	if (willReset) {
		log = "";
		log += key;
	}
}

function redirect() {
	switch (selectedCode) {
		case 'konamiCode':
			window.location.href = "https://www.youtube.com/watch?v=MkSYX0N07CQ";
			break;
		case 'eponasSong':
			window.location.href = "https://www.youtube.com/watch?v=0m9QUoW5KnY";
			break;
		case 'songOfStorms':
			window.location.href = "https://www.youtube.com/watch?v=h2Lw9Zs98Gg";
			break;
		case 'zeldasLullaby':
			window.location.href = "https://youtu.be/keAE9GXYB0w?t=7";
			break;
	}
}
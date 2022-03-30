let log = "";
const code = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightbaEnter"
document.addEventListener("keydown", logKey);

function logKey(e) {
	if (e.key == 'B' || e.key == 'A') {
		log += e.key.toLowerCase();;
	} else {
		log += e.key;
	}
	if (log == code) {
		var itemget = new Audio('../itemget.mp3');
		itemget.play();
		setTimeout(redirect, 2200);
	} 
	resetLog(e.key);
	console.log(log)
}

function resetLog(key) {
	if (!code.startsWith(log)) {
		log = "";
		if (key == 'ArrowUp') {
			log += key;
		}
	}
}

function redirect() {
	window.location.href = "https://www.youtube.com/watch?v=0m9QUoW5KnY";
}
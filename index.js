let c = document.getElementById("window");
let ctx = c.getContext("2d");

let w = c.width;
let h = c.height;
let textColor = "#ffffff";

let fontSize = 48;
let fontWidth = Math.floor(0.80 * fontSize);
let fontHeight = Math.floor(1.20 * fontSize);

let spiel = `I'm a senior studying Computer Science
and Applied Engineering Sciences at
Michigan State University. This is my
personal website- look around to get
to know me better!`;
let passions =`programming            hiking            
education              supply-chain      //
understanding          retro-gaming      //
classic-rock           detroit-lions     //
problem-solving        nature            //
continuous-improvement`;

function flashCursor(x, y, color, count) {
	if (count != "inf") {
		count--;
		if (count < 0) {
			return;
		}
	}
	
	ctx.fillStyle = color;
	ctx.fillRect(x, y - fontSize, fontWidth, fontSize);
	
	if (color == "#000000") {
		setTimeout(flashCursor, 500, x, y, textColor, count);
	} else {
		setTimeout(flashCursor, 500, x, y, "#000000", count);
	}
}

function typeOut(str, x, y, tm) {
	if (str != "") {
		ctx.fillStyle = textColor;
		ctx.fillText(String(str[0]), x, y);
		return setTimeout(typeOut, tm, str.slice(1), x + fontWidth, y, tm);
	}
	return true;
}

function typeParagraph(str, x, y, t) {
	let strings = str.split("\n");
	let waitTime = 0;
	for (let i = 0; i < strings.length; i++) {
		setTimeout(typeOut, waitTime, strings[i], x, y + i * fontHeight, t);
		waitTime += t * (strings[i].length + 3);
	}
	
}

function animateCanvas() {
	ctx.fillRect(0, 0, w, h);

	ctx.font = `${fontSize}pt Courier`;

	//flashCursor(2 + fontWidth, 4, "#000000", 9);
	typeOut(">whoami", 2, fontHeight + 2, 50);
	setTimeout(flashCursor, 350, fontWidth * 7 + 2, fontHeight + 2, "#000000", 5);
	setTimeout(typeParagraph, 2350, spiel, fontWidth, 2 * fontHeight + 2, 20);
	setTimeout(typeOut, 2550 + 20 * spiel.length, ">", 2, 2 + 7 * fontHeight, 0);
	//setTimeout(flashCursor, 7050 + 20 * spiel.length, fontWidth + 2, 2 + 7 * fontHeight, "#000000", 7);
	setTimeout(typeOut, 2750 + 20 * spiel.length, "ls passions", fontWidth + 2, 2 + 7 * fontHeight, 50);
	setTimeout(flashCursor, 3300 + 20 * spiel.length, fontWidth * 12 + 2, 2 + 7 * fontHeight, "#000000", 5);
	setTimeout(typeParagraph, 5800 + 20 * spiel.length, passions, fontWidth, 8 * fontHeight + 2, 20);
	setTimeout(typeOut, 6000 + 20 * spiel.length + 20 * passions.length, ">", 2, 2 + 14 * fontHeight, 0);
	setTimeout(flashCursor, 6000 + 20 * spiel.length + 20 * passions.length, fontWidth + 2, 2 + 14 * fontHeight, "#000000", "inf");
}

function hideAllCards() {
	let cards = document.querySelectorAll(".course-card");
	for (var i = 0; i < cards.length; i++) {
		cards[i].style.display = "none";
	}
	
	let buttons = document.querySelectorAll(".semester");
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].style.backgroundColor = "";
	}
}

document.getElementById("fs20").onclick = function() {
	document.getElementById("semester-info").innerHTML = "My first semester!";
	hideAllCards();
	document.getElementById("fs20").style.backgroundColor = "#e8c587";
	document.getElementById("cse232").style.display = "block";
	document.getElementById("cse260").style.display = "block";
	document.getElementById("acc230").style.display = "block";
	document.getElementById("mth234").style.display = "block";
}

document.getElementById("ss21").onclick = function() {
	document.getElementById("semester-info").innerHTML = "My second semester!";
	hideAllCards();
	document.getElementById("ss21").style.backgroundColor = "#e8c587";
	document.getElementById("cse320").style.display = "block";
	document.getElementById("cse331").style.display = "block";
	document.getElementById("ec201").style.display = "block";
	document.getElementById("egr100").style.display = "block";
}

document.getElementById("fs21").onclick = function() {
	document.getElementById("semester-info").innerHTML = "My third semester!";
	hideAllCards();
	document.getElementById("fs21").style.backgroundColor = "#e8c587";
	document.getElementById("cse300").style.display = "block";
	document.getElementById("cse335").style.display = "block";
	document.getElementById("cse460").style.display = "block";
	document.getElementById("mth314").style.display = "block";
	document.getElementById("stt351").style.display = "block";
}

document.getElementById("ss22").onclick = function() {
	document.getElementById("semester-info").innerHTML = "My fourth semester!";
	hideAllCards();
	document.getElementById("ss22").style.backgroundColor = "#e8c587";
	document.getElementById("cse325").style.display = "block";
	document.getElementById("ec202").style.display = "block";
	document.getElementById("fi320").style.display = "block";
	document.getElementById("mth235").style.display = "block";
}

document.getElementById("fs22").onclick = function() {
	document.getElementById("semester-info").innerHTML = "My fifth semester!";
	hideAllCards();
	document.getElementById("fs22").style.backgroundColor = "#e8c587";
	document.getElementById("cse402").style.display = "block";
	document.getElementById("cse422").style.display = "block";
	document.getElementById("mkt317").style.display = "block";
	document.getElementById("scm371").style.display = "block";
	document.getElementById("ce221").style.display = "block";
	document.getElementById("me280").style.display = "block";
}

document.getElementById("ss23").onclick = function() {
	document.getElementById("semester-info").innerHTML = "My sixth semester!";
	hideAllCards();
	document.getElementById("ss23").style.backgroundColor = "#e8c587";
	document.getElementById("cse415").style.display = "block";
	document.getElementById("cse425").style.display = "block";
	document.getElementById("scm372").style.display = "block";
	document.getElementById("aesc210").style.display = "block";
	document.getElementById("mse250").style.display = "block";
}

/*
document.getElementById("favs").onclick = function() {
	document.getElementById("semester-info").innerHTML = "These are my favorite classes I've taken, for one reason or another.";
	hideAllCards();
	document.getElementById("favs").style.backgroundColor = "#e8c587";
	document.getElementById("cse320").style.display = "block";
	document.getElementById("cse402").style.display = "block";
	document.getElementById("mkt317").style.display = "block";
	document.getElementById("scm372").style.display = "block";
	document.getElementById("ce221").style.display = "block";
}
*/
animateCanvas();

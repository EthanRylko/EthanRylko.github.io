let c = document.getElementById("window");
let ctx = c.getContext("2d");

let w = c.width;
let h = c.height;
let textColor = "#ffffff";

let fontSize = 48;
let fontWidth = Math.floor(0.80 * fontSize);

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

console.log(`width ${w} height ${h}`);

function flashCursor(x, y, color, count) {
	if (count != "inf") {
		count--;
		if (count < 0) {
			return;
		}
	}
	
	ctx.fillStyle = color;
	ctx.fillRect(x, y, fontWidth, fontSize);
	
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
		setTimeout(typeOut, waitTime, strings[i], x, y + i * fontSize, t);
		waitTime += t * (strings[i].length + 3);
	}
	
}

ctx.fillRect(0, 0, w, h);

ctx.font = `${fontSize}pt Courier`;
ctx.fillStyle = textColor;
ctx.fillText(">", 2, fontSize + 2);

flashCursor(2 + fontWidth, 4, "#000000", 9);
setTimeout(typeOut, 4500, "whoami", fontWidth + 2, fontSize + 2, 50);
setTimeout(flashCursor, 4850, fontWidth * 7 + 2, 4, "#000000", 5);
setTimeout(typeParagraph, 6850, spiel, fontWidth, 2 * fontSize + 2, 20);
setTimeout(typeOut, 7050 + 20 * spiel.length, ">", 2, 2 + 7 * fontSize, 0);
setTimeout(flashCursor, 7050 + 20 * spiel.length, fontWidth + 2, 4 + 6 * fontSize, "#000000", 7);
setTimeout(typeOut, 10550 + 20 * spiel.length, "ls passions", fontWidth + 2, 2 + 7 * fontSize, 50);
setTimeout(flashCursor, 11150 + 20 * spiel.length, fontWidth * 12 + 2, 4 + 6 * fontSize, "#000000", 5);
setTimeout(typeParagraph, 13650 + 20 * spiel.length, passions, fontWidth, 8 * fontSize + 2, 20);
setTimeout(typeOut, 13850 + 20 * spiel.length + 20 * passions.length, ">", 2, 2 + 14 * fontSize, 0);
setTimeout(flashCursor, 13850 + 20 * spiel.length + 20 * passions.length, fontWidth + 2, 4 + 13 * fontSize, "#000000", "inf");





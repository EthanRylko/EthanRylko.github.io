class Card {
	constructor(val, suit) {
		this.val = val;
		this.suit = suit;
	}
}

class Button {
	constructor(x, y, w, h, en, txt) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.enabled = en;
		this.txt = txt;
		this.hover = false;
	}
}

function reshuffle() {
	// init deck
	let deck = [];
	const vals = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
	const suits = ['Spades', 'Clubs', 'Hearts', 'Diamonds'];
	
	for (let i = 0; i < 52; i++) {
		const card = new Card(vals[Math.floor(i / 4)], suits[i % 4]);
		deck.push(card);
	}

	// shuffle
	for (let i = 0; i < 52; i++) {
		let j = Math.floor(Math.random() * 52);
		let temp = deck[i];
		deck[i] = deck[j];
		deck[j] = temp;
	}
	
	return deck;
}

function readCard(card) {
	let val = card.val;
	if (val == 'A') {
		val = "Ace";
	} else if (val == 'J') {
		val = "Jack";
	} else if (val == 'Q') {
		val = "Queen";
	} else if (val == 'K') {
		val = "King";
	}
	return `${val} of ${card.suit}`;
}

function cardSum(cards) {
	let sum = 0;
	let aces = 0;
	for (let card of cards) {
		if (typeof card.val == "number") {
			sum += card.val;
		} else {
			if (card.val != 'A') {
				sum += 10;
			} else {
				aces++;
			}
		}
	}
	sum += 11 * aces;
	for (let i = 0; i < aces; i++) {
		if (sum > 21) {
			sum -= 10;
		}
	}
	return sum;
}

function drawFunction() {
	if (balance >= bet) {
		balance -= bet;
	} else {
		return;
	}
	
	gameMsg = "";
	revealDealerCard = false;
	deck = reshuffle();
	
	playerHand = [];
	dealerHand = [];
	
	playerHand.push(deck.pop());
	playerHand.push(deck.pop());
	dealerHand.push(deck.pop());
	dealerHand.push(deck.pop());
	
	playerTotal = cardSum(playerHand);
	dealerTotal = cardSum(dealerHand.slice(0, 1));
	
	draw.enabled = false;
	raise.enabled = false;
	hit.enabled = true;
	stand.enabled = true;
	
	if (cardSum(playerHand) == 21) {
		dealerTotal = cardSum(dealerHand);
		revealDealerCard = true;
		gameMsg = `Blackjack! You win ${bet * 2.5}`;
		
		if (dealerTotal == 21) {
			balance += bet;
		} else {
			balance += bet * 2.5;
		}
		
		draw.enabled = true;
		raise.enabled = true;
		hit.enabled = false;
		stand.enabled = false;
	}
}

function hitFunction() {
	let card = deck.pop();
	playerHand.push(card);

	playerTotal = cardSum(playerHand);

	if (playerTotal > 21) {		
		dealerTotal = cardSum(dealerHand);
		revealDealerCard = true;
		gameMsg = "Bust!"
		
		draw.enabled = true;
		raise.enabled = true;
		hit.enabled = false;
		stand.enabled = false;
	}
}

function standFunction() {
	dealerTotal = cardSum(dealerHand);
	revealDealerCard = true;
	
	while (dealerTotal < 17) {
		let card = deck.pop();
		dealerHand.push(card);
		dealerTotal = cardSum(dealerHand);
	}
	
	if (dealerTotal > 21) {
		// Dealer bust, player win
		gameMsg = `You win ${bet * 2}!`;
		balance += bet * 2;
	} else if (playerTotal > dealerTotal) {
		// Player win by higher total
		gameMsg = `You win ${bet * 2}!`;
		balance += bet * 2;
	} else if (playerTotal == dealerTotal) {
		// Draw
		gameMsg = "Draw";
		balance += bet;
	} else {
		// Loss
		gameMsg = "You lose...";
	}
	
	draw.enabled = true;
	raise.enabled = true;
	hit.enabled = false;
	stand.enabled = false;
}

function drawHiddenCard(x, y) {
	// card rectangle
	ctx.fillStyle = "red";
	ctx.strokeStyle = "black";
	ctx.lineWidth = 4;
	ctx.fillRect(x, y, 125, 175);
	ctx.strokeRect(x, y, 125, 175);
	
	ctx.fillStyle = "red";
	ctx.strokeStyle = "white";
	ctx.lineWidth = 4;
	ctx.fillRect(x + 10, y + 10, 105, 155);
	ctx.strokeRect(x + 10, y + 10, 105, 155);
}

function drawCard(card, x, y) {
	// card rectangle
	ctx.fillStyle = 'white';
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 4;
	ctx.fillRect(x, y, 125, 175);
	ctx.strokeRect(x, y, 125, 175);
	
	// name/number
	let color = (card.suit == "Spades" || card.suit == "Clubs") ? "black" : "red";
	ctx.font = `30pt Consolas`;
	ctx.fillStyle = color;
	ctx.fillText(card.val, x + 4, y + 36);
	
	// suit
	let suit = "\u2660";
	if (card.suit == "Hearts") {
		suit = "\u2665";
	} else if (card.suit == "Diamonds") {
		suit = "\u2666";
	} else if (card.suit == "Spades") {
		suit = "\u2663";
	}
	
	ctx.fillText(suit, x + 4, y + 72);
}

function drawButton(btn) {
	if (!btn.enabled) return;
	
	ctx.fillStyle = "#c0b020";
    ctx.fillRect(btn.x, btn.y, btn.w, btn.h);
	ctx.fillStyle = (btn.hover) ? "red" : "white";
	ctx.textAlign = "center"; 
	ctx.textBaseline = "middle";
	ctx.font = `${fontSize}pt Georgia`;
	ctx.fillText(btn.txt, btn.x + btn.w / 2, btn.y + btn.h / 2);
}

function drawScreen() {
	ctx.fillStyle = "#206030";
	ctx.fillRect(0, 0, c.width, c.height);
	
	// Game font
	ctx.fillStyle = "#c0b020";
	ctx.font = `${fontSize}pt Georgia`;
	ctx.textAlign = "right"; 
	ctx.textBaseline = "alphabetic";
	ctx.fillText(gameMsg, 1550, fontHeight);
	
	ctx.textAlign = "left"; 
	ctx.textBaseline = "alphabetic";
	ctx.fillText(`Balance: ${balance}`, 0, fontHeight);
	ctx.fillText(`Bet: ${bet}`, 0, fontHeight * 2);
	
	ctx.fillText(`Dealer: ${dealerTotal}`, 50, fontHeight * 5);
	ctx.fillText(`You: ${playerTotal}`, 50, fontHeight * 5 + 300);
	
	// cards
	for (let i = 0; i < dealerHand.length; i++) {
		if (i + 1 == dealerHand.length && !revealDealerCard) {
			drawHiddenCard(500 + 50 * i, 300);
		} else {
			drawCard(dealerHand[i], 500 + 50 * i, 300);
		}
	}
	
	for (let i = 0; i < playerHand.length; i++) {
		drawCard(playerHand[i], 500 + 50 * i, 500);
	}
	
	// buttons
	drawButton(draw);
	drawButton(raise);
	drawButton(hit);
	drawButton(stand);
}

let c = document.getElementById("window");
let ctx = c.getContext("2d");

let fontSize = 60;
let fontHeight = fontSize * 1.2;

let draw = new Button(25, 775, 250, 100, true, "Draw");
let raise = new Button(300, 775, 250, 100, true, "Raise");
let hit = new Button(1050, 775, 250, 100, false, "Hit");
let stand = new Button(1325, 775, 250, 100, false, "Stand");

let balance = 1000;
let bet = 50;
let gameMsg = "";

let playerHand = [];
let dealerHand = [];
let playerTotal = 0;
let dealerTotal = 0;
let revealDealerCard = false;

drawScreen();

c.addEventListener("mousemove", function(event) {
    const rect = c.getBoundingClientRect();
	const xScale = c.width / rect.width;
	const yScale = c.height / rect.height;
	
    const mouseX = (event.clientX - rect.left) * xScale;
    const mouseY = (event.clientY - rect.top) * yScale;
    
    draw.hover = 	mouseX >= draw.x &&
                    mouseX <= draw.x + draw.w &&
                    mouseY >= draw.y &&
                    mouseY <= draw.y + draw.h;
					
	raise.hover = 	mouseX >= raise.x &&
                    mouseX <= raise.x + raise.w &&
                    mouseY >= raise.y &&
                    mouseY <= raise.y + raise.h;
	hit.hover = 	mouseX >= hit.x &&
                    mouseX <= hit.x + hit.w &&
                    mouseY >= hit.y &&
                    mouseY <= hit.y + hit.h;
					
	stand.hover = 	mouseX >= stand.x &&
                    mouseX <= stand.x + stand.w &&
                    mouseY >= stand.y &&
                    mouseY <= stand.y + stand.h;
	
    drawScreen();
});

c.addEventListener("click", function(event) {
	// TODO: Add insurance, splitting, double down
	// basically a lot of extra rules
	// maybe animation and a cleaner look
    if (draw.hover && draw.enabled) {
		drawFunction();
    } else if (raise.hover && raise.enabled) {
        if (bet < balance) {
			bet += 10;
		}
    } else if (hit.hover && hit.enabled) {
        hitFunction();
    }else if (stand.hover && stand.enabled) {
        standFunction();
    }
	drawScreen();
});

// hack to prevent clicking on canvas from selecting outside text
c.onselectstart = function () { return false; }
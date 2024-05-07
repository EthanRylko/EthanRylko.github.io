let c = document.getElementById("window");
let ctx = c.getContext("2d");

let w = c.width;
let h = c.height;
let textColor = "#ffffff";

let fontSize = 48;
let fontWidth = Math.floor(0.80 * fontSize);
let fontHeight = Math.floor(1.20 * fontSize);

let lastFrameTime = 0;
let frameRate = 30;
let frameInterval = 1000 / frameRate;
let frame = 0;

let spiel = `I'm a graduate of Michigan State
University with degrees in Computer 
Science and Applied Engineering Sciences. 
This is my personal website- look around 
to get to know me better!`;
let passions =`programming            hiking            
education              supply-chain      //
animation              retro-gaming      //
classic-rock           detroit-lions     //
problem-solving        nature            //
continuous-improvement`;
let fs20spiel = `My first semester of college! The optimistic outlook of a\ 
new beginning from the viewpoint of a fresh Computer Science student\ 
was bittered by the pandemic, as us students were made to\ 
take remote classes. I was alone in my room while all my hometown friends\ 
were off at some other university, so it was a difficult start. Despite\ 
this, I had a successful semester academically, adjusting to both the\ 
rigor of college and the new paradigm of remote learning.`;
let ss21spiel = `In my second semester, the difficulty ramped up.\ 
Having been formally admitted to the College of Engineering as a\ 
Computer Science student, classes required a deeper, more specific level of\ 
knowledge. Classes were still entirely remote, but I was able to make\ 
many new friends and connections in spite of it.`;
let fs21spiel = `My third semester, and my first on campus! After a year\ 
of remote learning, I was eager to actually make the transition to college.\ 
Doing so was tough, especially with this courseload; several\ 
conceptually diffcult classes plus the intensive software design couse left\ 
me with little spare time.`;
let ss22spiel = `Before my fourth semester, I had considered the Applied\ 
Engineering Sciences program to place greater emphasis on my business\ 
education. In this semester, I put the plan into action, finishing the\ 
necessary prerequisites to gain admission to the major while keeping\ 
pace with my Computer Science program. This was also the first semester\ 
that I was a TA for a course. I worked for the architecture course I took\ 
the prior year. Being a TA is something I enjoyed and continue to enjoy.`;
let fs22spiel = `I had just been admitted to the Applied Engineering Sciences\ 
program, and over the summer I completed two business courses and an\ 
internship. This semester was a balancing act between upper-level Computer\ 
Science technical electives, business courses supporting my new Supply Chain\ 
Management concentration, traditional engineering courses, and my new job as\ 
a TA for the computability theory course.`;
let ss23spiel = `Similar to the previous semester, this was a busy semester.\ 
Keeping up with multiple branches of knowledge posed a challenge, but it was\ 
very enjoyable. I particularly liked the operations management and parallel\ 
progrmaming courses, as difficult and demanding as the projects were. I also\ 
returned as a TA to the architecture course.`;
let fs23spiel = `The penultimate semester put my time management skills to\ 
the test with several semester-long group projects, including the intensive\ 
computer science capstone, for which my team designed the online multiplayer\ 
feature for an open-source video game. I also returned as a TA for the\ 
computability theory course.`;
let ss24spiel = `The long-overdue final semester, and a challenging one at that.\ 
Along with polishing off some of the last requirements for my program, I took the\ 
capstone course for the Applied Engineering Sciences program for which I designed\ 
a web application to manage automated database entries. Additionally, the graduate\ 
course I took for a deeper understanding of distributed systems was quite\ 
challenging. I also returned as a TA for the architecture course. It was a\ 
bittersweet goodbye to the school that gave me so much to be thankful for.`;

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
	document.getElementById("semester-info").innerHTML = fs20spiel;
	hideAllCards();
	document.getElementById("fs20").style.backgroundColor = "var(--highlight-color)";
	document.getElementById("cse232").style.display = "block";
	document.getElementById("cse260").style.display = "block";
	document.getElementById("acc230").style.display = "block";
	document.getElementById("mth234").style.display = "block";
}

document.getElementById("ss21").onclick = function() {
	document.getElementById("semester-info").innerHTML = ss21spiel;
	hideAllCards();
	document.getElementById("ss21").style.backgroundColor = "var(--highlight-color)";
	document.getElementById("cse320").style.display = "block";
	document.getElementById("cse331").style.display = "block";
	document.getElementById("ec201").style.display = "block";
	document.getElementById("egr100").style.display = "block";
}

document.getElementById("fs21").onclick = function() {
	document.getElementById("semester-info").innerHTML = fs21spiel;
	hideAllCards();
	document.getElementById("fs21").style.backgroundColor = "var(--highlight-color)";
	document.getElementById("cse300").style.display = "block";
	document.getElementById("cse335").style.display = "block";
	document.getElementById("cse460").style.display = "block";
	document.getElementById("mth314").style.display = "block";
	document.getElementById("stt351").style.display = "block";
}

document.getElementById("ss22").onclick = function() {
	document.getElementById("semester-info").innerHTML = ss22spiel;
	hideAllCards();
	document.getElementById("ss22").style.backgroundColor = "var(--highlight-color)";
	document.getElementById("cse325").style.display = "block";
	document.getElementById("ec202").style.display = "block";
	document.getElementById("fi320").style.display = "block";
	document.getElementById("mth235").style.display = "block";
}

document.getElementById("fs22").onclick = function() {
	document.getElementById("semester-info").innerHTML = fs22spiel;
	hideAllCards();
	document.getElementById("fs22").style.backgroundColor = "var(--highlight-color)";
	document.getElementById("cse402").style.display = "block";
	document.getElementById("cse422").style.display = "block";
	document.getElementById("mkt317").style.display = "block";
	document.getElementById("scm371").style.display = "block";
	document.getElementById("ce221").style.display = "block";
	document.getElementById("me280").style.display = "block";
}

document.getElementById("ss23").onclick = function() {
	document.getElementById("semester-info").innerHTML = ss23spiel;
	hideAllCards();
	document.getElementById("ss23").style.backgroundColor = "var(--highlight-color)";
	document.getElementById("cse415").style.display = "block";
	document.getElementById("cse425").style.display = "block";
	document.getElementById("scm372").style.display = "block";
	document.getElementById("aesc210").style.display = "block";
	document.getElementById("mse250").style.display = "block";
}

document.getElementById("fs23").onclick = function() {
	document.getElementById("semester-info").innerHTML = fs23spiel;
	hideAllCards();
	document.getElementById("fs23").style.backgroundColor = "var(--highlight-color)";
	document.getElementById("cse491").style.display = "block";
	document.getElementById("gbl323").style.display = "block";
	document.getElementById("me201").style.display = "block";
	document.getElementById("aesc310").style.display = "block";
	document.getElementById("ce371").style.display = "block";
}

document.getElementById("ss24").onclick = function() {
	document.getElementById("semester-info").innerHTML = ss24spiel;
	hideAllCards();
	document.getElementById("ss24").style.backgroundColor = "var(--highlight-color)";
	document.getElementById("aesc410").style.display = "block";
	document.getElementById("cse812").style.display = "block";
	document.getElementById("ece345").style.display = "block";
	document.getElementById("mgt325").style.display = "block";
}

/*
document.getElementById("favs").onclick = function() {
	document.getElementById("semester-info").innerHTML = "These are my favorite classes I've taken, for one reason or another.";
	hideAllCards();
	document.getElementById("favs").style.backgroundColor = "var(--highlight-color)";
	document.getElementById("cse320").style.display = "block";
	document.getElementById("cse402").style.display = "block";
	document.getElementById("mkt317").style.display = "block";
	document.getElementById("scm372").style.display = "block";
	document.getElementById("ce221").style.display = "block";
}
*/

animateCanvas();
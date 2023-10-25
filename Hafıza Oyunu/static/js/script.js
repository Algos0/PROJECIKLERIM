// Kart Destesi Görüntüleri Dizisi
const deckCards = ["img1.png", "img1.png", "img2.png", "img2.png", "img3.png", "img3.png", "img4.png", "img4.png", "img5.png", "img5.png", "img6.png", "img6.png", "img7.png", "img7.png", "img8.png", "img8.png"];

// Genel Diziler
// Access the <ul> with class of .deck
const deck = document.querySelector(".deck");
// Create an empty array to store the opened cards
let opened = [];
// Create an empty array to store the matched cards
let matched = [];

// Access the modal
const modal = document.getElementById("modal");

// Access the reset button
const reset = document.querySelector(".reset-btn");
// Access the play button
const playbtn = document.querySelector(".play-btn");
// Access the play again button
const playAgain = document.querySelector(".play-again-btn");

const stopBtn = document.createElement("button");
stopBtn.textContent = 'Durdur!';

stopBtn.classList.add("btn" ,"stop-btn");
//document.stopBtn.appendChild(stopBtn);
document.getElementsByClassName("reset")[0].appendChild(stopBtn);
// Select the class moves-counter and change it's HTML  
const movesCount = document.querySelector(".moves-counter");
// Create variable for moves counter, start the count at zero
let moves = 0;

// Access the <ul> element for the star rating section and then the <li> elements within it
const star = document.getElementById("star-rating").querySelectorAll(".star");
// Variable to keep track of how many stars are left
let starCount = 3;

// Get the span tag for the timer.
const timeCounter = document.querySelector(".timer");
// To use this variable to stop the time started in timer
let time;
// Create variables for time count, start all at zero
let minutes = 0;
let seconds = 0;
// For use in the click card event listener
let timeStart = false;
let pressedPlaynBtn = false;


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }
  return array;
}

/*
Start Game: Shuffle the deck, create <li> tags and <img> 
tags and append to the deck <ul> with the new shuffled content
*/
function startGame() {
	// Invoke shuffle function and store in variable
	const shuffledDeck = shuffle(deckCards); 
	// Iterate over deck of cards array
	for (let i = 0; i < shuffledDeck.length; i++) {
		// Create the <li> tags
		const liTag = document.createElement('LI');
		// Give <li> class of card
		liTag.classList.add('card');
		// Create the <img> tags
		const addImage = document.createElement("IMG");
		// Append <img> to <li>
		liTag.appendChild(addImage);
		// Set the img src path with the shuffled deck
		addImage.setAttribute("src", "static/img/" + shuffledDeck[i] + "?raw=true");
		// Add an alt tag to the image
		addImage.setAttribute("alt", "image of vault boy from fallout");
		// Update the new <li> to the deck <ul>
		deck.appendChild(liTag);
	}
}

startGame();

/*
Remove all child nodes from the deck <li> tags and
<img> tags.  To be called in set everything function only
*/
function removeCard() {
	// As long as <ul> deck has a child node, remove it
	while (deck.hasChildNodes()) {
		deck.removeChild(deck.firstChild);
	}
}

/*
Update the timer in the HTML for minutes and seconds
This timer() function is invoked in the event listener
on the first card click
Used: https://www.w3schools.com/js/js_timing.asp
*/
function timer() {
	// Update the count every 1 second
	time = setInterval(function() {
		seconds++;
			if (seconds === 60) {
				minutes++;
				seconds = 0;
			}
		// Update the timer in HTML with the time it takes the user to play the game
		timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Süre: " + minutes + " Dakika " + seconds + " Saniye " ;
	}, 1000);
}

/*
Stop the timer once the user has matched
all 16 cards, total of 8 pairs
Used: https://www.w3schools.com/js/js_timing.asp
*/
function stopTime() {
	clearInterval(time);
}

/*
Reset all global variables and the content of HTML elements
timer, stars, moves, and the moves and timer inner HTML
*/
function resetEverything() {
	// Stop time, reset the minutes and seconds update the time inner HTML
	stopTime();
	timeStart = false;
	seconds = 0;
	minutes = 0;
	timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Süre: 00:00";
	// Reset star count and the add the class back to show stars again
	star[1].firstElementChild.classList.add("fa-star");
	star[2].firstElementChild.classList.add("fa-star");
	starCount = 3;
	// Reset moves count and reset its inner HTML
	moves = 0;
	movesCount.innerHTML = 0;
	// Clear both arrays that hold the opened and matched cards
	matched = [];
	opened = [];
	// Clear the deck
	removeCard();
	// Create a new deck
	startGame();
}

/*
Increment the moves counter.  To be called at each
comparison for every two cards compared add one to the count
*/
function movesCounter() {
	// Update the html for the moves counter
	movesCount.innerHTML ++;
	// Keep track of the number of moves for every pair checked
	moves ++;
}

/*
Update the star rating.  Depending on the number of
moves the user completes the game, the stars will decrease
with the more moves the user takes.
*/
function starRating() {
	if (moves === 14) {
		// First element child is the <i> within the <li>
		star[2].firstElementChild.classList.remove("fa-star");
		starCount--;
	}
	if (moves === 18) {
		star[1].firstElementChild.classList.remove("fa-star");
		starCount--;
	}
}

/*
Compare two cards to see if they match or not
*/
function compareTwo() {
	// When there are 2 cards in the opened array
	if (opened.length === 2) {
  		// Disable any further mouse clicks on other cards
  		document.body.style.pointerEvents = "none";
  }
	// Compare the two images src
	if (opened.length === 2 && opened[0].src === opened[1].src) {
		// If matched call match()
		match();
		// console.log("It's a Match!");
	} else if (opened.length === 2 && opened[0].src != opened[1].src) {
		// If No match call noMatch()
		noMatch();
		// console.log("NO Match!");
	}
}

/*
If the two cards match, keep the cards open and
apply class of match
*/ 
function match() {
	/* Access the two cards in opened array and add
	the class of match to the imgages parent: the <li> tag
	*/
	setTimeout(function() {
		opened[0].parentElement.classList.add("match");
		opened[1].parentElement.classList.add("match");
		// Push the matched cards to the matched array
		matched.push(...opened);
		// Allow for further mouse clicks on cards
		document.body.style.pointerEvents = "auto";
		// Check to see if the game has been won with all 8 pairs
		winGame();
		// Clear the opened array
		opened = [];
	}, 600);
	// Call movesCounter to increment by one
	starRating();
	movesCounter();
}

/*
If the two cards do not match, remove the cards
from the opened array and flip the cards back over by
removing the flip class.
*/
function noMatch() {
	/* After 700 miliseconds the two cards open will have
	the class of flip removed from the images parent element <li>*/
	setTimeout(function() {
		// Remove class flip on images parent element
		opened[0].parentElement.classList.remove("flip");
		opened[1].parentElement.classList.remove("flip");
		// Allow further mouse clicks on cards
		document.body.style.pointerEvents = "auto";
		// Remove the cards from opened array
		opened = [];
	}, 700);
	// Call movesCounter to increment by one
	movesCounter();
	starRating();
}

/*
Get stats on the time, how many moves, and star rating
for the end game and update the modal with these stats
*/
function AddStats() {
	// Access the modal content div
	const stats = document.querySelector(".modal-content");
	// Create three different paragraphs
	for (let i = 1; i <= 3; i++) {
		// Create a new Paragraph
		const statsElement = document.createElement("p");
		// Add a class to the new Paragraph
		statsElement.classList.add("stats");
		// Add the new created <p> tag to the modal content
		stats.appendChild(statsElement);
	}
	// Select all p tags with the class of stats and update the content
	let p = stats.querySelectorAll("p.stats");
			// Set the new <p> to have the content of stats (time, moves and star rating)
		p[0].innerHTML = "Bitirdiğin süre: " + minutes + " Dakika ve " + seconds + " Saniye";
		p[1].innerHTML = "Yapılan hamleler: " + moves;
		p[2].innerHTML = "Puanın: " + starCount + " ";
}

/*
Display the modal on winning the game
Help with the modal from:
https://www.w3schools.com/howto/howto_css_modals.asp
*/
function displayModal() {
// Access the modal <span> element (x) that closes the modal
const modalClose = document.getElementsByClassName("close")[0];
	// When the game is won set modal to display block to show it
	modal.style.display= "block";

	// When the user clicks on <span> (x), close the modal
	modalClose.onclick = function() {
		modal.style.display = "none";
	};
// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};
}

/*
Check the length of the matched array and if there
are 8 pairs 16 cards all together then the game is won.
Stop the timer update the modal with stats and show the modal
*/
function winGame() {
	if (matched.length === 16) {
		stopTime();
		pressedPlaynBtn = false; 
		AddStats();
		displayModal();
	}
}

/*----------------------------------  
Main Event Listener
------------------------------------*/
/*
Event Listener if a card <li> is clicked
call flipCard()
*/
deck.addEventListener("click", function(evt) {
	if (evt.target.nodeName === "LI") {
		// To console if I was clicking the correct element 
		console.log(evt.target.nodeName + " Was clicked");
		// Start the timer after the first click of one card
		// Call flipCard() function
		if (pressedPlaynBtn === true) {
			flipCard();
		}
		
	}

	//Flip the card and display cards img
	function flipCard() {
		// When <li> is clicked add the class .flip to show img
		evt.target.classList.add("flip");
		// Call addToOpened() function
		addToOpened();
	}
	 
	//Add the fliped cards to the empty array of opened
	function addToOpened() {
		/* If the opened array has zero or one other img push another 
		img into the array so we can compare these two to be matched
		*/
		if (opened.length === 0 || opened.length === 1) {
			// Push that img to opened array
			opened.push(evt.target.firstElementChild);
		}
		// Call compareTwo() function
		compareTwo();
	}
}); //Event Listener

/*----------------------------------  
Restart Buttons
------------------------------------*/
/*
Event Listener to listen for a click on the reset
button, once clicked call resetEverything()
*/
reset.addEventListener('click', resetEverything);

/*
Event Listener to listen for a click on the play
again button, once clicked call resetEverything()
*/
playAgain.addEventListener('click',function() {
	modal.style.display = "none";
	resetEverything();
});

playbtn.addEventListener("click",function()
{
flipAllCards();
// Executes the timer() function
if (timeStart === false) {
	timeStart = true; 
	timer();
}
pressedPlaynBtn = true;
}
);
function flipAllCards()
{
	let list = document.querySelectorAll("LI.card");
	for (let i = 0; i < list.length; ++i) {
		list[i].classList.add('flip');
	 }
	 setTimeout(() => {
		for (let i = 0; i < list.length; ++i) {
			list[i].classList.remove('flip');
		 }
	  }, 3000);
}

	
stopBtn.addEventListener("click", function () {
	if (stopBtn.classList.contains("continue-btn")) {
		timer();
		stopBtn.classList.toggle("continue-btn");
		stopBtn.textContent = 'Durdur!';
		console.log("if1")
			// Ayrıca kartlara tıklamayı durdurmak için bir kod eklemelisiniz.
	// Örneğin, tüm kartların tıklamalarını devre dışı bırakabilirsiniz:
	let cards = document.querySelectorAll(".card");
	cards.forEach(card => {
	  card.style.pointerEvents = "auto";
	});
	}
	else {
	  stopBtn.textContent = 'Sürdür!';
	  stopBtn.classList.toggle("continue-btn");
	  stopTime();// Süreyi durdur
	  console.log("if2")
	  	// Ayrıca kartlara tıklamayı durdurmak için bir kod eklemelisiniz.
	// Örneğin, tüm kartların tıklamalarını devre dışı bırakabilirsiniz:
	let cards = document.querySelectorAll(".card");
	cards.forEach(card => {
	  card.style.pointerEvents = "none";
	});
	}
	console.log("event")

  });
  
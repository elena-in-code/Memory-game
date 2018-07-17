//List that holds all the cards, 2 copies of each
const icons = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'
];
const deck = document.querySelector(".deck");
const resetBtn = document.querySelector(".restart");
const movesContainer = document.querySelector(".moves");
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
const timer = document.querySelector('.timer');
const modalContainer = document.querySelector('.modalContainer');

let selectedCard = [];
let matchedCards = [];
let moves = 0;
let currentTimer;
let minute = 0;
let second = 0;
let isFirstClick = true;

//Initialize game 
function init() {
    //call shuffle 
    shuffle(icons);
    //Create programatically the cards
    for(let i = 0; i < icons.length; i++){
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        deck.appendChild(card);
        //invoke click event on each card
        click(card);
    }
}

//Click event on cards
function click(card){
    //click event on each card
    card.addEventListener("click", function() {
        if(isFirstClick) {
            startTimer();
            isFirstClick = false;
        }
        const currentCard = this;
        const prevCard = selectedCard[0];
        //check if there is any card selected 
        if(selectedCard.length === 1){
            //open card
            card.classList.add("open", "show", "disabled");
            //keep in a new array the clicked card
            selectedCard.push(this);
            //invoke the comparasion function
            isComparing(currentCard, prevCard);
            addMoves();
        } else {
            //No open card
            card.classList.add("open", "show", "disabled");
            //keep in a new array the clicked card
            selectedCard.push(this);
        }
    });
}

//Compare the 2 cards that are selected
function isComparing(currentCard, prevCard) {
    if(currentCard.innerHTML === prevCard.innerHTML){
        //Cards Match
        currentCard.classList.add("match");
        prevCard.classList.add("match");
        //keep in a new array the matched cards
        matchedCards.push(currentCard, prevCard);
        
        selectedCard = [];
        //check if the game it is finished
        gameOver();

    } else {
        //Cards don't match
        setTimeout(function () {
            currentCard.classList.remove("open", "show", "disabled");
            prevCard.classList.remove("open", "show", "disabled");
        }, 500);
        selectedCard = [];
    }
}

//check if the game is over
function gameOver() {
    if(matchedCards.length === icons.length) {
        showModal();
        
    } 
}

//moves
movesContainer.innerHTML = 0;
function addMoves() {
    moves++;
    movesContainer.innerHTML = moves;
    rating();
}

//rating
starsContainer.innerHTML = star + star + star;
function rating() {

    if( moves < 15) {
        starsContainer.innerHTML = star + star + star;
    } else if( moves < 20) {
        starsContainer.innerHTML = star + star;
    } else {
        starsContainer.innerHTML = star;
    }
}


//suffle shuffle cards randomly
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//Reset game
function resetGame() {
     //reset all arrays of cards
     deck.innerHTML = "";
     selectedCard = [];
     matchedCards = [];
     moves = 0;
     movesContainer.innerHTML = moves;
     starsContainer.innerHTML = star + star + star;
     resetTimer();
     //create new cards game
     init();
}

resetBtn.addEventListener("click", function(){
    resetGame();
})

//timer
function setTimer () {
    timer.innerHTML = `<i class='fa fa-clock-o'></i> ${minute}:${second}`;
    second++;
  
    if (second <= 9) {
        second = '0' + second;
      }
      if (second === 60) {
        minute++;
        second = 0;
      }
  }
  function startTimer () {
    currentTimer = setInterval(setTimer, 1000);
  }
  
  function stopTime () {
    clearInterval(currentTimer);
  }
  
  function resetTimer() {
    timer.innerHTML = `<i class='fa fa-clock-o'></i> ${minute}:${second}`;
    second = 0;
    minute = 0;
  }

  function showModal(){
    modalContainer.innerHTML = `
        <div class="modal">
        <h4>You won!</h4>
        <p>You finish this round after ${moves} moves</p>
        <p>It took you ${minute}:${second} minutes</p>
        <p>You were awarded with  stars</p>
        <button class="playAgainBtn button">Play Again</button>
        </div>
    `;
  }

  function hideModal(){
    modalContainer.classList.add("hide");
}

//invoke initialize function to start game
init();
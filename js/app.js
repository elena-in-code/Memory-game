//List that holds all the cards, 2 copies of each
const icons = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'
];
const deck = document.querySelector(".deck");
const resetBtn = document.querySelector(".restart");
const movesContainer = document.querySelector(".moves");
const timer = document.querySelector('.timer');
const modalContainer = document.querySelector('.modalContainer');
const infoMessage = document.querySelector('.infoMessage');
const playAgainBtn = document.querySelector('.playAgainBtn');
const starsNumber = document.querySelector(".starsNumber");
let stars = 3;
let selectedCard = [];
let matchedCards = [];
let moves = 0;
let currentTimer;
let minute = 0;
let second = 0;
let isFirstClick = true;

//Initialize game 
function init() {
    //call cards shuffle 
    shuffle(icons);
    //Create programmatically the cards
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
            //invoke the comparision function
            isComparing(currentCard, prevCard);
            //invoke the move counting
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
        //clear array
        selectedCard = [];
        //check if the game it is finished
        gameOver();
    } else {
        //Cards don't match
        setTimeout(function () {
            currentCard.classList.remove("open", "show", "disabled");
            prevCard.classList.remove("open", "show", "disabled");
        }, 500);
        //clear array
        selectedCard = [];
    }
}

//check if the game is over
function gameOver() {
    if(matchedCards.length === icons.length) {
        stopTimer();
        showModal();
    } 
}

//moves
movesContainer.innerHTML = `0 Moves`;
function addMoves() {
    moves++;
    movesContainer.innerHTML = `${moves} Moves`;
    rating();
}

//rating
starsNumber.innerHTML = stars;
function rating() {
    if( moves < 15) {
        stars = 3;
    } else if( moves < 20) {
        stars = 2;
    } else {
        stars = 1;
    }
    starsNumber.innerHTML = stars;
}


//shuffle cards randomly
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
     //reset all variables
     deck.innerHTML = "";
     selectedCard = [];
     matchedCards = [];
     moves = 0;
     movesContainer.innerHTML = `0 Moves`;
     starsNumber.innerHTML = 3;
     //reset timer
     resetTimer();
     //remove false from first click to start again
     isFirstClick = true;
     //create new cards game
     init();
}

//Reset Button
resetBtn.addEventListener("click", function(){
    stopTimer();
    resetGame();
})

//timer section
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
  function startTimer() {
    currentTimer = setInterval(setTimer, 1000);
  }
  
  function stopTimer() {
    clearInterval(currentTimer);
  }
  
  function resetTimer() {
      second = 0;
      minute = 0;
      timer.innerHTML = `<i class='fa fa-clock-o'></i> ${minute}:${second}`;
  }

//Modal section
  function showModal(){
    modalContainer.classList.remove("hide");
    infoMessage.innerHTML = `
        <p>You finish this round after ${moves} moves<br>
        It took you ${minute}:${second} minutes<br>
        You were awarded with  ${stars} stars </p>
    `;
}

//Play again Button
playAgainBtn.addEventListener("click", function(){
    resetGame();
    hideModal();
})

function hideModal(){
    modalContainer.classList.add("hide");
}

//invoke initialize function to start game
init();
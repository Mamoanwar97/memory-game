/*
 * Create a list that holds all of your cards
 */
const cards = ['diamond','paper-plane-o','anchor','bolt','bomb','cube','leaf','bicycle','diamond','paper-plane-o','anchor','bolt','bomb','cube','leaf','bicycle']
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 function precise(x,y) { /* to set precision for displayTime to make it take high values and display them*/
  return Number.parseFloat(x).toPrecision(10);
}

var myVar; /* this declared bit early for the timer function but it declared here so i can reset it when restart button is clicked*/

let move = document.querySelector('.moves');
const stars = document.querySelectorAll('.fa-star');
const winner = document.querySelector('.winner');
const container = document.querySelector('.container');

 function Start(){//reset or start function start here so everything is set to 0 and normal first then the operations begins
   clearInterval(myVar); //reset the timer function
   document.getElementById("demo").innerHTML = 0 +" Seconds";
   const deck = document.querySelector('.deck');
   const shuffledCards = shuffle(cards);
   let cardHTML ='';
   for( let card of  shuffledCards ){
     cardHTML += `<li class="card"> <i class="fa fa-${card} "></i> </li>`;
   }
   container.className = 'container';
   winner.className = 'winner';
   winner.innerHTML = '';
   stars.forEach(function(star){
     star.className = 'fa fa-star';
   })
   deck.innerHTML = cardHTML;
   move.innerText = 0;
   //------------------------------------everything is setted to normal then we start the real game----------------------------------------
   const beginTime = performance.now(); //start with the timer function
   let displayTime;
   myVar = setInterval(myTimer, 1000);
   function myTimer() {
     var t = performance.now();
     var time = (t-beginTime)/1000;
     displayTime = Math.floor(precise(time)); // used to math.floor to only print the integer part of the seconds
     document.getElementById("demo").innerHTML = displayTime +" Seconds";
   }

   var allcards = document.querySelectorAll('.card');
   let element1, element2, card1, card2;
   let i=0, successCounter = 0, noOfStars = 3; //i is the moves counter

   allcards.forEach(function(card){
     card.addEventListener('click',function(){

       if( card.classList.contains('open') === false && card.classList.contains('show') === false && card.classList.contains('match') === false && card.classList.contains('wrong') === false)
       {  //you cant click on opened/matched/wrong card only the closed one
         card.classList.add('show');
         card.classList.add('open');
         i++;
         if(i % 2 === 0){
           move.textContent = i / 2;
         }
         if(i === 21){ //as the moves increases the stars decreases
           stars[2].className = 'lost';
           noOfStars--;
         }
         if( i === 27){
           stars[1].className = 'lost';
           noOfStars--;
         }
       }

       if(i % 2 === 1){ //store first clicked card so we can easily compare with the second card
         element1 = card.querySelector('.fa');
         card1 = card;
       }
       else{
         element2 = card.querySelector('.fa');
         card2 = card;
       }
       if (i % 2 == 0)
       {
         const names1 = element1.classList;
         const name1 = names1[1];
         if (element2.classList.contains(name1))//if i in second card has the same class of first then surely they are matched
         {
           card1.className = "card match";
           card2.className = "card match";
           successCounter = document.querySelectorAll('.match'); //get all matched cards
           if(successCounter.length  === 16)
           {
             setTimeout(function(){
             clearInterval(myVar); // we stop the time here to display it and know the total time taken to solve the game
             const winnerHTML=`<div class="position"><p>Congratulations ! you done it in ${displayTime} Sec and you got ${noOfStars}/3 star</p> \n <span class="btn restart"> Play again </span></p>`;
             winner.innerHTML = winnerHTML;
             winner.classList.add('win'); //display winner page
             container.classList.add('lost');//hide the game page
             const reset = document.querySelector('.restart'); //this for play again button so player can reset and play again
             reset.addEventListener('click',Start);
           }, 100);
            }
         }
         else
         {
           card1.className = "card wrong";
           card2.className = "card wrong";
           const wrong1 = card1, wrong2 = card2; //this really very helpful it asure that the wrong cards are going to flip cause without this you are fast enough to click a third card before the wrong one flips it will flip the new pne and one of the wrong card not both wrong cards
           setTimeout(function(){ //1,2,3 and the wrong cards flips
             wrong1.className = "card";
             wrong2.className = "card";
           }, 1000);
         }
       }
     });
   });
 }

Start();

const reset = document.querySelector('.restart'); //and this for the reset button
reset.addEventListener('click',Start);

let score = [0 , 0];       //Global score
let roundScore = 0;     //round score
let current = 0;        //current player  (0 or 1)
let dice;
let gameRunning = true;
let animation = 0;

document.querySelector(".score-0").textContent = "0";
document.querySelector(".score-1").textContent = "0";
document.querySelector(".current-0").textContent = "0";
document.querySelector(".current-1").textContent = "0";

document.getElementById("rotate").onclick = function(){
  //roll the dice
  dice = Math.floor(Math.random()*6 + 1);
    
  if(gameRunning){    
    //get value of dice
    document.querySelector("#dice-img").src = "assets/dice-"+dice+".JPG";
    
    //This is just for cool effects
    if(animation === 0){
      document.querySelector("#dice-img").classList.remove('animate__shakeX');
      document.querySelector("#dice-img").classList.add('animate__tada');
      animation = 1;      
    }else{
      document.querySelector("#dice-img").classList.remove('animate__tada');
      document.querySelector("#dice-img").classList.add('animate__shakeX');
      animation = 0;  
    }

    //YOUR CODE HERE

    //Here are the rules of pig game
    //1. User rolls the dice
    //2. If value is different from 1, User can roll again and obtain a bigger accumulated value in his round score
    //or he could decided to hold and end turn
    //3. If value is one, user lost his accumulated value and his turn.
    //hint: toggle seems cool, don't you think? Only applies if user lost turn
    //hint # 2: Current user is either 0 or 1
    
    if (dice === 1){
      document.querySelector(".player-0").classList.toggle("active");
      document.querySelector(".player-1").classList.toggle("active");
      document.querySelector(".current-"+current).textContent = 0;
      current = 1 - current;
      roundScore = 0;
    } else {
      roundScore += dice;
      document.querySelector(".current-"+current).textContent = roundScore;
    }
    
 }
}


document.getElementById("hold").onclick = function(){

  //Your code here

  //As long as the game is running, the score of the CURRENT USER should be accumulated if the usert holds
  //this value should be visible in his score
  //current user wins if his/her/their score is equal or more than 100. Afther this, game should be stopped
  score[current] += roundScore;
  document.querySelector(".score-"+current).textContent = score[current];
  document.querySelector(".current-"+current).textContent = 0;

  if (score[current] >= 100){

    // Como ya hay un ganador, ocultamos el roll y el hold
    document.getElementById("rotate").setAttribute('hidden', '');
    document.getElementById("hold").setAttribute('hidden', '');
    const winnerMessage = document.createElement('div');
    winnerMessage.id = 'winner';
    winnerMessage.innerHTML = `<h3 style="color:#000000;"> The winner is the player ${current + 1}. Click in new game to start again.</h3>`;
    document.getElementsByClassName("col-sm-10")[0].appendChild(winnerMessage);

  } else {
    document.querySelector(".player-0").classList.toggle("active");
    document.querySelector(".player-1").classList.toggle("active");
    roundScore = 0;
    current = 1 - current;
  }
}

document.querySelector("#new").addEventListener('click',game);

function game() {
  
  score = [0,0];
  roundScore = 0 ;

  //Siempre se intercambiar el jugador inicial, respecto al de la partida actual
  // Si el jugador actual era el 2, entonces al reiniciar el que comienza sería el 1, y viceversa.
  current = 1- current; 
  gameRunning = true;

  document.querySelector(".player-0").classList.toggle("active");
  document.querySelector(".player-1").classList.toggle("active");
  document.getElementById("rotate").removeAttribute('hidden');
  document.getElementById("hold").removeAttribute('hidden');

  let divWinner = document.getElementById("winner");
  if (divWinner!== null){
    divWinner.remove();
  }
    
  document.querySelector(".score-0").textContent = "0";
  document.querySelector(".score-1").textContent = "0";
  document.querySelector(".current-0").textContent = "0";
  document.querySelector(".current-1").textContent = "0";
  document.querySelector("#pl-0").innerHTML = "<h2 id='pl-0'>PLAYER 1 "+"<i class='fas fa-circle'>"+"</i></h2>";
  document.querySelector("#pl-1").innerHTML = "<h2 id='pl-1'>PLAYER 2 "+"<i class='fas fa-circle'>"+"</i></h2>";
}

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var Player = function() {
  this.totalScore = 0,
  this.roundScore = 0
}

Player.prototype = {
  setScore: function () {
      this.totalScore += this.roundScore;
  },
  resetRoundScore: function () {
    this.roundScore = 0;
  },
  constructor: Player
}


var player1 = new Player();

var player2 = new Player();

var turn = 1, activePlayer = player1, gameActive = true;

document.querySelector('.btn-roll').addEventListener('click', function () {
  var dice = Math.floor(Math.random() * 6) + 1;

  if (gameActive === true) {
    document.querySelector('.dice').src = 'dice-' + dice + '.png';

    if (dice === 1){
      clearRoundScoreBoard();
      togglePlayer();
    } 
    else {
      activePlayer.roundScore += dice;
      document.querySelector("#current-" + (turn - 1)).textContent = activePlayer.roundScore;
      var playertotalScore = activePlayer.roundScore + activePlayer.totalScore

      if (playertotalScore >= 100) {
        document.getElementById('score-' + (turn - 1)).textContent = playertotalScore;
        gameActive = false;
        alert('Player ' + turn + ' Wins!!!' );
      }  
    } 
  }
  else {
    alert("Game already over!!!");
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gameActive) {
    activePlayer.setScore();
    document.getElementById('score-' + (turn - 1)).textContent = activePlayer.totalScore;
    clearRoundScoreBoard();
    togglePlayer();  
  }
});

function clearRoundScoreBoard () {
  document.querySelector("#current-" + (turn - 1)).textContent = 0;
}

function togglePlayer () {
  activePlayer.resetRoundScore();
  activePlayer = turn === 1 ? player2 : player1;
  document.querySelector('.player-' + (turn - 1) + '-panel').classList.remove('active');
  turn = turn === 1 ? 2 : 1;
  document.querySelector('.player-' + (turn - 1) + '-panel').classList.add('active');
} 

document.querySelector('.btn-new').addEventListener('click', function () {
  confirm('Are you sure you want to start a new game?');
  if (confirm) {
    resetGame();
  }
});

function resetGame(){
  turn = 1;
  player1.roundScore = player2.roundScore = 0;
  player1.totalScore = player2.totalScore = 0;
  activePlayer = player1;
  gameActive = true;
  document.querySelector("#current-0").textContent = document.querySelector("#current-1").textContent = 0;
  document.getElementById('score-0').textContent = document.getElementById('score-1').textContent = 0;
}
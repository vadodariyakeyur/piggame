/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls the dices as many times as he whishes. Each result get added to his CURRENT score
- BUT, if the player rolls a 1, all his CURRENT score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his CURRENT score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,roundScore,activePlayer,gamePlaying;

init();

document.querySelector('.btn-help').addEventListener('click',function(){
    document.querySelector('.help').classList.toggle('visible');
    var X = document.querySelector('.btn-help');
    //console.log(X.textContent);
    if( X.textContent == 'X'){
        X.textContent = '?';
    }
    else{
        X.textContent = 'X';
    }
});

document.querySelector('.btn-roll').addEventListener('click',function(){

    if(gamePlaying){

        //Display Result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        
        //Random Number
        var dice1 = Math.floor(Math.random()*6)+1;
        var dice2 = Math.floor(Math.random()*6)+1;
        document.getElementById('dice-1').src = 'img/dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'img/dice-' + dice2 + '.png';


        //Update The Round Score Only If Result!=1;  
        if(dice1 !== 1 && dice2 !== 1){

            //Add score 
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else{

            //Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click',function(){

    if(gamePlaying){
        //Add current score to global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;
        
        //Undefined, 0,null or "" are coerced to false
        //Anything else is Coerced to true
        if(typeof parseInt(input) == 'number' && input>0){
            winningScore = input;
        }
        else{
            winningScore = 100;
            document.querySelector('.final-score').textContent = '100';
        }

        //Check if player won the game
        if(scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying=false;
        }
        else{
            //Next Player
            nextPlayer();
        }
    }
});

function nextPlayer(){
    activePlayer = (activePlayer === 0 ? 1 : 0);
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';   document.getElementById('current-1').textContent = '0';

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click',init);

function init(){

    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}




//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

const gameGod = {
  duckCounter: 0,
  duckAmount: 5,
  bulletCounter: 0,
  bulletAmount: 3,
  score: '00000',
};

let mainModule = {};

(function() {
  'use strict';

  const introAnimationDelay = 5000; // delay for the intro animation
  const showingTextDuration = 2000;
  const pauseBeforeFirstDuckAppears = 3000;
  const textTable = document.getElementsByClassName('text-table')[0]; // main header of the page, signalazing about smth
  const scorePanel = document.getElementsByClassName('score-panel')[0];

  // add shooting listener
  document.body.addEventListener('click', ducksModule.onClickDecreaseBulletsAmount);

  // launch the life cycle of our application
  function lifecycle() {
    dogModule.dogIntro(); // uses method from file dog.js
    dogModule.dogIntroRemove(introAnimationDelay);
    initializeControls(introAnimationDelay);
  }

  function initializeControls(delay) {
    setTimeout(function () {
      showTextOnScreen('Ready', showingTextDuration);
      showScorePanel();
      ducksModule.startDucksFlight(pauseBeforeFirstDuckAppears); // uses method from file ducks.js
    }, delay);
  }

  mainModule.showTextOnScreen = showTextOnScreen;
  function showTextOnScreen(text, animationDuration) {
    textTable.innerHTML = text;
    textTable.style.display='block';

    if (animationDuration) {
      setTimeout(function() {
        textTable.innerHTML = '';
        textTable.style.display='none';
      }, animationDuration);
    }
  }

  function showScorePanel() {
    document.querySelector("#score").innerHTML = gameGod.score;
    scorePanel.style.display = 'block';
  }

  mainModule.hideScorePanel = function() {
    document.querySelector("#score").innerHTML = gameGod.score;
    scorePanel.style.display = 'none';
  };

  mainModule.startGame = startGame;
  function startGame(ev) {
    ev.stopPropagation();

    lifecycle();
    document.querySelector("#start").style.display = 'none';
  }
  mainModule.playAgain = playAgain;
  function playAgain() {
    // Reload current page without using cache
    document.location.reload(true);
  }

})();

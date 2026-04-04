const gameGod = {
  duckCounter: 0,
  duckAmount: 5,
  bulletCounter: 0,
  bulletAmount: 3,
  score: '00000',
  roundNumber: 1,
  errors: 0,
};

const mainModule = {};

(function() {
  'use strict';

  const introAnimationDelay = 5000; // delay for the intro animation
  const showingTextDuration = 1000;
  const textTable = document.getElementsByClassName('text-table')[0]; // main header of the page, signalazing about smth
  const scorePanel = document.getElementsByClassName('score-panel')[0];
  const scoreElement = document.querySelector('#score');
  const startButton = document.querySelector('#start');
  const bulletsPanel = document.querySelector('#score-panel__bullets');
  const bestScore = localStorage.getItem('bestScore') || 0;

  // add shooting listener
  document.body.addEventListener('click', _onShoot);

  // launch the life cycle of our application
  function lifecycle() {
    dogModule.dogIntro(introAnimationDelay)
      .then(showScorePanel)
      .then(nextRound);
  }

  mainModule.nextRound = nextRound;
  // launch the life cycle of our application
  async function nextRound() {
    showTextOnScreen('Round ' + gameGod.roundNumber);
    await timeDelay(showingTextDuration);
    hideTextOnScreen();
    await ducksModule.ducksFlightCycle(); // uses method from file ducks.js
  }

  mainModule.showTextOnScreen = showTextOnScreen;
  function showTextOnScreen(text) {
    textTable.innerHTML = text;
    textTable.style.display = 'block';
  }

  mainModule.hideTextOnScreen = hideTextOnScreen;
  function hideTextOnScreen() {
    textTable.innerHTML = '';
    textTable.style.display = 'none';
  }

  function showScorePanel() {
    scoreElement.textContent = gameGod.score;
    scorePanel.style.display = 'block';
  }

  mainModule.hideScorePanel = function() {
    scoreElement.textContent = gameGod.score;
    scorePanel.style.display = 'none';
  };

  mainModule.startGame = startGame;
  function startGame(ev) {
    if (ev) ev.stopPropagation();

    lifecycle();
    startButton.style.display = 'none';
  }

  mainModule.gameOver = gameOver;
  function gameOver() {
    if (gameGod.score > bestScore) {
      bestScore = gameGod.score;
      localStorage.setItem('bestScore', gameGod.score);
    }

    soundsModule.endThemeSound();
    mainModule.showTextOnScreen(
      `<h1>Game over</h1>
        <br>
        <p>Your score: ${gameGod.score}</p>
        <p>Your best score: ${bestScore}</p>`,
      10000000,
    );
    gameGod.bulletCounter = 3;
    document.querySelector('#play-again').style.display = 'block';

    mainModule.hideScorePanel();
  }

  mainModule.playAgain = playAgain;
  function playAgain() {
    // Reload current page without using cache
    document.location.reload(true);
  }

  mainModule.timeDelay = timeDelay;
  function timeDelay(delay) {
    return new Promise(function (resolve) {
      setTimeout(resolve, delay);
    });
  }

  mainModule.areThereSomeBullets = areThereSomeBullets;
  function areThereSomeBullets() {
    return gameGod.bulletCounter < gameGod.bulletAmount;
  }

  function _onShoot() {
    // if there are no bullets
    if (!areThereSomeBullets()) return;

    soundsModule.shootSound();
    bulletsPanel.children[gameGod.bulletCounter].style.display = 'none';

    gameGod.bulletCounter++;
  }

  window.addEventListener('orientationchange', function () {
    playAgain();
  });

})();

window.addEventListener('load', function () {
  document.body.style.display = 'block';
});

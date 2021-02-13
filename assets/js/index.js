const gameGod = {
  duckCounter: 0,
  duckAmount: 5,
  bulletCounter: 0,
  bulletAmount: 3,
  score: '00000',
};

const mainModule = {};

(function() {
  'use strict';

  const introAnimationDelay = 5000; // delay for the intro animation
  const showingTextDuration = 1000;
  const textTable = document.getElementsByClassName('text-table')[0]; // main header of the page, signalazing about smth
  const scorePanel = document.getElementsByClassName('score-panel')[0];

  // add shooting listener
  document.body.addEventListener('click', _onShoot);

  // launch the life cycle of our application
  function lifecycle() {
    dogModule.dogIntro(introAnimationDelay)
      .then(showScorePanel)
      .then(() => showTextOnScreen('Ready'))
      .then(() => timeDelay(showingTextDuration))
      .then(hideTextOnScreen)
      .then(() => ducksModule.ducksFlightCycle()); // uses method from file ducks.js
  }

  mainModule.showTextOnScreen = showTextOnScreen;
  function showTextOnScreen(text) {
    textTable.innerHTML = text;
    textTable.style.display='block';
  }

  mainModule.hideTextOnScreen = hideTextOnScreen;
  function hideTextOnScreen() {
    textTable.innerHTML = '';
    textTable.style.display = 'none';
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

  mainModule.timeDelay = timeDelay;
  function timeDelay(delay) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        return resolve();
      }, delay);
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

    const bulletsPanel = document.querySelector("#score-panel__bullets");
    bulletsPanel.children[gameGod.bulletCounter].style.display = 'none';

    gameGod.bulletCounter++;
  }

  window.addEventListener('orientationchange', function () {
    playAgain();
  });

})();

window.onload = function() {
  document.body.style.display = 'block';
};

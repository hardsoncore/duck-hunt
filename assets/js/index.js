(function() {
  'use strict';

  const startingAnimationDelay = 5000; // delay for the starting animation
  const textTable = document.getElementsByClassName('text-table')[0]; // main header of the page, signalazing about smth
  const scorePanel = document.getElementsByClassName('score-panel')[0];

  // launch the life cycle of our application
  lifecycle();

  function lifecycle() {
    dogIntro(); // uses method from file dog.js
    dogIntroRemove(startingAnimationDelay);
    initializeControls(startingAnimationDelay);
  }

  function initializeControls(delay) {
    setTimeout(function () {
      showTextOnScreen('Ready', 2000);
      showScorePanel();
      startDucksFlight(3000); // uses method from file ducks.js
    }, delay);
  }

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
    scorePanel.style.display='block';
  }

})();

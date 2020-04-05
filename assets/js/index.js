(function() {
  'use strict';

  const startingAnimationDelay = 5000; // delay for the starting animation
  const textTable = document.getElementsByClassName('text-table')[0]; // main header of the page, signalazing about smth
  const scorePanel = document.getElementsByClassName('score')[0]; // main header of the page, signalazing about smth

  // launch the life cycle of our application
  lifecycle();

  function lifecycle() {
    dogIntro(); // use method from file dog.js
    initializeControls();
  }

  function initializeControls() {
    setTimeout(function () {
      showTextOnScreen('Ready', 2000);
      showScorePanel();
      startDucksFlight(3000);
    }, startingAnimationDelay);
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

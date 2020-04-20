(function() {
  'use strict';

  const introAnimationDelay = 5000; // delay for the intro animation
  const showingTextDuration = 2000;
  const pauseBeforeFirstDuckAppears = 3000;
  const textTable = document.getElementsByClassName('text-table')[0]; // main header of the page, signalazing about smth
  const scorePanel = document.getElementsByClassName('score-panel')[0];

  // launch the life cycle of our application
  lifecycle();

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

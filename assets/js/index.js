(function() {
  'use strict';

  const startingAnimationDelay = 5000; // delay for the starting animation

  setTimeout(function () {
    mainProcessFunc();
  }, startingAnimationDelay);

  function mainProcessFunc() {
    addTextOnScreen('Ready?!');
  }

  function addTextOnScreen(text) {
    const textTable = document.getElementsByClassName('text-table')[0].textContent = 'ready';
    // textTable.inner
    // debugger
  }

})();

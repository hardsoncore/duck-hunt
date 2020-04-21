let ducksModule = {};

(function() {
  'use strict';

  // stage parameters
  const stage = document.querySelector("#stage-background");
  const blockWidth = stage.clientWidth;
  const blockHeight = stage.clientHeight;

  // ducks
  const flyingDuck = document.querySelector("#duck-flying");
  const fallingDuck = document.querySelector("#duck-falling");

  // timing settings
  const delayBetweenDuckFlights = 4000;
  const duckFallingDelay = 1000;
  const dogReactionDuration = 5000;

  ducksModule.startDucksFlight = function (delayBeforeFirstDuckAppears) {
    setTimeout(function() {
      for (let i = 0; i < gameGod.duckAmount; i++) {
        duckFlight((delayBetweenDuckFlights + dogReactionDuration) * i);
      }

      afterAllDucks((delayBetweenDuckFlights + dogReactionDuration) * gameGod.duckAmount);
    }, delayBeforeFirstDuckAppears);
  };

  function getRandomHorizontalStartPoint() {
    return Math.round(Math.random() * blockWidth);
  }

  function duckFlight(delayBeforeDuckAppears) {
    setTimeout(function() {
      const startPoint = getRandomHorizontalStartPoint();
      const endPoint   = getRandomHorizontalStartPoint();

      flyingDuck.style.display = 'block';
      // reset duck rotation before animation starts
      flyingDuck.style.transform = 'scaleX(1)';
      if ( endPoint < startPoint ) flyingDuck.style.transform = 'scaleX(-1)'; // change duck rotation

      addDuckAnimation(flyingDuck, {x : startPoint, y: blockHeight}, {x : endPoint, y: -100}, delayBetweenDuckFlights);

      flyingDuck.addEventListener('click', onDuckKilling, true);

      function onDuckKilling(ev) {
        // hide flying duck
        flyingDuck.style.display = 'none';
        // show falling duck and add it animation
        fallingDuck.style.display = 'block';
        addDuckAnimation(fallingDuck, {x: ev.screenX, y: ev.screenY - 100}, {x: ev.screenX, y: blockHeight}, duckFallingDelay);
        // make dog say wow
        dogModule.dogWow(ev.screenX, dogReactionDuration);
        // remove listener
        flyingDuck.removeEventListener('click', onDuckKilling, true);
      }

      function whenDuckFlyiesAway() {
        // make dog laugh
        dogModule.dogLaughs(dogReactionDuration);
        // remove listener
        flyingDuck.removeEventListener('click', onDuckKilling, true);
      }

      setTimeout(function() {
        whenDuckFlyiesAway();
      }, delayBetweenDuckFlights);

    }, delayBeforeDuckAppears);
  }

  function addDuckAnimation(duck, start, end, duration) {
    duck.animate([
      { // from
        left: start.x + 'px',
        top: start.y + 'px'
      },
      { // to
        left: end.x + 'px',
        top: end.y + 'px'
      }
    ], {
      // timing options
      duration: duration,
      // iterations: Infinity
    });
  }

  function afterAllDucks(delay) {
    setTimeout(function() {
      // showTextOnScreen('You win!', 10000000);
    }, delay);
  }

})();

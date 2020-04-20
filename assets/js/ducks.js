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

  ducksModule.startDucksFlight = function (delayBeforeFirstDuckAppears) {
    setTimeout(function() {
      duckFlight(0);
      duckFlight(delayBetweenDuckFlights);
      duckFlight(delayBetweenDuckFlights * 2);
      duckFlight(delayBetweenDuckFlights * 3);
      duckFlight(delayBetweenDuckFlights * 4);
      afterAllDucks(delayBetweenDuckFlights * 5);
    }, delayBeforeFirstDuckAppears);
  }

  function getRandomHorizontalStartPoint() {
    return Math.round(Math.random() * blockWidth);
  }

  function duckFlight(delay) {
    setTimeout(function() {
      const startPoint = getRandomHorizontalStartPoint();
      const endPoint   = getRandomHorizontalStartPoint();

      flyingDuck.style.display = 'block';
      // reset duck rotation before animation starts
      flyingDuck.style.transform = 'scaleX(1)';
      if ( endPoint < startPoint ) flyingDuck.style.transform = 'scaleX(-1)'; // change duck rotation

      addDuckAnimation(flyingDuck, {x : startPoint, y: blockHeight}, {x : endPoint, y: -100}, delayBetweenDuckFlights);

      flyingDuck.addEventListener('click', function(ev) {
        this.style.display = 'none';
        this.removeEventListener('click', arguments.callee, false);

        fallingDuck.style.display = 'block';
        addDuckAnimation(fallingDuck, {x: ev.screenX, y: ev.screenY - 100}, {x: ev.screenX, y: blockHeight}, duckFallingDelay);
      });
    }, delay);
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

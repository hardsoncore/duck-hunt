const ducksModule = {};

(function () {
  'use strict';

  // stage parameters
  const stage = document.querySelector("#stage-background");
  const blockWidth = window.innerWidth;
  const blockHeight = window.innerHeight;

  // ducks
  const flyingDuck = document.querySelector("#duck-flying");
  const fallingDuck = document.querySelector("#duck-falling");

  // timing settings
  const delayBetweenDuckFlights = 4000;
  const duckFallingDelay = 1000;
  const dogReactionDuration = 2000;

  function _initBulletsAmount() {
    gameGod.bulletCounter = 0;
    const bulletsPanel = document.querySelector("#score-panel__bullets");
    for (let i = 0; i < gameGod.bulletAmount; i++) {
      bulletsPanel.children[i].style.display = 'block';
    }
  }

  ducksModule.ducksFlightCycle = async function () {
    for (let i = 0; i < gameGod.duckAmount; i++) {
        await duckFlightStart();
        await afterDuckFlight(i);
    }

    _whenGameEnds();
  };

  function duckFlightStart() {
    _initBulletsAmount();
    soundsModule.duckFlightSound();

    _drawFlyingDuck();

    return mainModule.timeDelay(delayBetweenDuckFlights);
  }

  function afterDuckFlight(i) {
    console.log('afterDuckFlight' + i);

    if (!_isDuckKilled()) _whenDuckFlyiesAway();

    // remove listener
    flyingDuck.removeEventListener('click', _onDuckKilling, true);
    gameGod.duckCounter++;

    return mainModule.timeDelay(dogReactionDuration);
  }

  function _getRandomHorizontalStartPoint() {
    return Math.round(Math.random() * blockWidth);
  }

  function _addDuckAnimation(duck, start, end, duration) {
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

  function _drawFlyingDuck() {
    const startPoint = _getRandomHorizontalStartPoint();
    const endPoint = _getRandomHorizontalStartPoint();

    flyingDuck.style.display = 'block';
    // reset duck rotation before animation starts
    flyingDuck.style.transform = 'scaleX(1)';
    if (endPoint < startPoint) flyingDuck.style.transform = 'scaleX(-1)'; // change duck rotation

    _addDuckAnimation(flyingDuck, { x: startPoint, y: blockHeight }, { x: endPoint, y: -100 }, delayBetweenDuckFlights);

    flyingDuck.addEventListener('click', _onDuckKilling, true);
  }

  function _onDuckKilling(ev) {
    if (!mainModule.areThereSomeBullets()) return;

    // hide flying duck
    flyingDuck.style.display = 'none';
    // show falling duck and add it animation
    fallingDuck.style.display = 'block';

    _addDuckAnimation(fallingDuck, { x: ev.clientX, y: ev.clientY }, { x: ev.clientX, y: blockHeight }, duckFallingDelay);
    // make dog say wow
    dogModule.dogWow(ev.clientX, dogReactionDuration, duckFallingDelay);
    // remove listener
    flyingDuck.removeEventListener('click', _onDuckKilling, true);
    // change score
    _changeScoreOnDuckKill();
  }

  function _whenDuckFlyiesAway() {
    const ducksPanel = document.querySelector("#score-panel__ducks");

    // make dog laugh
    dogModule.dogLaughs(dogReactionDuration);
    _changeScoreOnDuckFlyiesAway(ducksPanel);
  }

  function _changeScoreOnDuckKill() {
    // change duck icon color
    const ducksPanel = document.querySelector("#score-panel__ducks");
    ducksPanel.children[gameGod.duckCounter].classList.add('shot-successful');

    // change highscore
    gameGod.score = gameGod.score.substr(0, gameGod.duckAmount - gameGod.duckCounter - 1) + '1' + gameGod.score.substr(gameGod.duckAmount - gameGod.duckCounter - 1 + 1);
    document.querySelector("#score").innerHTML = gameGod.score;
  }

  function _changeScoreOnDuckFlyiesAway(ducksPanel) {
    // change duck icon color
    ducksPanel.children[gameGod.duckCounter].classList.add('shot-failed');
  }

  function _isDuckKilled() {
    return flyingDuck.style.display === 'none';
  }

  function _whenGameEnds() {
    soundsModule.endThemeSound();
    mainModule.showTextOnScreen('Game over', 10000000);
    gameGod.bulletCounter = 3;
    document.querySelector("#play-again").style.display = 'block';

    mainModule.hideScorePanel();
  }

})();

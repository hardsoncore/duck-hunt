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
  let duckFlightDuration = 4000;
  const duckFallingDelay = 1000;
  const dogReactionDuration = 2000;
  const bulletsPanel = document.querySelector('#score-panel__bullets');
  const ducksPanel = document.querySelector('#score-panel__ducks');
  const scoreElement = document.querySelector('#score');

  function _initBulletsAmount() {
    gameGod.bulletCounter = 0;
    for (let i = 0; i < gameGod.bulletAmount; i++) {
      bulletsPanel.children[i].style.display = 'block';
    }
  }

  function _clearDucksPanel() {
    gameGod.duckCounter = 0;
    for (let i = 0; i < gameGod.duckAmount; i++) {
      ducksPanel.children[i].classList.remove('shot-successful');
      ducksPanel.children[i].classList.remove('shot-failed');
    }
  }

  ducksModule.ducksFlightCycle = async function () {
    duckFlightDuration = Math.max(
      800,
      duckFlightDuration - gameGod.roundNumber * 100,
    );

    for (let i = 0; i < gameGod.duckAmount; i++) {
        await duckFlightStart();
        await afterDuckFlight(i);
    }

    _whenRoundEnds();
  };

  function duckFlightStart() {
    soundsModule.duckFlightSound();

    _initBulletsAmount();
    _drawFlyingDuck();

    return mainModule.timeDelay(duckFlightDuration);
  }

  function afterDuckFlight(i) {
    if (!_isDuckKilled()) _whenDuckFliesAway();

    // remove listener
    flyingDuck.removeEventListener('click', _onDuckKilling, true);

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

    return mainModule.timeDelay(duration);
  }

  function _drawFlyingDuck() {
    const startPoint = _getRandomHorizontalStartPoint();
    const endPoint = _getRandomHorizontalStartPoint();

    flyingDuck.style.display = 'block';
    // reset duck rotation before animation starts
    flyingDuck.style.transform = 'scaleX(1)';
    if (endPoint < startPoint) flyingDuck.style.transform = 'scaleX(-1)'; // change duck rotation

    _addDuckAnimation(flyingDuck, { x: startPoint, y: blockHeight }, { x: endPoint, y: -100 }, duckFlightDuration);

    flyingDuck.addEventListener('click', _onDuckKilling, true);
  }

  async function _onDuckKilling(ev) {
    if (!mainModule.areThereSomeBullets()) return;

    // hide flying duck
    flyingDuck.style.display = 'none';
    // show falling duck and add it animation
    fallingDuck.style.display = 'block';

    soundsModule.stopFlightSound();

    await _addDuckAnimation(fallingDuck, { x: ev.clientX, y: ev.clientY }, { x: ev.clientX, y: blockHeight }, duckFallingDelay);

    // make dog say wow
    dogModule.dogWow(ev.clientX, dogReactionDuration);
    // remove listener
    flyingDuck.removeEventListener('click', _onDuckKilling, true);
    // change score
    _changeScoreOnDuckKill();
  }

  function _whenDuckFliesAway() {
    soundsModule.stopFlightSound();

    // make dog laugh
    dogModule.dogLaughs(dogReactionDuration);
    _changeScoreOnDuckFliesAway();

    gameGod.errors++;
  }

  function _changeScoreOnDuckKill() {
    // change duck icon color
    ducksPanel.children[gameGod.duckCounter].classList.add('shot-successful');
    gameGod.duckCounter++;

    // change highscore
    const score = Number(gameGod.score) + gameGod.roundNumber;
    gameGod.score = String(score).padStart(5, '0');

    scoreElement.textContent = gameGod.score;
  }

  function _changeScoreOnDuckFliesAway() {
    // change duck icon color
    ducksPanel.children[gameGod.duckCounter].classList.add('shot-failed');
    gameGod.duckCounter++;
  }

  function _isDuckKilled() {
    return flyingDuck.style.display === 'none';
  }

  function _whenRoundEnds() {
    if (gameGod.errors >= 3) {
      soundsModule.endThemeSound();
      mainModule.showTextOnScreen('Game over <br> Your score: ' + gameGod.score, 10000000);
      gameGod.bulletCounter = 3;
      document.querySelector("#play-again").style.display = 'block';

      mainModule.hideScorePanel();
    }

    if (gameGod.errors < 3) {
      gameGod.roundNumber++;
      _clearDucksPanel();

      mainModule.nextRound();
    }
  }

})();

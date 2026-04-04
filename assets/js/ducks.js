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
  let directionFlipTimers = [];

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
    const mimimumFlightDuration = 800;

    duckFlightDuration = Math.max(
      mimimumFlightDuration,
      duckFlightDuration - (gameGod.roundNumber / 2) * 100, // change speed by reducing flight duration each round
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

    _clearDirectionFlipTimers();
    // remove listener
    flyingDuck.removeEventListener('click', _onDuckKilling, true);

    return mainModule.timeDelay(dogReactionDuration);
  }

  function _getRandomHorizontalStartPoint() {
    return Math.round(Math.random() * blockWidth);
  }

  function _clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function _buildBrokenTrajectory(start, end) {
    const horizontalOffsetLimit = 250;
    const firstPoint = {
      x: _clamp(
        start.x +
          (Math.random() * horizontalOffsetLimit * 2 - horizontalOffsetLimit),
        0,
        blockWidth,
      ),
      y: start.y - (blockHeight * 0.35 + Math.random() * blockHeight * 0.1),
    };
    const secondPoint = {
      x: _clamp(
        end.x +
          (Math.random() * horizontalOffsetLimit * 2 - horizontalOffsetLimit),
        0,
        blockWidth,
      ),
      y: start.y - (blockHeight * 0.7 + Math.random() * blockHeight * 0.1),
    };

    return [start, firstPoint, secondPoint, end];
  }

  function _buildDirectionSchedule(points) {
    let currentDirection = 1;

    return points.map((point, index) => {
      const nextPoint = points[index + 1];
      const previousPoint = points[index - 1];
      const deltaX = nextPoint
        ? nextPoint.x - point.x
        : previousPoint
          ? point.x - previousPoint.x
          : 0;

      if (deltaX > 0) currentDirection = 1;
      if (deltaX < 0) currentDirection = -1;

      return currentDirection;
    });
  }

  function _setDuckDirectionInstantly(direction) {
    flyingDuck.style.transform = 'scaleX(' + direction + ')';
  }

  function _clearDirectionFlipTimers() {
    directionFlipTimers.forEach((timerId) => clearTimeout(timerId));
    directionFlipTimers = [];
  }

  function _scheduleDirectionFlips(pathPoints, duration) {
    const directionSchedule = _buildDirectionSchedule(pathPoints);
    const segmentDuration = duration / Math.max(1, pathPoints.length - 1);

    _clearDirectionFlipTimers();

    directionSchedule.forEach((direction, index) => {
      const timerId = setTimeout(() => {
        _setDuckDirectionInstantly(direction);
      }, index * segmentDuration);

      directionFlipTimers.push(timerId);
    });
  }

  function _buildPositionKeyframes(points) {
    return points.map((point) => ({
      left: point.x + 'px',
      top: point.y + 'px',
    }));
  }

  function _addDuckAnimation(duck, start, end, duration, pathType = 'linear') {
    const pathPoints =
      pathType === 'broken' ? _buildBrokenTrajectory(start, end) : [start, end];
    const keyframes = _buildPositionKeyframes(pathPoints);

    duck.animate(keyframes, {
      // timing options
      duration: duration,
      // iterations: Infinity
    });

    if (duck === flyingDuck) _scheduleDirectionFlips(pathPoints, duration);

    return mainModule.timeDelay(duration);
  }

  function _drawFlyingDuck() {
    const startPoint = _getRandomHorizontalStartPoint();
    const endPoint = _getRandomHorizontalStartPoint();

    flyingDuck.style.display = 'block';
    flyingDuck.style.transform = 'scaleX(1)';

    _addDuckAnimation(
      flyingDuck,
      { x: startPoint, y: blockHeight },
      { x: endPoint, y: -100 },
      duckFlightDuration,
      'broken',
    );

    flyingDuck.addEventListener('click', _onDuckKilling, true);
  }

  async function _onDuckKilling(ev) {
    if (!mainModule.areThereSomeBullets()) return;

    // hide flying duck
    flyingDuck.style.display = 'none';
    // show falling duck and add it animation
    fallingDuck.style.display = 'block';

    soundsModule.stopFlightSound();
    _clearDirectionFlipTimers();

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
    const score = Number(gameGod.score) + gameGod.roundNumber * 5;
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
      mainModule.gameOver();
      return;
    }

    gameGod.roundNumber++;
    _clearDucksPanel();

    mainModule.nextRound();
  }

})();

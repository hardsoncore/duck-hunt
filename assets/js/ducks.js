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

  ducksModule.onClickDecreaseBulletsAmount = function() {
    if (gameGod.bulletCounter > 2) return;

    soundsModule.shootSound();

    setTimeout(function() {
      const bulletsPanel = document.querySelector("#score-panel__bullets");
      bulletsPanel.children[gameGod.bulletCounter].style.display = 'none';

      gameGod.bulletCounter++;
    }, 1);
  };

  function initBulletsAmount() {
    gameGod.bulletCounter = 0;
    const bulletsPanel = document.querySelector("#score-panel__bullets");
    for (let i = 0; i < gameGod.bulletAmount; i++) {
      bulletsPanel.children[i].style.display = 'block';
    }
  }

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
      initBulletsAmount();
      soundsModule.duckFlightSound();

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
        dogModule.dogWow(ev.screenX, dogReactionDuration, duckFallingDelay);
        // remove listener
        flyingDuck.removeEventListener('click', onDuckKilling, true);
        // change score
        changeScoreOnDuckKill();
      }

      function changeScoreOnDuckKill() {
        // change duck icon color
        const ducksPanel = document.querySelector("#score-panel__ducks");
        ducksPanel.children[gameGod.duckCounter].classList.add('shot-successful');

        // change highscore
        gameGod.score = gameGod.score.substr(0, gameGod.duckAmount - gameGod.duckCounter - 1) + '1' + gameGod.score.substr(gameGod.duckAmount - gameGod.duckCounter - 1 + 1);
        document.querySelector("#score").innerHTML = gameGod.score;
      }

      function changeScoreOnDuckFlyiesAway(ducksPanel) {
        // change duck icon color
        ducksPanel.children[gameGod.duckCounter].classList.add('shot-failed');
      }

      function whenDuckFlyiesAway() {
        // check is duck flew away
        const ducksPanel = document.querySelector("#score-panel__ducks");
        let duckKilled = ducksPanel.children[gameGod.duckCounter].classList.contains('shot-successful');

        // if user hit duck -> do nothing
        if (duckKilled) return;

        // make dog laugh
        dogModule.dogLaughs(dogReactionDuration);
        changeScoreOnDuckFlyiesAway(ducksPanel);
      }

      // calls when ducks flying animation time ends
      setTimeout(function() {
        whenDuckFlyiesAway();
        // remove listener
        flyingDuck.removeEventListener('click', onDuckKilling, true);
        gameGod.duckCounter++;
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
      soundsModule.endThemeSound();
      mainModule.showTextOnScreen('Game over', 10000000);
      gameGod.bulletCounter = 3;
      document.querySelector("#play-again").style.display = 'block';

      mainModule.hideScorePanel();
    }, delay);
  }

})();

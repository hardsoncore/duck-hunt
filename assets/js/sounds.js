const soundsModule = {};

(function () {
  'use strict';

  let duckFly;

  soundsModule.introSound = function () {
    _playWithDelay('./assets/sounds/bark1.m4a', 100);
  };

  soundsModule.duckFlightSound = function () {
    setTimeout(function () {
      duckFly = playSound('./assets/sounds/duck-fly-long.mp3');
    }, 100);
  };

  soundsModule.stopFlightSound = function () {
    if (duckFly && duckFly.isConnected) duckFly.remove();
    duckFly = null;
  };

  soundsModule.shootSound = function () {
    _playWithDelay('./assets/sounds/shoot.m4a', 0);
  };

  soundsModule.dogLaughSound = function () {
    _playWithDelay('./assets/sounds/hehehe.m4a', 0);
  };

  soundsModule.dogWowSound = function () {
    _playWithDelay('./assets/sounds/wow.m4a', 0);
  };

  soundsModule.endThemeSound = function () {
    _playWithDelay('./assets/sounds/end-theme.m4a', 0, true);
  };

  function _playWithDelay(url, delay, loop = false) {
    setTimeout(function () {
      playSound(url, loop);
    }, delay);
  }

  function playSound(url, loop = false) {
    const audio = document.createElement('audio');
    audio.style.display = 'none';

    audio.src = url;
    audio.autoplay = true;
    audio.loop = loop;

    if (!loop) {
      audio.onended = function () {
        audio.remove(); //Remove when played.
      };
    }

    document.body.appendChild(audio);

    return audio;
  }
})();

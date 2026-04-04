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
    _playWithDelay('./assets/sounds/end-theme.m4a', 0);
  };

  function _playWithDelay(url, delay) {
    setTimeout(function () {
      playSound(url);
    }, delay);
  }

  function playSound(url) {
    const audio = document.createElement('audio');
    audio.style.display = 'none';

    audio.src = url;
    audio.autoplay = true;
    audio.onended = function () {
      audio.remove(); //Remove when played.
    };
    document.body.appendChild(audio);

    return audio;
  }
})();

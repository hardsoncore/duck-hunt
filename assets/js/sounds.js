let soundsModule = {};

(function() {
  'use strict';

  let duckFly;

  soundsModule.introSound = function() {
    setTimeout(function() {
      playSound('./assets/sounds/bark1.m4a');
    }, 100);
  };

  soundsModule.duckFlightSound = function() {
    setTimeout(function() {
      duckFly = playSound('./assets/sounds/duck-fly-long.mp3');
    }, 100);
  };

  soundsModule.stopFlightSound = function () {
    duckFly.remove();
  };

  soundsModule.shootSound = function() {
    setTimeout(function() {
      playSound('./assets/sounds/shoot.m4a');
    }, 0);
  };

  soundsModule.dogLaughSound = function() {
    setTimeout(function() {
      playSound('./assets/sounds/hehehe.m4a');
    }, 0);
  };

  soundsModule.dogWowSound = function() {
    setTimeout(function() {
      playSound('./assets/sounds/wow.m4a');
    }, 0);
  };

  soundsModule.endThemeSound = function() {
    setTimeout(function() {
      playSound('./assets/sounds/end-theme.m4a');
    }, 0);
  };


  function playSound(url) {
    const audio = document.createElement('audio');
    audio.style.display = "none";

    audio.src = url;
    audio.autoplay = true;
    audio.onended = function() {
      audio.remove(); //Remove when played.
    };
    document.body.appendChild(audio);

    return audio;
  }
})();


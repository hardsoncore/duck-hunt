let soundsModule = {};

(function() {
  'use strict';

  soundsModule.introSound = function() {
    setTimeout(function() {
      playSound('./assets/sounds/bark1.m4a');
    }, 100);
  };

  soundsModule.duckFlightSound = function() {
    setTimeout(function() {
      playSound('./assets/sounds/duck-fly.m4a');
    }, 800);
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

  const audio = document.createElement('audio');
  audio.style.display = "none";

  function playSound(url) {
    audio.src = url;
    audio.autoplay = true;
    audio.onended = function() {
      audio.remove(); //Remove when played.
    };
    document.body.appendChild(audio);
  }
})();


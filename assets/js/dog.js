let dogModule = {};

(function() {
  'use strict';

  dogModule.dogIntro = async function (delay) {
    return _startDogIntro()
      .then(() => mainModule.timeDelay(delay))
      .then(() => _finishDogIntro());
  };

  async function _startDogIntro() {
    const div = document.createElement('div');
    div.classList.add('dog-intro');
    document.body.appendChild(div);

    soundsModule.introSound();
  }

  async function _finishDogIntro() {
    const dogIntroEl = document.getElementsByClassName('dog-intro')[0];
    dogIntroEl.remove();
  }

  dogModule.dogWow = function(position, duration) {
    const dog = document.querySelector("#dog");
    dog.style.display = 'block';
    dog.style.left = position + 'px';
    dog.classList.add('dog-catch-duck');

    soundsModule.dogWowSound();

    setTimeout(function() {
      dog.classList.remove('dog-catch-duck');
      dog.style.display = 'none';
    }, duration);
  };

  dogModule.dogLaughs = function(duration) {
    const dog = document.querySelector("#dog");
    dog.classList.add('dog-laughs');
    dog.style.display = 'block';

    soundsModule.dogLaughSound();

    setTimeout(function() {
      dog.classList.remove('dog-laughs');
      dog.style.display = 'none';
    }, duration);
  };

})();

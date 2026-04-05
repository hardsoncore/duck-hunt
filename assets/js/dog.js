const dogModule = {};

(function () {
  'use strict';

  dogModule.dogIntro = async function (delay) {
    await _startDogIntro();
    await mainModule.timeDelay(delay);
    _finishDogIntro();
  };

  function _startDogIntro() {
    const div = document.createElement('div');
    div.classList.add('dog-intro');
    document.body.appendChild(div);

    soundsModule.introSound();
  }

  function _finishDogIntro() {
    const dogIntroEl = document.getElementsByClassName('dog-intro')[0];
    if (dogIntroEl) dogIntroEl.remove();
  }

  dogModule.dogWow = function (position, duration) {
    const dog = document.querySelector('#dog');
    dog.style.display = 'block';
    dog.classList.add('dog-catch-duck');

    const dogWidth = dog.offsetWidth || 120;
    const centeredPosition = position - dogWidth / 2;

    dog.style.left = centeredPosition + 'px';

    soundsModule.dogWowSound();

    setTimeout(function () {
      dog.classList.remove('dog-catch-duck');
      dog.style.display = 'none';
    }, duration);
  };

  dogModule.dogLaughs = function (duration) {
    const dog = document.querySelector('#dog');
    dog.classList.add('dog-laughs');
    dog.style.display = 'block';

    soundsModule.dogLaughSound();

    setTimeout(function () {
      dog.classList.remove('dog-laughs');
      dog.style.display = 'none';
    }, duration);
  };
})();

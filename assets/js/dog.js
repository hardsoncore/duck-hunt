let dogModule = {};

(function() {
  'use strict';

  dogModule.dogIntro = function() {
    const div = document.createElement('div');
    div.classList.add('dog-intro');
    document.body.appendChild(div);
  };

  // remove block with dog intro when animation ends
  dogModule.dogIntroRemove = function(delay) {
    setTimeout(function() {
      const dogIntroEl = document.getElementsByClassName('dog-intro')[0];
      dogIntroEl.remove();
    }, delay + 100);
  };

  dogModule.dogWow = function(position, duration) {
    const dog = document.querySelector("#dog");
    dog.style.left = position + 'px';
    dog.classList.add('dog-catch-duck');

    setTimeout(function() {
      dog.classList.remove('dog-catch-duck');
    }, duration);
  };

  dogModule.dogLaughs = function(duration) {
    const dog = document.querySelector("#dog");
    dog.classList.add('dog-laughs');

    setTimeout(function() {
      dog.classList.remove('dog-laughs');
    }, duration);
  };

})();

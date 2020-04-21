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

  dogModule.dogWow = function(position, duration, delay) {
    setTimeout(function() {
      const dog = document.querySelector("#dog");
      dog.style.display = 'block';
      dog.style.left = position + 'px';
      dog.classList.add('dog-catch-duck');

      setTimeout(function() {
        dog.classList.remove('dog-catch-duck');
        dog.style.display = 'none';
      }, duration);
    }, delay);
  };

  dogModule.dogLaughs = function(duration) {
    const dog = document.querySelector("#dog");
    dog.classList.add('dog-laughs');
    dog.style.display = 'block';

    setTimeout(function() {
      dog.classList.remove('dog-laughs');
      dog.style.display = 'none';
    }, duration);
  };

})();

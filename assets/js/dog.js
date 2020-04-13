function dogIntro() {
  const div = document.createElement('div');
  div.classList.add('dog-intro');
  document.body.appendChild(div);
}

// remove block with dog intro when animation ends
function dogIntroRemove(delay) {
  setTimeout(function() {
    const dogIntroEl = document.getElementsByClassName('dog-intro')[0];
    dogIntroEl.remove();
  }, delay + 100);
}

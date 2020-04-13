const delayBetweenDuckFlights = 4000;

function startDucksFlight(delayBeforeFirstDuckAppears) {
  setTimeout(function() {
    duckFlight(0);
    duckFlight(delayBetweenDuckFlights);
    duckFlight(delayBetweenDuckFlights * 2);
    duckFlight(delayBetweenDuckFlights * 3);
    duckFlight(delayBetweenDuckFlights * 4);
  }, delayBeforeFirstDuckAppears);
}

function getRandomHorizontalStartPoint() {
  const stage = document.querySelector("#stage-background");
  const blockWidth = stage.clientWidth;

  return Math.round(Math.random() * blockWidth);
}

function duckFlight(delay) {
  setTimeout(function() {
    const duck = document.querySelector("#duck");
    const startPoint = getRandomHorizontalStartPoint();
    const endPoint   = getRandomHorizontalStartPoint();

    duck.style.display = 'block';
    // reset duck rotation before animation starts
    duck.style.transform = 'scaleX(1)';
    if ( endPoint < startPoint ) duck.style.transform = 'scaleX(-1)'; // change duck rotation

    duck.animate([
      { // from
        left: startPoint + 'px',
        bottom: 0
      },
      { // to
        left: endPoint + 'px',
        bottom: '100vh'
      }
    ], {
      // timing options
      duration: delayBetweenDuckFlights,
      // iterations: Infinity
    });

    duck.addEventListener('click', function() {
      alert('Перемога!');
      this.removeEventListener('click', arguments.callee, false);
    });
  }, delay);
}

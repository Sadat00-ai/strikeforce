// main.js - starts everything once the page has loaded

UI.init();
requestAnimationFrame(function (now) {
  lastTime = now;
  loop(now);
});

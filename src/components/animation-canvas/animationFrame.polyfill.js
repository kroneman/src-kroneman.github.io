/**
 * Normalize animation frame but give different name to avoid conflict with base
 */
window.requestAnimFrame = (function requestAnimFrame() {
  return (
    window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function customAnimationFrame(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
}());

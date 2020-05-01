/**
 * Normalize animation frame but give different name to avoid conflict with base
 */
window.requestAnimFrame = (function requestAnimFrame() {
  return (
    window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function customAnimationFrame(callback) {
      return window.setTimeout(callback, 1000 / 60);
    }
  );
}());

/**
 * Paired with above
 */
window.cancelAnimFrame = (function cancelAnimFrame() {
  return (
    window.cancelAnimationFrame
    || window.mozCancelAnimationFrame
    || function customCancelAnimationFrame(callback) {
      return window.clearTimeout(callback);
    }
  );
}());

/**
 * Credit David Walsh (https://davidwalsh.name/javascript-debounce-function)
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * @param {function} func
 * @param {number} wait
 * @param {boolean} immediate
 */
export function debounce(func, wait = 200, immediate = false) {
  let timeout;

  return function executedFunction() {
    const context = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    const later = function later() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

/**
 * Gets screen size
 * @param {boolean} isBoth returns object with both height and width
 * @param {boolean} isHeight
 * @returns {number} width or height of viewport
 */
export function getScreenSize(isBoth = false, isHeight = false) {
  const win = window;
  const doc = document;
  const { documentElement } = doc;
  const body = doc.getElementsByTagName('body')[0];

  if (isBoth) {
    return {
      width: win.innerWidth || documentElement.clientWidth || body.clientWidth,
      height: win.innerHeight || documentElement.clientHeight || body.clientHeight,
    };
  }

  if (isHeight) {
    return win.innerHeight || documentElement.clientHeight || body.clientHeight;
  }

  return win.innerWidth || documentElement.clientWidth || body.clientWidth;
}

/**
 * Credit: https://vanillajstoolkit.com/helpers/isinviewport/
 *
 * @param   {Node}    el      The element
 * @param   {number}  offset  the amount of fault tolerance outside of the viewport
 * @return  {Boolean}         Returns true if element is in the viewport
 */
export function isInViewport(el, offset = 0) {
  const buffer = 100;
  const {
    top, left, bottom, right,
  } = el.getBoundingClientRect();
  const bottomBound = (window.innerHeight || document.documentElement.clientHeight);
  const rightBound = (window.innerWidth || document.documentElement.clientWidth);
  return (
    top >= -(buffer + offset)
    && left >= -(buffer + offset)
    && bottom <= bottomBound + (buffer + offset)
    && right <= rightBound + (buffer + offset)
  );
}

export default {
  debounce,
  getScreenSize,
  isInViewport,
};

/**
 * @param {Object} obj
 * @param {String} key
 * @returns {Boolean}
 */
export function has(obj: object, key: string) {
  if (!obj) {
    return false;
  }

  return Object.prototype.hasOwnProperty.call(obj, key);
}

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
export function debounce(func: () => void, wait = 200, immediate = false) {
  let timeout: NodeJS.Timeout | null;

  return function executedFunction(...args: any[]) {
    // @ts-ignore
    const context: any = this;

    const later = function later() {
      timeout = null;
      if (!immediate) {
        // @ts-ignore
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);

    if (callNow) {
      // @ts-ignore
      func.apply(context, args);
    }
  };
}

/**
 * Credit: https://codeburst.io/throttling-and-debouncing-in-javascript-646d076d0a44
 * Throttling function modified slightly from original using fn.apply to add context
 * @param {Function} fn
 * @param {Number} [delay] at which to throttle
 */
export function throttle(fn: () => void, delay = 100) {
  const noop = () => {};
  let lastCall = 0;
  return function executionContext(...args: any[]) {
    // @ts-ignore
    const context = this;
    const now = Date.now();

    if (now - lastCall < delay) {
      return noop();
    }
    lastCall = now;
    // apply doesn't work on arrow functions
    // @ts-ignore
    return fn.apply(context, args);
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
export function isInViewport(el: Element, offset = 0) {
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

const utils = {
  debounce,
  getScreenSize,
  isInViewport,
}

export default utils;

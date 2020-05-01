// import { throttle, isInViewport } from '@/utils';

// https://codepen.io/MyXoToD/post/howto-self-drawing-svg-animation
const vendorPrefix = ['webkit', 'moz', 'MS', 'o', ''];


export default {
  props: {
    delayStart: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    hasSequenceStarted: false,
    animationListeners: [],
    animationIndex: 0,
    animationMapClass: 'animated-map',
    animationClass: 'svg-path-animation--start',
    itemsToAnimateSelector: '.flight-route',
    itemsToAnimate: null,
    animationLoopCount: 0,
    loopAnimation: 3,
    // Controls how long the animation 'holds' after it completes the path
    // Before Restarting the animation from the beginning
    loopRestartDelay: 1500,
    events: {
      // Start and iteration aren't being used
      // start: 'AnimationStart',
      // iteration: 'AnimationIteration',
      end: 'AnimationEnd',
    },
  }),
  mounted() {
    if (!this.animatedMap) {
      return;
    }

    this.$el.classList.add(this.animationMapClass);
    this.itemsToAnimate = this.$el.querySelectorAll(this.itemsToAnimateSelector);

    if (!this.itemsToAnimate) {
      return;
    }

    // window.addEventListener('scroll', this.onScroll);
    this.onScroll();
  },
  methods: {
    onScroll() {
      this.hasSequenceStarted = true;
      console.log(this.hasSequenceStarted);
      window.setTimeout(() => {
        this.animatepathsSequentially(this.itemsToAnimate);
      }, this.delayStart);
    },
    animatepathsSequentially(pathsToAnimate) {
      if (this.animationIndex >= pathsToAnimate.length) {
        this.checkLoop();
        return;
      }

      const currentPath = pathsToAnimate[this.animationIndex];
      const pathLength = currentPath.getTotalLength();

      currentPath.classList.add(this.animationClass);
      currentPath.setAttribute(
        'style',
        `
          stroke-dasharray: ${pathLength};
          stroke-dashoffset: ${pathLength};
        `,
      );

      this.animationListener(currentPath, () => {
        this.animationIndex += 1;
        this.animatepathsSequentially(pathsToAnimate);
      });
    },
    checkLoop() {
      // don't want to double bind
      const resetAnimationState = () => {
        this.removeListeners();
        this.itemsToAnimate.forEach((el) => {
          el.classList.remove(this.animationClass);
          el.removeAttribute('style');
        });
        this.animationIndex = 0;
      };


      // if null or false just stop
      if (!this.loopAnimation) {
        return;
      }

      if (this.loopAnimation === true) {
        setTimeout(() => {
          resetAnimationState();
          this.animatepathsSequentially(this.itemsToAnimate);
        }, this.loopRestartDelay);
        return;
      }

      // assume this.loopAnimation is a number beyond this point
      if (typeof this.loopAnimation !== 'number') {
        return;
      }

      if (this.animationLoopCount < this.loopAnimation) {
        setTimeout(() => {
          this.animationLoopCount += 1;
          resetAnimationState();
          this.animatepathsSequentially(this.itemsToAnimate);
        }, this.loopRestartDelay);
      }
    },
    animationListener(element, handler) {
      this.prefixEvent(element, this.events.end, handler);
    },
    prefixEvent(element, eventType, eventHandler) {
      const lenPrefix = vendorPrefix.length;
      for (let currentPrefix = 0; currentPrefix < lenPrefix; currentPrefix += 1) {
        const eventName = vendorPrefix[currentPrefix] === ''
          ? eventType.toLowerCase() : eventType;

        const eventConfig = {
          element,
          type: vendorPrefix[currentPrefix] + eventName,
          eventHandler,
        };

        this.animationListeners.push(eventConfig);
        element.addEventListener(eventConfig.type, eventHandler, false);
      }
    },
    removeListeners() {
      const numListeners = this.animationListeners.length;
      let current = 0;
      while (current < numListeners) {
        const currentEvent = this.animationListeners[current];
        currentEvent.element.removeEventListener(currentEvent.type, currentEvent.eventHandler, false);
        current += 1;
      }

      // to avoid an ever growing list of event listeners to unbind
      this.animationListeners = [];
    },
  },
};

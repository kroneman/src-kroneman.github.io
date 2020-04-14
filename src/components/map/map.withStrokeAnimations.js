// Used for unbinding events
const listeners = [];
const vendorPrefix = ['webkit', 'moz', 'MS', 'o', ''];
// https://codepen.io/MyXoToD/post/howto-self-drawing-svg-animation

export default {
  data: () => ({
    animationListeners: [],
    animationIndex: 0,
    animationClass: '',
    viewBox: null,
    itemsToAnimate: null,
    events: {
      start: 'AnimationStart',
      iteration: 'AnimationIteration',
      end: 'AnimationEnd',
    },
  }),
  mounted() {
    if (!this.animatedMap) {
      return;
    }

    this.fillColor = '#0e2c38';
    this.$el.classList.add('animated-map');
    this.viewBox = this.getViewBox();
    this.itemsToAnimate = this.$el.querySelectorAll('.flight-route');
    this.animationClass = 'svg-path-animation--start';

    if (!this.itemsToAnimate) {
      return;
    }

    this.animatepathsSequentially(this.itemsToAnimate);
  },
  methods: {
    getViewBox() {
      const svgEl = this.$el.querySelector('svg');
      const viewBoxAttribute = svgEl.getAttribute('viewBox');
      const mapSquaredArea = viewBoxAttribute.split(' ')
        .map((n) => parseInt(n, 10))
        // eslint-disable-next-line no-return-assign,no-param-reassign
        .reduce((result, current) => result += Math.abs(current), 0);
      this.scaleFactor = Math.floor(mapSquaredArea / 200);
      this.circleScaleFactor = Math.floor(this.scaleFactor * 0.66);
    },
    animatepathsSequentially(pathsToAnimate) {
      if (this.animationIndex >= pathsToAnimate.length) {
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
        debugger;
        this.animationIndex += 1;
        this.animatepathsSequentially(pathsToAnimate);
      });
    },
    prefixEvent(element, eventType, eventHandler) {
      const lenPrefix = vendorPrefix.length;
      for (let currentPrefix = 0; currentPrefix < lenPrefix; currentPrefix += 1) {
        if (!vendorPrefix[currentPrefix]) {
          // eslint-disable-next-line no-param-reassign
          eventType = eventType.toLowerCase();
        }

        listeners.push({
          element,
          eventType,
          eventHandler,
        });

        element.addEventListener(vendorPrefix[currentPrefix] + eventType, eventHandler, false);
      }
    },
    animationListener(element, handler) {
      this.prefixEvent(element, this.events.end, handler);
    },
    removeListeners() {
      const numListeners = this.animationListeners.length;
      let current = 0;
      while (current <= numListeners) {
        const currentEvent = numListeners[current];
        currentEvent.element.removeEventListener(currentEvent.type, currentEvent.callback);
        current += 1;
      }
    },
  },
};

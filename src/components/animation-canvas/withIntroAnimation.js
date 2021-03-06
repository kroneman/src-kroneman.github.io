import { getScreenSize, debounce } from '@/utils';

const listText = [
  'while(isAwake)',
  'research()',
  'design()',
  'prototype()',
  'test()',
  'bugfix()',
  'commit()',
  'refactor()',
  'review()',
  'enjoy()',
  'learn()',
  'repeat()',
];

const SECOND = 1000;
const DURATION = 15 * SECOND;
const { requestAnimFrame, cancelAnimFrame } = window;

export default {
  props: {},
  data() {
    return {
      currentPhaseIndex: 0,
      startedTimeStamp: null,
      screenSize: null,
      introAnimationFrameSet: null,
    };
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onIntroAnimationResize);
  },
  methods: {
    introInitAnimation() {
      this.$nextTick(() => {
        this.onIntroAnimationResize();
        window.addEventListener('resize', this.onIntroAnimationResize);
      });
    },
    introSkipAnimation() {
      const len = listText.length;
      this.currentPhaseIndex = len - 1;
      this.startedTimeStamp -= DURATION;
    },
    introReplayAnimation() {
      this.canvas = this.$el.querySelector('.canvas');
      this.context = this.canvas.getContext('2d');

      this.isAnimationDone = false;
      this.currentPhaseIndex = 0;
      this.startedTimeStamp = Date.now();
      this.timeStamp = this.startedTimeStamp;

      this.introSetCanvasBounds();
      this.introAnimationFrame();
    },
    onIntroAnimationResize: debounce(function onIntroAnimationResize() {
      const newScreenSize = getScreenSize(true);
      // mobile devices trigger resize when scrolling and address bar shows / hides
      if (this.screenSize && (this.screenSize.width === newScreenSize.width)) {
        return;
      }

      this.screenSize = newScreenSize;
      this.introReplayAnimation();
    }),
    introSetCanvasBounds() {
      const {
        canvas,
        context,
        deviceRatio,
      } = this;
      const { width, height } = getScreenSize(true);

      requestAnimFrame(() => {
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.width = width * deviceRatio;
        canvas.height = height * deviceRatio;
        context.scale(deviceRatio, deviceRatio);
      });
    },
    introAnimationFrame() {
      if (this.isAnimationDone) {
        this.introAnimationFrameSet = cancelAnimFrame(this.introAnimationFrameSet);
        return () => {};
      }

      if (Date.now() < (this.timeStamp + Math.floor(2000 / 15))) {
        cancelAnimFrame(this.introAnimationFrameSet);
        this.introAnimationFrameSet = requestAnimFrame(this.introAnimationFrame);
        return this.introAnimationFrameSet;
      }

      this.introDraw();

      this.timeStamp = Date.now();
      cancelAnimFrame(this.introAnimationFrameSet);
      this.introAnimationFrameSet = requestAnimFrame(this.introAnimationFrame);
      return this.introAnimationFrameSet;
    },
    introDraw() {
      const { width, height } = getScreenSize(true);
      const x = width / 2;
      const y = height / 2;

      this.isAnimationDone = this.introAnimationIsDone();

      listText.forEach((text, i) => {
        if (i === 0) {
          return;
        }

        const len = listText.length;
        const atTime = Math.floor(DURATION / len) * i;
        this.setPhase(atTime, i);
      });

      requestAnimFrame(() => {
        this.introDrawText({
          x,
          y,
          currentItem: listText[this.currentPhaseIndex],
        });

        this.$nextTick(() => {
          if (this.canvasOpacity !== 1) {
            this.canvasOpacity = 1;
          }
        });
      });
    },
    introDrawText({
      x,
      y,
      currentItem,
    }) {
      const { context } = this;
      const { width, height } = getScreenSize(true);
      const fontSize = width / 10;
      context.stroke = '#fff';
      context.fillStyle = '#fff';
      context.font = `${fontSize}px serif`;

      this.context.clearRect(0, 0, width, height);
      const textSize = context.measureText(`${currentItem}`);
      const xAdjustedToCenter = x - (textSize.width / 2);
      context.fillText(`${currentItem}`, xAdjustedToCenter, y);
    },
    timePassed() {
      return Date.now() - this.startedTimeStamp;
    },
    setPhase(startAtTime, index) {
      if (this.timePassed() > startAtTime && this.currentPhaseIndex < index) {
        this.canvasOpacity = 0;
        this.currentPhaseIndex = index;
      }
    },
    introAnimationIsDone() {
      return this.timePassed() > DURATION;
    },
  },
};

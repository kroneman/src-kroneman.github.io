import { debounce, getScreenSize } from '@/utils';

export default {
  data() {
    return {
      circleAnimationRadius: 8,
      circleAnimation: null,
      deviceRatio: 1,
      screenSize: getScreenSize(true),
    };
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onCircleAnimationResize);
  },
  computed: {
    circleCenter() {
      const { width, height } = this.screenSize;
      return {
        x: width / 2,
        y: height / 2,
      };
    },
  },
  methods: {
    // Called on mounted
    initCircleAnimation() {
      this.$nextTick(() => {
        this.deviceRatio = window.devicePixelRatio;
        this.onCircleAnimationResize();
        window.addEventListener('resize', this.onCircleAnimationResize);
      });
    },
    onCircleAnimationResize: debounce(function onCircleAnimationResize() {
      const newScreenSize = getScreenSize(true);
      // mobile devices trigger resize when scrolling and address bar shows / hides
      if (this.screenSize && (this.screenSize.width === newScreenSize.width)) {
        return;
      }

      this.canvasOpacity = 0.1;
      this.screenSize = newScreenSize;
      this.canvas = this.$el.querySelector('.canvas');
      this.context = this.canvas.getContext('2d');

      this.circleAnimationRadius = 8;
      this.context.clearRect(0, 0, this.screenSize.width, this.screenSize.height);

      this.setCircleCanvasBounds();
      this.drawCircle();
    }, 100),
    setCircleCanvasBounds() {
      const { canvas, screenSize } = this;
      const { width, height } = screenSize;
      requestAnimationFrame(() => {
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.width = width;
        canvas.height = height;
      });
    },
    createCircle() {
      const { context, circleCenter } = this;
      const { x, y } = circleCenter;
      this.circleAnimationRadius += 20;
      const radius = this.circleAnimationRadius;
      const startAngle = Math.PI * Math.random();
      const endAngle = Math.PI * Math.random() * 2;

      context.beginPath();
      context.arc(
        x,
        y,
        radius,
        startAngle,
        endAngle,
      );

      const lineOpacity = Math.random();
      const lineWidth = Math.floor(Math.random() * 20 + 4);
      context.strokeStyle = `rgba(0, 0, 0, ${lineOpacity})`;
      context.lineWidth = lineWidth;

      context.stroke();
      this.drawCircle();
    },
    drawCircle() {
      const { circleAnimationRadius } = this;
      const minDimension = this.canvas.height;
      const isRunning = circleAnimationRadius < (minDimension / window.devicePixelRatio);
      if (isRunning) {
        this.circleAnimation = requestAnimationFrame(this.createCircle);
      } else {
        cancelAnimationFrame(this.circleAnimation);
        this.circleAnimation = null;
        this.canvasOpacity = 0.1;
      }
    },
  },
};

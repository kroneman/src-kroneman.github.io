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
      this.canvasOpacity = 0.1;
      this.screenSize = getScreenSize(true);
      this.canvas = this.$el.querySelector('.canvas');
      this.context = this.canvas.getContext('2d');
      this.circleAnimationRadius = 8;
      this.context.clearRect(0, 0, this.screenSize.width, this.screenSize.height);
      this.setCanvasBounds();
      this.drawCircle();
    }, 100),
    setCanvasBounds() {
      const {
        canvas,
        context,
        deviceRatio,
        screenSize,
      } = this;
      const { width, height } = screenSize;

      requestAnimationFrame(() => {
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.width = width * deviceRatio;
        canvas.height = height * deviceRatio;
        context.scale(deviceRatio, deviceRatio);
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


export default {
  data() {
    return {
      circleAnimationRadius: 8,
      circleAnimation: null,
    };
  },
  methods: {
    // Called on mounted
    initCircleAnimation() {
      this.canvas = this.$el.querySelector('.canvas');
      this.context = this.canvas.getContext('2d');

      this.loop();
      this.drawCircle();
    },
    loop() {
      requestAnimationFrame(() => {
        const { canvas, context } = this;
        const ratio = window.devicePixelRatio;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        canvas.width = window.innerWidth * ratio;
        canvas.height = window.innerHeight * ratio;
        context.scale(ratio, ratio);
      });
    },
    createCircle() {
      const { context } = this;
      this.circleAnimationRadius += 20;
      context.beginPath();
      context.arc(
        window.innerWidth / 2,
        window.innerHeight / 2,
        this.circleAnimationRadius,
        Math.PI * Math.random(),
        Math.PI * Math.random() * 2,
      );

      context.strokeStyle = `rgba(0, 0, 0, ${Math.random()})`;
      context.lineWidth = Math.floor(Math.random() * 20 + 4);
      context.stroke();
      this.drawCircle();
    },
    drawCircle() {
      const { circleAnimationRadius, canvas } = this;
      // Prefer just using height, looks better on both types of devices
      // const minDimension = Math.min(canvas.width, canvas.height);
      const minDimension = canvas.height;
      const isRunning = circleAnimationRadius < (minDimension / (2 * window.devicePixelRatio));
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

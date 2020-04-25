<template>
  <div class="animation-canvas" :style="{ opacity: canvasOpacity }">
    <canvas class="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'AnimationCanvas',
  data() {
    return {
      canvasOpacity: 0,
      radius: 8,
      animation: null,
      canvas: null,
      context: null,
    };
  },
  mounted() {
    this.canvas = document.querySelector('.canvas');
    this.context = this.canvas.getContext('2d');
    this.loop();
    this.drawCircle();
  },
  methods: {
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
      this.radius += 20;
      context.beginPath();
      context.arc(
        window.innerWidth / 2,
        window.innerHeight / 2,
        this.radius,
        Math.PI * Math.random(),
        Math.PI * Math.random() * 2,
      );

      context.strokeStyle = `rgba(0, 0, 0, ${Math.random()})`;
      context.lineWidth = Math.floor(Math.random() * 20 + 4);
      context.stroke();
      this.drawCircle();
    },
    drawCircle() {
      const { radius, canvas } = this;
      const isRunning = radius < (canvas.width / 2);
      if (isRunning) {
        this.animation = requestAnimationFrame(this.createCircle);
      } else {
        cancelAnimationFrame(this.animation);
        this.animation = null;
        this.canvasOpacity = 0.1;
      }
    },
  },
};
</script>

<style lang="scss">
@import './animation-canvas.scss';
</style>

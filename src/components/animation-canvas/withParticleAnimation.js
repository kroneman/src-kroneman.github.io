import { throttle, isInViewport } from '@/utils';
import Particle, { colorPalette } from './Particle';

export default {
  props: {
    particleNumber: {
      type: Number,
      default: 150,
    },
  },
  data() {
    return {
      particleAnimationStarted: false,
      timeStamp: null,
      particleArray: [],
    };
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setCanvasBounds);
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    initParticleAnimation() {
      this.canvas = this.$el.querySelector('.canvas');
      this.context = this.canvas.getContext('2d');

      this.timeStamp = Date.now();
      this.canvasOpacity = 1;

      window.addEventListener('resize', this.setCanvasBounds);
      window.addEventListener('scroll', this.onScroll);
    },
    onScroll: throttle(function onScroll() {
      if (this.particleAnimationStarted) {
        window.removeEventListener('scroll', this.onScroll);
        return;
      }

      if (!isInViewport(this.$el, 500)) {
        return;
      }

      this.particleAnimationStarted = true;
      this.setCanvasBounds();
      this.frame();
      this.createParticles(this.particleNumber);
    }, 100),
    setCanvasBounds() {
      const { canvas } = this;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (this.particleArray.length) {
        this.particleArray = this.particleArray.map((p) => p.onResize(canvas));
      }
    },
    frame() {
      if (Date.now() < (this.timeStamp + Math.floor(1000 / 60))) {
        return window.requestAnimFrame(this.frame);
      }

      this.drawBackground(colorPalette.bg);
      this.particleArray = this.particleArray.map((p) => p.updatePath());
      this.particleArray.forEach((p) => p.draw(this.context));

      this.timeStamp = Date.now();
      return window.requestAnimFrame(this.frame);
    },
    createParticles(amount = 0, x, y) {
      let numParticles = amount;
      const { canvas, context } = this;
      while (numParticles > 0) {
        this.particleArray.push(new Particle(x, y, canvas));
        numParticles -= 1;
      }

      this.particleArray.forEach((p) => p.draw(context));
    },
    drawBackground(color) {
      const { context } = this;
      // eslint-disable-next-line no-param-reassign
      context.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
      context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
  },
};

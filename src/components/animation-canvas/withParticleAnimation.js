import { throttle, isInViewport, getScreenSize } from '@/utils';
import Particle, { colorPalette } from './Particle';

const { requestAnimFrame } = window;
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
      screenSize: null,
    };
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setParticleCanvasBounds);
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    initParticleAnimation() {
      this.canvas = this.$el.querySelector('.canvas');
      this.context = this.canvas.getContext('2d');

      this.timeStamp = Date.now();
      this.canvasOpacity = 1;

      window.addEventListener('resize', this.setParticleCanvasBounds);
      window.addEventListener('scroll', this.onScroll);
    },
    onScroll: throttle(function onScroll() {
      if (this.particleAnimationStarted) {
        window.removeEventListener('scroll', this.onScroll);
        return;
      }

      if (!isInViewport(this.$el, 1000)) {
        return;
      }

      this.particleAnimationStarted = true;
      this.setParticleCanvasBounds();
      this.particleAnimationFrame();
      this.createParticles(this.particleNumber);
    }, 100),
    setParticleCanvasBounds() {
      const newScreenSize = getScreenSize(true);
      // mobile devices trigger resize when scrolling and address bar shows / hides
      if (this.screenSize && (this.screenSize.width === newScreenSize.width)) {
        return;
      }

      requestAnimFrame(() => {
        this.screenSize = newScreenSize;
        const { canvas } = this;
        const { width, height } = getScreenSize(true);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.width = width;
        canvas.height = height;
        if (this.particleArray.length) {
          this.particleArray = this.particleArray.map((p) => p.onResize(canvas));
        }
      });
    },
    particleAnimationFrame() {
      if (Date.now() < (this.timeStamp + Math.floor(1000 / 60))) {
        return requestAnimFrame(this.particleAnimationFrame);
      }

      this.particleAnimationDrawBackground(colorPalette.bg);
      this.particleArray = this.particleArray.map((p) => p.updatePath());
      this.particleArray.forEach((p) => p.draw(this.context));

      this.timeStamp = Date.now();
      return requestAnimFrame(this.particleAnimationFrame);
    },
    createParticles(amount = 0, x, y) {
      let numParticles = amount;
      while (numParticles > 0) {
        this.particleArray.push(
          new Particle(x, y, this.canvas),
        );
        numParticles -= 1;
      }

      this.particleArray.forEach(
        (p) => p.draw(this.context),
      );
    },
    particleAnimationDrawBackground(color) {
      const { context } = this;
      // eslint-disable-next-line no-param-reassign
      context.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
      context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
  },
};

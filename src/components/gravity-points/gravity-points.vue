<template>
  <canvas class="canvas gravity-point_canvas" id="c"></canvas>
</template>

<script>
import { getScreenSize } from '@/utils';
import Vector from './Vector';
import Particle from './Particle';
import GravityPoint from './GravityPoint';

const config = {
  BACKGROUND_COLOR: 'rgba(255, 255, 255, 1)',
  PARTICLE_COLOR: 'rgba(52, 61, 70, .1)',
  particleNum: 150,
  PARTICLE_RADIUS: 1,
  G_POINT_RADIUS: 10,
};

const mouse = new Vector();
const gravities = [];
const particles = [];

let bufferCtx;
let screenWidth;
let screenHeight;
let grad;

export default {
  name: 'GravityPoints',
  data() {
    return {
      canvas: null,
      context: null,
      timeStamp: null,
      animationFrame: null,
      bufferCvs: null,
    };
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      this.loop();
    });
  },
  methods: {
    init() {
      this.canvas = this.$el;
      this.bufferCvs = document.createElement('canvas');

      window.addEventListener('resize', this.resize, false);

      this.$nextTick(() => {
        this.resize(null);

        this.addParticle(config.particleNum);

        const screenSize = getScreenSize(true);
        const x = screenSize.width / 2;
        const y = screenSize.height / 2;
        this.x = x;
        this.y = y;

        gravities.push(new GravityPoint(x, y, config.G_POINT_RADIUS, {
          particles,
          gravities,
        }));

        this.canvas.addEventListener('mousemove', this.mouseMove, false);
        this.canvas.addEventListener('mousedown', this.mouseDown, false);
        this.canvas.addEventListener('mouseup', this.mouseUp, false);
        this.canvas.addEventListener('dblclick', this.doubleClick, false);

        this.timeStamp = Date.now();
        this.animationFrame = null;
      });
    },
    loop() {
      const lenGravities = gravities.length;
      let i;
      let len;
      let g;
      let p;

      if (lenGravities === 0) {
        console.log('creating new center gravity point');
        gravities.push(
          new GravityPoint(this.x, this.y, config.G_POINT_RADIUS, {
            particles,
            gravities,
          }),
        );
      }

      if (Date.now() < (this.timeStamp + Math.floor(1000 / 30))) {
        return requestAnimationFrame(this.loop);
      }

      this.timeStamp = Date.now();
      const { context } = this;
      context.save();
      context.fillStyle = config.BACKGROUND_COLOR;
      context.fillRect(0, 0, screenWidth, screenHeight);
      context.fillStyle = config.GRAVITY_COLOR;
      context.restore();

      for (i = 0, len = gravities.length; i < len; i += 1) {
        g = gravities[i];
        if (g.dragging) g.drag(mouse);
        g.render(context);
        if (g.destroyed) {
          gravities.splice(i, 1);
          len -= 1;
          i -= 1;
        }
      }

      bufferCtx.save();
      bufferCtx.globalCompositeOperation = 'destination-out';
      bufferCtx.globalAlpha = 0.35;
      bufferCtx.fillRect(0, 0, screenWidth, screenHeight);
      bufferCtx.restore();

      len = particles.length;
      bufferCtx.save();

      bufferCtx.strokeStyle = config.PARTICLE_COLOR;
      bufferCtx.fillStyle = config.PARTICLE_COLOR;
      bufferCtx.lineJoin = 'round';
      bufferCtx.lineCap = bufferCtx.lineJoin;
      bufferCtx.lineWidth = config.PARTICLE_RADIUS * 2;
      bufferCtx.beginPath();

      for (i = 0; i < len; i += 1) {
        p = particles[i];
        p.update();
        bufferCtx.moveTo(p.x, p.y);
        bufferCtx.lineTo(p.latest.x, p.latest.y);
      }
      bufferCtx.stroke();

      bufferCtx.beginPath();
      for (i = 0; i < len; i += 1) {
        p = particles[i];
        bufferCtx.moveTo(p.x, p.y);
        bufferCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
      }
      bufferCtx.fill();
      bufferCtx.restore();

      context.drawImage(this.bufferCvs, 0, 0);

      return requestAnimationFrame(this.loop);
    },
    addParticle(num) {
      const { PARTICLE_RADIUS } = config;
      let i;
      let p;
      for (i = 0; i < num; i += 1) {
        p = new Particle(
          Math.floor(Math.random() * screenWidth - PARTICLE_RADIUS * 2) + 1 + PARTICLE_RADIUS,
          Math.floor(Math.random() * screenHeight - PARTICLE_RADIUS * 2) + 1 + PARTICLE_RADIUS,
          PARTICLE_RADIUS,
        );
        p.addSpeed(Vector.random());
        particles.push(p);
      }
    },
    removeParticle(num) {
      const len = particles.length < num ? particles.length : num;
      for (let i = 0; i < len; i += 1) {
        particles.pop();
      }
    },
    resize() {
      const { canvas, bufferCvs } = this;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      screenWidth = canvas.width;
      screenHeight = canvas.height;

      bufferCvs.width = screenWidth;
      bufferCvs.height = screenHeight;

      this.context = canvas.getContext('2d');
      bufferCtx = bufferCvs.getContext('2d');

      const cx = canvas.width * 0.5;
      const cy = canvas.height * 0.5;

      // add gravity point in center
      grad = this.context.createRadialGradient(cx, cy, 0, cx, cy, Math.sqrt(cx * cx + cy * cy));
      grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.35)');
    },
    mouseMove(e) {
      mouse.set(e.clientX, e.clientY);

      let i;
      let g;
      let hit = false;
      for (i = gravities.length - 1; i >= 0; i -= 1) {
        g = gravities[i];
        if ((!hit && g.hitTest(mouse)) || g.dragging) {
          hit = true;
          g.isMouseOver = true;
        } else {
          g.isMouseOver = false;
        }
      }

      this.canvas.style.cursor = hit ? 'pointer' : 'default';
    },
    mouseDown(e) {
      const { G_POINT_RADIUS } = config;
      for (let i = gravities.length - 1; i >= 0; i -= 1) {
        if (gravities[i].isMouseOver) {
          gravities[i].startDrag(mouse);
          return;
        }
      }
      gravities.push(
        new GravityPoint(e.clientX, e.clientY, G_POINT_RADIUS, {
          particles,
          gravities,
        }),
      );
    },
    mouseUp(e) {
      console.log(e);
      for (let i = 0, len = gravities.length; i < len; i += 1) {
        if (gravities[i].dragging) {
          gravities[i].endDrag();
          break;
        }
      }
    },
    doubleClick(e) {
      console.log(e);
      for (let i = gravities.length - 1; i >= 0; i -= 1) {
        if (gravities[i].isMouseOver) {
          gravities[i].collapse();
          break;
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import './gravity-points.scss';
</style>

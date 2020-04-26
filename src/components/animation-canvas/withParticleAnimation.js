import './animationFrame.polyfill';

// Configuration, Play with these
const config = {
  particleNumber: 200,
  maxParticleSize: 3,
  maxSpeed: 2,
};

// Colors
const colorPalette = {
  bg: { r: 255, g: 255, b: 255 },
  matter: [
    { r: 52, g: 61, b: 70 }, // darkPRPL
    { r: 79, g: 91, b: 102 }, // rockDust
    { r: 101, g: 115, b: 126 }, // solorFlare
    { r: 167, g: 173, b: 186 }, // totesASun
  ],
  randomMatterColor() {
    const randomIndex = Math.floor(Math.random() * this.matter.length);
    return this.matter[randomIndex];
  },
};

class Particle {
  constructor(x, y, canvas) {
    this.canvas = canvas;

    // X Coordinate
    this.x = x || Math.round(Math.random() * canvas.width);
    // Y Coordinate
    this.y = y || Math.round(Math.random() * canvas.height);
    // Radius of the space dust
    this.radius = Math.max(
      Math.ceil(Math.random() * config.maxParticleSize),
      1, // creates a min radius of 5
    );
    // Color of the rock, given some randomness
    this.color = Particle.colorVariation(colorPalette.randomMatterColor());
    // Speed of which the rock travels
    this.speed = 0.1;
    this.direction = Math.round(Math.random() * 360);

    this.isDirectionUp = this.direction > 0 && this.direction < 180;
    this.isDirectionDown = this.direction > 90 && this.direction < 270;
  }

  static colorVariation(color) {
    const { r, g, b } = color;
    const a = Math.random() * 0.3;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  particlePath() {
    const {
      isDirectionUp,
      isDirectionDown,
      speed,
      direction,
      canvas,
    } = this;

    const a = 180 - (direction + 90); // find the 3rd angle
    const sinSpeed = Math.sin(speed);
    const speedDivSinSpeed = speed / sinSpeed;
    const xCalculation = Math.sin(direction) * speedDivSinSpeed;
    const yCalculation = Math.cos(a) * speedDivSinSpeed;

    const updatedCoordinates = {
      x: this.x + (isDirectionUp ? xCalculation : -xCalculation),
      y: this.y + (isDirectionDown ? yCalculation : -yCalculation),
    };

    const xRandom = Math.round(Math.random() * canvas.width);
    const yRandom = Math.round(Math.random() * canvas.height);

    this.x = (
      updatedCoordinates.x < 10
      || updatedCoordinates.x > canvas.width
    ) ? xRandom : updatedCoordinates.x;
    this.y = (
      updatedCoordinates.y < 10
      || updatedCoordinates.y > canvas.height
    ) ? yRandom : updatedCoordinates.y;

    return this;
  }
}


export default {
  data() {
    return {
      timeStamp: null,
      particleArray: [],
    };
  },
  methods: {
    initParticleAnimation() {
      this.canvas = this.$el.querySelector('.canvas');
      this.context = this.canvas.getContext('2d');

      this.timeStamp = Date.now();
      this.canvasOpacity = 1;

      const { canvas, context } = this;
      const ratio = window.devicePixelRatio;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      context.scale(ratio, ratio);

      this.frame();
      this.createParticles(config.particleNumber);
    },
    frame() {
      if (Date.now() < (this.timeStamp + Math.floor(1000 / 60))) {
        return window.requestAnimFrame(this.frame);
      }

      this.drawBg(colorPalette.bg);
      this.particleArray = this.particleArray.map((p) => p.particlePath());
      this.particleArray.forEach((p) => this.drawParticle(p));

      this.timeStamp = Date.now();
      return window.requestAnimFrame(this.frame);
    },
    createParticles(amount = 0, x, y) {
      let numParticles = amount;
      const { canvas } = this;
      while (numParticles > 0) {
        this.particleArray.push(new Particle(x, y, canvas));
        numParticles -= 1;
      }

      this.particleArray.forEach((p) => this.drawParticle(p));
    },
    drawBg(color) {
      const { context } = this;
      // eslint-disable-next-line no-param-reassign
      context.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
      context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    drawParticle(p) {
      const {
        x,
        y,
        radius,
        color,
      } = p;
      const { context } = this;
      context.beginPath();
      context.fillStyle = color;
      context.arc(x, y, radius, 0, 2 * Math.PI, false);
      context.fill();
      context.closePath();
    },
  },
};

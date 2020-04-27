export const randomWithin = (upperBound = 1) => Math.floor(Math.random() * upperBound);

// Colors
export const colorPalette = {
  bg: { r: 255, g: 255, b: 255 },
  matter: [
    { r: 52, g: 61, b: 70 },
    { r: 79, g: 91, b: 102 },
    { r: 101, g: 115, b: 126 },
    { r: 167, g: 173, b: 186 },
  ],
  randomMatterColor() {
    const randomIndex = randomWithin(this.matter.length);
    return this.matter[randomIndex];
  },
};

export default class Particle {
  constructor(x, y, canvas, maxParticleSize = 6) {
    this.canvas = canvas;

    // Location
    this.x = x || randomWithin(canvas.width);
    this.y = y || randomWithin(canvas.height);

    // Constraints
    this.lowerBounds = { x: 0, y: 0 };
    this.upperBounds = {
      x: canvas.width,
      y: canvas.height,
    };

    // Movement
    this.speed = 2 / 10;
    this.direction = randomWithin(360);
    this.directionInRadians = (this.direction * Math.PI) / 180;

    // Look
    this.radius = Math.max(Math.ceil(Math.random() * maxParticleSize), 1);
    this.color = Particle.colorVariation(colorPalette.randomMatterColor());
  }

  static colorVariation(color) {
    const { r, g, b } = color;
    const a = Math.random() * 0.3;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  updatePath() {
    const {
      speed,
      directionInRadians,
      x,
      y,
    } = this;

    const updatedCoordinates = {
      x: x + (Math.cos(directionInRadians) * speed),
      y: y + (Math.sin(directionInRadians) * speed),
    };

    if (!this.isWithinBounds(updatedCoordinates)) {
      this.reverseDirection();
      return this;
    }

    this.x = updatedCoordinates.x;
    this.y = updatedCoordinates.y;
    return this;
  }

  reverseDirection() {
    this.direction = this.direction >= 180
      ? this.direction - 180 : this.direction + 180;

    this.directionInRadians = (this.direction * Math.PI) / 180;
  }

  isWithinBounds({ x, y }) {
    const { lowerBounds, upperBounds } = this;
    if (x < lowerBounds.x) {
      this.x = Math.max(x, lowerBounds.x);
      return false;
    }

    if (y < lowerBounds.y) {
      this.y = Math.max(y, lowerBounds.y);
      return false;
    }

    if (x > upperBounds.x) {
      this.x = Math.min(x, upperBounds.x);
      return false;
    }

    if (y > upperBounds.y) {
      this.y = Math.min(y, upperBounds.y);
      return false;
    }

    return true;
  }

  draw(context) {
    context.beginPath();
    // eslint-disable-next-line no-param-reassign
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.fill();
    context.closePath();
  }
}

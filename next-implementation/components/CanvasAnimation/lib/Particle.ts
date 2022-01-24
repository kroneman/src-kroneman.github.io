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
  private canvas: any;
  private x: number;
  private y: number;

  private lowerBounds: { x: number; y: number };
  private upperBounds: { x: any; y: any };
  private speed: number;
  private direction: number;
  private directionInRadians: number;

  private readonly radius: number;
  private readonly color: string;


  constructor(canvas: any, maxParticleSize = 6, x?: number, y?: number) {
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

  static colorVariation(color: { r: any; g: any; b: any; }) {
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

  onResize(canvas: any) {
    this.updateBounds(canvas);
    this.randomizeLocation(canvas);
    return this;
  }

  updateBounds(canvas: any) {
    this.upperBounds = {
      x: canvas.width,
      y: canvas.height,
    };
    return this;
  }

  randomizeLocation(canvas: any) {
    this.x = randomWithin(canvas.width);
    this.y = randomWithin(canvas.height);
    return this;
  }

  isWithinBounds({ x, y }: { x: number, y: number }) {
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

  draw(context: any) {
    context.beginPath();

    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.fill();
    context.closePath();
  }
}

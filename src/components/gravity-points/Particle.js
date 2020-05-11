import Vector from './Vector';

export default class Particle extends Vector {
  constructor(x, y, radius) {
    super(x, y);
    this.radius = radius;
    this.latest = new Vector();
    this.speed = new Vector();
  }

  addSpeed(d) {
    this.speed.add(d);
  }

  update() {
    if (this.speed.length() > 12) this.speed.normalize().scale(12);

    this.latest.set(this);
    this.add(this.speed);
  }
}

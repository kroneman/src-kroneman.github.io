import Vector from './Vector';

const RADIUS_LIMIT = 20;
const interferenceToPoint = true;

class GravityPoint extends Vector {
  constructor(x, y, radius, targets) {
    super(x, y);

    this.radius = radius;
    this.currentRadius = radius * 0.5;

    this.targets = {
      particles: targets.particles || [],
      gravities: targets.gravities || [],
    };
    this.speed = new Vector();

    // Possibly needs to be moved
    this.gravity = 0.05;
    this.isMouseOver = false;
    this.dragging = false;
    this.destroyed = false;
    this.easeRadius = 0;
    this.dragDistance = null;
    this.isCollapsing = false;
  }

  hitTest(p) {
    return this.distanceTo(p) < this.radius;
  }

  startDrag(dragStartPoint) {
    this.dragDistance = Vector.sub(dragStartPoint, this);
    this.dragging = true;
  }

  drag(dragToPoint) {
    this.x = dragToPoint.x - this.dragDistance.x;
    this.y = dragToPoint.y - this.dragDistance.y;
  }

  endDrag() {
    this.dragDistance = null;
    this.dragging = false;
  }

  addSpeed(d) {
    this.speed = this.speed.add(d);
  }

  collapse() {
    this.currentRadius *= 1.75;
    this.isCollapsing = true;
  }

  render(ctx) {
    if (this.destroyed) {
      return;
    }

    const { particles } = this.targets;
    let i;
    let len;
    for (i = 0, len = particles.length; i < len; i += 1) {
      particles[i].addSpeed(
        Vector.sub(this, particles[i])
          .normalize()
          .scale(this.gravity),
      );
    }

    this.easeRadius = (this.easeRadius + (this.radius - this.currentRadius) * 0.07) * 0.95;
    this.currentRadius += this.easeRadius;
    if (this.currentRadius < 0) {
      this.currentRadius = 0;
    }

    if (this.isCollapsing) {
      this.radius *= 0.75;
      if (this.currentRadius < 1) this.destroyed = true;
      this.draw(ctx);
      return;
    }

    const area = this.radius * this.radius * Math.PI;
    const { gravities } = this.targets;

    let g;
    let absorp;
    let garea;

    for (i = 0, len = gravities.length; i < len; i += 1) {
      g = gravities[i];

      if (g === this || g.destroyed) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (
        (this.currentRadius >= g.radius || this.dragging)
        && this.distanceTo(g) < (this.currentRadius + g.radius) * 0.85
      ) {
        g.destroyed = true;
        this.gravity += g.gravity;

        absorp = Vector.sub(g, this).scale((g.radius / this.radius) * 0.5);
        this.addSpeed(absorp);

        garea = g.radius * g.radius * Math.PI;
        this.currentRadius = Math.sqrt((area + garea * 3) / Math.PI);
        this.radius = Math.sqrt((area + garea) / Math.PI);
      }

      g.addSpeed(
        Vector.sub(this, g)
          .normalize()
          .scale(this.gravity),
      );
    }

    if (interferenceToPoint && !this.dragging) {
      this.add(this.speed);
    }

    this.speed = new Vector();
    if (this.currentRadius > RADIUS_LIMIT) {
      this.collapse();
    }

    this.draw(ctx);
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 5, 0, Math.PI * 2, false);
    // eslint-disable-next-line no-param-reassign
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2, false);
    // eslint-disable-next-line no-param-reassign
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fill();
    ctx.restore();
  }
}

GravityPoint.interferenceToPoint = true;

export default GravityPoint;

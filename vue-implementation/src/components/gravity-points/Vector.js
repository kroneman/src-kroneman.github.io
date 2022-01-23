class Vector {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  set(x, y) {
    /* eslint-disable no-param-reassign */
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    /* eslint-enable no-param-reassign */
    this.x = x || 0;
    this.y = y || 0;
    return this;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  scale(s) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }

  normalize() {
    const m = Math.sqrt(this.x * this.x + this.y * this.y);
    if (m) {
      this.x /= m;
      this.y /= m;
    }
    return this;
  }

  angle() {
    return Math.atan2(this.y, this.x);
  }

  angleTo(v) {
    const dx = v.x - this.x;
    const dy = v.y - this.y;
    return Math.atan2(dy, dx);
  }

  distanceTo(v) {
    const dx = v.x - this.x;
    const dy = v.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  distanceToSq(v) {
    const dx = v.x - this.x;
    const dy = v.y - this.y;
    return dx * dx + dy * dy;
  }

  lerp(v, t) {
    this.x += (v.x - this.x) * t;
    this.y += (v.y - this.y) * t;
    return this;
  }

  clone() {
    return new Vector(this.x, this.y);
  }

  toString() {
    return `(x: ${this.x}, y: ${this.y})`;
  }
}

Vector.add = function add(a, b) {
  return new Vector(a.x + b.x, a.y + b.y);
};

Vector.sub = function sub(a, b) {
  return new Vector(a.x - b.x, a.y - b.y);
};

Vector.scale = function scale(v, s) {
  return v.clone().scale(s);
};

Vector.random = function random() {
  return new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
};

export default Vector;

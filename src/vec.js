import { Mat4 } from "./mat.js";

export class Vec2 {
  #x = 0;
  #y = 0;

  /**
   * @param {number} [x]
   * @param {number} [y]
   */
  constructor(x, y) {
    this.#x = x ?? 0;
    this.#y = y ?? 0;
  }

  set x(v) {
    this.#x = v;
  }

  set y(v) {
    this.#y = v;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get length() {
    return Math.hypot(this.#x, this.#y);
  }
}

export class Vec3 {
  #x = 0;
  #y = 0;
  #z = 0;

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  constructor(x, y, z) {
    this.#x = x;
    this.#y = y;
    this.#z = z;
  }

  /**@param {Vec3} v */
  static normalize(v) {
    let length = v.length;
    if (!length) {
      return v;
    }
    v.#x /= length;
    v.#y /= length;
    v.#z /= length;
    return v;
  }

  normalize() {
    let v = this;
    let length = v.length;
    if (!length) {
      return this;
    }
    v.#x /= length;
    v.#y /= length;
    v.#z /= length;
    return v;
  }

  get x() {
    return this.#x;
  }
  get y() {
    return this.#y;
  }
  get z() {
    return this.#z;
  }

  get length() {
    return Math.hypot(this.#x, this.#y, this.#z);
  }

  /**
   * @param {Vec3} v0
   * @param {Vec3} v1
   */
  static sub(v0, v1) {
    let x = v0.#x - v1.#x;
    let y = v0.#y - v1.#y;
    let z = v0.#z - v1.#z;

    let newVec = new Vec3(x, y, z);

    return newVec;
  }

  /**
   * @param {Vec3} v0
   * @param {Vec3} v1
   */
  static cross(v0, v1) {
    // console.log(v0.#x, v0.#y, v0.#z);
    // console.log(v1.#x, v1.#y, v1.#z);

    let x = v0.#y * v1.#z - v0.#z * v1.#y;
    // console.log(v0.#y);
    let y = v0.#z * v1.#x - v0.#x * v1.#z;
    let z = v0.#x * v1.#y - v0.#y * v1.#x;

    let newVec = new Vec3(x, y, z);

    // console.log(newVec.x, newVec.y, newVec.z);

    return newVec;
  }

  /**
   * @param {Vec3} v0
   * @param {Vec3} v1
   */
  static dot(v0, v1) {
    return v0.#x * v1.#x + v0.#y * v1.#y + v0.#z * v1.#z;
  }

  /**
   * @param {Vec3} v
   * @param {Mat4} m
   */
  static transform(v, m, directional = false) {
    let [r0, r1, r2, r3] = m.m;

    let w = directional ? 0 : 1;

    let x = v.#x * r0[0] + v.#y * r0[1] + v.#z * r0[2] + r0[3] * w;
    let y = v.#x * r1[0] + v.#y * r1[1] + v.#z * r1[2] + r1[3] * w;
    let z = v.#x * r2[0] + v.#y * r2[1] + v.#z * r2[2] + r2[3] * w;

    let newVec = new Vec3(x, y, z);

    return newVec;
  }

  /**@param {Mat4} m */
  transform(m, directional = false) {
    let [r0, r1, r2, r3] = m.m;

    let w = directional ? 0 : 1;

    let x = this.#x * r0[0] + this.#y * r0[1] + this.#z * r0[2] + r0[3] * w;
    let y = this.#x * r1[0] + this.#y * r1[1] + this.#z * r1[2] + r1[3] * w;
    let z = this.#x * r2[0] + this.#y * r2[1] + this.#z * r2[2] + r2[3] * w;

    this.#x = x;
    this.#y = y;
    this.#z = z;
    return this;
  }

  /**
   * @param {Vec3} v
   */
  distance(v) {
    let f = Vec3.sub(v, this);
    return f.length;
  }

  clone() {
    let clone = new Vec3(this.#x, this.#y, this.#z);
    return clone;
  }

  /**@param {number} [precision=2] */
  toString(precision = 2) {
    return `[ ${this.#x.toFixed(precision)} , ${this.#y.toFixed(precision)} , ${this.#z.toFixed(
      precision
    )} ]`;
  }
}

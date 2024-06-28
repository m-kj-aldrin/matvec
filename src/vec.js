import { Mat4 } from "./mat.js";

export class Vec3 {
  #x = 0;
  #y = 0;
  #z = 0;
  #w = 1;

  /**@param {{x?:number,y?:number,z?:number,w?:number}} o */
  constructor({ x = 0, y = 0, z = 0, w = 1 } = { x: 0, y: 0, z: 0, w: 1 }) {
    this.#x = x;
    this.#y = y;
    this.#z = z;
    this.#w = w;
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
  get w() {
    return this.#w;
  }
  set w(w) {
    this.#w = w;
  }

  get length() {
    return Math.hypot(this.#x, this.#y, this.#z);
  }

  toString() {
    let x = this.#x.toFixed(3);
    let y = this.#y.toFixed(3);
    let z = this.#z.toFixed(3);
    let w = this.#w.toFixed(3);
    return `[ ${x} , ${y} , ${z} , ${w} ]`;
  }

  copy() {
    return new Vec3({
      x: this.#x,
      y: this.#y,
      z: this.#z,
      w: this.#w,
    });
  }

  /**
   * @param {Vec3} v
   */
  distance(v) {
    let f = Vec3.sub(v, this);
    return f.length;
  }

  /**@param {Vec3} v */
  static normalize(v) {
    let l = v.length;

    if (!l) {
      return v;
    }

    let x = v.#x / l;
    let y = v.#y / l;
    let z = v.#z / l;

    let newVec = new Vec3({ x, y, z });

    return newVec;
  }

  normalize() {
    let l = this.length;
    if (!l) {
      return this;
    }
    this.#x /= l;
    this.#y /= l;
    this.#z /= l;

    return this;
  }

  /**
   * @param {Vec3} v0
   * @param {Vec3} v1
   */
  static sub(v0, v1) {
    return new Vec3({
      x: v0.#x - v1.#x,
      y: v0.#y - v1.#y,
      z: v0.#z - v1.#z,
    });
  }

  /**
   * @param {Vec3} v0
   * @param {Vec3} v1
   */
  static add(v0, v1) {
    return new Vec3({
      x: v0.#x + v1.#x,
      y: v0.#y + v1.#y,
      z: v0.#z + v1.#z,
    });
  }

  /**
   * @param {Vec3} v0
   * @param {Vec3} v1
   */
  static dot(v0, v1) {
    return v0.#x * v1.#x + v0.#y * v1.#y + v0.#z * v1.#z;
  }

  /**
   * @param {Vec3} v0
   * @param {Vec3} v1
   */
  static cross(v0, v1) {
    let x = v0.#y * v1.#z - v0.#z * v1.#y;
    let y = v0.#z * v1.#x - v0.#x * v1.#z;
    let z = v0.#x * v1.#y - v0.#y * v1.#x;

    return new Vec3({ x, y, z });
  }

  /**
   * @param {Vec3} v
   * @param {Mat4} m
   */
  static transform(v, m) {
    // prettier-ignore
    let [
      m00,m01,m02,m03,
      m10,m11,m12,m13,
      m20,m21,m22,m23,
    ] = m.m

    let w = v.#w;
    // w = 0;

    let x = v.#x * m00 + v.#y * m01 + v.#z * m02 + m03 * w;
    let y = v.#x * m10 + v.#y * m11 + v.#z * m12 + m13 * w;
    let z = v.#x * m20 + v.#y * m21 + v.#z * m22 + m23 * w;

    let newVec = new Vec3({ x, y, z });

    return newVec;
  }

  /**@param {Mat4} m */
  transform(m) {
    // prettier-ignore
    let [
      m00,m01,m02,m03,
      m10,m11,m12,m13,
      m20,m21,m22,m23,
    ] = m.m

    let w = this.#w;

    let x = this.#x * m00 + this.#y * m01 + this.#z * m02 + m03 * w;
    let y = this.#x * m10 + this.#y * m11 + this.#z * m12 + m13 * w;
    let z = this.#x * m20 + this.#y * m21 + this.#z * m22 + m23 * w;

    this.#x = x;
    this.#y = y;
    this.#z = z;

    return this;
  }
}

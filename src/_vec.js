import { Mat4 } from "./_mat.js";

export class Vec3 {
  #x = 0;
  #y = 0;
  #z = 0;

  /**@param {{x?:number,y?:number,z?:number}} o */
  constructor({ x = 0, y = 0, z = 0 } = { x: 0, y: 0, z: 0 }) {
    this.#x = x;
    this.#y = y;
    this.#z = z;
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

  toString() {
    let x = this.#x.toFixed(3);
    let y = this.#y.toFixed(3);
    let z = this.#z.toFixed(3);
    return `[ ${x} , ${y} , ${z} ]`;
  }

  /**@param {Vec3} v */
  static normalize(v) {
    let l = v.length;

    let x = v.#x / l;
    let y = v.#y / l;
    let z = v.#z / l;

    let newVec = new Vec3({ x, y, z });

    return newVec;
  }

  /**
   * @param {Vec3} v
   * @param {Mat4} m
   */
  static transform(v, m, directional = false) {
    // prettier-ignore
    let [
      m00,m01,m02,m03,
      m10,m11,m12,m13,
      m20,m21,m22,m23,
    ] = m.m

    let w = directional ? 0 : 1;

    let x = v.#x * m00 + v.#y * m01 + v.#z * m02 + m03 * w;
    let y = v.#x * m10 + v.#y * m11 + v.#z * m12 + m13 * w;
    let z = v.#x * m20 + v.#y * m21 + v.#z * m22 + m23 * w;

    let newVec = new Vec3({ x, y, z });

    return newVec;
  }
}

import { Vec3 } from "./_vec.js";

/**
 * @typedef {[number,number,number,number,number,number,number,number,number,number,number,number,number,number,number,number]} M4
 */

export class Mat4 {
  /**@type {M4} */ // prettier-ignore
  #m = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];

  /**@param {M4} [m] */
  constructor(m) {
    if (m) {
      this.#m = m;
    }
  }

  /**@type {M4} */
  get m() {
    return [...this.#m];
  }

  static multiply(m) {}

  /**
   * @param {{x?:number,y?:number,z?:number}} [o]
   */
  static fromTranslation({ x = 0, y = 0, z = 0 } = { x: 0, y: 0, z: 0 }) {
    // prettier-ignore
    let m = new Mat4([
          1, 0, 0, x,
          0, 1, 0, y,
          0, 0, 1, z,
          0, 0, 0, 1
    ]);

    return m;
  }

  /**
   * @param {{x?:number,y?:number,z?:number}} [o]
   */
  static fromScale({ x = 0, y = 0, z = 0 } = { x: 0, y: 0, z: 0 }) {
    // prettier-ignore
    let m = new Mat4([
          x, 0, 0, 0,
          0, y, 0, 0,
          0, 0, z, 0,
          0, 0, 0, 1
    ]);

    return m;
  }

  /**
   * @param {number} angle
   * @param {Vec3} axis
   */
  static fromRotation(angle, axis) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    let t = 1 - c;

    if (axis.length <= 0) {
      return new Mat4();
    }

    let { x, y, z } = Vec3.normalize(axis);

    // prettier-ignore
    let newMat = new Mat4([
      x * x * t + c, y * x * t + z * s, z * x * t - y * s, 0,
      x * y * t - z * s, y * y * t + c, z * y * t + x * s, 0,
      x * z * t + y * s, y * z * t - x * s, z * z * t + c, 0,
      0, 0, 0, 1,
    ]);

    return newMat;
  }
}

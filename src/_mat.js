import { Vec3 } from "./_vec.js";

/**@type {M4} */ // prettier-ignore
const MAT4_IDENTITY = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
]

/**
 * @typedef {[number,number,number,number,number,number,number,number,number,number,number,number,number,number,number,number]} M4
 */

/**
 * @typedef {{x?:number,y?:number,z?:number}} Vec3Option
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

  toString() {
    let str = this.#m.reduce((str, mv, i) => {
      let s = `${mv.toFixed(3)}`;
      if (i % 4 == 3) {
        s += "\n";
      } else {
        s += "\t";
      }
      return `${str}${s}`;
    }, "");

    return str;
  }

  /**
   * @param  {...Mat4} m
   */
  static multiply(...m) {
    /**@type {M4} */
    let resultMatrix = m.slice(1).reduce(
      (a, b_mat4) => {
        let b = b_mat4.#m;

        /**@type {M4} */
        let result = [...MAT4_IDENTITY];
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            let sum = 0;
            for (let k = 0; k < 4; k++) {
              sum += a[i * 4 + k] * b[j + k * 4];
            }
            result[i * 4 + j] = sum;
          }
        }

        return result;
      },
      [...m[0].#m]
    );

    return new Mat4(resultMatrix);
  }

  /**
   * @param  {...Mat4} m
   */
  multiply(...m) {
    /**@type {M4} */
    let resultMatrix = m.reduce(
      (a, b_mat4) => {
        let b = b_mat4.#m;

        /**@type {M4} */
        let result = [...MAT4_IDENTITY];
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            let sum = 0;
            for (let k = 0; k < 4; k++) {
              sum += a[i * 4 + k] * b[j + k * 4];
            }
            result[i * 4 + j] = sum;
          }
        }

        return result;
      },
      [...this.#m]
    );

    this.#m = resultMatrix;

    return this;
  }

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

  /**@param {Vec3Option} o */
  translate(o) {
    let m = Mat4.fromTranslation(o);
    return this.multiply(m);
  }

  /**
   * @param {{x?:number,y?:number,z?:number}} [o]
   */
  static fromScale({ x = 1, y = 1, z = 1 } = { x: 1, y: 1, z: 1 }) {
    // prettier-ignore
    let m = new Mat4([
          x, 0, 0, 0,
          0, y, 0, 0,
          0, 0, z, 0,
          0, 0, 0, 1
    ]);

    return m;
  }

  /**@param {Vec3Option} o */
  scale(o) {
    let m = Mat4.fromScale(o);
    return this.multiply(m);
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

  /**
   * @param {number} angle
   * @param {Vec3Option} o
   */
  rotate(angle, o) {
    let m = Mat4.fromRotation(angle, new Vec3(o));
    return this.multiply(m);
  }

  /**
   *
   * @param {Vec3} eye
   * @param {Vec3} target
   * @param {Vec3} up
   */
  static fromView(eye, target, up) {
    let F = Vec3.sub(eye, target).normalize();
    let R = Vec3.cross(up, F).normalize();
    let U = Vec3.cross(F, R);

    // prettier-ignore
    let m = new Mat4([
      R.x, R.y, R.z, -Vec3.dot(R, eye),
      U.x, U.y, U.z, -Vec3.dot(U, eye),
      F.x, F.y, F.z, -Vec3.dot(F, eye),
      0, 0, 0, 1,
    ]);

    return m;
  }
}

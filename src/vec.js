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

    /**@param {Mat4} m */
    transform(m) {
        let [r0, r1, r2, r3] = m.m;

        let x = this.#x * r0[0] + this.#y * r0[1] + this.#z * r0[2] + r0[3];
        let y = this.#x * r1[0] + this.#y * r1[1] + this.#z * r1[2] + r1[3];
        let z = this.#x * r2[0] + this.#y * r2[1] + this.#z * r2[2] + r2[3];

        this.#x = x;
        this.#y = y;
        this.#z = z;
        return this;
    }
}

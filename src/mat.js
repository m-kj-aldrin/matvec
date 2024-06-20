import { Vec2, Vec3 } from "./vec.js";

/**@typedef {[[number,number,number],[number,number,number],[number,number,number]]} M3 */
/**@typedef {[[number,number,number,number],[number,number,number,number],[number,number,number,number],[number,number,number,number]]} M4 */

export class Mat3 {
    /**@type {M3} */
    #m = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
    ];

    /**
     * @param {number} x
     * @param {number} y
     */
    static fromTranslation(x, y) {
        return new Mat3([
            [1, 0, x],
            [0, 1, y],
            [0, 0, 1],
        ]);
    }

    /**
     * @param {number} angle
     */
    static fromRotation(angle) {
        let c = Math.cos(angle);
        let s = Math.sin(angle);

        let m = new Mat3([
            [c, -s, 0],
            [s, c, 0],
            [0, 0, 1],
        ]);

        return m;
    }

    /**
     * @param  {...Mat3} m
     */
    static mult(...m) {
        let result = m.slice(1).reduce((matrixA, cm) => {
            let result = [];
            let matrixB = cm.#m;
            for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
                let row = [];
                let row_i = matrixA[rowIndex];
                for (let colIndex = 0; colIndex < 3; colIndex++) {
                    let c = 0;
                    for (let k = 0; k < 3; k++) {
                        c += row_i[k] * matrixB[k][colIndex];
                    }
                    row.push(c);
                }
                result.push(row);
            }
            return result;
        }, m[0].#m);

        let newMatrix = new Mat3(result);
        return newMatrix;
    }

    /**@param {M3} [m] */
    constructor(m) {
        if (Array.isArray(m)) {
            this.#m = [...m];
        }
    }

    get m() {
        return [...this.#m];
    }

    toString() {
        let s = "";
        this.#m.forEach((r) => {
            s += r.toString() + "\n";
        });
        return s;
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    translate(x, y) {
        let m = Mat3.fromTranslation(x, y);
        let _m = Mat3.mult(this, m);
        this.#m = _m.#m;
        return this;
    }

    /**
     * @param {Mat3} mv
     */
    mult(mv) {
        return Mat3.mult(this, mv);
    }
}

export class Mat4 {
    /**@type {M4} */
    #m = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ];

    /**
     * @param  {...Mat4} m
     */
    static mult(...m) {
        let result = m.slice(1).reduce((matrixA, cm) => {
            let result = [];
            let matrixB = cm.#m;
            for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
                let row = [];
                let row_i = matrixA[rowIndex];
                for (let colIndex = 0; colIndex < 4; colIndex++) {
                    let c = 0;
                    for (let k = 0; k < 4; k++) {
                        c += row_i[k] * matrixB[k][colIndex];
                    }
                    row.push(c);
                }
                result.push(row);
            }
            return result;
        }, m[0].#m);

        let newMatrix = new Mat4(result);
        return newMatrix;
    }

    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    static fromTranslation(x, y, z) {
        return new Mat4([
            [1, 0, 0, x],
            [0, 1, 0, y],
            [0, 0, 1, z],
            [0, 0, 0, 1],
        ]);
    }

    /**
     *
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

        let newMat = new Mat4([
            [x * x * t + c, y * x * t + z * s, z * x * t - y * s, 0],
            [x * y * t - z * s, y * y * t + c, z * y * t + x * s, 0],
            [x * z * t + y * s, y * z * t - x * s, z * z * t + c, 0],
            [0, 0, 0, 1],
        ]);

        return newMat;

        // out[0] = x * x * t + c;
        // out[1] = y * x * t + z * s;
        // out[2] = z * x * t - y * s;
        // out[3] = 0;
        // out[4] = x * y * t - z * s;
        // out[5] = y * y * t + c;
        // out[6] = z * y * t + x * s;
        // out[7] = 0;
        // out[8] = x * z * t + y * s;
        // out[9] = y * z * t - x * s;
        // out[10] = z * z * t + c;
        // out[11] = 0;
        // out[12] = 0;
        // out[13] = 0;
        // out[14] = 0;
        // out[15] = 1;
    }

    /**@param {M4} [m] */
    constructor(m) {
        if (Array.isArray(m)) {
            this.#m = [...m];
        }
    }

    get m() {
        return this.#m;
    }

    /**@param {Mat4} m */
    mult(m) {
        return Mat4.mult(this, m);
    }
}

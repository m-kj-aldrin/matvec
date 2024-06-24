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
    }

    /**@param {M4} [m] */
    constructor(m) {
        if (!(Array.isArray(m) && m.length == 16)) return;
        this.#m = m;
    }
}

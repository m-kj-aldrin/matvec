import { Mat4 } from "./mat.js";
import { Vec3 } from "./vec.js";

let m4_0 = Mat4.fromRotation(Math.PI / 4, new Vec3(1, 1, 1));
let m4_1 = Mat4.fromTranslation(1, 0, 0);

let m4_transform = Mat4.mult(m4_0, m4_1);

let pos = new Vec3(0, 0, 0).transform(m4_transform);

console.log(pos);

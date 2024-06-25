// import geoCube from "./geo-cube.js";
// import { Mat4 } from "./mat.js";
// import { Vec3 } from "./vec.js";

import { Mat4 } from "./_mat.js";
import { Vec3 } from "./_vec.js";

// /**
//  *
//  * @template {any} [T=0]
//  * @param {number} w
//  * @param {number} h
//  * @param {(...args:any[])=>T} [init]
//  * @returns {T[][]}
//  */
// function grid(w = 1, h = 1, init = () => 0) {
//   return Array.from({ length: h }, (_, y) => Array.from({ length: w }, (_, x) => init(x, y)));
// }

// const canvas = document.createElement("canvas");
// document.body.appendChild(canvas);
// canvas.width = canvas.clientWidth * 3;
// canvas.height = canvas.clientHeight * 3;

// let aspect = canvas.clientWidth / canvas.clientHeight;

// const ctx = canvas.getContext("2d");

// let cameraPos = new Vec3(5, 5, 5);
// let cameraTarget = new Vec3(0, 0, 0);
// let viewMatrix = Mat4.fromView(cameraPos, cameraTarget, new Vec3(0, 1, 0));
// let screenSpaceM = Mat4.fromScale(canvas.width / 2 / aspect, canvas.height / 2, 1).translate(
//   canvas.width / 2,
//   canvas.height / 2,
//   0
// );
// let yFlip = Mat4.fromScale(1, -1, 1);

// let lightPos = new Vec3(3, 3, 3);

// /**
//  *
//  * @param {Vec3} v
//  * @param {Mat4} viewMatrix
//  * @param {Mat4} projectionMatrix
//  */
// function project(viewMatrix, projectionMatrix, v) {
//   let m = Mat4.mult(projectionMatrix, yFlip, viewMatrix);
//   let tv = Vec3.transform(v, m);
//   return tv;
// }

// let c = geoCube(0.5);

// let speed = 0.5;

// /**
//  * @param {number} t
//  */
// function draw(t) {
//   t /= 1000;
//   t *= speed;

//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   let modelMatrix = Mat4.fromTranslation(0, 0, 0.25)
//     .scale(1, 1, 1)
//     .rotate(t, new Vec3(0.125, -0.95, 0.25))
//     .rotate(t * 0.5, new Vec3(-0.5, 0.1, 0.3));

//   let worldMatrix = Mat4.mult(screenSpaceM, yFlip, viewMatrix);

//   let projectedVerticies = c.verticies.map((v) => {
//     let tv = Vec3.transform(v, modelMatrix);
//     tv.transform(worldMatrix);
//     return tv;
//   });

//   let sortedFaces = [...c.faces].sort((a, b) => {
//     let ca = a.indicies.reduce((d, index) => {
//       let v = projectedVerticies[index];
//       return d + v.z / 4;
//     }, 0);
//     let cb = b.indicies.reduce((d, index) => {
//       let v = projectedVerticies[index];
//       return d + v.z / 4;
//     }, 0);
//     return ca - cb;
//   });

//   ctx.lineWidth = 10;
//   ctx.lineCap = "square";

//   sortedFaces.forEach((face, fi) => {
//     let n = Vec3.transform(face.normal, modelMatrix, true).transform(viewMatrix, true).normalize();

//     ctx.beginPath();
//     face.indicies.forEach((index, i) => {
//       let v = projectedVerticies[index];
//       if (i == 0) {
//         ctx.moveTo(v.x, v.y);
//         return;
//       }

//       ctx.lineTo(v.x, v.y);
//     });
//     ctx.closePath();

//     let light = Vec3.dot(n, Vec3.normalize(lightPos));
//     light = 0.2 + clamp(light) * 0.8;

//     let [r, g, b] = face.color.map((c) => c * light);
//     ctx.fillStyle = `rgb(${r},${g},${b})`;
//     ctx.fill();
//   });

//   requestAnimationFrame(draw);
// }

// /**
//  * @param {number} v
//  * @returns
//  */
// function clamp(v) {
//   return Math.min(1, Math.max(0, v));
// }
// requestAnimationFrame(draw);

// -------- FUNCTIONAL

let rot_m = Mat4.fromRotation(Math.PI * 0.25, new Vec3({ z: 1 }));
let scale_m = Mat4.fromScale({ x: 1, y: 1 });
let translate_m = Mat4.fromTranslation({ x: 1 });

let modelMatrix = Mat4.multiply(translate_m, scale_m, rot_m);

console.log(modelMatrix.toString());

let vertex0 = new Vec3({ x: 1 });
let vertex1 = Vec3.transform(vertex0, modelMatrix);

console.log(vertex0.toString());
console.log(vertex1.toString());

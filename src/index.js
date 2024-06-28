import { Mat4 } from "./mat.js";
import { Vec3 } from "./vec.js";

import geoCube from "./geo-cube.js";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = canvas.clientWidth * 3;
canvas.height = canvas.clientHeight * 3;

let aspect = canvas.clientWidth / canvas.clientHeight;

const ctx = canvas.getContext("2d");

let cameraPos = new Vec3({ x: 5, y: 5, z: 5 });
let cameraTarget = new Vec3();
let viewMatrix = Mat4.fromView(cameraPos, cameraTarget, new Vec3({ y: 1 }));
let screenSpaceM = Mat4.fromScale({ x: canvas.width / 2 / aspect, y: canvas.height / 2 }).translate(
  { x: canvas.width / 2, y: canvas.height / 2 }
);

let yFlip = Mat4.fromScale({ y: -1 });

let lightPos = new Vec3({ x: 3, y: 3, z: 3 });

console.log(screenSpaceM.toString());

let c = geoCube(0.5);

let speed = 0.5;

/**
 * @param {number} t
 */
function draw(t) {
  t /= 1000;
  t *= speed;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let modelMatrix = Mat4.fromTranslation({ z: 0.25 })
    .rotate(t, { x: 0.125, y: -0.95, z: 0.25 })
    .rotate(t * 0.5, { x: -0.5, y: 0.1, z: 0.3 });

  let worldMatrix = Mat4.multiply(screenSpaceM, yFlip, viewMatrix);

  let projectedVerticies = c.verticies.map((v) => {
    let m = Mat4.multiply(worldMatrix, modelMatrix);
    let tv = Vec3.transform(v, m);
    return tv;
  });

  console.log(c.verticies.map((v) => v.toString()).join("\n"));
  console.log(projectedVerticies.map((v) => v.toString()).join("\n"));

  let sortedFaces = [...c.faces].sort((a, b) => {
    let ca = a.indicies.reduce((d, index) => {
      let v = projectedVerticies[index];
      return d + v.z / 4;
    }, 0);
    let cb = b.indicies.reduce((d, index) => {
      let v = projectedVerticies[index];
      return d + v.z / 4;
    }, 0);
    return ca - cb;
  });

  ctx.lineWidth = 10;
  ctx.lineCap = "square";

  sortedFaces.forEach((face, fi) => {
    let n = face.normal.copy();
    n.w = 0;
    let m = Mat4.multiply(viewMatrix, modelMatrix);
    n.transform(m).normalize();

    ctx.beginPath();
    face.indicies.forEach((index, i) => {
      let v = projectedVerticies[index];
      if (i == 0) {
        ctx.moveTo(v.x, v.y);
        return;
      }

      ctx.lineTo(v.x, v.y);
    });
    ctx.closePath();

    let light = Vec3.dot(n, Vec3.normalize(lightPos));
    light = 0.1 + clamp(light) * 0.9;

    let [r, g, b] = face.color.map((c) => c * light);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

/**
 * @param {number} v
 * @returns
 */
function clamp(v) {
  return Math.min(1, Math.max(0, v));
}
requestAnimationFrame(draw);

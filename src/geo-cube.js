import { Vec3 } from "./vec.js";

export default function (size = 1) {
  let w = size / 2;
  let h = w;
  let d = size;

  let verticies = [
    // front
    new Vec3({ x: -w, y: -w }), //0
    new Vec3({ x: -w, y: w }), //1
    new Vec3({ x: w, y: w }), //2
    new Vec3({ x: w, y: -w }), //3
    // back
    new Vec3({ x: w, y: -w, z: -d }), //4
    new Vec3({ x: w, y: w, z: -d }), //5
    new Vec3({ x: -w, y: w, z: -d }), //6
    new Vec3({ x: -w, y: -w, z: -d }), //7
  ];

  let red = [255, 64, 32];
  let blue = [0, 96, 255];
  let green = [32, 255, 32];

  let faces = [
    //front
    { indicies: [0, 1, 2, 3], color: red, normal: new Vec3({ z: 1 }) },
    //top
    { indicies: [1, 6, 5, 2], color: blue, normal: new Vec3({ y: 1 }) },
    //left
    { indicies: [7, 6, 1, 0], color: green, normal: new Vec3({ x: -1 }) },
    //right
    { indicies: [3, 2, 5, 4], color: green, normal: new Vec3({ x: 1 }) },
    //bottom
    { indicies: [7, 0, 3, 4], color: blue, normal: new Vec3({ y: -1 }) },
    //back
    { indicies: [4, 5, 6, 7], color: red, normal: new Vec3({ z: -1 }) },
  ];

  return {
    verticies,
    faces,
  };
}

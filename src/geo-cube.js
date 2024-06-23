import { Vec3 } from "./vec.js";

export default function (size = 1) {
  let w = size / 2;
  let h = w;
  let d = size;

  let verticies = [
    // front
    new Vec3(-w, -w, 0), //0
    new Vec3(-w, w, 0), //1
    new Vec3(w, w, 0), //2
    new Vec3(w, -w, 0), //3
    // back
    new Vec3(w, -w, -d), //4
    new Vec3(w, w, -d), //5
    new Vec3(-w, w, -d), //6
    new Vec3(-w, -w, -d), //7
  ];

  let red = [255, 0, 0];
  let blue = [0, 0, 255];
  let green = [0, 255, 0];

  let faces = [
    //front
    { indicies: [0, 1, 2, 3], color: red, normal: new Vec3(0, 0, 1) },
    //top
    { indicies: [1, 6, 5, 2], color: blue, normal: new Vec3(0, 1, 0) },
    //left
    { indicies: [7, 6, 1, 0], color: green, normal: new Vec3(-1, 0, 0) },
    //right
    { indicies: [3, 2, 5, 4], color: green, normal: new Vec3(1, 0, 0) },
    //bottom
    { indicies: [7, 0, 3, 4], color: blue, normal: new Vec3(0, -1, 0) },
    //back
    { indicies: [4, 5, 6, 7], color: red, normal: new Vec3(0, 0, -1) },
  ];

  // faces.forEach((f) => (f.color = c));

  return {
    verticies,
    faces,
  };
}

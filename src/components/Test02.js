// import React, { useEffect } from "react";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// function Test02() {
//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     const ambientLight = new THREE.AmbientLight(0x404040);
//     scene.add(ambientLight);

//     const loader = new GLTFLoader();
//     loader.load(
//       "/assets/animation/cicapair7.glb",
//       (gltf) => {
//         scene.add(gltf.scene);

//         const box = new THREE.Box3().setFromObject(gltf.scene);
//         const center = box.getCenter(new THREE.Vector3());
//         const size = box.getSize(new THREE.Vector3());
//         const maxDim = Math.max(size.x, size.y, size.z);
//         const fov = camera.fov * (Math.PI / 180);
//         let cameraZ = Math.abs((maxDim / 4) * Math.tan(fov * 2));
//         cameraZ *= 8; // Adjust distance from the object

//         // Position the camera to look at the center of the object
//         camera.position.set(center.x, center.y, cameraZ + center.z);

//         const minZ = box.min.z;
//         const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;

//         camera.lookAt(center); // Ensure the camera points at the center of the model

//         camera.far = cameraToFarEdge * 3;
//         camera.updateProjectionMatrix();
//       },
//       (xhr) => {
//         console.log(`${((xhr.loaded / xhr.total) * 100).toFixed(2)}% loaded`);
//       },
//       (error) => {
//         console.error("An error happened", error);
//       }
//     );

//     const animate = () => {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };

//     animate();

//     return () => {
//       document.body.removeChild(renderer.domElement);
//     };
//   }, []);

//   return <div />;
// }

// export default Test02;
import React from "react";

export const Test02 = () => {
  return <div>Test02</div>;
};

export default Test02;

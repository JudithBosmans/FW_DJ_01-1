import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Test = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(3, 1, 3);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    const avatarUrl = localStorage.getItem("avatarUrl");
    const animationUrl = "/assets/animation/animation.fbx";
    if (avatarUrl) {
      const avatarLoader = new GLTFLoader();
      avatarLoader.load(
        avatarUrl,
        function (gltf) {
          const avatar = gltf.scene;
          scene.add(avatar);
          avatar.scale.set(2.5, 2.5, 2.5);
          avatar.position.set(0, -1, 0);
          camera.lookAt(avatar.position);

          if (animationUrl) {
            const loader = new FBXLoader();
            loader.load(
              animationUrl,
              function (fbx) {
                console.log("Animation loaded successfully");
                const mixer = new THREE.AnimationMixer(avatar);
                const action = mixer.clipAction(fbx.animations[0]);
                action.play();
              },
              undefined,
              function (error) {
                console.error("Failed to load animation:", error);
              }
            );
          }
        },
        undefined,
        function (error) {
          console.error("Failed to load the avatar:", error);
        }
      );
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="webgl"></canvas>;
};

export default Test;

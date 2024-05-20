import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import back from "../pics/back.hdr";

const ThreeScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.1, 0.1); 
    camera.lookAt(0, 0, 0); 

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    // Handle window resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // HDR ENVIRONMENT MAP
    new RGBELoader().load(back, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.background = texture;
    });

    // AVATAR
    const avatarUrl = localStorage.getItem("avatarUrl");
    if (avatarUrl) {
      const avatarLoader = new GLTFLoader();
      avatarLoader.load(
        avatarUrl,
        function (gltf) {
          console.log("Avatar loaded successfully");
          const avatar = gltf.scene;
          scene.add(avatar);
          avatar.scale.set(0.02, 0.02, 0.02);
          avatar.position.y = -0.12;
          avatar.position.x = -0.05;
          avatar.rotation.y = Math.PI / 3.5;

          avatar.add(camera);
        },
        undefined,
        function (error) {
          console.error("Failed to load the avatar:", error);
        }
      );
    } else {
      console.error("No avatar URL found in localStorage");
    }

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.domElement && renderer.domElement.remove();
      controls.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="webgl"></canvas>;
};

export default ThreeScene;

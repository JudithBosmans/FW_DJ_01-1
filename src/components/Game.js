import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DragControls } from "three/examples/jsm/controls/DragControls.js";

const Game = () => {
  const canvasRef = useRef();
  const messageRef = useRef();
  const scoreRef = useRef(0);
  const objectsLoadedRef = useRef({
    object1: false,
    object2: false,
    object3: false,
  });
  const startCollisionCheckRef = useRef(false);
  const group = new THREE.Group();

  useEffect(() => {
    const loader = new GLTFLoader();
    const scene = new THREE.Scene();

    /************
     * OBJECTS
     ***********/
    scene.add(group);

    let object1, object2, object3, controls;
    let camera, renderer;

    const loadObjects = () => {
      loader.load("/assets/hover/cicapairHover2.glb", (gltf) => {
        object1 = gltf.scene;
        object1.scale.set(0.1, 0.1, 0.1);
        object1.position.set(0, -2, 0);
        object1.rotation.y = Math.PI / 4;
        group.add(object1);
        console.log("Loaded object1:", object1);
        objectsLoadedRef.current.object1 = true;
        checkAllObjectsLoaded();
        initializeDragControls();
      });

      loader.load("/assets/hover/cat.glb", (gltf) => {
        object2 = gltf.scene;
        object2.scale.set(0.007, 0.007, 0.007);
        object2.position.set(7, -5, -7);
        object2.rotation.y = Math.PI / -4;
        group.add(object2);
        console.log("Loaded object2:", object2);
        objectsLoadedRef.current.object2 = true;
        checkAllObjectsLoaded();
        initializeDragControls();
      });

      loader.load("/assets/hover/cat.glb", (gltf) => {
        object3 = gltf.scene;
        object3.scale.set(0.007, 0.007, 0.007);
        object3.position.set(0, -5, -7);
        object3.rotation.y = Math.PI / -4;
        group.add(object3);
        console.log("Loaded object3:", object3);
        objectsLoadedRef.current.object3 = true;
        checkAllObjectsLoaded();
        initializeDragControls();
      });
    };

    const checkAllObjectsLoaded = () => {
      const { object1, object2, object3 } = objectsLoadedRef.current;
      if (object1 && object2 && object3) {
        setTimeout(() => {
          startCollisionCheckRef.current = true;
        }, 1000);
      }
    };

    /************
     * SIZES
     ***********/
    const sizes = {
      width: 1000,
      height: 800,
    };

    /************
     * CAMERA
     ***********/
    camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height);
    camera.position.z = 10;

    /************
     * CANVAS & RENDERER
     ***********/
    renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    /************
     * Check Collision
     ***********/
    let collisionDetected = false;

    const computeBoundingSphere = (object) => {
      if (!object) return null;

      const sphere = new THREE.Sphere();
      object.traverse((child) => {
        if (child.isMesh) {
          child.geometry.computeBoundingSphere();
          const childSphere = child.geometry.boundingSphere
            .clone()
            .applyMatrix4(child.matrixWorld);
          sphere.union(childSphere);
        }
      });
      return sphere;
    };

    const checkCollision = () => {
      if (!startCollisionCheckRef.current) return;

      const {
        object1: loaded1,
        object2: loaded2,
        object3: loaded3,
      } = objectsLoadedRef.current;
      if (!loaded1 || !loaded2 || !loaded3) return;

      const sphere1 = computeBoundingSphere(object1);
      const sphere2 = computeBoundingSphere(object2);
      const sphere3 = computeBoundingSphere(object3);

      if (!sphere1 || !sphere2 || !sphere3) return;

      const distance12 = sphere1.center.distanceTo(sphere2.center);
      const sumOfRadii12 = sphere1.radius + sphere2.radius;

      const distance13 = sphere1.center.distanceTo(sphere3.center);
      const sumOfRadii13 = sphere1.radius + sphere3.radius;

      if (distance12 <= sumOfRadii12 || distance13 <= sumOfRadii13) {
        handleCollision();
      }
    };

    const handleCollision = () => {
      if (!collisionDetected) {
        collisionDetected = true;
        showMessage("Cats hit the cicapot!");
      }
    };

    const showMessage = (message) => {
      messageRef.current.innerHTML = message;
    };

    /************
     * TICK
     ***********/
    const tick = () => {
      checkCollision();

      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    };

    tick();

    /************
     * DRAG CONTROLS
     ***********/
    const initializeDragControls = () => {
      if (!object2 || !object3 || controls) return;

      controls = new DragControls(
        [object2, object3],
        camera,
        renderer.domElement
      );

      controls.addEventListener("dragstart", function (event) {
        console.log("Drag started", event.object);
      });

      controls.addEventListener("dragend", function (event) {
        console.log("Drag ended", event.object);
      });

      controls.addEventListener("drag", function (event) {
        const deltaX = event.object.position.x + event.deltaX / 100;
        const deltaY = event.object.position.y + event.deltaY / 100;
        event.object.position.set(deltaX, deltaY, event.object.position.z);
      });
    };

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1);

    scene.add(directionalLight);
    scene.add(camera);

    loadObjects();

    return () => {
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className="webgl" />
      <div id="punten">Score: {scoreRef.current}</div>
      <div ref={messageRef} id="message" style={{ color: "red" }}></div>
    </div>
  );
};

export default Game;

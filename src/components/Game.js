import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DragControls } from "three/examples/jsm/controls/DragControls.js";
import "../styles/Game.css";

const Game = () => {
  const canvasRef = useRef();
  const messageRef = useRef();

  const objectsLoadedRef = useRef({
    object1: false,
    object2: false,
    object3: false,
    object4: false,
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

    let object1, object2, object3, object4;
    let camera, renderer;

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
    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.body.appendChild(renderer.domElement);

    const loadObjects = () => {
      loader.load("/assets/hover/cicapairHover2.glb", (gltf) => {
        object1 = gltf.scene;
        object1.scale.set(0.1, 0.1, 0.1);
        object1.position.set(0, -2, 0);
        object1.rotation.y = Math.PI / 1;
        group.add(object1);
        scene.add(new THREE.AxesHelper(2));
        console.log("Loaded object1:", object1);
        objectsLoadedRef.current.object1 = true;
        checkAllObjectsLoaded();
      });

      loader.load("/assets/hover/product1.glb", (gltf) => {
        object2 = gltf.scene;
        object2.scale.set(0.7, 0.7, 0.7);
        object2.position.set(5, -4, -2);
        object2.rotation.y = Math.PI / -4;
        group.add(object2);
        object2.add(new THREE.AxesHelper(2));
        console.log("Loaded object2:", object2);
        objectsLoadedRef.current.object2 = true;
        checkAllObjectsLoaded();
      });

      loader.load("/assets/hover/product1.glb", (gltf) => {
        object3 = gltf.scene;
        object3.scale.set(0.7, 0.7, 0.7);
        object3.position.set(-4, -4, -2);
        object3.rotation.y = Math.PI / -4;
        group.add(object3);
        object3.add(new THREE.AxesHelper(2));
        console.log("Loaded object3:", object3);
        objectsLoadedRef.current.object3 = true;
        checkAllObjectsLoaded();
      });

      loader.load("/assets/hover/product1.glb", (gltf) => {
        object4 = gltf.scene;
        object4.scale.set(0.7, 0.7, 0.7);
        object4.position.set(0, -4, -2);
        object4.rotation.y = Math.PI / -4;
        group.add(object4);
        object4.add(new THREE.AxesHelper(2));
        console.log("Loaded object4:", object4);
        objectsLoadedRef.current.object4 = true;
        checkAllObjectsLoaded();
      });
    };

    const checkAllObjectsLoaded = () => {
      const { object1, object2, object3, object4 } = objectsLoadedRef.current;
      if (object1 && object2 && object3 && object4) {
        setTimeout(() => {
          startCollisionCheckRef.current = true;
        }, 1000);
        initializeDragControls();
      }
    };

    /************
     * Check Collision
     ***********/
    let collisionDetected = false;

    const computeBoundingBox = (object) => {
      if (!object) return null;
      const box = new THREE.Box3().setFromObject(object);
      return box;
    };

    const checkCollision = () => {
      if (!startCollisionCheckRef.current) return;

      const {
        object1: loaded1,
        object2: loaded2,
        object3: loaded3,
        object4: loaded4,
      } = objectsLoadedRef.current;
      if (!loaded1 || !loaded2 || !loaded3 || !loaded4) return;

      const box1 = computeBoundingBox(object1);
      const box2 = computeBoundingBox(object2);
      const box3 = computeBoundingBox(object3);
      const box4 = computeBoundingBox(object4);

      if (!box1 || !box2 || !box3 || !box4) return;

      if (box1.intersectsBox(box2)) {
        handleCollision(object2);
      } else if (box1.intersectsBox(box3)) {
        handleCollision(object3);
      } else if (box1.intersectsBox(box4)) {
        handleCollision(object4);
      }
    };

    const handleCollision = (collidingObject) => {
      if (!collisionDetected) {
        collisionDetected = true;
        let message = "";
        if (collidingObject === object2) {
          message = "Object 2 hit object 1!";
        } else if (collidingObject === object3) {
          message = "Object 3 hit object 1!";
        } else if (collidingObject === object4) {
          message = "Object 4 hit object 1!";
        }
        showMessage(message);
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
    function initializeDragControls() {
      if (!object2 || !object3 || !object4) return;

      const draggableObjects = [object2, object3, object4];

      const dragControls = new DragControls(
        draggableObjects,
        camera,
        renderer.domElement
      );

      dragControls.addEventListener("dragstart", function (event) {
        console.log("Drag started", event.object);
      });

      dragControls.addEventListener("dragend", function (event) {
        console.log("Drag ended", event.object);
        checkCollision();
      });
    }

    /************
     * LIGHTS
     ***********/
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
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
      <div ref={messageRef} id="message" style={{ color: "pink" }}></div>
    </div>
  );
};

export default Game;

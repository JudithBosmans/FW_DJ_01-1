import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DragControls } from "three/examples/jsm/controls/DragControls.js";
import "../styles/Game.css";

import AvatarLoad from "./AvatarLoad";

const Game = () => {
  const canvasRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const messageRef = useRef();
  const [avatarVisible, setAvatarVisible] = useState(false);
  const productData = JSON.parse(
    localStorage.getItem("currentProductData") || "{}"
  );

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
    let camera;
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
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(
      canvasRef.current.offsetWidth,
      canvasRef.current.offsetHeight
    );

    /************
     * LABEL SETUP
     ***********/

    const createTextSprite = (message) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = 256;
      canvas.height = 128;
      context.fillStyle = "#000000";
      context.font = "30px Helvetica";
      context.textAlign = "center";
      context.fillText(message, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(5, 2.5, 1);
      return sprite;
    };

    /************
     * LOAD OBJECTS
     ***********/

    const loadObjects = () => {
      loader.load(
        // "/assets/hover/cicaHover.glb"
        `${productData.productModel}`,
        (gltf) => {
          object1 = gltf.scene;
          object1.scale.set(0.1, 0.1, 0.1);
          object1.position.set(0, -2, 0);
          object1.rotation.y = Math.PI / 1;
          group.add(object1);
          console.log("Loaded object1:", object1);
          objectsLoadedRef.current.object1 = true;
          checkAllObjectsLoaded();
        },
        undefined,
        (error) => {
          console.error("Error loading object1:", error);
        }
      );

      loader.load(`${productData.GameIngredient3}`, (gltf) => {
        object2 = gltf.scene;
        object2.scale.set(0.7, 0.7, 0.7);
        object2.position.set(5, -4, -2);
        object2.rotation.y = Math.PI / -4;
        group.add(object2);

        const label2 = createTextSprite(productData.Ing3Title);
        label2.position.set(0, 1.5, 0);
        object2.add(label2);

        console.log("Loaded object2:", object2);
        objectsLoadedRef.current.object2 = true;
        checkAllObjectsLoaded();
      });

      loader.load(`${productData.GameIngredient1}`, (gltf) => {
        object3 = gltf.scene;
        object3.scale.set(0.7, 0.7, 0.7);
        object3.position.set(-4, -4, -2);
        object3.rotation.y = Math.PI / -4;
        group.add(object3);

        const label3 = createTextSprite(productData.Ing1Title);
        label3.position.set(0, 1.5, 0);
        object3.add(label3);

        console.log("Loaded object3:", object3);
        objectsLoadedRef.current.object3 = true;
        checkAllObjectsLoaded();
      });

      loader.load(`${productData.GameIngredient2}`, (gltf) => {
        object4 = gltf.scene;
        object4.scale.set(0.7, 0.7, 0.7);
        object4.position.set(0, -4, -2);
        object4.rotation.y = Math.PI / -4;
        group.add(object4);

        const label4 = createTextSprite(productData.Ing2Title);
        label4.position.set(0, 1.5, 0);
        object4.add(label4);

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

    // const computeBoundingBox = (object) => {
    //   if (!object) return null;
    //   const box = new THREE.Box3().setFromObject(object);
    //   return box;
    // };

    const checkCollision = () => {
      if (!startCollisionCheckRef.current) return;

      const loadedObjects = [object1, object2, object3, object4].filter(
        Boolean
      );
      loadedObjects.forEach((obj) => {
        const box = new THREE.Box3().setFromObject(obj);
        obj.userData.boundingBox = box;
      });

      for (let i = 0; i < loadedObjects.length; i++) {
        for (let j = i + 1; j < loadedObjects.length; j++) {
          if (
            loadedObjects[i].userData.boundingBox.intersectsBox(
              loadedObjects[j].userData.boundingBox
            )
          ) {
            console.log(
              `Collision detected between ${loadedObjects[i].name} and ${loadedObjects[j].name}`
            );
            handleCollision(loadedObjects[j]);
          }
        }
      }
    };

    const handleCollision = (collidingObject) => {
      if (!collisionDetected) {
        collisionDetected = true;
        console.log(`Collision with: `, collidingObject.name);
        let message = "";
        switch (collidingObject) {
          case object2:
            message = productData.Ing1 || "";
            break;
          case object3:
            message = productData.Ing2 || "";
            break;
          case object4:
            message = productData.Ing3 || "";
            break;
          default:
            message = "Unknown collision";
            break;
        }
        console.log("Collision message:", message);
        setModalMessage(message);
        setModalVisible(true);
        setAvatarVisible(true);
      }
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
      if (!renderer.domElement || !group.children.length) {
        console.log(
          "Initialization skipped: Renderer or group children not ready."
        );
        return;
      }

      const draggableObjects = group.children;

      const dragControls = new DragControls(
        draggableObjects,
        camera,
        renderer.domElement
      );
      dragControls.addEventListener("dragstart", function (event) {
        console.log("Drag started on:", event.object);
      });
      dragControls.addEventListener("dragend", function (event) {
        console.log("Drag ended for:", event.object);
        checkCollision();
      });

      console.log("Drag controls initialized.");
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
  }, [
    group,
    productData.Ing1,
    productData.Ing1Title,
    productData.Ing2,
    productData.Ing2Title,
    productData.Ing3,
    productData.Ing3Title,
  ]);

  if (!productData || Object.keys(productData).length === 0) {
    return (
      <div>No product data found. Please go back and select a product.</div>
    );
  }

  return (
    <div className="game-container">
      <h1>{productData.label}</h1>

      {/* <Link to="/PicAvatar" className="buttonNext">
        PicAvatar
      </Link> */}
      <canvas
        ref={canvasRef}
        className="webgl"
        style={{
          backgroundImage: `url(${productData.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></canvas>
      <div>
        <div ref={messageRef} id="message">
          <p>{modalMessage}</p>
          {avatarVisible && <AvatarLoad />}
        </div>
      </div>
    </div>
  );
};

export default Game;

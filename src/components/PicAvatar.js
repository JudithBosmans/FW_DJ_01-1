import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import html2canvas from "html2canvas";
import "../styles/PicAvatar.css";

import { databases } from "../appwrite/config";
import Logo from "../pics/Dr.Jart+_white_logo.png";

const PicAvatar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);
  const canvasRef = useRef(null);
  const [renderer, setRenderer] = useState(null);
  const [emails2, setEmail] = useState("");
  const productData = JSON.parse(
    localStorage.getItem("currentProductData") || "{}"
  );

  const scene = useRef(new THREE.Scene());
  const camera = useRef(
    new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
  ).current;

  useEffect(() => {
    if (!canvasRef.current) return;

    camera.position.set(2, 1, 5);

    const webGLRenderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    setRenderer(webGLRenderer);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    const avatarUrl = localStorage.getItem("avatarUrl");
    if (avatarUrl) {
      const avatarLoader = new GLTFLoader();
      avatarLoader.load(
        avatarUrl,
        function (gltf) {
          const avatar = gltf.scene;
          scene.current.add(avatar);
          avatar.scale.set(3, 3, 3);
          avatar.position.set(1, -1, 0);
          camera.lookAt(avatar.position);
          setIsAvatarLoaded(true);
        },
        undefined,
        function (error) {
          console.error("Failed to load the avatar:", error);
        }
      );
    } else {
      console.error("No avatar URL found in localStorage.");
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.current.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.current.add(directionalLight);

    const animate = () => {
      requestAnimationFrame(animate);
      webGLRenderer.render(scene.current, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [camera]);

  function takeScreenshotAndSave() {
    if (!isAvatarLoaded) {
      console.error("Avatar not loaded yet!");
      return;
    }
    const webGLCanvas = canvasRef.current;
    const htmlCanvas = document.createElement("canvas");
    htmlCanvas.width = window.innerWidth;
    htmlCanvas.height = window.innerHeight;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene.current, camera);

    html2canvas(document.body)
      .then((canvas) => {
        const context = canvas.getContext("2d");

        context.drawImage(webGLCanvas, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (!blob) {
            console.error("Failed to create Blob from canvas.");
            return;
          }
          const url = URL.createObjectURL(blob);
          setImageSrc(url);
          localStorage.setItem("avatarScreenshot", url);
          setModalOpen(true);
        }, "image/png");
      })
      .catch((error) => {
        console.error("Error capturing screenshot with html2canvas:", error);
      });
  }

  const handleSubmitEmail = async () => {
    console.log("Environment Variables:", process.env);
    console.log("Database ID:", process.env.REACT_APP_DATABASE_ID);
    console.log("Collection ID:", process.env.REACT_APP_ID_COLLECTION);
    if (!emails2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emails2)) {
      alert("Please enter a valid email address.");
      return;
    }

    console.log(
      "Submitting with Database ID:",
      process.env.REACT_APP_DATABASE_ID
    );
    console.log(
      "Submitting to Collection ID:",
      process.env.REACT__APP_ID_COLLECTION
    );
    console.log("Document ID should be null for auto-generation:", null);
    console.log("Data being sent:", { email2: emails2 });

    try {
      const result = await databases.createDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_ID_COLLECTION,
        null,
        { email2: emails2 },
        ["*"],
        ["*"]
      );
      console.log("Document created:", result);
      alert("Email submitted successfully!");
    } catch (error) {
      console.error(
        "Failed to submit email:",
        error.message,
        error.response.data
      );
      alert("Failed to submit email.");
    }
  };

  if (!productData || Object.keys(productData).length === 0) {
    return (
      <div>No product data found. Please go back and select a product.</div>
    );
  }

  return (
    <div
      className="Container"
      style={{ backgroundImage: `url(${productData.picImage})` }}
    >
      <div className="logoStyle">
        <img src={Logo} className="logoPic"></img>
      </div>
      <canvas ref={canvasRef} className="avatarContainer"></canvas>
      <button
        onClick={takeScreenshotAndSave}
        className="buttonPic"
        disabled={!isAvatarLoaded}
      >
        Take a picture with your avatar!
      </button>
      <AnimatePresence className="picContainer">
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modalBackground"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="modalContent"
              onClick={(e) => e.stopPropagation()}
            >
              <h1>Bye bye! Don't forget to share us on socials :)</h1>
              <img src={imageSrc} alt="Screenshot" className="modalImage" />
              <button
                className="downloadButton"
                onClick={() => {
                  const a = document.createElement("a");
                  a.href = imageSrc;
                  a.download = `screenshot-${new Date().toISOString()}.png`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }}
              >
                DOWNLOAD
              </button>
              <div className="emailInputContainer">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="emailInput"
                  value={emails2}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={handleSubmitEmail}
                  className="submitButton"
                ></button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PicAvatar;

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/PicAvatar.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import html2canvas from "html2canvas";

const PicAvatar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);
  const canvasRef = useRef(null);
  const [renderer, setRenderer] = useState(null);

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

  return (
    <div className="Container">
      <h1>PicAvatar</h1>
      <button
        onClick={takeScreenshotAndSave}
        className="buttonPic"
        disabled={!isAvatarLoaded}
      >
        Take a picture with your avatar!
      </button>
      <canvas ref={canvasRef} className="avatarContainer"></canvas>

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
            >
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
                Download
              </button>
              <button>Share</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PicAvatar;

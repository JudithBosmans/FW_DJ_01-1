import React, { useEffect, useRef, useState, useCallback } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import "../styles/Specification.css";

const Specification = () => {
  const ref = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadedImages = new Array(250);
    let imagesLoaded = 0;

    const handleImageLoad = (img, index) => {
      loadedImages[index] = img;
      imagesLoaded++;
      console.log(`Loaded image ${index + 1}`);
      if (imagesLoaded === 250) {
        setImages(loadedImages);
        setLoading(false);
      }
    };

    for (let i = 0; i < 250; i++) {
      const img = new Image();
      img.onload = () => handleImageLoad(img, i);
      img.onerror = () => console.error(`Failed to load image ${i + 1}`);
      img.src = `/assets/cica/${i + 1}.webp`;
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });

  const currentIndex = useTransform(scrollYProgress, [0, 1], [0, 249]);

  const render = useCallback(
    (index) => {
      const canvas = ref.current;
      const ctx = canvas?.getContext("2d");
      if (ctx && images[index]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const img = images[index];

        const scale = Math.min(
          canvas.width / img.width,
          canvas.height / img.height
        );

        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      } else {
        console.error(
          "Canvas is not available or getContext is not a function"
        );
      }
    },
    [images]
  );

  useMotionValueEvent(currentIndex, "change", (latest) => {
    render(Math.floor(latest));
  });

  if (loading) {
    return <div>Loading images...</div>;
  }

  return (
    <div
      className="Overview_container"
      style={{ height: "5000px", overflow: "auto" }}
    >
      <canvas
        ref={ref}
        className="canvasStyle"
        width="1000"
        height="800"
        style={{ border: "1px solid red" }}
      ></canvas>
    </div>
  );
};

export default Specification;

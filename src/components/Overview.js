import React, { useEffect, useRef, useState, useCallback } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import "../styles/Overview.css";

const Overview = () => {
  const ref = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadedImages = new Array(100);
    let imagesLoaded = 0;

    for (let i = 1; i <= 100; i++) {
      const img = new Image();
      img.onload = () => {
        loadedImages[i - 1] = img;
        imagesLoaded++;
        console.log(`Loaded image ${i}`);
        if (imagesLoaded === 100) {
          setImages(loadedImages);
          setLoading(false);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image ${i}`);
      };
      img.src = `/assets/cera/${i}.webp`;
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center end", "start start"],
  });

  const currentIndex = useTransform(scrollYProgress, [0, 1], [0, 99]);

  const render = useCallback(
    (index) => {
      const canvas = ref.current;
      const ctx = canvas?.getContext("2d");
      if (ctx && images[index]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images[index], 0, 0);
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
    <div className="Overview_container">
      <canvas ref={ref} width="800" height="600"></canvas>
    </div>
  );
};

export default Overview;

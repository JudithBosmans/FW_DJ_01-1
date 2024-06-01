import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";
import { useTransform, useScroll, useMotionValueEvent } from "framer-motion";

const Specification = () => {
  const ref = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [containerHeight, setContainerHeight] = useState("150vh");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useLayoutEffect(() => {
    const canvas = ref.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Failed to get 2D context.");
      }
    } else {
      console.error("Canvas element is not available.");
    }
  }, []);

  useEffect(() => {
    function updateContainerHeight() {
      const screenHeight = window.innerHeight;
      setContainerHeight(`${screenHeight + screenHeight / 2}px`);
    }

    updateContainerHeight();
    window.addEventListener("resize", updateContainerHeight);

    return () => {
      window.removeEventListener("resize", updateContainerHeight);
    };
  }, []);

  useEffect(() => {
    if (!ref.current) {
      console.log("Canvas not yet available");
      return;
    }

    const handleResize = () => {
      const canvas = ref.current;
      const scale = window.devicePixelRatio;
      canvas.style.width = "80vw";
      canvas.width = canvas.offsetWidth * scale;
      canvas.height = canvas.offsetHeight * scale;
      console.log("Canvas resized");
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMounted]);

  useEffect(() => {
    const loadedImages = new Array(250);
    let imagesLoaded = 0;

    const handleImageLoad = (img, index) => {
      loadedImages[index] = img;
      imagesLoaded++;
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

  const scroll = useScroll({
    target: isMounted ? ref : undefined,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });
  const scrollYProgress = isMounted ? scroll.scrollYProgress : null;

  const currentIndex = useTransform(scrollYProgress, [0, 1], [0, 249]);

  const render = useCallback(
    (index) => {
      const canvas = ref.current;
      if (!canvas) {
        console.error("Canvas element is not available.");
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Failed to get 2D context.");
        return;
      }

      if (images[index]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const img = images[index];

        const scale = Math.min(
          canvas.width / img.width,
          canvas.height / img.height
        );

        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
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
      style={{
        height: containerHeight,
        overflow: "auto",
        position: "relative",
      }}
    >
      <canvas
        ref={ref}
        className="canvasStyle"
        style={{ border: "1px solid red", width: "80vw", height: "80vh" }}
      ></canvas>
    </div>
  );
};

export default Specification;

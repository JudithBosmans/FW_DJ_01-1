import React, { useRef, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";

const Specification = () => {
  const ref = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [containerHeight, setContainerHeight] = useState("150vh");
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext("2d");
      if (!ctx) {
        console.error("Failed to get 2D context.");
      } else {
        console.log("2D context available.");
        setCanvasReady(true);
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
    const handleResize = () => {
      if (ref.current) {
        const canvas = ref.current;
        const scale = window.devicePixelRatio;
        canvas.style.width = "80vw";
        canvas.width = canvas.offsetWidth * scale;
        canvas.height = canvas.offsetHeight * scale;
        console.log("Canvas resized");
      } else {
        console.error("Canvas element is not available.");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadedImages = new Array(250);
    let imagesLoaded = 0;

    for (let i = 0; i < 250; i++) {
      const img = new Image();
      img.onload = () => {
        loadedImages[i] = img;
        imagesLoaded++;
        if (imagesLoaded === 250) {
          setImages(loadedImages);
          setLoading(false);
        }
      };
      img.onerror = () => console.error(`Failed to load image ${i + 1}`);
      img.src = `/assets/cica/${i + 1}.webp`;
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: canvasReady ? ref : null,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });

  const currentIndex = useTransform(scrollYProgress, [0, 1], [0, 249]);

  const render = useCallback(
    (index) => {
      if (ref.current && images[index]) {
        const ctx = ref.current.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, ref.current.width, ref.current.height);
          const img = images[index];
          const scale = Math.min(
            ref.current.width / img.width,
            ref.current.height / img.height
          );
          const x = (ref.current.width - img.width * scale) / 2;
          const y = (ref.current.height - img.height * scale) / 2;
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
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

//  const Specification = () => {
//    const ref = useRef(null);
//    const [images, setImages] = useState([]);
//    const [loading, setLoading] = useState(true);
//    const [containerHeight, setContainerHouse] = useState("150vh");
//    const [isCanvasReady, setIsCanvasReady] = useState(false);

//    useEffect(() => {
//      setIsCanvasReady(!!ref.current);
//    }, [ref.current]);

//    useEffect(() => {
//      if (!ref.current) {
//        console.log("Canvas not yet available");
//        return;
//      }

//      const canvas = ref.current;
//      const ctx = canvas.getContext("2d");
//      if (!ctx) {
//        console.error("Failed to get 2D context.");
//        return;
//      }

//      const handleResize = () => {
//        const scale = window.devicePixelRatio;
//        canvas.style.width = "80vw";
//        canvas.width = canvas.offsetWidth * scale;
//        canvas.height = canvas.offsetHeight * scale;
//        console.log("Canvas resized");
//      };

//      handleResize();
//      window.addEventListener("resize", handleResize);

//      return () => window.removeEventListener("resize", handleResize);
//    }, [isCanvasReady]);  Dependency on the canvas readiness

//     Ensure all elements and states are set before using useScroll
//    const scroll = useScroll({
//      target: isCanvasReady ? ref : undefined,
//      offset: ["start start", "end end"],
//      layoutEffect: false,
//    });

//    const scrollYProgress = scroll.scrollYProgress;
//    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, 249]);

//    const render = useCallback(
//      (index) => {
//        if (!ref.current) {
//          console.error("Canvas element is not available.");
//          return;
//        }

//        const ctx = ref.current.getContext("2d");
//        if (!ctx) {
//          console.error("Failed to get 2D context.");
//          return;
//        }

//        if (images[index]) {
//          ctx.clearRect(0, 0, ref.current.width, ref.current.height);
//          const img = images[index];
//          const scale = Math.min(
//            ref.current.width / img.width,
//            ref.current.height / img.height
//          );
//          const x = (ref.current.width - img.width * scale) / 2;
//          const y = (ref.current.height - img.height * scale) / 2;
//          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
//        }
//      },
//      [images]
//    );

//    useMotionValueEvent(currentIndex, "change", (latest) =>
//      render(Math.floor(latest))
//    );

//    if (loading) {
//      return <div>Loading images...</div>;
//    }

//    return (
//      <div
//        className="Overview_container"
//        style={{
//          height: containerHeight,
//          overflow: "auto",
//          position: "relative",
//        }}
//      >
//        <canvas
//          ref={ref}
//          className="canvasStyle"
//          style={{ border: "1px solid red", width: "80vw", height: "80vh" }}
//        ></canvas>
//      </div>
//    );
//  };

//  export default Specification;

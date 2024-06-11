import {
  React,
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { allProducts } from "./Select.ts";
import "../styles/Specification.css";

function Specification() {
  const ref = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { tab } = location.state || { tab: {} };
  const [containerHeight, setContainerHeight] = useState("150vh");

  const label = localStorage.getItem("selectedProductLabel");
  const product = allProducts.find((p) => p.label === label);

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
    const handleResize = () => {
      const canvas = ref.current;
      if (canvas) {
        const scale = window.devicePixelRatio;
        canvas.style.width = "80vw";
        canvas.width = canvas.offsetWidth * scale;
        canvas.height = canvas.offsetHeight * scale;
        console.log("Canvas resized");
      } else {
        console.error("Canvas element is not available.");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      // img.src = `{product.ProductLink}${i + 1}.webp`;
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

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

  if (!product) {
    return (
      <div>Product data not found. Please go back and select a product.</div>
    );
  }

  localStorage.setItem("currentProductData", JSON.stringify(product));

  return (
    <div
      className="canvasContainer specificationPage"
      style={{
        backgroundImage: `url(${product.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Link to="/Game" className="buttonNext">
        Game
      </Link>

      <h1>{product.text}</h1>

      <div style={{ minHeight: "150vh" }} className="canvasContainer">
        <canvas ref={ref}> </canvas>
      </div>
    </div>
  );
}

export default Specification;

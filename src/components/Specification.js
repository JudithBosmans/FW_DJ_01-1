import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import "../styles/Specification.css";
import { useLocation } from "react-router-dom";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

//01 JUNGLE
import Jungle_00 from "../pics/01/03_Background.png";
import Jungle_01 from "../pics/01/01_Jungle_Back.png";
import Jungle_02 from "../pics/01/02_Jungle_Back_02.png";
import Jungle_03 from "../pics/01/04_tiger.png";

const Specification = () => {
  const ref = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { tab } = location.state || { tab: {} };
  const [containerHeight, setContainerHeight] = useState("150vh");

  const alignCenter = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

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

  return (
    <div style={{ height: "200vh", overflow: "auto" }}>
      <Parallax pages={3} className="parallax_container">
        <ParallaxLayer
          offset={0}
          speed={1}
          factor={1}
          className="1"
          style={{
            border: "none",
            backgroundImage: `url(${Jungle_00})`,
            backgroundSize: `cover`,
            backgroundRepeat: `no-repeat`,
            zIndex: 0,
          }}
        />
        <ParallaxLayer
          offset={0}
          speed={1}
          factor={1}
          className="2"
          style={{
            border: "none",
            backgroundImage: `url(${Jungle_01})`,
            backgroundSize: `cover`,
            zIndex: 1,
          }}
        />
        <ParallaxLayer
          offset={0}
          speed={3}
          factor={1}
          className="3"
          style={{
            ...alignCenter,
            zIndex: 7,
          }}
        >
          <img src={Jungle_01} alt="4" />
        </ParallaxLayer>
        <ParallaxLayer
          offset={0}
          speed={2}
          factor={2}
          className="5"
          style={{
            border: "none",
            zIndex: 8,
          }}
        >
          <img src={Jungle_02} />
        </ParallaxLayer>
        <ParallaxLayer
          offset={0}
          speed={3}
          factor={2}
          className="6"
          style={{
            ...alignCenter,
            zIndex: 8,
          }}
        >
          <img src={Jungle_03} />
        </ParallaxLayer>
      </Parallax>
      <div
        className="Overview_container"
        style={{
          height: containerHeight,
          overflow: "auto",
          position: "relative",
        }}
      >
        <div className="tab_container">
          <h1>{tab.label}</h1>
        </div>
        <canvas
          ref={ref}
          className="canvasStyle"
          style={{ border: "1px solid red", width: "80vw", height: "80vh" }}
        ></canvas>
      </div>
    </div>
  );
};

export default Specification;

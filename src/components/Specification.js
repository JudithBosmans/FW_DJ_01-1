import React, { useMemo, useRef, useEffect } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { allProducts } from "./Select.ts";

function Specification() {
  // const imageRef = useRef(null);

  // const { scrollYProgress } = useScroll({
  //   target: imageRef,
  //   offset: ["start end", "end start"],
  // });

  // const images = useMemo(() => {
  //   return Array.from({ length: 86 }, (_, i) => `/assets/cica/${i + 1}.webp`);
  // }, []);

  // const currentIndex = useTransform(
  //   scrollYProgress,
  //   [0, 1],
  //   [0, images.length - 1]
  // );

  // useMotionValueEvent(currentIndex, "change", (latest) => {
  //   const imageElement = imageRef.current;
  //   if (imageElement) {
  //     imageElement.src = images[Math.round(latest)];
  //   }
  // });

  // useEffect(() => {
  //   if (imageRef.current) {
  //     imageRef.current.src = images[0];
  //   }
  // }, [images]);

  const label = localStorage.getItem("selectedProductLabel");
  const product = allProducts.find((p) => p.label === label);
  if (!product) {
    return (
      <div>Product data not found. Please go back and select a product.</div>
    );
  }

  localStorage.setItem("currentProductData", JSON.stringify(product));

  return (
    <>
      <div>
        <Link to="/Game" className="buttonNext">
          Game
        </Link>
        <h1>{product.text}</h1>
        <img
          src={product.backgroundImage}
          alt={product.label}
          style={{ width: "100%" }}
        />
        <div>
          <h2>Details:</h2>
          <p>{product.details}</p>
          <h3>Usage:</h3>
          <p>{product.usage}</p>
          <h3>Key Ingredients:</h3>
          <ul>
            {product.products.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* <div
        className="SpecificationContainer"
        style={{
          height: "6000px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div style={{ height: "3000px" }} /> */}
      {/* <img
        alt="Scroll-driven image"
        width={1000}
        height={1000}
        // ref={imageRef}
      /> 
      </div>*/}
    </>
  );
}

export default Specification;

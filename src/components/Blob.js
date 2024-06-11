import React, {
  useRef,
  useEffect,
  forwardRef,
  useState,
  useImperativeHandle,
} from "react";
import { useSpring, animated } from "@react-spring/three";
import { MeshDistortMaterial } from "@react-three/drei";
import { Vector2 } from "three";

import * as THREE from "three";

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial);

const createBlob = forwardRef(({}, ref) => {
  const [vector2] = useState(() => new Vector2());

  const [springs, api] = useSpring(
    () => ({
      scale: 1,
      position: [0, 0],
      color: "#ff6d6d",
    }),
    []
  );

  useImperativeHandle(ref, () => ({
    getCurrentPosition: () => vector2,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      const { x, y } = vector2;
      console.log("the blob is at position", { x, y });
    }, 2000);

    return () => clearInterval(interval);
  }, [vector2]);

  const handlePointerEnter = () => {
    api.start({
      scale: 1.2,
    });
  };

  const handlePointerLeave = () => {
    api.start({
      scale: 1,
    });
  };

  return (
    <animated.mesh
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      scale={springs.scale}
      position={springs.position.to((x, y) => [x, y, 0])}
    >
      <sphereGeometry args={[1.5, 64, 32]} />
      <AnimatedMeshDistortMaterial
        speed={3}
        distort={0.3}
        color={springs.color}
      />
    </animated.mesh>
  );
});

export function Blob() {
  const geometry = new THREE.SphereGeometry(1.5, 64, 32);
  const material = new MeshDistortMaterial({
    color: new THREE.Color("#ff6d6d"),
    speed: 3,
    distort: 0.3,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

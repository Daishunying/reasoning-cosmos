"use client";

import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Starfield() {
  const starsRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.x += delta * 0.02;
      starsRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <group ref={starsRef}>
      <Stars
        radius={100}
        depth={50}
        count={6000}
        factor={4}
        saturation={0}
        fade
        speed={2}
      />
    </group>
  );
}
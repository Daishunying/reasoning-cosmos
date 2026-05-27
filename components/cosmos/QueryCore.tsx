"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

import * as THREE from "three";

import { useReasoningStore } from "@/store/reasoningStore";
import { useNavigationStore } from "@/store/navigationStore";

export default function QueryCore() {

  const coreRef = useRef<THREE.Mesh>(null);

  const phase = useReasoningStore(
    (state) => state.phase
  );

  const offsetX = useNavigationStore(
    (state) => state.offsetX
  );

  const offsetY = useNavigationStore(
    (state) => state.offsetY
  );

  const updateNavigation = useNavigationStore(
    (state) => state.update
  );
  const confidence = useReasoningStore(
  (state) => state.confidence);

  useFrame((state) => {

    updateNavigation();

    if (!coreRef.current) return;

    const t = state.clock.getElapsedTime();

    // COMPLETE → disappear forever
    if (phase === "COMPLETE") {

      coreRef.current.visible = false;

      return;
    }

    // Smooth movement
    coreRef.current.position.x +=
      (offsetX - coreRef.current.position.x) * 0.08;

    coreRef.current.position.y +=
      (offsetY - coreRef.current.position.y) * 0.08;

    coreRef.current.position.z = 0;

    // Base breathing
    let breathing =
      1 + Math.sin(t * 2.5) * 0.03;

    // CONFLICT → unstable pulse
    if (phase === "CONFLICT") {

      breathing =
        1 + Math.sin(t * 2) * 0.03;
    }

    // VERIFYING → stable pulse
    if (phase === "VERIFYING") {

      breathing =
        1 + Math.sin(t * 2) * 0.015;
    }

    // CONVERGING → shrink + fade
    if (phase === "CONVERGING") {

      coreRef.current.scale.multiplyScalar(0.992);

      //(coreRef.current.material.opacity as THREE.MeshStandardMaterial).opacity *= 0.985;

      // Pull back to center
      coreRef.current.position.x *= 0.96;
      coreRef.current.position.y *= 0.96;

      // Vanish
      if (coreRef.current.scale.x < 0.02) {

        coreRef.current.visible = false;
      }

    } else {

      coreRef.current.scale.set(
        breathing,
        breathing,
        breathing
      );
    }

    // Slight rotation
    coreRef.current.rotation.y += 0.002;

    // Movement tilt
    coreRef.current.rotation.z =
      -coreRef.current.position.x * 0.08;

  });

  return (

    <mesh ref={coreRef}>

      <sphereGeometry args={[0.08, 64, 64]} />

      <meshStandardMaterial

        transparent

        color={
          phase === "CONVERGING"
            ? "#ffffff"
            : "#bfe9ff"
        }

        emissive={
          phase === "CONVERGING"
            ? "#ffffff"
            : "#38bdf8"
        }

        emissiveIntensity={
          (
            phase === "CONFLICT"
              ? 4
              : phase === "VERIFYING"
              ? 4
              : phase === "CONVERGING"
              ? 10
              : 2)+ confidence * 0.08
        }

        //opacity={1}

        roughness={0.15}

        metalness={0.3}

      />

    </mesh>
  );
}
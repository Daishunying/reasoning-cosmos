"use client";

import { useRef } from "react";

import { useFrame } from "@react-three/fiber";

import * as THREE from "three";

import { useReasoningStore } from "@/store/reasoningStore";

import { useNavigationStore } from "@/store/navigationStore";

export default function VerificationField() {

  const phase = useReasoningStore(
    (state) => state.phase
  );

  const increaseConfidence = useReasoningStore(
    (state) => state.increaseConfidence
  );

  const decreaseConfidence = useReasoningStore(
    (state) => state.decreaseConfidence
  );

  const offsetX = useNavigationStore(
    (state) => state.offsetX
  );

  const laneRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {

    if (phase !== "VERIFYING") return;

    const t = state.clock.getElapsedTime();

    // =====================================================
    // MOVING VERIFICATION LANE
    // =====================================================

    const laneX = Math.sin(t * 0.4) * 1.2;

    // =====================================================
    // ALIGNMENT CHECK
    // =====================================================

    const alignmentDistance =
      Math.abs(offsetX - laneX);

    // Inside verification corridor
    if (alignmentDistance < 0.35) {

      increaseConfidence(0.5);

    }

    // Outside corridor
    else {

      decreaseConfidence(0.25);

    }

    // =====================================================
    // VISUAL UPDATE
    // =====================================================

    if (laneRef.current) {

      laneRef.current.position.x = laneX;

      laneRef.current.rotation.z =
        Math.sin(t * 0.8) * 0.05;

    }

  });

  if (phase !== "VERIFYING") return null;

  return (

    <group>

      {/* Verification Corridor */}

      <mesh ref={laneRef}>

        <boxGeometry
          args={[0.7, 8, 0.02]}
        />

        <meshStandardMaterial

          color="#ffffff"

          emissive="#dbeafe"

          emissiveIntensity={5}

          transparent

          opacity={0.7}

        />

      </mesh>

    </group>

  );

}
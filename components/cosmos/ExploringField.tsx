"use client";

import { useMemo, useRef } from "react";

import { useFrame } from "@react-three/fiber";

import * as THREE from "three";

import { useReasoningStore } from "@/store/reasoningStore";

import { useNavigationStore } from "@/store/navigationStore";

type FragmentType = {

  x: number;
  y: number;
  z: number;

  size: number;

  baseSize: number;

  collected: boolean;

  pulseOffset: number;

};

export default function ExploringField() {

  const phase = useReasoningStore(
    (state) => state.phase
  );

  const increaseConfidence = useReasoningStore(
    (state) => state.increaseConfidence
  );

  const offsetX = useNavigationStore(
    (state) => state.offsetX
  );

  const offsetY = useNavigationStore(
    (state) => state.offsetY
  );

  const meshesRef = useRef<THREE.Mesh[]>([]);

  const fragments = useMemo<FragmentType[]>(() => {

    return Array.from({ length: 8 }).map(() => ({

      x: (Math.random() - 0.5) * 8,

      y: (Math.random() - 0.5) * 5,

      z: -2 - Math.random() * 5,

      size: 0.08,

      baseSize: 0.08,

      collected: false,

      pulseOffset:
        Math.random() * Math.PI * 2,

    }));

  }, []);

  useFrame((state) => {

    if (phase !== "EXPLORING") return;

    const t = state.clock.getElapsedTime();

    fragments.forEach((fragment, i) => {

      const mesh = meshesRef.current[i];

      if (!mesh || !mesh.visible) return;

      // =====================================================
      // FLOATING STATE
      // =====================================================

      if (!fragment.collected) {

        // Forward drift
        fragment.z += 0.01;

        // Floating motion
        fragment.x +=
          Math.sin(
            t + fragment.pulseOffset
          ) * 0.002;

        fragment.y +=
          Math.cos(
            t + fragment.pulseOffset
          ) * 0.002;

        // Breathing scale
        const pulse =

          1 +

          Math.sin(
            t * 2 +
            fragment.pulseOffset
          ) * 0.15;

        fragment.size =
          fragment.baseSize * pulse;

        // Rotation
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

      }

      // =====================================================
      // DISTANCE TO CORE
      // =====================================================

      const dx = offsetX - fragment.x;

      const dy = offsetY - fragment.y;

      const dz = 0 - fragment.z;

      const distance = Math.sqrt(
        dx * dx +
        dy * dy 
      );

      // =====================================================
      // BEGIN ABSORPTION
      // =====================================================

      if (
        distance < 1.5 &&
        !fragment.collected
      ) {

        fragment.collected = true;

        increaseConfidence(8);

      }

      // =====================================================
      // ABSORPTION
      // =====================================================

      if (fragment.collected) {

        // Pull toward core
        fragment.x += dx * 0.2;

        fragment.y += dy * 0.2;

        fragment.z += dz * 0.2;

        // Shrink
        fragment.size *= 0.8;

        // Faster spin
        mesh.rotation.x += 0.12;
        mesh.rotation.y += 0.12;

        // Dissolve
        if (fragment.size < 0.015) {

          // Respawn

          fragment.x =
            (Math.random() - 0.5) * 8;

          fragment.y =
            (Math.random() - 0.5) * 5;

          fragment.z =
            -2 - Math.random() * 6;

          fragment.size =
            fragment.baseSize;

          fragment.collected = false;

        }

      }

      // =====================================================
      // APPLY TRANSFORM
      // =====================================================

      mesh.position.set(
        fragment.x,
        fragment.y,
        fragment.z
      );

      mesh.scale.setScalar(
        fragment.size / 0.08
      );

    });

  });

  if (phase !== "EXPLORING") return null;

  return (

    <group>

      {fragments.map((fragment, i) => (

        <mesh
          key={i}
          ref={(el) => {

            if (el) {

              meshesRef.current[i] = el;

            }

          }}
        >

          <octahedronGeometry
            args={[0.08, 0]}
          />

          <meshStandardMaterial

            color="#ffe27a"

            emissive="#ffd966"

            emissiveIntensity={4}

          />

        </mesh>

      ))}

    </group>

  );

}
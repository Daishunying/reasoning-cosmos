"use client";

import { useMemo, useRef } from "react";

import { useFrame } from "@react-three/fiber";

import * as THREE from "three";

import { useReasoningStore } from "@/store/reasoningStore";

import { useNavigationStore } from "@/store/navigationStore";

type TurbulenceType = {

  x: number;
  y: number;
  z: number;

  speed: number;

  radius: number;

  rotationSpeed: number;

};

export default function ConflictField() {

  const phase = useReasoningStore(
    (state) => state.phase
  );

  const decreaseConfidence = useReasoningStore(
    (state) => state.decreaseConfidence
  );

  const offsetX = useNavigationStore(
    (state) => state.offsetX
  );

  const offsetY = useNavigationStore(
    (state) => state.offsetY
  );

  const meshesRef = useRef<THREE.Mesh[]>([]);

  const turbulenceFields =
    useMemo<TurbulenceType[]>(() => {

      return Array.from({ length: 6 }).map(() => ({

        x: (Math.random() - 0.5) * 6,

        y: (Math.random() - 0.5) * 4,

        z: Math.random() * -12,

        speed: 0.04 + Math.random() * 0.05,

        radius: 0.7,

        rotationSpeed:
          0.01 + Math.random() * 0.03,

      }));

    }, []);

  useFrame(() => {

    if (phase !== "CONFLICT") return;

    turbulenceFields.forEach((field, i) => {

      const mesh = meshesRef.current[i];

      if (!mesh) return;

      // =====================================================
      // FAST FLOW
      // =====================================================

      field.z += field.speed;

      // Slight horizontal drift
      field.x +=
        Math.sin(field.z) * 0.003;

      field.y +=
        Math.cos(field.z) * 0.003;

      // Respawn
      if (field.z > 3) {

        field.z = -12;

        field.x =
          (Math.random() - 0.5) * 6;

        field.y =
          (Math.random() - 0.5) * 4;

      }

      // =====================================================
      // PROXIMITY DESTABILIZATION
      // =====================================================

      const dx = offsetX - field.x;

      const dy = offsetY - field.y;

      const dz = 0 - field.z;

      const distance = Math.sqrt(
        dx * dx +
        dy * dy 
      );

      if (distance < field.radius) {

        decreaseConfidence(0.25);

      }

      // =====================================================
      // VISUAL UPDATE
      // =====================================================

      mesh.position.set(
        field.x,
        field.y,
        field.z
      );
      const scale = Math.max(0.15,1 - field.z * 0.08);

        mesh.scale.setScalar(scale);
        mesh.rotation.x +=field.rotationSpeed;
        mesh.rotation.y +=field.rotationSpeed;

    });

  });

  if (phase !== "CONFLICT") return null;

  return (

    <group>

      {turbulenceFields.map((field, i) => (

        <mesh
          key={i}
          ref={(el) => {

            if (el) {

              meshesRef.current[i] = el;

            }

          }}
        >

          <octahedronGeometry
            args={[0.18, 0]}
          />

          <meshStandardMaterial

            color="#ff4d6d"

            emissive="#bf23f3"

            emissiveIntensity={6}

            roughness={0.7}

            metalness={0.3}

          />

        </mesh>

      ))}

    </group>

  );

}
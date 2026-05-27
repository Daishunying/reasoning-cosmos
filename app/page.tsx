"use client";

import { useEffect } from "react";

import { Canvas } from "@react-three/fiber";

import {
  EffectComposer,
  Bloom,
} from "@react-three/postprocessing";

import Starfield from "@/components/cosmos/Starfield";

import QueryCore from "@/components/cosmos/QueryCore";

import CameraRig from "@/components/cosmos/CameraRig";

import ReasoningOverlay from "@/components/reasoning/ReasoningOverlay";

import ExploringField from "@/components/cosmos/ExploringField";

import { useReasoningStore } from "@/store/reasoningStore";

import { useNavigationStore } from "@/store/navigationStore";

import ConflictField from "@/components/cosmos/ConflictField";

import VerificationField from "@/components/cosmos/VerificationField";

export default function Home() {

  const setPhase = useReasoningStore(
    (state) => state.setPhase
  );

  const moveLeft = useNavigationStore(
    (state) => state.moveLeft
  );

  const moveRight = useNavigationStore(
    (state) => state.moveRight
  );

  const moveUp = useNavigationStore(
    (state) => state.moveUp
  );

  const moveDown = useNavigationStore(
    (state) => state.moveDown
  );

  // Simulated AI reasoning timeline
  useEffect(() => {

    setPhase("EXPLORING");

    const exploring = setTimeout(() => {

      setPhase("CONFLICT");

      const conflict = setTimeout(() => {

        setPhase("VERIFYING");

        const verifying = setTimeout(() => {

          setPhase("CONVERGING");

          const converging = setTimeout(() => {

            setPhase("COMPLETE");

          }, 10000);

          return () => clearTimeout(converging);

        }, 10000);

        return () => clearTimeout(verifying);

      }, 10000);

      return () => clearTimeout(conflict);

    }, 12000);

    return () => clearTimeout(exploring);

  }, [setPhase]);

  // Keyboard navigation
  useEffect(() => {

    const handleKeyDown = (
      e: KeyboardEvent
    ) => {

      if (e.key === "ArrowLeft") {
        moveLeft();
      }

      if (e.key === "ArrowRight") {
        moveRight();
      }

      if (e.key === "ArrowUp") {
        moveUp();
      }

      if (e.key === "ArrowDown") {
        moveDown();
      }

    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  }, [
    moveLeft,
    moveRight,
    moveUp,
    moveDown,
  ]);

  return (

    <main
      className="
        w-screen
        h-screen
        overflow-hidden
        relative
        bg-gradient-to-b
        from-black
        via-[#020617]
        to-[#000814]
      "
    >

      {/* Overlay UI */}
      <ReasoningOverlay />

      {/* Three.js Universe */}
      <Canvas
        camera={{
          position: [0, 0, 3],
        }}
      >

        <CameraRig />

        <ambientLight intensity={0.5} />

        <pointLight
          position={[0, 0, 0]}
          intensity={5}
          color="#2567ad"
        />

        <Starfield />

        <QueryCore />

        <ExploringField />

        <ConflictField />

        <VerificationField />

        <EffectComposer>

          <Bloom
            intensity={2}
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
          />

        </EffectComposer>

      </Canvas>

      {/* Center Title */}
      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          pointer-events-none
        "
      >

        <h1
          className="
            text-cyan-100
            text-5xl
            font-light
            tracking-[0.3em]
          "
        >
          REASONING COSMOS
        </h1>

      </div>

    </main>
  );
}
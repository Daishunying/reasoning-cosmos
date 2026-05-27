"use client";

import { useReasoningStore } from "@/store/reasoningStore";

export default function ReasoningOverlay() {

  const phase = useReasoningStore(
    (state) => state.phase
  );

  const confidence = useReasoningStore(
    (state) => state.confidence
  );

  // COMPLETE → disappear
  if (phase === "COMPLETE") {
    return null;
  }

  return (

  <>

    {/* ===================================================== */}
    {/* OVERLAY */}
    {/* ===================================================== */}

    <div

      className={`
        absolute
        top-10
        left-10
        z-50
        transition-all
        duration-1000
      `}

      style={{

        color:
          phase === "CONFLICT"
            ? "#c084fc"
            : phase === "VERIFYING"
            ? "#ffffff"
            : "#bfe9ff",

        opacity:
          phase === "CONVERGING"
            ? 0.25
            : 1,

        transform:
          phase === "CONFLICT"
            ? `translateX(${Math.sin(Date.now() * 0.02) * 3}px)`
            : "translateX(0px)",

      }}

    >

      <div className="text-xs tracking-[0.3em] opacity-60">

        {
          phase === "VERIFYING"
            ? "LOGICAL ALIGNMENT"

            : phase === "CONFLICT"
            ? "COGNITIVE INSTABILITY"

            : phase === "CONVERGING"
            ? "CONVERGENCE"

            : "REASONING PHASE"
        }

      </div>

      <div className="text-2xl font-light mt-2">

        {phase}

      </div>

      <div className="mt-4 w-56 h-[2px] bg-white/10 overflow-hidden">

        <div
          className="h-full transition-all duration-500"
          style={{

            width: `${confidence}%`,

            background:
              phase === "CONFLICT"
                ? "#c084fc"

                : phase === "VERIFYING"
                ? "#ffffff"

                : "#7dd3fc",

          }}
        />

      </div>

      <div className="mt-2 text-sm opacity-60">

        confidence: {confidence.toFixed(0)}%

      </div>

      <div className="mt-1 text-xs opacity-40 tracking-[0.15em]">

        {
          phase === "EXPLORING"
            ? "collecting fragmented signals"

            : phase === "CONFLICT"
            ? "avoid reasoning conflict"

            : phase === "VERIFYING"
            ? "maintain alignment"

            : phase === "CONVERGING"
            ? "final synthesis in progress"

            : "reasoning active"
        }

      </div>

    </div>

  </>

  );

}
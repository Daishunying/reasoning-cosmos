import { create } from "zustand";

export type ReasoningPhase =
  | "IDLE"
  | "EXPLORING"
  | "CONFLICT"
  | "VERIFYING"
  | "CONVERGING"
  | "COMPLETE";

type ReasoningState = {
  phase: ReasoningPhase;

  confidence: number;
  increaseConfidence: (amount: number) => void;
  decreaseConfidence: (amount: number) => void;

  setPhase: (phase: ReasoningPhase) => void;

  setConfidence: (value: number) => void;
};

export const useReasoningStore =
  create<ReasoningState>((set) => ({

    phase: "IDLE",

    confidence: 0,

    setPhase: (phase) =>
      set({ phase }),

    setConfidence: (value) =>
      set({ confidence: value }),

    increaseConfidence: (amount) =>

      set((state) => ({

        confidence: Math.min(
          state.confidence + amount,
          100
        ),

      })),

    decreaseConfidence: (amount) =>

      set((state) => ({

        confidence: Math.max(
          state.confidence - amount,
          0
        ),

      })),

  }));
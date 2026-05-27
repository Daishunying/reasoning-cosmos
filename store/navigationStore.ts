import { create } from "zustand";

type NavigationState = {

  offsetX: number;
  offsetY: number;

  velocityX: number;
  velocityY: number;

  moveLeft: () => void;
  moveRight: () => void;
  moveUp: () => void;
  moveDown: () => void;

  update: () => void;
};

export const useNavigationStore =
  create<NavigationState>((set, get) => ({

    offsetX: 0,
    offsetY: 0,

    velocityX: 0,
    velocityY: 0,

    moveLeft: () =>
      set((state) => ({
        velocityX: state.velocityX - 0.03,
      })),

    moveRight: () =>
      set((state) => ({
        velocityX: state.velocityX + 0.03,
      })),

    moveUp: () =>
      set((state) => ({
        velocityY: state.velocityY + 0.03,
      })),

    moveDown: () =>
      set((state) => ({
        velocityY: state.velocityY - 0.03,
      })),

    update: () => {

      const {
        offsetX,
        offsetY,
        velocityX,
        velocityY,
      } = get();

        const nextX = offsetX + velocityX;

        const nextY = offsetY + velocityY;

        set({

          offsetX: Math.max(
            -2,
            Math.min(2, nextX)
          ),

          offsetY: Math.max(
            -1.5,
            Math.min(1.5, nextY)
          ),

          velocityX:

            Math.abs(nextX) > 2
              ? velocityX * -0.4
              : velocityX * 0.92,

          velocityY:

            Math.abs(nextY) > 1.5
              ? velocityY * -0.4
              : velocityY * 0.92,

        });

    },

  }));
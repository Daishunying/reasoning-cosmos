"use client";
import { useNavigationStore } from "@/store/navigationStore";
import { useFrame, useThree } from "@react-three/fiber";

export default function CameraRig() {
  const { camera, mouse } = useThree();
const offsetX = useNavigationStore(
  (state) => state.offsetX
);
  useFrame((state) => {

    const t = state.clock.getElapsedTime();

    // 慢速漂移
    camera.position.x +=
      (
        offsetX +
        (mouse.x * 0.3) + Math.sin(t * 0.1) * 0.2 - camera.position.x) * 0.02;

    camera.position.y +=
      ((mouse.y * 0.2) + Math.cos(t * 0.15) * 0.1 - camera.position.y) * 0.02;

    // 始终看向中心
    camera.lookAt(0, 0, 0);
  });

  return null;
}
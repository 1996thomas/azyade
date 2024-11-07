"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls, Stats } from "@react-three/drei";
import { GalleryModel } from "./GalleryModel";
import { Physics, RigidBody } from "@react-three/rapier";
import Controllers from "./Controllers";
import WallPhoto from "./WallPhoto";
import { PHOTO_QUERYResult } from "@/sanity/types/type";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
];

export default function Scene({ photos }: { photos: PHOTO_QUERYResult }) {
  const testPhoto = photos[2].image;
  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-screen overflow-hidden"
        style={{ touchAction: "none" }}
      >
        <KeyboardControls map={keyboardMap}>
          <Stats />
          <Canvas shadows camera={{ position: [3, 3, 3], near: 0.1, fov: 40 }}>
            <WallPhoto photo={testPhoto} />
            <ambientLight intensity={0.05} color={"white"} />
            <Physics>
              <Controllers></Controllers>
              <RigidBody type="fixed" colliders="trimesh">
                <GalleryModel />
              </RigidBody>
            </Physics>
          </Canvas>
        </KeyboardControls>
      </div>
    </>
  );
}

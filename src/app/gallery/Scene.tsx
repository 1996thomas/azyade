"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls, Stats } from "@react-three/drei";
import { GalleryModel } from "./GalleryModel";
import { Physics, RigidBody } from "@react-three/rapier";
import Controllers from "./Controllers";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
];

export default function Scene() {
  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-screen overflow-hidden"
        style={{ touchAction: "none" }}
      >
        <KeyboardControls map={keyboardMap}>
          <Stats />
          <Canvas shadows camera={{ position: [3, 3, 3], near: 0.1, fov: 40 }}>
            <ambientLight intensity={0.5} />
            <Physics debug>
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

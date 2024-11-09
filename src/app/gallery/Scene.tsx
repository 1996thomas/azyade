"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  KeyboardControls,
  SpotLight,
  Stats,
} from "@react-three/drei";
import { GalleryModel } from "./GalleryModel";
import { Physics, RigidBody } from "@react-three/rapier";
import Controllers from "./Controllers";
import WallPhoto from "./WallPhoto";
import { PHOTO_QUERYResult } from "@/sanity/types/type";
import { ReinhardToneMapping } from "three";

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
          <Canvas
            shadows
            gl={{
              toneMapping: ReinhardToneMapping,
              toneMappingExposure: 2,
            }}
            camera={{ position: [3, 3, 3], near: 0.1, fov: 40 }}
          >
            <hemisphereLight
              castShadow
              args={["#ffffff", "#444444", 0.2]} // Couleur du ciel, couleur du sol, intensité
              position={[0, 5, 0]} // Position pour éclairer d'en haut
            />

            <SpotLight
              castShadow
              distance={5}
              decay={1}
              penumbra={0.5}
              position-y={3}
            />
            <Environment preset="night" environmentIntensity={0.2} />
            <WallPhoto photo={testPhoto} />
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

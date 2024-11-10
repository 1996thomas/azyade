"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  // Box,
  Environment,
  FirstPersonControls,
  KeyboardControls,
  // OrbitControls,
  // Plane,
  // SpotLight,
  Stats,
} from "@react-three/drei";
// import { GalleryModel } from "./GalleryModel";
// import { Physics, RigidBody } from "@react-three/rapier";
// import Controllers from "./Controllers";
import WallPhoto from "./WallPhoto";
import { PHOTO_QUERYResult } from "@/sanity/types/type";
import { ReinhardToneMapping } from "three";
// import Wall from "./Wall";
// import CubeTest from "./CubeTest";
// import Floor from "./Floor";
// import RaycastControl from "./RaycastControl";
import { keyboardMap } from "./keyboardMap";

export default function Scene({ photos }: { photos: PHOTO_QUERYResult }) {
  const testPhoto = photos[2].image;
  // const [showInteractionMessage, setShowInteractionMessage] = useState(false);
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
              toneMappingExposure: 1.4,
            }}
            camera={{ position: [0, 0, 0], near: 0.1, fov: 40 }}
          >
            <hemisphereLight
              castShadow
              args={["#ffffff", "#444444", 1]} // Couleur du ciel, couleur du sol, intensité
              position={[0, 5, 0]} // Position pour éclairer d'en haut
            />
            <FirstPersonControls activeLook={false} lookVertical lookSpeed={3}/>
            <Environment preset="studio" environmentIntensity={0.2} />
            <WallPhoto photo={testPhoto} />
            {/* <Physics debug>
              <Floor />
              <CubeTest />
              <Wall />
            </Physics> */}
          </Canvas>
        </KeyboardControls>
      </div>
    </>
  );
}

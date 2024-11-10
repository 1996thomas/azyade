import { Plane, useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React from "react";
import * as THREE from "three";

export default function Floor() {
  const texture = useTexture(
    "/textures/Concrete_Pavement_wfxjchj_2K_BaseColor.jpg"
  );
  const displacement = useTexture(
    "/textures/Concrete_Pavement_wfxjchj_2K_Displacement.jpg"
  );
  const aoMap = useTexture("/textures/Concrete_Pavement_wfxjchj_2K_AO.jpg");
  const normal = useTexture(
    "/textures/Concrete_Pavement_wfxjchj_2K_Normal.jpg"
  );

  texture.repeat.set(2, 1);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return (
    <>
      <RigidBody type="fixed" colliders="trimesh" name="planeBody">
        <Plane args={[50, 50]} position-y={-1} rotation-x={-Math.PI / 2} name="floor">
          <meshStandardMaterial
            map={texture}
            displacementMap={displacement}
            displacementScale={0.001}
            aoMap={aoMap}
            normalMap={normal}
          />
        </Plane>
      </RigidBody>
    </>
  );
}

import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React from "react";
// import * as THREE from "three";

export default function Wall() {
  return (
    <>
      <RigidBody colliders="trimesh" scale={0.5}>
        <group position={[0, 5, 0]}>
          <Box args={[1, 10, 50]} position={[-24.5, 0, 0]} name="redWall">
            <meshStandardMaterial color={"red"} />
          </Box>
          <Box args={[48, 10, 1]} position={[0, 0, 24.5]} name="blueWall">
            <meshStandardMaterial color={"blue"} />
          </Box>
          <Box args={[48, 10, 1]} position={[0, 0, -24.5]} name="greenWall">
            <meshStandardMaterial color={"green"} />
          </Box>
          <Box args={[1, 10, 50]} position={[24.5, 0, 0]} name="yellowWall">
            <meshStandardMaterial color={"yellow"} />
          </Box>
        </group>
      </RigidBody>
    </>
  );
}

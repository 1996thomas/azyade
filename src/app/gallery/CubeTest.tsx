import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React from "react";

export default function CubeTest() {
  return (
    <>
      <RigidBody colliders="cuboid" name="testBoxBody">
        <Box args={[1, 1, 1]} name="box">
          <meshStandardMaterial color={"red"} />
        </Box>
      </RigidBody>
    </>
  );
}

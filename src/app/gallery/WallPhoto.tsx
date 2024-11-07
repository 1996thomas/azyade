"use client";
import { urlFor } from "@/sanity/lib/image";
import { Box, Plane, useTexture } from "@react-three/drei";
import React from "react";
import { Image } from "sanity";
import { DoubleSide } from "three";
import * as THREE from "three";

export default function WallPhoto({ photo }: { photo: Image }) {
  const texture = useTexture(urlFor(photo).url());

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.setScalar(1);
  return (
    <group position={[0, 1, 6]}>
      <pointLight color={"white"} intensity={10} position={[0, 2, -0.2]} />
      <Plane args={[2, 3]} position={[0, 0, -0.0309]}>
        <meshStandardMaterial side={DoubleSide} map={texture} />
      </Plane>
      <Box args={[2, 3, 0.05]}>
        <meshStandardMaterial color={"grey"} />
      </Box>
    </group>
  );
}

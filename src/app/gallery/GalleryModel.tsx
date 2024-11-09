import React from "react";
import { useGLTF } from "@react-three/drei";

export function GalleryModel() {
  const { nodes, materials } = useGLTF("/vr_art_gallery_01.glb");
  return (
    <group dispose={null} position={[0, -1, 0]}>
      <mesh
        castShadow
        receiveShadow
        //@ts-expect-error/need to recheck this later
        geometry={nodes.Object_4.geometry} 
        material={materials.Gallery_Baked}
      />
      <mesh
        castShadow
        receiveShadow
        //@ts-expect-error/need to recheck this later
        geometry={nodes.Object_5.geometry}
      />
    </group>
  );
}

useGLTF.preload("/vr_art_gallery_01.glb");

import { useFrame, useThree } from "@react-three/fiber";
import {
  Raycaster,
  Vector3,
  Line,
  BufferGeometry,
  LineBasicMaterial,
  Mesh,
} from "three";
import React, { useRef, useState, useEffect } from "react";

export default function RaycastControl() {
  const { camera, scene } = useThree();
  const raycaster = useRef(new Raycaster());
  const [lastIntersected, setLastIntersected] = useState<Mesh | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  const lineRef = useRef<Line>();
  const mouse = useRef(new Vector3());

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const points = [new Vector3(0, 0, 0), new Vector3(0, 0, -5)];
    const geometry = new BufferGeometry().setFromPoints(points);
    const material = new LineBasicMaterial({ color: 0xff0000 });
    const line = new Line(geometry, material);
    lineRef.current = line;
    scene.add(line);
    line.raycast = () => {}; // Exclude line from raycasting

    return () => {
      scene.remove(line);
      geometry.dispose();
      material.dispose();
    };
  }, [scene]);

  useFrame(() => {
    //@ts-expect-error/need to check this
    raycaster.current.setFromCamera(mouse.current, camera);
    if (lineRef.current) {
      const direction = raycaster.current.ray.direction
        .clone()
        .multiplyScalar(10);
      lineRef.current.geometry.setFromPoints([
        raycaster.current.ray.origin,
        direction,
      ]);
    }

    const meshChildren = scene.children.filter((child) => {
      return (
        (child as Mesh).isMesh && (child as Mesh).geometry?.attributes?.position
      );
    }) as Mesh[];

    const intersects = raycaster.current.intersectObjects(meshChildren, true);

    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object as Mesh;
      if (intersectedObject !== lastIntersected) {
        setLastIntersected(intersectedObject);
        setShowMessage(intersectedObject.name === "WallPhoto");
      }
    } else {
      setLastIntersected(null);
      setShowMessage(false);
    }
  });

  return showMessage ? <div>Appuyer sur E pour intéragir</div> : null;
}

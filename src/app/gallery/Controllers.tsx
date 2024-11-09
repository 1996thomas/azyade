import { Box, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { useControls } from "leva";
import React, { useRef } from "react";
import { Vector3 } from "three";
import { degToRad, MathUtils } from "three/src/math/MathUtils.js";

const normalizeAngle = (angle: number) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start: number, end: number, t: number) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return MathUtils.lerp(start, end, t); // Return the interpolated angle
};

export default function Controllers() {
  const { WALK_SPEED, RUN_SPEED, ROTATION_SPEED } = useControls(
    "Character Control",
    {
      WALK_SPEED: { value: 3, min: 0.1, max: 4, step: 0.1 },
      RUN_SPEED: { value: 2, min: 0.1, max: 4, step: 0.1 },
      ROTATION_SPEED: {
        value: degToRad(0.5),
        min: degToRad(0.1),
        max: degToRad(5),
        step: degToRad(0.1),
      },
    }
  );
  const rb = useRef<RapierRigidBody>(null);
  const container = useRef<Group>(null);
  const character = useRef<Group>(null);
  const characterRotationTarget = useRef<number>(0);
  const rotationTarget = useRef<number>(0);
  const cameraTarget = useRef<Group>(null);
  const cameraPosition = useRef<Group>(null);
  const cameraWorldPosition = useRef<Vector3>(new Vector3());
  const cameraLookAtWorldPosition = useRef<Vector3>(new Vector3());
  const cameraLookAt = useRef<Vector3>(new Vector3());
  const [, get] = useKeyboardControls();

  useFrame(({ camera }) => {
    if (rb.current) {
      const vel = rb.current.linvel();

      const movement = {
        x: 0,
        z: 0,
      };
      if (get().forward) {
        movement.z = 1;
      }
      if (get().backward) {
        movement.z = -1;
      }

      const speed = get().run ? RUN_SPEED : WALK_SPEED;

      if (get().left) {
        movement.x = 1;
      }
      if (get().right) {
        movement.x = -1;
      }
      if (movement.x !== 0) {
        rotationTarget.current += ROTATION_SPEED * movement.x;
      }
      if (movement.x !== 0 || movement.z !== 0) {
        characterRotationTarget.current = Math.atan2(movement.x, movement.z);
        vel.z =
          Math.cos(rotationTarget.current + characterRotationTarget.current) *
          speed;
        vel.x =
          Math.sin(rotationTarget.current + characterRotationTarget.current) *
          speed;
      }
      if (character.current && character.current !== undefined) {
        character.current.rotation.y = lerpAngle(
          character.current.rotation.y,
          characterRotationTarget.current,
          0.1
        );
      }
      rb.current.setLinvel(vel, true);
    }
    if (container && container.current) {
      container.current.rotation.y = MathUtils.lerp(
        container.current.rotation.y,
        rotationTarget.current,
        0.1
      );
    }
    if (cameraPosition && cameraPosition.current) {
      cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
      camera.position.lerp(cameraWorldPosition.current, 0.1);
    }
    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);

      camera.lookAt(cameraLookAt.current);
    }
  });
  return (
    <RigidBody colliders={false} position={[0, 0, 2]} lockRotations ref={rb}>
      <group ref={container}>
        <group ref={cameraTarget} position-z={1.5} />
        <group ref={cameraPosition} position-y={3} position-z={-6} />
        <group ref={character}>
          <Box args={[0.5, 1.5, 0.5]} receiveShadow castShadow>
            <meshStandardMaterial color={"red"} />
          </Box>
        </group>
      </group>
      <CapsuleCollider args={[0.3, 0.5]} />
    </RigidBody>
  );
}

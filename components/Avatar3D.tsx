"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  AvatarAnimationState,
  updateIdleAnimation,
  calculateMouthOpen,
} from "@/lib/3d-utils";

interface Avatar3DProps {
  isSpeaking: boolean;
  amplitude: number;
  mousePosition: { x: number; y: number };
  onAvatarClick?: () => void;
}

export default function Avatar3D({
  isSpeaking,
  amplitude,
  mousePosition,
  onAvatarClick,
}: Avatar3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  const [animState, setAnimState] = useState<AvatarAnimationState>({
    idleTime: 0,
    blinkTimer: 0,
    breathScale: 1,
    headRotation: { x: 0, y: 0 },
    mouthOpen: 0,
  });

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const newState = updateIdleAnimation(animState, delta);

    if (isSpeaking) {
      newState.mouthOpen = calculateMouthOpen(amplitude, animState.mouthOpen);
    } else {
      newState.mouthOpen = calculateMouthOpen(0, animState.mouthOpen, 0.1);
    }

    setAnimState(newState);

    groupRef.current.scale.setScalar(newState.breathScale * (isHovered ? 1.05 : 1));

    if (headRef.current) {
      headRef.current.rotation.y =
        newState.headRotation.y + mousePosition.x * 0.5 + (isSpeaking ? Math.sin(state.clock.elapsedTime * 4) * 0.05 : 0);
      headRef.current.rotation.x =
        newState.headRotation.x - mousePosition.y * 0.3 + (isSpeaking ? Math.sin(state.clock.elapsedTime * 8) * 0.05 : 0);
    }

    if (rightArmRef.current) {
      if (isSpeaking) {
        rightArmRef.current.rotation.z = -0.6 + Math.sin(state.clock.elapsedTime * 7) * 0.35;
        rightArmRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 4) * 0.2;
      } else if (isHovered) {
        rightArmRef.current.rotation.z = -0.8 + Math.sin(state.clock.elapsedTime * 9) * 0.4;
      } else {
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.3, 0.1);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, 0.1);
      }
    }

    if (leftArmRef.current) {
      if (isSpeaking) {
        leftArmRef.current.rotation.z = 0.4 + Math.sin(state.clock.elapsedTime * 5) * 0.15;
      } else {
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.3, 0.1);
      }
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, -0.9, 0]}
      onClick={(e) => {
        e.stopPropagation();
        if (onAvatarClick) onAvatarClick();
      }}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <group ref={headRef} position={[0, 1.5, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color={isHovered ? "#ffffff" : "#f0f0f5"}
            roughness={0.25}
            metalness={0.85}
          />
        </mesh>

        <mesh position={[-0.15, 0.1, 0.4]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#ff1f8f"
            emissive="#ff1f8f"
            emissiveIntensity={isSpeaking ? 2 : 1.2}
          />
        </mesh>
        <mesh position={[0.15, 0.1, 0.4]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#ff1f8f"
            emissive="#ff1f8f"
            emissiveIntensity={isSpeaking ? 2 : 1.2}
          />
        </mesh>

        <mesh
          position={[0, -0.15, 0.45]}
          scale={[1, 0.3 + animState.mouthOpen * 0.85, 1]}
        >
          <boxGeometry args={[0.22, 0.1, 0.05]} />
          <meshStandardMaterial
            color="#6b1fb0"
            emissive="#d946ef"
            emissiveIntensity={isSpeaking ? 1.8 : 0.4}
          />
        </mesh>

        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#ff1f8f" metalness={1} />
        </mesh>
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial
            color="#ff1f8f"
            emissive="#ff1f8f"
            emissiveIntensity={isSpeaking ? 3 : 1.5}
          />
        </mesh>
      </group>

      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.3, 16]} />
        <meshStandardMaterial
          color="#cccccc"
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>

      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.8, 1, 0.4]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      <mesh position={[0, 0.6, 0.21]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial
          color="#ff1f8f"
          emissive="#ff1f8f"
          emissiveIntensity={isSpeaking ? 2.5 : 1}
        />
      </mesh>

      <group ref={leftArmRef} position={[-0.5, 0.7, 0]}>
        <mesh rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.1, 0.08, 0.8, 16]} />
          <meshStandardMaterial
            color="#cccccc"
            roughness={0.4}
            metalness={0.7}
          />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[0.5, 0.7, 0]}>
        <mesh rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.1, 0.08, 0.8, 16]} />
          <meshStandardMaterial
            color="#cccccc"
            roughness={0.4}
            metalness={0.7}
          />
        </mesh>
      </group>

      <pointLight
        position={[0, 1.5, 0.5]}
        color="#ff1f8f"
        intensity={isSpeaking ? 2.5 : 1}
        distance={4}
      />
      <pointLight
        position={[0, 0.6, 0.5]}
        color="#6b1fb0"
        intensity={isSpeaking ? 2 : 0.8}
        distance={3}
      />
    </group>
  );
}

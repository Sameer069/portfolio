"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function DistortedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Rotate the sphere
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;

    // Pulsate scale
    const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <MeshDistortMaterial
        color="#ff1f8f"
        attach="material"
        distort={0.6}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        emissive="#6b1fb0"
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
      
      {/* Inner glow */}
      <mesh scale={0.95}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          color="#d946ef"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>
    </mesh>
  );
}

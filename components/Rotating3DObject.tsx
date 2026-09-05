"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

interface Rotating3DObjectProps {
  scrollProgress: number;
}

export default function Rotating3DObject({ scrollProgress }: Rotating3DObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return;

    // Rotate based on scroll progress
    groupRef.current.rotation.y = scrollProgress * Math.PI * 2;
    groupRef.current.rotation.x = scrollProgress * Math.PI;

    // Continuous slow rotation
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.z += delta * 0.1;

    // Float animation
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        {/* Icosahedron geometry for a tech look */}
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          emissive="#ff1f8f"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Inner solid shape */}
      <mesh scale={0.8}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#6b1fb0"
          emissive="#6b1fb0"
          emissiveIntensity={1}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Orbiting particles */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2.5;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle + scrollProgress * Math.PI * 2) * radius,
              Math.sin(angle * 2 + scrollProgress * Math.PI) * 0.5,
              Math.sin(angle + scrollProgress * Math.PI * 2) * radius,
            ]}
          >
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#ff1f8f" : "#6b1fb0"}
              emissive={i % 2 === 0 ? "#ff1f8f" : "#6b1fb0"}
              emissiveIntensity={2}
            />
          </mesh>
        );
      })}

      {/* Point lights for glow */}
      <pointLight position={[0, 0, 0]} color="#ff1f8f" intensity={1} distance={5} />
    </group>
  );
}

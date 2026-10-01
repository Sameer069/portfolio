"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

interface Rotating3DObjectProps {
  scrollProgress: number;
  isMobile?: boolean;
}

export default function Rotating3DObject({ scrollProgress, isMobile = false }: Rotating3DObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  // Use lower detail geometry on mobile
  const detail = isMobile ? 0 : 1;
  const particleCount = isMobile ? 4 : 8;
  const sphereSegments = isMobile ? 8 : 16;

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
        {/* Icosahedron geometry - lower detail on mobile */}
        <icosahedronGeometry args={[1.5, detail]} />
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

      {/* Orbiting particles - fewer on mobile */}
      {Array.from({ length: particleCount }).map((_, i) => {
        const angle = (i / particleCount) * Math.PI * 2;
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
            <sphereGeometry args={[0.1, sphereSegments, sphereSegments]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#ff1f8f" : "#6b1fb0"}
              emissive={i % 2 === 0 ? "#ff1f8f" : "#6b1fb0"}
              emissiveIntensity={2}
            />
          </mesh>
        );
      })}

      {/* Point lights for glow */}
      {!isMobile && <pointLight position={[0, 0, 0]} color="#ff1f8f" intensity={1} distance={5} />}
    </group>
  );
}

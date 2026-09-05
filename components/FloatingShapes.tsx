"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { generateFloatingShapes } from "@/lib/3d-utils";

interface FloatingShapesProps {
  count?: number;
  mousePosition: { x: number; y: number };
}

export default function FloatingShapes({
  count = 15,
  mousePosition,
}: FloatingShapesProps) {
  const shapes = generateFloatingShapes(count);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Mouse parallax
    groupRef.current.rotation.y = mousePosition.x * 0.2;
    groupRef.current.rotation.x = -mousePosition.y * 0.2;

    // Animate individual shapes
    groupRef.current.children.forEach((child, i) => {
      const shape = shapes[i];
      child.rotation.x += delta * shape.speed * 0.2;
      child.rotation.y += delta * shape.speed * 0.3;
      child.position.y += Math.sin(state.clock.elapsedTime * shape.speed + i) * 0.01;
    });
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => {
        const shapeType = i % 4;
        
        return (
          <mesh
            key={i}
            position={shape.position}
            rotation={shape.rotation}
            scale={shape.scale}
          >
            {/* Different geometric shapes */}
            {shapeType === 0 && <boxGeometry args={[1, 1, 1]} />}
            {shapeType === 1 && <tetrahedronGeometry args={[0.7, 0]} />}
            {shapeType === 2 && <octahedronGeometry args={[0.7, 0]} />}
            {shapeType === 3 && <torusGeometry args={[0.5, 0.2, 16, 32]} />}
            
            <meshStandardMaterial
              color={i % 2 === 0 ? "#ff1f8f" : "#6b1fb0"}
              wireframe
              transparent
              opacity={0.3}
              emissive={i % 2 === 0 ? "#ff1f8f" : "#6b1fb0"}
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

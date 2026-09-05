"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createParticleGeometry } from "@/lib/3d-utils";

interface ParticleFieldProps {
  count?: number;
  mousePosition: { x: number; y: number };
}

export default function ParticleField({
  count = 2000,
  mousePosition,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const particlesGeometry = useMemo(() => createParticleGeometry(count), [count]);

  // Create particle material
  const particlesMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    []
  );

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Rotate particles slowly
    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;

    // Mouse-based parallax effect
    pointsRef.current.position.x = mousePosition.x * 0.5;
    pointsRef.current.position.y = mousePosition.y * 0.5;

    // Animate particle positions
    const positions = particlesGeometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < positions.length; i += 3) {
      const idx = i / 3;
      positions[i + 1] += Math.sin(state.clock.elapsedTime + idx * 0.01) * 0.001;
    }
    
    particlesGeometry.attributes.position.needsUpdate = true;
  });

  return (
    <points
      ref={pointsRef}
      geometry={particlesGeometry}
      material={particlesMaterial}
    />
  );
}

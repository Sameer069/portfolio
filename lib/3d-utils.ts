import * as THREE from "three";

// Particle system helper
export const createParticleGeometry = (count: number = 1000) => {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    
    // Random position in a sphere
    const radius = Math.random() * 10;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    // Electric blue to purple gradient colors
    const t = Math.random();
    colors[i3] = t * 1.0 + (1 - t) * 0.42; // R (pink to purple)
    colors[i3 + 1] = t * 0.12 + (1 - t) * 0.12; // G
    colors[i3 + 2] = t * 0.56 + (1 - t) * 0.69; // B (pink to purple)
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  return geometry;
};

// Floating geometric shapes positions
export const generateFloatingShapes = (count: number = 20) => {
  return Array.from({ length: count }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10
    ] as [number, number, number],
    rotation: [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    ] as [number, number, number],
    scale: Math.random() * 0.5 + 0.3,
    speed: Math.random() * 0.5 + 0.5
  }));
};

// Mouse parallax calculation
export const calculateParallax = (
  mouseX: number,
  mouseY: number,
  strength: number = 0.05
) => {
  return {
    x: (mouseX - 0.5) * strength,
    y: (mouseY - 0.5) * strength
  };
};

// Lerp (linear interpolation) utility
export const lerp = (start: number, end: number, alpha: number): number => {
  return start + (end - start) * alpha;
};

// Vector3 lerp
export const lerpVector3 = (
  start: THREE.Vector3,
  end: THREE.Vector3,
  alpha: number
): THREE.Vector3 => {
  return new THREE.Vector3(
    lerp(start.x, end.x, alpha),
    lerp(start.y, end.y, alpha),
    lerp(start.z, end.z, alpha)
  );
};

// Clamp utility
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// Map range utility
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

// Easing functions
export const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// Avatar animation helpers
export interface AvatarAnimationState {
  idleTime: number;
  blinkTimer: number;
  breathScale: number;
  headRotation: { x: number; y: number };
  mouthOpen: number;
}

export const updateIdleAnimation = (
  state: AvatarAnimationState,
  delta: number
): AvatarAnimationState => {
  const newState = { ...state };
  
  // Idle time
  newState.idleTime += delta;
  
  // Breathing animation
  newState.breathScale = 1 + Math.sin(newState.idleTime * 2) * 0.02;
  
  // Subtle head movement
  newState.headRotation = {
    x: Math.sin(newState.idleTime * 0.5) * 0.05,
    y: Math.cos(newState.idleTime * 0.3) * 0.05
  };
  
  // Blinking
  newState.blinkTimer += delta;
  if (newState.blinkTimer > 3 + Math.random() * 2) {
    newState.blinkTimer = 0;
  }
  
  return newState;
};

// Calculate mouth open based on amplitude
export const calculateMouthOpen = (
  amplitude: number,
  currentMouth: number,
  lerpSpeed: number = 0.2
): number => {
  const target = clamp(amplitude * 2, 0, 1);
  return lerp(currentMouth, target, lerpSpeed);
};

// Shader for glowing effect
export const glowShaderMaterial = () => {
  return new THREE.ShaderMaterial({
    uniforms: {
      c: { value: 0.3 },
      p: { value: 3.5 },
      glowColor: { value: new THREE.Color(0x00d4ff) },
      viewVector: { value: new THREE.Vector3(0, 0, 0) }
    },
    vertexShader: `
      uniform vec3 viewVector;
      varying float intensity;
      
      void main() {
        vec3 vNormal = normalize(normalMatrix * normal);
        vec3 vNormel = normalize(normalMatrix * viewVector);
        intensity = pow(0.7 - dot(vNormal, vNormel), 3.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      varying float intensity;
      
      void main() {
        vec3 glow = glowColor * intensity;
        gl_FragColor = vec4(glow, 1.0);
      }
    `,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true
  });
};

// Create gradient material
export const createGradientMaterial = (
  color1: THREE.Color,
  color2: THREE.Color
) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      color1: { value: color1 },
      color2: { value: color2 }
    },
    vertexShader: `
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUv;
      
      void main() {
        gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
      }
    `
  });
};

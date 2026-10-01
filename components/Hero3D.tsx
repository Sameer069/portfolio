"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

// Dynamic imports for all 3D components
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

const PerspectiveCamera = dynamic(
  () => import("@react-three/drei").then((mod) => mod.PerspectiveCamera),
  { ssr: false }
);

const Environment = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Environment),
  { ssr: false }
);

const AIAvatarStudio = dynamic(() => import("./AIAvatarStudio"), { ssr: false });
const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });
const FloatingShapes = dynamic(() => import("./FloatingShapes"), { ssr: false });

export default function Hero3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [is3DSupported, setIs3DSupported] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if WebGL is supported
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setIs3DSupported(false);
      console.warn('WebGL not supported, disabling 3D features');
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMounted]);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen overflow-hidden"
    >
      {isMounted && is3DSupported && (
        <div className="absolute inset-0 z-0">
          <Canvas
            gl={{ 
              antialias: true, 
              alpha: true,
              powerPreference: "high-performance"
            }}
            dpr={[1, 2]} // Limit DPR for better mobile performance
            onCreated={({ gl }) => {
              gl.setClearColor('#0a0014', 1);
            }}
          >
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} color="#6b1fb0" intensity={0.5} />
            <Suspense fallback={null}>
              <ParticleField mousePosition={mousePosition} count={isMounted && window.innerWidth < 768 ? 1000 : 2000} />
              <FloatingShapes mousePosition={mousePosition} count={isMounted && window.innerWidth < 768 ? 8 : 15} />
            <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>
      )}
      
      {/* Fallback background for unsupported devices */}
      {(!isMounted || !is3DSupported) && (
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0014] via-[#1a0028] to-[#0a0014]">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl bg-[var(--accent-pink)]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl bg-[var(--electric-purple)]" />
          </div>
        </div>
      )}

      <div className="relative z-10 min-h-screen w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center pt-24 pb-16">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex flex-col items-start justify-center text-left"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-white/10 text-xs font-mono text-[var(--accent-pink)] uppercase tracking-wider mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--accent-pink)] animate-ping" />
              Full-Stack Software Developer
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold mb-3 sm:mb-4 leading-tight tracking-tight"
            >
              <span className="gradient-text">Sameer Das</span>
            </motion.h1>

            <motion.h2
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-300 mb-4 sm:mb-6 tracking-tight"
            >
              Software Developer &amp; Cloud Specialist
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-gray-300 max-w-lg mb-8 leading-relaxed"
            >
              Full-stack developer building real-time applications, cloud deployments, and scalable high-performance web systems.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4 w-full sm:w-auto"
            >
              <motion.button
                onClick={scrollToProjects}
                className="glass px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,31,143,0.5)] relative overflow-hidden group text-white"
                style={{
                  background: "linear-gradient(135deg, var(--accent-pink), var(--electric-purple))",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Explore Projects →</span>
              </motion.button>

              <motion.button
                onClick={scrollToContact}
                className="glass px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold border border-white/20 hover:border-[var(--accent-pink)] hover:shadow-[0_0_20px_rgba(255,31,143,0.3)] text-gray-200 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 w-full"
          >
            <AIAvatarStudio mousePosition={mousePosition} />
          </motion.div>
        </div>
      </div>

   
    </section>
  );
}

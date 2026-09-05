"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import AIAvatarStudio from "./AIAvatarStudio";
import ParticleField from "./ParticleField";
import FloatingShapes from "./FloatingShapes";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Hero3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} color="#6b1fb0" intensity={0.5} />
          <Suspense fallback={null}>
            <ParticleField mousePosition={mousePosition} count={2000} />
            <FloatingShapes mousePosition={mousePosition} count={15} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

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
              Creative Full-Stack Developer
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold mb-3 sm:mb-4 leading-tight tracking-tight"
            >
              <span className="gradient-text">Developer</span>
            </motion.h1>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-300 mb-4 sm:mb-6 tracking-tight"
            >
              Portfolio
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-gray-300 max-w-lg mb-8 leading-relaxed"
            >
              Crafting immersive digital experiences, high-performance web applications, and interactive 3D graphics.
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider">Scroll</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-1.5 sm:p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const { progress, active } = useProgress();
  const [isComplete, setIsComplete] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Mark component as mounted
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Smooth progress animation
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        const diff = progress - prev;
        if (Math.abs(diff) < 0.1) {
          return progress;
        }
        return prev + diff * 0.1;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    if (!active && progress >= 100) {
      // Add small delay before completing
      const timer = setTimeout(() => {
        setIsComplete(true);
        if (onComplete) {
          setTimeout(onComplete, 600);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [active, progress, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--color-dark-900)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 opacity-30">
            <div
              className="absolute inset-0 animate-rotate-gradient"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, #ff1f8f 0%, transparent 50%), radial-gradient(circle at 80% 20%, #6b1fb0 0%, transparent 50%)",
              }}
            />
          </div>

          {/* Loading content */}
          <div className="relative z-10 flex flex-col items-center space-y-8 px-6">
            {/* Logo/Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-6xl md:text-8xl font-bold gradient-text mb-4">
                Portfolio
              </h1>
              <p className="text-gray-400 text-lg md:text-xl">
                Loading experience...
              </p>
            </motion.div>

            {/* Progress bar container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full max-w-md"
            >
              {/* Progress bar background */}
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                {/* Progress bar fill */}
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--electric-blue), var(--electric-purple))",
                    boxShadow: "0 0 20px var(--electric-blue)",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${displayProgress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />

                {/* Shimmer effect */}
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2s infinite",
                  }}
                />
              </div>

              {/* Progress percentage */}
              <motion.div
                className="mt-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span className="text-3xl font-bold gradient-text">
                  {Math.round(displayProgress)}%
                </span>
              </motion.div>
            </motion.div>

            {/* Loading dots animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex space-x-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--electric-blue), var(--electric-purple))",
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Particle effects - only render on client */}
          {isMounted && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

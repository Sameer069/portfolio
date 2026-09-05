"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import Avatar3D from "./Avatar3D";
import ParticleField from "./ParticleField";
import FloatingShapes from "./FloatingShapes";
import { SpeechHandler, TypewriterEffect } from "@/lib/speech";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Hero3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [amplitude, setAmplitude] = useState(0);
  const [displayText, setDisplayText] = useState("Hi, I'm SAM's AI companion. Let me show you around this portfolio!");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [userQuery, setUserQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const speechHandlerRef = useRef<SpeechHandler | null>(null);
  const typewriterRef = useRef<TypewriterEffect | null>(null);
  const amplitudeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const initialGreeting = "Hi, I'm SAM's AI companion. Let me show you around this portfolio!";

  useEffect(() => {
    speechHandlerRef.current = new SpeechHandler();

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (speechHandlerRef.current) {
        speechHandlerRef.current.dispose();
      }
      if (typewriterRef.current) {
        typewriterRef.current.stop();
      }
      if (amplitudeIntervalRef.current) {
        clearInterval(amplitudeIntervalRef.current);
      }
    };
  }, []);

  const speakText = (text: string, callback?: () => void) => {
    if (typewriterRef.current) {
      typewriterRef.current.stop();
    }
    if (speechHandlerRef.current) {
      speechHandlerRef.current.stop();
    }
    if (amplitudeIntervalRef.current) {
      clearInterval(amplitudeIntervalRef.current);
    }

    typewriterRef.current = new TypewriterEffect(text);
    typewriterRef.current.start((typedText) => {
      setDisplayText(typedText);
    }, 35);

    if (voiceEnabled && speechHandlerRef.current) {
      const voices = speechHandlerRef.current.getVoices();
      const preferredVoice = voices.find((v) => v.lang.startsWith("en")) || voices[0];

      speechHandlerRef.current.init(text, {
        rate: 1.05,
        pitch: 1.15,
        volume: 1,
        voice: preferredVoice,
      });

      speechHandlerRef.current.speak(
        () => {
          setIsSpeaking(true);
          amplitudeIntervalRef.current = setInterval(() => {
            setAmplitude(Math.random() * 0.8 + 0.2);
          }, 90);
        },
        () => {
          setIsSpeaking(false);
          setAmplitude(0);
          if (amplitudeIntervalRef.current) {
            clearInterval(amplitudeIntervalRef.current);
          }
          if (callback) callback();
        }
      );
    } else {
      setIsSpeaking(true);
      amplitudeIntervalRef.current = setInterval(() => {
        setAmplitude(Math.random() * 0.6 + 0.2);
      }, 100);

      setTimeout(() => {
        setIsSpeaking(false);
        setAmplitude(0);
        if (amplitudeIntervalRef.current) {
          clearInterval(amplitudeIntervalRef.current);
        }
        if (callback) callback();
      }, Math.min(Math.max(text.length * 40, 2000), 5000));
    }
  };

  const answerQuestion = (query: string) => {
    if (!query.trim()) return;
    setIsThinking(true);

    const q = query.toLowerCase().trim();
    let reply = "";
    let targetSection = "";

    if (q.includes("project") || q.includes("work") || q.includes("build") || q.includes("portfolio")) {
      reply = "SAM has built 6 featured full-stack and 3D web applications, including an E-Commerce platform and interactive WebGL showcases. Let me take you there!";
      targetSection = "projects";
    } else if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language") || q.includes("three") || q.includes("react")) {
      reply = "SAM specializes in React, Next.js, TypeScript, Three.js, WebGL, Node.js, and cloud systems. Let's inspect the Skills section!";
      targetSection = "about";
    } else if (q.includes("experience") || q.includes("career") || q.includes("education") || q.includes("degree")) {
      reply = "SAM has over 4 years of experience as a Senior Full-Stack Developer and holds a Bachelor's degree in Computer Science with honors.";
      targetSection = "about";
    } else if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("freelance") || q.includes("job") || q.includes("available")) {
      reply = "SAM is open for freelance projects and full-time software engineering roles! Let's head down to the contact form.";
      targetSection = "contact";
    } else if (q.includes("who are you") || q.includes("who is sam") || q.includes("about sam")) {
      reply = "SAM is a creative full-stack developer crafting immersive web experiences with modern frameworks and 3D graphics.";
    } else if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
      reply = "Hello there! Click any quick tour button below or ask me a question to explore SAM's portfolio!";
    } else {
      reply = `Great question! SAM specializes in cutting-edge web development, 3D graphics, and cloud architecture. Feel free to explore the projects or send SAM a message!`;
    }

    setTimeout(() => {
      setIsThinking(false);
      speakText(reply, () => {
        if (targetSection) {
          document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth" });
        }
      });
    }, 300);
  };

  const handleAvatarClick = () => {
    speakText("Hey! You clicked me! I'm SAM's virtual assistant. Try clicking any quick topic below or ask me a question!");
  };

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
            <div className="glass rounded-3xl p-5 sm:p-6 border border-white/10 shadow-2xl relative overflow-hidden bg-[var(--color-dark-900)]/80 backdrop-blur-xl">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
                    SAM AI Virtual Companion
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const nextState = !voiceEnabled;
                    setVoiceEnabled(nextState);
                    if (!nextState && speechHandlerRef.current) {
                      speechHandlerRef.current.stop();
                      setIsSpeaking(false);
                      setAmplitude(0);
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono glass border border-white/10 hover:border-white/25 text-gray-300 hover:text-white transition-colors"
                  title="Toggle voice audio"
                >
                  <span>{voiceEnabled ? "🔊 Voice: ON" : "🔇 Voice: OFF"}</span>
                </button>
              </div>

              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-white/5 to-transparent border border-white/5 cursor-pointer group">
                <Canvas>
                  <PerspectiveCamera makeDefault position={[0, 0, 4.8]} />
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[10, 10, 5]} intensity={1.2} />
                  <pointLight position={[-10, -10, -5]} color="#6b1fb0" intensity={0.6} />
                  <Suspense fallback={null}>
                    <Avatar3D
                      isSpeaking={isSpeaking}
                      amplitude={amplitude}
                      mousePosition={mousePosition}
                      onAvatarClick={handleAvatarClick}
                    />
                    <Environment preset="city" />
                  </Suspense>
                </Canvas>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none px-2.5 py-1 rounded-full text-[10px] font-mono text-white bg-black/60 backdrop-blur-md border border-white/10">
                  Click to interact with 3D Avatar
                </div>

                {isSpeaking && (
                  <div className="absolute bottom-3 left-4 flex items-end gap-1 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 pointer-events-none">
                    <span className="text-[10px] font-mono text-[var(--accent-pink)] mr-1">Speaking</span>
                    <span className="w-1 bg-[var(--accent-pink)] h-3 animate-pulse rounded-full" />
                    <span className="w-1 bg-[var(--accent-pink)] h-5 animate-pulse rounded-full" style={{ animationDelay: "150ms" }} />
                    <span className="w-1 bg-[var(--accent-pink)] h-2 animate-pulse rounded-full" style={{ animationDelay: "300ms" }} />
                  </div>
                )}
              </div>

              <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 relative">
                <p className="text-white text-sm sm:text-base leading-relaxed min-h-[48px]">
                  {displayText}
                  <span className="animate-pulse text-[var(--accent-pink)] font-bold">|</span>
                </p>
              </div>

              <div className="mt-4">
                <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-2 flex items-center justify-between">
                  <span>Quick Portfolio Tour Topics:</span>
                  <span className="text-[10px] text-[var(--accent-pink)]">Click to ask</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => answerQuestion("Show me SAM's projects")}
                    className="p-2 rounded-xl glass border border-white/10 hover:border-[var(--accent-pink)] hover:bg-white/10 text-xs text-left text-gray-200 hover:text-white transition-all"
                  >
                    <span className="block text-sm mb-0.5">🚀</span>
                    <span className="font-semibold block truncate">Projects</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => answerQuestion("What tech stack and skills does SAM have?")}
                    className="p-2 rounded-xl glass border border-white/10 hover:border-[var(--accent-pink)] hover:bg-white/10 text-xs text-left text-gray-200 hover:text-white transition-all"
                  >
                    <span className="block text-sm mb-0.5">⚡</span>
                    <span className="font-semibold block truncate">Tech Skills</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => answerQuestion("What is SAM's background and experience?")}
                    className="p-2 rounded-xl glass border border-white/10 hover:border-[var(--accent-pink)] hover:bg-white/10 text-xs text-left text-gray-200 hover:text-white transition-all"
                  >
                    <span className="block text-sm mb-0.5">💼</span>
                    <span className="font-semibold block truncate">Experience</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => answerQuestion("How can I hire or contact SAM?")}
                    className="p-2 rounded-xl glass border border-white/10 hover:border-[var(--accent-pink)] hover:bg-white/10 text-xs text-left text-gray-200 hover:text-white transition-all"
                  >
                    <span className="block text-sm mb-0.5">✉️</span>
                    <span className="font-semibold block truncate">Hire SAM</span>
                  </button>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (userQuery.trim()) {
                    answerQuestion(userQuery);
                    setUserQuery("");
                  }
                }}
                className="mt-4 flex gap-2"
              >
                <input
                  type="text"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="Ask SAM's AI anything (e.g. 'Can SAM do 3D?')..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[var(--accent-pink)] placeholder-gray-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!userQuery.trim() || isThinking}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-1.5"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-pink), var(--electric-purple))",
                  }}
                >
                  <span>Ask</span>
                  <span>↵</span>
                </button>
              </form>
            </div>
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

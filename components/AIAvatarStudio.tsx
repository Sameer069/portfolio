"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import Avatar3D from "./Avatar3D";
import { SpeechHandler, TypewriterEffect } from "@/lib/speech";

interface AIAvatarStudioProps {
  mousePosition: { x: number; y: number };
}

export default function AIAvatarStudio({ mousePosition }: AIAvatarStudioProps) {
  const [avatarMode, setAvatarMode] = useState<"portrait" | "3d">("portrait");
  const [avatarImage, setAvatarImage] = useState<string>("/sam-avatar.jpg");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [amplitude, setAmplitude] = useState(0);
  const [displayText, setDisplayText] = useState(
    "Hi, I'm Sameer Das! Software developer with experience in full-stack web development and deployment. Click 'My Story' to hear more!"
  );
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [userQuery, setUserQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string>("intro");

  const speechHandlerRef = useRef<SpeechHandler | null>(null);
  const typewriterRef = useRef<TypewriterEffect | null>(null);
  const amplitudeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    speechHandlerRef.current = new SpeechHandler();

    return () => {
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
    if (typewriterRef.current) typewriterRef.current.stop();
    if (speechHandlerRef.current) speechHandlerRef.current.stop();
    if (amplitudeIntervalRef.current) clearInterval(amplitudeIntervalRef.current);

    typewriterRef.current = new TypewriterEffect(text);
    typewriterRef.current.start((typed) => {
      setDisplayText(typed);
    }, 32);

    if (voiceEnabled && speechHandlerRef.current) {
      const voices = speechHandlerRef.current.getVoices();
      const preferredVoice = voices.find((v) => v.lang.startsWith("en")) || voices[0];

      speechHandlerRef.current.init(text, {
        rate: 1.05,
        pitch: 1.1,
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
          if (amplitudeIntervalRef.current) clearInterval(amplitudeIntervalRef.current);
          if (callback) callback();
        }
      );
    } else {
      setIsSpeaking(true);
      amplitudeIntervalRef.current = setInterval(() => {
        setAmplitude(Math.random() * 0.7 + 0.2);
      }, 100);

      setTimeout(() => {
        setIsSpeaking(false);
        setAmplitude(0);
        if (amplitudeIntervalRef.current) clearInterval(amplitudeIntervalRef.current);
        if (callback) callback();
      }, Math.min(Math.max(text.length * 35, 2000), 5500));
    }
  };

  const handleTopicClick = (topic: string) => {
    setActiveTopic(topic);

    let script = "";

    switch (topic) {
      case "story":
        script =
          "Hi, I’m Sameer Das, a software developer with experience in full-stack web development and deployment. I work with technologies such as JavaScript, Node.js, Next.js, PHP, MySQL, Redis, Git, AWS, Linux, and PM2. I’m particularly interested in building real-time applications, cloud deployment, CI/CD, and improving application performance and scalability. I’m also continuously learning technologies like Docker, AWS, and DevOps to strengthen my development and deployment skills.";
        break;
      case "stack":
        script =
          "My core stack includes JavaScript, Node.js, Next.js, PHP, MySQL, Redis, Git, AWS, Linux, and PM2, with hands-on focus on Docker, DevOps, and scalable architectures.";
        break;
      case "projects":
        script =
          "I've built featured full-stack applications with real-time performance and solid cloud deployments. Feel free to explore the Projects section below!";
        break;
      case "hire":
        script =
          "I'm open for software development roles, freelance projects, and DevOps opportunities. Feel free to reach out via the contact section below!";
        break;
      default:
        script =
          "Welcome to my portfolio! Explore my works, learn about my journey, or ask me anything directly!";
        break;
    }

    speakText(script);
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    setIsThinking(true);
    const q = userQuery.toLowerCase().trim();
    let reply = "";

    if (
      q.includes("who are you") ||
      q.includes("who is sameer") ||
      q.includes("who is sam") ||
      q.includes("name") ||
      q.includes("about you")
    ) {
      reply =
        "Hi, I’m Sameer Das, a software developer with experience in full-stack web development and deployment across JavaScript, Node.js, Next.js, PHP, MySQL, Redis, AWS, and Linux.";
    } else if (q.includes("project") || q.includes("work") || q.includes("portfolio")) {
      reply =
        "Sameer has built robust full-stack applications, with real-time capabilities and seamless cloud deployments.";
    } else if (
      q.includes("skill") ||
      q.includes("tech") ||
      q.includes("stack") ||
      q.includes("language") ||
      q.includes("devops")
    ) {
      reply =
        "Sameer works with JavaScript, Node.js, Next.js, PHP, MySQL, Redis, Git, AWS, Linux, PM2, and is actively learning Docker and DevOps.";
    } else if (
      q.includes("hire") ||
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("freelance") ||
      q.includes("available")
    ) {
      reply =
        "Sameer is currently open for development roles, freelance opportunities, and collaborative engineering projects. Send a message below!";
    } else if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
      reply =
        "Hey! Great to meet you. Feel free to click 'My Story' to hear about my background or ask me any question!";
    } else {
      reply =
        "Thanks for asking! As a software developer, I specialize in full-stack development, cloud deployment, and real-time systems. Explore my projects below or get in touch!";
    }

    setTimeout(() => {
      setIsThinking(false);
      speakText(reply);
      setUserQuery("");
    }, 250);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarImage(event.target.result as string);
          speakText("Awesome! Your new AI avatar photo has been loaded! Now let me tell your visitors about yourself.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      <div className="glass rounded-3xl p-4 sm:p-5 border border-white/10 shadow-2xl relative overflow-hidden bg-[var(--color-dark-900)]/85 backdrop-blur-xl">
        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isSpeaking ? "bg-[var(--accent-pink)] animate-ping" : "bg-emerald-400 animate-pulse"}`} />
            <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
              Sameer Das • AI Digital Avatar
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex p-0.5 glass rounded-lg border border-white/10 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setAvatarMode("portrait")}
                className={`px-2 py-0.5 rounded-md transition-all ${
                  avatarMode === "portrait"
                    ? "bg-gradient-to-r from-[var(--accent-pink)] to-[var(--electric-purple)] text-white shadow-sm font-bold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                AI Photo
              </button>
              <button
                type="button"
                onClick={() => setAvatarMode("3d")}
                className={`px-2 py-0.5 rounded-md transition-all ${
                  avatarMode === "3d"
                    ? "bg-gradient-to-r from-[var(--accent-pink)] to-[var(--electric-purple)] text-white shadow-sm font-bold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                3D Bot
              </button>
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
              className="p-1 rounded-lg glass border border-white/10 hover:border-white/25 text-gray-300 hover:text-white text-xs transition-colors"
              title="Toggle voice speech"
            >
              {voiceEnabled ? "🔊" : "🔇"}
            </button>
          </div>
        </div>

        {avatarMode === "portrait" ? (
          <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden flex items-center justify-center p-3">
            <div className="absolute inset-0 bg-gradient-to-b from-[#180024] via-[#090012] to-[#12001e]" />

            <AnimatePresence>
              {isSpeaking && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0.8 }}
                    animate={{ scale: [1, 1.45, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-36 h-36 sm:w-40 sm:h-40 rounded-full border-2 border-[var(--accent-pink)]"
                  />
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0.6 }}
                    animate={{ scale: [1.1, 1.65, 1.1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    className="absolute w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-[var(--electric-purple)]"
                  />
                </div>
              )}
            </AnimatePresence>

            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.03}
              transitionSpeed={1500}
              gyroscope={false}
              className="relative z-10"
            >
              <div
                onClick={() => speakText("Hey! You clicked my avatar photo. I'm Sameer Das! Click 'My Story' to hear all about me.")}
                className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 cursor-pointer group shadow-2xl transition-all"
                style={{
                  background: isSpeaking
                    ? "linear-gradient(135deg, var(--accent-pink), var(--electric-purple), #00ffff)"
                    : "linear-gradient(135deg, rgba(255,31,143,0.5), rgba(107,31,176,0.3))",
                  boxShadow: isSpeaking
                    ? "0 0 30px rgba(255, 31, 143, 0.6), 0 0 50px rgba(107, 31, 176, 0.3)"
                    : "0 0 15px rgba(0, 0, 0, 0.5)",
                }}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20 bg-black">
                  <img
                    src={avatarImage}
                    alt="Sameer Das AI Avatar"
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isSpeaking ? "scale-105 contrast-110" : "group-hover:scale-105"
                    }`}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-pink)]/15 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000" />
                </div>

                <div className="absolute bottom-0.5 right-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[9px] font-mono text-white flex items-center gap-1 shadow-lg">
                  {isSpeaking ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-pink)] animate-ping" />
                      <span className="text-[var(--accent-pink)] font-bold">Speaking</span>
                    </>
                  ) : (
                    <>
                      <span>🎙️</span>
                      <span>Sameer AI</span>
                    </>
                  )}
                </div>
              </div>
            </Tilt>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full glass text-[10px] font-mono text-gray-300 hover:text-white border border-white/10 hover:border-[var(--accent-pink)] transition-colors flex items-center gap-1"
              title="Upload your own picture"
            >
              <span>📷 Change</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        ) : (
          <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-white/5 to-transparent border border-white/5 cursor-pointer">
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
                  onAvatarClick={() => speakText("Hey! You clicked the 3D model! Try clicking 'My Story' or ask me anything.")}
                />
                <Environment preset="city" />
              </Suspense>
            </Canvas>
          </div>
        )}

        <div className="mt-2.5 p-3 rounded-xl bg-white/5 border border-white/10 relative">
          <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 mb-1">
            <span className="flex items-center gap-1.5 text-[var(--accent-pink)] font-bold">
              <span>●</span> Live Voice Response
            </span>
            {isSpeaking && (
              <div className="flex items-end gap-1">
                <span className="w-1 h-2.5 bg-[var(--accent-pink)] rounded-full animate-pulse" />
                <span className="w-1 h-3.5 bg-[var(--accent-pink)] rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
                <span className="w-1 h-2 bg-[var(--accent-pink)] rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
              </div>
            )}
          </div>

          <p className="text-white text-xs sm:text-sm leading-relaxed min-h-[40px]">
            {displayText}
            <span className="animate-pulse text-[var(--accent-pink)] font-bold">|</span>
          </p>
        </div>

        <div className="mt-2.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1.5 flex items-center justify-between">
            <span>Hear About Myself:</span>
            <span className="text-[9px] text-[var(--accent-pink)]">Click to listen</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            <button
              type="button"
              onClick={() => handleTopicClick("story")}
              className={`p-2 rounded-xl border text-xs text-left transition-all ${
                activeTopic === "story" && isSpeaking
                  ? "border-[var(--accent-pink)] bg-white/15 text-white shadow-[0_0_12px_rgba(255,31,143,0.3)]"
                  : "glass border-white/10 hover:border-[var(--accent-pink)] text-gray-300 hover:text-white"
              }`}
            >
              <span className="block text-xs mb-0.5">👤</span>
              <span className="font-semibold block truncate text-[11px]">My Story</span>
            </button>

            <button
              type="button"
              onClick={() => handleTopicClick("stack")}
              className={`p-2 rounded-xl border text-xs text-left transition-all ${
                activeTopic === "stack" && isSpeaking
                  ? "border-[var(--accent-pink)] bg-white/15 text-white shadow-[0_0_12px_rgba(255,31,143,0.3)]"
                  : "glass border-white/10 hover:border-[var(--accent-pink)] text-gray-300 hover:text-white"
              }`}
            >
              <span className="block text-xs mb-0.5">⚡</span>
              <span className="font-semibold block truncate text-[11px]">Tech Stack</span>
            </button>

            <button
              type="button"
              onClick={() => handleTopicClick("projects")}
              className={`p-2 rounded-xl border text-xs text-left transition-all ${
                activeTopic === "projects" && isSpeaking
                  ? "border-[var(--accent-pink)] bg-white/15 text-white shadow-[0_0_12px_rgba(255,31,143,0.3)]"
                  : "glass border-white/10 hover:border-[var(--accent-pink)] text-gray-300 hover:text-white"
              }`}
            >
              <span className="block text-xs mb-0.5">🚀</span>
              <span className="font-semibold block truncate text-[11px]">Top Projects</span>
            </button>

            <button
              type="button"
              onClick={() => handleTopicClick("hire")}
              className={`p-2 rounded-xl border text-xs text-left transition-all ${
                activeTopic === "hire" && isSpeaking
                  ? "border-[var(--accent-pink)] bg-white/15 text-white shadow-[0_0_12px_rgba(255,31,143,0.3)]"
                  : "glass border-white/10 hover:border-[var(--accent-pink)] text-gray-300 hover:text-white"
              }`}
            >
              <span className="block text-xs mb-0.5">✉️</span>
              <span className="font-semibold block truncate text-[11px]">Hire Me</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleAskQuestion} className="mt-2.5 flex gap-2">
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Ask Sameer anything..."
            className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[var(--accent-pink)] placeholder-gray-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!userQuery.trim() || isThinking}
            className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-1 shadow-md hover:shadow-[0_0_15px_rgba(255,31,143,0.4)]"
            style={{
              background: "linear-gradient(135deg, var(--accent-pink), var(--electric-purple))",
            }}
          >
            <span>Ask</span>
            <span>↵</span>
          </button>
        </form>
      </div>
    </div>
  );
}

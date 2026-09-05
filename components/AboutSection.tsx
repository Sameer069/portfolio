"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import Rotating3DObject from "./Rotating3DObject";
import SkillsVisualization from "./SkillsVisualization";
import Timeline from "./Timeline";
import { fadeInUp, fadeInLeft, staggerContainer } from "@/lib/animations";

// Sample data (will be replaced with data from data/about.json)
const skills = [
  { name: "React / Next.js", level: 95, category: "Frontend" },
  { name: "TypeScript", level: 90, category: "Language" },
  { name: "Three.js / WebGL", level: 85, category: "3D Graphics" },
  { name: "Node.js", level: 88, category: "Backend" },
  { name: "Python", level: 82, category: "Language" },
  { name: "AWS / Cloud", level: 80, category: "DevOps" },
];

const timeline = [
  {
    year: "2024",
    title: "Senior Full-Stack Developer",
    organization: "Tech Company Inc.",
    description:
      "Leading development of cutting-edge web applications with focus on performance and user experience.",
  },
  {
    year: "2022",
    title: "Full-Stack Developer",
    organization: "Digital Agency",
    description:
      "Built responsive web applications and interactive experiences for major clients using modern frameworks.",
  },
  {
    year: "2020",
    title: "Bachelor's in Computer Science",
    organization: "University Name",
    description:
      "Graduated with honors, specializing in web technologies and interactive media.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const sectionTop = rect.top;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress within section (0 to 1)
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - sectionTop) / (sectionHeight + windowHeight))
      );
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen py-20 sm:py-24 md:py-32 px-6 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full blur-3xl"
          style={{ background: "var(--accent-pink)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full blur-3xl"
          style={{ background: "var(--electric-purple)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold gradient-text mb-4 sm:mb-6">
            About Me
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Passionate about creating immersive digital experiences that push the boundaries of web technology
          </p>
        </motion.div>

        {/* Main Content: Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-20 items-center mb-20 sm:mb-24 md:mb-32">
          {/* Left: Text content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-4 sm:space-y-6"
          >
            <motion.h3
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
            >
              Creative Developer & Designer
            </motion.h3>

            <motion.p variants={fadeInUp} className="text-base sm:text-lg text-gray-300 leading-relaxed">
              I'm a full-stack developer specializing in building exceptional digital experiences.
              Currently focused on creating accessible, human-centered products with modern web
              technologies.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-base sm:text-lg text-gray-300 leading-relaxed">
              With a passion for 3D graphics, animations, and interactive design, I bring ideas to
              life through code. I believe in the power of technology to create meaningful
              connections and solve real-world problems.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-base sm:text-lg text-gray-300 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to
              open-source projects, or experimenting with creative coding and generative art.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 sm:gap-3 pt-4">
              {["WebGL", "React", "Three.js", "TypeScript", "Next.js", "GSAP"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 glass rounded-full text-xs sm:text-sm font-semibold hover:shadow-[0_0_20px_rgba(255,31,143,0.3)] transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D Object */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="h-64 sm:h-80 md:h-96 lg:h-[500px] relative"
          >
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 8]} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              
              <Suspense fallback={null}>
                <Rotating3DObject scrollProgress={scrollProgress} />
                <Environment preset="city" />
              </Suspense>
            </Canvas>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-20 sm:mb-24 md:mb-32"
        >
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-10 md:mb-12 text-center">
            Skills & Expertise
          </h3>
          <SkillsVisualization skills={skills} />
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-12 sm:mb-14 md:mb-16 text-center">
            Experience & Education
          </h3>
          <Timeline items={timeline} />
        </motion.div>
      </div>
    </section>
  );
}

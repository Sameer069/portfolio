"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import DistortedSphere from "./DistortedSphere";
import ContactForm from "./ContactForm";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";

const socialLinks = [
  { name: "GitHub", url: "https://github.com/Sameer069", icon: "🔗" },
  { name: "LinkedIn", url: "www.linkedin.com/in/sameer-dev09", icon: "💼" },
  { name: "Email", url: "mailto:sameerdas0907@gmail.com", icon: "📧" },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          <Suspense fallback={null}>
            <DistortedSphere />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-dark-900)]/50 to-[var(--color-dark-900)]" />

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
            Get In Touch
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-20 items-start">
          {/* Left: Contact Info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6 sm:space-y-8"
          >
            <motion.div variants={fadeInLeft}>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Let's build something great together
              </h3>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 sm:mb-8">
                I'm always interested in hearing about new opportunities and exciting projects. 
                Whether you have a question or just want to connect, feel free to reach out!
              </p>
            </motion.div>

            {/* Contact Details */}
            <motion.div variants={fadeInLeft} className="space-y-4 sm:space-y-6">
              <div className="glass p-4 sm:p-6 rounded-2xl hover:shadow-[0_0_20px_rgba(255,31,143,0.2)] transition-all">
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 flex items-center gap-2">
                  <span>📍</span> Location
                </h4>
                <p className="text-sm sm:text-base text-gray-400">Odisha, India</p>
              </div>

              <div className="glass p-4 sm:p-6 rounded-2xl hover:shadow-[0_0_20px_rgba(255,31,143,0.2)] transition-all">
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 flex items-center gap-2">
                  <span>📧</span> Email
                </h4>
                <a
                  href="mailto:sameerdas0907@gmail.com"
                  className="text-sm sm:text-base text-gray-400 hover:text-[var(--accent-pink)] transition-colors break-all"
                >
                  sameerdas0907@gmail.com
                </a>
              </div>

              <div className="glass p-4 sm:p-6 rounded-2xl hover:shadow-[0_0_20px_rgba(255,31,143,0.2)] transition-all">
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 flex items-center gap-2">
                  <span>📱</span> Phone
                </h4>
                <a
                  href="tel:+917978707118"
                  className="text-sm sm:text-base text-gray-400 hover:text-[var(--accent-pink)] transition-colors"
                >
                  +91 7978707118
                </a>
              </div>

              <div className="glass p-4 sm:p-6 rounded-2xl hover:shadow-[0_0_20px_rgba(255,31,143,0.2)] transition-all">
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 flex items-center gap-2">
                  <span>⏰</span> Availability
                </h4>
                <p className="text-sm sm:text-base text-gray-400">Open for full-time opportunities</p>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeInLeft}>
              <h4 className="text-lg sm:text-xl font-semibold text-white mb-4">Connect with me</h4>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass px-4 py-2 sm:px-6 sm:py-3 rounded-xl hover:shadow-[0_0_20px_rgba(255,31,143,0.3)] transition-all duration-300 flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-xl sm:text-2xl">{social.icon}</span>
                    <span className="text-sm sm:text-base font-semibold">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="glass p-6 sm:p-8 md:p-10 rounded-3xl"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
              Send me a message
            </h3>
            <ContactForm />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-10 border-t border-white/10"
        >
          <p className="text-sm sm:text-base text-gray-400">
            © {new Date().getFullYear()} Sameer Das. Built with Next.js, Three.js & passion.
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Full-Stack Developer | MERN • Next.js • PostgreSQL • AWS
          </p>
        </motion.div>
      </div>
    </section>
  );
}

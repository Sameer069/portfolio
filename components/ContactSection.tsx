"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import DistortedSphere from "./DistortedSphere";
import ContactForm from "./ContactForm";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";

const socialLinks = [
  { name: "GitHub", url: "https://github.com/yourusername", icon: "🔗" },
  { name: "LinkedIn", url: "https://linkedin.com/in/yourusername", icon: "💼" },
  { name: "Twitter", url: "https://twitter.com/yourusername", icon: "🐦" },
  { name: "Email", url: "mailto:your.email@example.com", icon: "📧" },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative min-h-screen py-20 sm:py-24 md:py-32 px-6 sm:px-8 lg:px-12 overflow-hidden"
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
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Contact Info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            <motion.div variants={fadeInLeft}>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Let's create something amazing together
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                I'm always interested in hearing about new projects and opportunities.
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </motion.div>

            {/* Contact Details */}
            <motion.div variants={fadeInLeft} className="space-y-6">
              <div className="glass p-6 rounded-2xl">
                <h4 className="text-xl font-semibold text-white mb-2">📍 Location</h4>
                <p className="text-gray-400">San Francisco, CA</p>
              </div>

              <div className="glass p-6 rounded-2xl">
                <h4 className="text-xl font-semibold text-white mb-2">📧 Email</h4>
                <a
                  href="mailto:your.email@example.com"
                  className="text-gray-400 hover:text-[var(--electric-blue)] transition-colors"
                >
                  your.email@example.com
                </a>
              </div>

              <div className="glass p-6 rounded-2xl">
                <h4 className="text-xl font-semibold text-white mb-2">⏰ Availability</h4>
                <p className="text-gray-400">Open for freelance & full-time opportunities</p>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeInLeft}>
              <h4 className="text-xl font-semibold text-white mb-4">Connect with me</h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass px-6 py-3 rounded-xl hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all duration-300 flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-2xl">{social.icon}</span>
                    <span className="font-semibold">{social.name}</span>
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
            className="glass p-8 md:p-10 rounded-3xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
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
          className="text-center mt-20 pt-10 border-t border-white/10"
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} Developer Portfolio
          </p>
          <p className="text-gray-400 text-sm mt-2 flex items-center justify-center gap-1.5">
            Designed &amp; Developed by{" "}
            <span className="font-bold gradient-text inline-flex items-center gap-1">
              SAM
              <svg className="w-4 h-4 text-[var(--accent-pink)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

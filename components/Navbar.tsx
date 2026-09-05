"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled
      setIsScrolled(window.scrollY > 50);

      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);

      // Determine active section
      const sections = navItems.map((item) => item.href.substring(1));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[9998] origin-left"
        style={{
          background: "linear-gradient(90deg, var(--electric-blue), var(--electric-purple))",
          scaleX: scrollProgress / 100,
        }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[9997] transition-all duration-300 ${
          isScrolled
            ? "bg-[#0a0014]/80 backdrop-blur-xl shadow-lg border-none"
            : "bg-transparent border-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#hero");
            }}
            className="text-xl sm:text-2xl font-bold gradient-text cursor-pointer z-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Portfolio
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`relative text-sm lg:text-base font-medium transition-colors cursor-pointer px-3 py-1.5 rounded-lg hover:text-white ${
                  activeSection === item.href.substring(1)
                    ? "text-white"
                    : "text-gray-400"
                }`}
              >
                {item.name}

                {/* Active indicator */}
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-2 right-2 h-0.5"
                    style={{
                      background: "linear-gradient(90deg, var(--accent-pink), var(--electric-purple))",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center space-y-1.5 z-50"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={
                  isMobileMenuOpen
                    ? { rotate: 45, y: 8 }
                    : { rotate: 0, y: 0 }
                }
                className="block w-6 h-0.5 bg-white transition-all"
              />
              <motion.span
                animate={
                  isMobileMenuOpen
                    ? { opacity: 0 }
                    : { opacity: 1 }
                }
                className="block w-6 h-0.5 bg-white transition-all"
              />
              <motion.span
                animate={
                  isMobileMenuOpen
                    ? { rotate: -45, y: -8 }
                    : { rotate: 0, y: 0 }
                }
                className="block w-6 h-0.5 bg-white transition-all"
              />
            </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9996] md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm glass p-6 sm:p-8 pt-24 sm:pt-28 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Links with margin top */}
              <nav className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`block text-2xl sm:text-3xl font-bold transition-colors cursor-pointer ${
                      activeSection === item.href.substring(1)
                        ? "gradient-text"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10"
              >
                <p className="text-gray-400 text-sm mb-4">Connect with me</p>
                <div className="flex space-x-4">
                  {["GitHub", "LinkedIn", "Twitter"].map((social) => (
                    <a
                      key={social}
                      href={`#${social.toLowerCase()}`}
                      className="w-12 h-12 glass rounded-full flex items-center justify-center hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all"
                      aria-label={social}
                    >
                      <span className="text-lg">
                        {social === "GitHub" && "🔗"}
                        {social === "LinkedIn" && "💼"}
                        {social === "Twitter" && "🐦"}
                      </span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

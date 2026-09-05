"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types";
import { modalVariants, overlayVariants } from "@/lib/animations";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-5xl max-h-[90vh] glass rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-12 h-12 glass rounded-full flex items-center justify-center hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-all group"
              aria-label="Close modal"
            >
              <span className="text-2xl group-hover:rotate-90 transition-transform">
                ✕
              </span>
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
              {/* Hero Image */}
              <div className="relative h-64 md:h-96 overflow-hidden bg-gradient-to-br from-[var(--electric-blue)] to-[var(--electric-purple)]">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-9xl font-bold text-white/20">
                    {project.title.charAt(0)}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1 glass rounded-full text-sm font-semibold">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-4 py-1 glass rounded-full text-sm font-semibold">
                        ⭐ Featured
                      </span>
                    )}
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {project.title}
                  </h2>

                  <p className="text-xl text-gray-300 leading-relaxed">
                    {project.longDescription || project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-white/5 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-4 mb-12">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--electric-blue), var(--electric-purple))",
                      }}
                    >
                      Visit Live Site →
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 rounded-xl font-semibold border-2 border-white/20 hover:border-[var(--electric-blue)] transition-all duration-300"
                    >
                      View Source Code
                    </a>
                  )}
                </div>

                {/* Case Study Sections */}
                <div className="space-y-12">
                  {/* Problem */}
                  {project.problem && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                        <span className="text-3xl">🎯</span>
                        The Challenge
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {project.problem}
                      </p>
                    </div>
                  )}

                  {/* Solution */}
                  {project.solution && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                        <span className="text-3xl">💡</span>
                        The Solution
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {project.solution}
                      </p>
                    </div>
                  )}

                  {/* Results */}
                  {project.results && project.results.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                        <span className="text-3xl">📊</span>
                        Results & Impact
                      </h3>
                      <ul className="space-y-3">
                        {project.results.map((result, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-gray-300 text-lg"
                          >
                            <span className="text-[var(--electric-blue)] mt-1">✓</span>
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Additional Images */}
                  {project.images && project.images.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-6">
                        Project Gallery
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.images.map((image, index) => (
                          <div
                            key={index}
                            className="glass rounded-xl overflow-hidden hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-all"
                          >
                            <img
                              src={image}
                              alt={`${project.title} screenshot ${index + 1}`}
                              className="w-full h-64 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

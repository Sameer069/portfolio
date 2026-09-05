"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index?: number;
  onClick: () => void;
}

export default function ProjectCard({ project, index = 0, onClick }: ProjectCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="h-full"
      data-cursor="project"
    >
      <Tilt
        tiltMaxAngleX={6}
        tiltMaxAngleY={6}
        perspective={1200}
        scale={1.02}
        transitionSpeed={1800}
        gyroscope={false}
        className="h-full"
      >
        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onClick}
          className="relative h-full rounded-2xl overflow-hidden glass p-[1px] transition-all duration-300 group cursor-pointer flex flex-col justify-between"
          style={{
            background: isHovered
              ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 31, 143, 0.4), rgba(107, 31, 176, 0.2), transparent 70%)`
              : "rgba(255, 255, 255, 0.05)",
          }}
        >
          <div className="relative z-10 h-full w-full bg-[var(--color-dark-900)]/90 backdrop-blur-xl rounded-2xl overflow-hidden flex flex-col justify-between">
            <div className="relative h-52 sm:h-60 overflow-hidden bg-gradient-to-br from-[#1a0028] via-[#0d001a] to-[#250036] flex items-center justify-center">
              <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#ff1f8f_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
                <svg
                  className="w-28 h-28 text-white/20 transition-all duration-500 group-hover:scale-110 group-hover:text-[var(--accent-pink)]/40"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  {project.category === "3D Experience" ? (
                    <>
                      <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" strokeDasharray="3 3" />
                      <line x1="50" y1="15" x2="50" y2="95" />
                      <line x1="15" y1="35" x2="85" y2="75" />
                      <line x1="15" y1="75" x2="85" y2="35" />
                      <circle cx="50" cy="55" r="14" stroke="currentColor" fill="rgba(255,31,143,0.1)" />
                    </>
                  ) : project.category === "Mobile App" ? (
                    <>
                      <rect x="25" y="10" width="50" height="80" rx="10" />
                      <line x1="45" y1="18" x2="55" y2="18" />
                      <circle cx="50" cy="80" r="4" />
                      <rect x="32" y="26" width="36" height="46" rx="4" strokeDasharray="2 2" fill="rgba(217,70,239,0.1)" />
                    </>
                  ) : (
                    <>
                      <rect x="15" y="20" width="70" height="50" rx="6" />
                      <line x1="15" y1="32" x2="85" y2="32" />
                      <circle cx="23" cy="26" r="2" fill="currentColor" />
                      <circle cx="30" cy="26" r="2" fill="currentColor" />
                      <circle cx="37" cy="26" r="2" fill="currentColor" />
                      <polyline points="32,48 42,56 32,64" stroke="currentColor" strokeWidth="2" />
                      <line x1="48" y1="64" x2="62" y2="64" stroke="currentColor" strokeWidth="2" />
                    </>
                  )}
                </svg>
              </div>

              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-pink)]/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out" />

              <div className="absolute top-4 left-4 font-mono text-xs font-bold text-white/70 px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/10">
                {formattedIndex}
              </div>

              {project.featured && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-[var(--accent-pink)]/20 border border-[var(--accent-pink)]/40 backdrop-blur-md rounded-full text-xs font-semibold text-[var(--accent-pink)] flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,31,143,0.3)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-pink)] animate-pulse" />
                  Featured
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-900)] via-transparent to-transparent opacity-90" />
            </div>

            <div className="p-6 flex flex-col flex-grow justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-gray-400 mb-2.5">
                  <span className="text-[var(--accent-pink)]">{project.category}</span>
                  {project.results && project.results[0] && (
                    <span className="text-gray-400 truncate max-w-[140px] text-[11px]">
                      {project.results[0].split(" ")[0]} {project.results[0].split(" ")[1]}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[var(--accent-pink)] transition-all line-clamp-1">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono text-gray-300 bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-2 py-1 rounded-md text-[11px] font-mono text-gray-400 bg-white/5">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                  }}
                  className="text-xs font-semibold text-white/80 group-hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  Inspect Case Study
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-xs transition-colors"
                      title="GitHub Repository"
                    >
                      <svg className="w-4 h-4 fill-current text-gray-300" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,31,143,0.5)] flex items-center gap-1"
                      style={{
                        background: "linear-gradient(135deg, var(--accent-pink), var(--electric-purple))",
                      }}
                    >
                      <span>Live</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}

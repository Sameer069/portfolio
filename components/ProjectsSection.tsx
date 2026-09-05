"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface ProjectsSectionProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export default function ProjectsSection({
  projects,
  onProjectClick,
}: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"spotlight" | "grid">("spotlight");
  const [activeTab, setActiveTab] = useState<"overview" | "impact" | "architecture">("overview");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const activeIndex = Math.min(activeProjectIndex, Math.max(0, filteredProjects.length - 1));
  const activeProject = filteredProjects[activeIndex] || filteredProjects[0];

  const handlePrev = () => {
    setActiveProjectIndex((prev) => (prev > 0 ? prev - 1 : filteredProjects.length - 1));
  };

  const handleNext = () => {
    setActiveProjectIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen py-20 sm:py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div
          className="absolute top-1/4 right-1/4 w-80 sm:w-96 h-80 sm:h-96 rounded-full blur-[140px]"
          style={{ background: "var(--accent-pink)" }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-80 sm:w-96 h-80 sm:h-96 rounded-full blur-[140px]"
          style={{ background: "var(--electric-purple)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-mono text-[var(--accent-pink)] uppercase tracking-wider mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--accent-pink)] animate-ping" />
              Selected Engineering & Design Works
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight"
            >
              Featured <span className="gradient-text">Projects</span>
            </motion.h2>
          </div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center gap-2 p-1.5 glass rounded-xl self-start md:self-auto border border-white/10"
          >
            <button
              type="button"
              onClick={() => setViewMode("spotlight")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                viewMode === "spotlight"
                  ? "bg-gradient-to-r from-[var(--accent-pink)] to-[var(--electric-purple)] text-white shadow-[0_0_20px_rgba(255,31,143,0.4)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Spotlight Stage</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-[var(--accent-pink)] to-[var(--electric-purple)] text-white shadow-[0_0_20px_rgba(255,31,143,0.4)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>Bento Grid</span>
            </button>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 sm:gap-3 mb-10"
        >
          {categories.map((category) => {
            const count =
              category === "All"
                ? projects.length
                : projects.filter((p) => p.category === category).length;
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setActiveProjectIndex(0);
                }}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 border ${
                  isSelected
                    ? "text-white border-[var(--accent-pink)] shadow-[0_0_20px_rgba(255,31,143,0.3)] bg-white/10"
                    : "text-gray-400 border-white/10 glass hover:text-white hover:border-white/20"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="categoryHighlight"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--accent-pink)]/20 to-[var(--electric-purple)]/20 -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{category}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white/10 text-gray-300">
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {viewMode === "spotlight" && activeProject && (
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="glass rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-pink)] font-semibold px-2.5 py-1 rounded bg-[var(--accent-pink)]/10 border border-[var(--accent-pink)]/30">
                          {activeProject.category}
                        </span>
                        {activeProject.featured && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 text-amber-300 flex items-center gap-1 border border-amber-300/30">
                            ★ Featured
                          </span>
                        )}
                      </div>

                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                        {activeProject.title}
                      </h3>

                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                        {activeProject.longDescription || activeProject.description}
                      </p>

                      <div className="mb-6">
                        <div className="flex gap-4 border-b border-white/10 pb-2 mb-3">
                          <button
                            type="button"
                            onClick={() => setActiveTab("overview")}
                            className={`text-xs font-mono uppercase tracking-wider transition-colors relative pb-2 ${
                              activeTab === "overview" ? "text-[var(--accent-pink)] font-bold" : "text-gray-400 hover:text-white"
                            }`}
                          >
                            Overview
                            {activeTab === "overview" && (
                              <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-pink)]" />
                            )}
                          </button>
                          {activeProject.results && activeProject.results.length > 0 && (
                            <button
                              type="button"
                              onClick={() => setActiveTab("impact")}
                              className={`text-xs font-mono uppercase tracking-wider transition-colors relative pb-2 ${
                                activeTab === "impact" ? "text-[var(--accent-pink)] font-bold" : "text-gray-400 hover:text-white"
                              }`}
                            >
                              Impact & Results
                              {activeTab === "impact" && (
                                <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-pink)]" />
                              )}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setActiveTab("architecture")}
                            className={`text-xs font-mono uppercase tracking-wider transition-colors relative pb-2 ${
                              activeTab === "architecture" ? "text-[var(--accent-pink)] font-bold" : "text-gray-400 hover:text-white"
                            }`}
                          >
                            Tech Stack
                            {activeTab === "architecture" && (
                              <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-pink)]" />
                            )}
                          </button>
                        </div>

                        <div className="min-h-[72px]">
                          {activeTab === "overview" && (
                            <p className="text-sm text-gray-400 leading-relaxed">
                              {activeProject.solution || activeProject.description}
                            </p>
                          )}
                          {activeTab === "impact" && activeProject.results && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {activeProject.results.slice(0, 4).map((res, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 px-3 py-2 rounded-lg border border-white/5">
                                  <span className="text-[var(--accent-pink)] font-bold">✓</span>
                                  <span className="truncate">{res}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {activeTab === "architecture" && (
                            <div className="flex flex-wrap gap-2">
                              {activeProject.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1.5 rounded-lg text-xs font-mono text-gray-200 bg-white/5 border border-white/10"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => onProjectClick(activeProject)}
                        className="px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,31,143,0.5)] flex items-center gap-2"
                        style={{
                          background: "linear-gradient(135deg, var(--accent-pink), var(--electric-purple))",
                        }}
                      >
                        <span>Deep Dive Case Study</span>
                        <span>→</span>
                      </button>

                      {activeProject.liveUrl && (
                        <a
                          href={activeProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-3 rounded-full text-sm font-semibold text-white glass border border-white/20 hover:border-[var(--accent-pink)] transition-colors flex items-center gap-2"
                        >
                          <span>Live Demo</span>
                          <span className="text-xs">↗</span>
                        </a>
                      )}

                      {activeProject.githubUrl && (
                        <a
                          href={activeProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-3 rounded-full text-sm font-semibold text-gray-300 glass hover:text-white border border-white/10 transition-colors flex items-center gap-2"
                        >
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-5" data-cursor="project">
                    <Tilt
                      tiltMaxAngleX={10}
                      tiltMaxAngleY={10}
                      perspective={1000}
                      scale={1.03}
                      transitionSpeed={2000}
                      gyroscope={false}
                    >
                      <div
                        onClick={() => onProjectClick(activeProject)}
                        className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden glass p-[1px] cursor-pointer group shadow-2xl"
                      >
                        <div className="relative h-full w-full bg-gradient-to-br from-[#1c002c] via-[#0b0014] to-[#2b0040] rounded-2xl overflow-hidden flex items-center justify-center p-8">
                          <div className="absolute w-64 h-64 rounded-full bg-[var(--accent-pink)]/20 blur-3xl group-hover:scale-125 transition-transform duration-700" />

                          <div className="relative z-10 text-center flex flex-col items-center">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 mb-4 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center shadow-inner group-hover:border-[var(--accent-pink)]/50 transition-colors">
                              <svg
                                className="w-14 h-14 sm:w-18 sm:h-18 text-[var(--accent-pink)] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              >
                                {activeProject.category === "3D Experience" ? (
                                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                ) : activeProject.category === "Mobile App" ? (
                                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                                ) : (
                                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                                )}
                              </svg>
                            </div>

                            <p className="text-white font-bold text-lg mb-1">{activeProject.title}</p>
                            <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                              Click to view project details
                            </p>
                          </div>

                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000" />
                        </div>
                      </div>
                    </Tilt>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-gray-400 uppercase">
                  Select Project:
                </span>
                <span className="text-xs font-mono text-white font-bold">
                  {activeIndex + 1} / {filteredProjects.length}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full glass border border-white/15 flex items-center justify-center text-white hover:border-[var(--accent-pink)] hover:shadow-[0_0_15px_rgba(255,31,143,0.4)] transition-all"
                  aria-label="Previous project"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full glass border border-white/15 flex items-center justify-center text-white hover:border-[var(--accent-pink)] hover:shadow-[0_0_15px_rgba(255,31,143,0.4)] transition-all"
                  aria-label="Next project"
                >
                  →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
              {filteredProjects.map((project, idx) => {
                const isCurrent = idx === activeIndex;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setActiveProjectIndex(idx)}
                    className={`text-left p-3.5 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                      isCurrent
                        ? "glass border-[var(--accent-pink)] shadow-[0_0_20px_rgba(255,31,143,0.3)] bg-white/10"
                        : "glass border-white/10 hover:border-white/20 opacity-70 hover:opacity-100"
                    }`}
                  >
                    {isCurrent && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-pink)] to-[var(--electric-purple)]" />
                    )}
                    <span className="text-[10px] font-mono text-gray-400 block mb-1">
                      0{idx + 1} • {project.category.split(" ")[0]}
                    </span>
                    <h4 className="text-xs font-bold text-white truncate">
                      {project.title}
                    </h4>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {viewMode === "grid" && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => onProjectClick(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}

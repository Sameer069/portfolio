"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import ProjectModal from "@/components/ProjectModal";
import SmoothScroll from "@/components/SmoothScroll";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Project } from "@/types";
import projectsData from "@/data/projects.json";

// Dynamic import for heavy 3D components with error handling
const DynamicHero3D = dynamic(() => import("@/components/Hero3D"), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center bg-[#0a0a0f]">
      <div className="text-white text-xl">Loading 3D Scene...</div>
    </div>
  ),
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const projects: Project[] = projectsData as Project[];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  if (!isMounted) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="text-white text-xl">Initializing...</div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <SmoothScroll>
        <main className="relative">
          {/* Loading Screen */}
          <LoadingScreen onComplete={handleLoadingComplete} />

          {/* Custom Cursor */}
          <CustomCursor />

          {/* Navigation */}
          <Navbar />

          {/* Hero Section */}
          <ErrorBoundary
            fallback={
              <div className="h-screen flex items-center justify-center bg-[#0a0a0f]">
                <div className="text-center">
                  <h2 className="text-2xl text-white mb-4">3D Scene Error</h2>
                  <p className="text-gray-400 mb-6">
                    The 3D scene failed to load. Try refreshing the page.
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-[var(--accent-pink)] text-white rounded-lg"
                  >
                    Reload
                  </button>
                </div>
              </div>
            }
          >
            <DynamicHero3D />
          </ErrorBoundary>

          {/* About Section */}
          <AboutSection />

          {/* Projects Section */}
          <ProjectsSection
            projects={projects}
            onProjectClick={handleProjectClick}
          />

          {/* Contact Section */}
          <ContactSection />

          {/* Project Modal */}
          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </main>
      </SmoothScroll>
    </ErrorBoundary>
  );
}


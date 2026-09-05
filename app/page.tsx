"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero3D from "@/components/Hero3D";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import ProjectModal from "@/components/ProjectModal";
import SmoothScroll from "@/components/SmoothScroll";
import { Project } from "@/types";
import projectsData from "@/data/projects.json";

// Dynamic import for heavy 3D components
const DynamicHero3D = dynamic(() => import("@/components/Hero3D"), {
  ssr: false,
  loading: () => <div className="h-screen" />,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects: Project[] = projectsData as Project[];

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

  return (
    <SmoothScroll>
      <main className="relative">
        {/* Loading Screen */}
        <LoadingScreen onComplete={handleLoadingComplete} />

        {/* Custom Cursor */}
        <CustomCursor />

        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <DynamicHero3D />

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
  );
}


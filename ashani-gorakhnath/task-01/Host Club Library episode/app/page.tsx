"use client";

import React, { useState, useCallback } from "react";
import { STUDENT_PROJECTS } from "@/data/students";
import { StudentProject } from "@/data/types";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BookCollection } from "@/components/BookCollection";
import { About } from "@/components/About";
import { Contributors } from "@/components/Contributors";
import { Footer } from "@/components/Footer";
import { ProjectModal } from "@/components/ProjectModal";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<StudentProject | null>(null);

  const handleSelectProject = useCallback((project: StudentProject) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleNextProject = useCallback(() => {
    if (!selectedProject) return;
    const currentIndex = STUDENT_PROJECTS.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % STUDENT_PROJECTS.length;
    setSelectedProject(STUDENT_PROJECTS[nextIndex]);
  }, [selectedProject]);

  const handlePrevProject = useCallback(() => {
    if (!selectedProject) return;
    const currentIndex = STUDENT_PROJECTS.findIndex((p) => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + STUDENT_PROJECTS.length) % STUDENT_PROJECTS.length;
    setSelectedProject(STUDENT_PROJECTS[prevIndex]);
  }, [selectedProject]);

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Site Header with official branding */}
      <Header />

      {/* Main Content Flow */}
      <div className="flex-1 flex flex-col">
        {/* Hero Section */}
        <Hero />

        {/* 3D Book Collection Section */}
        <BookCollection onSelectProject={handleSelectProject} />

        {/* About Section */}
        <About />

        {/* Contributors Section */}
        <Contributors onSelectProject={handleSelectProject} />
      </div>

      {/* Site Footer */}
      <Footer />

      {/* Immersive Project Folio Reader Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={handleCloseModal}
        onNext={handleNextProject}
        onPrev={handlePrevProject}
      />
    </main>
  );
}

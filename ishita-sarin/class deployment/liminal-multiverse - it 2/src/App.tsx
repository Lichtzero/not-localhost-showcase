/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { INITIAL_PROJECTS, ProjectWorld } from './data/projects';
import { MultiverseCanvas } from './components/MultiverseCanvas';
import { MultiverseHUD } from './components/MultiverseHUD';
import { CreateWorldModal } from './components/CreateWorldModal';
import { ProjectIndex } from './components/ProjectIndex';

type ViewMode = 'multiverse' | 'index';

// Start on the index if the URL asks for it or the visitor prefers reduced motion
function getInitialView(): ViewMode {
  if (window.location.hash === '#index') return 'index';
  if (window.location.hash === '#multiverse') return 'multiverse';
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'index' : 'multiverse';
}

export default function App() {
  const [view, setView] = useState<ViewMode>(getInitialView);
  const [projects, setProjects] = useState<ProjectWorld[]>(INITIAL_PROJECTS);
  const [hoveredProject, setHoveredProject] = useState<ProjectWorld | null>(null);
  const [showOrbits] = useState<boolean>(true);
  const [showStars] = useState<boolean>(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [viewResetTrigger, setViewResetTrigger] = useState<number>(0);

  // Select project: open the project's own site in a new tab
  const handleSelectProject = useCallback((project: ProjectWorld) => {
    if (project.url) {
      window.open(project.url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  // Add new speculative project
  const handleAddProject = useCallback((newWorld: ProjectWorld) => {
    setProjects((prev) => [...prev, newWorld]);
  }, []);

  // Switch between the 3D multiverse and the plain project index
  const showView = useCallback((mode: ViewMode) => {
    setView(mode);
    window.history.replaceState(null, '', `#${mode}`);
  }, []);

  // Reset view vantage
  const handleResetView = useCallback(() => {
    setViewResetTrigger((prev) => prev + 1);
  }, []);

  if (view === 'index') {
    return (
      <div className="relative w-screen h-screen overflow-hidden bg-[#020205]">
        <ProjectIndex projects={projects} onOpenMultiverse={() => showView('multiverse')} />
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020205] text-neutral-100 font-mono-code select-none">
      {/* 3D MULTIVERSE WEBGL CANVAS */}
      <MultiverseCanvas
        key={viewResetTrigger}
        projects={projects}
        activeProjectId={null}
        hoveredProjectId={hoveredProject ? hoveredProject.id : null}
        onSelectProject={handleSelectProject}
        onHoverProject={setHoveredProject}
        showOrbits={showOrbits}
        showStars={showStars}
      />

      {/* SUBTLE SPECULATIVE CINEMATIC VIGNETTE & SCANLINES */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.85)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.025] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[size:100%_4px]" />

      {/* OBSERVATORY HUD OVERLAY */}
      <MultiverseHUD
        projects={projects}
        hoveredProject={hoveredProject}
        onSelectProject={handleSelectProject}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenIndex={() => showView('index')}
      />

      {/* TRANSMIT NEW SPECULATIVE WORLD MODAL */}
      <CreateWorldModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAddProject={handleAddProject}
        existingCount={projects.length}
      />
    </div>
  );
}

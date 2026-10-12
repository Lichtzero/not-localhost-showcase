/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { INITIAL_PROJECTS, ProjectWorld } from './data/projects';
import { MultiverseCanvas } from './components/MultiverseCanvas';
import { MultiverseHUD } from './components/MultiverseHUD';
import { ProjectIndex } from './components/ProjectIndex';
import { ViewMode } from './components/ViewSwitcher';
import { SectorFilterValue } from './components/SectorFilter';

// Start on the list view if the URL asks for it or the visitor prefers reduced motion
function getInitialView(): ViewMode {
  if (window.location.hash === '#index') return 'index';
  if (window.location.hash === '#multiverse') return 'multiverse';
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'index' : 'multiverse';
}

// How long the hover card lingers after the pointer leaves a planet, so it can be reached and clicked
const HOVER_CARD_GRACE_MS = 600;

export default function App() {
  const projects = INITIAL_PROJECTS;
  const [view, setView] = useState<ViewMode>(getInitialView);
  const [sector, setSector] = useState<SectorFilterValue>('ALL');
  const [hoveredProject, setHoveredProject] = useState<ProjectWorld | null>(null);
  const hoverClearTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Open the project's own site in a new tab
  const handleSelectProject = useCallback((project: ProjectWorld) => {
    if (project.url) {
      window.open(project.url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  // Show a project immediately; clear it only after a short grace period
  const handleHoverProject = useCallback((project: ProjectWorld | null) => {
    clearTimeout(hoverClearTimer.current);
    if (project) {
      setHoveredProject(project);
    } else {
      hoverClearTimer.current = setTimeout(() => setHoveredProject(null), HOVER_CARD_GRACE_MS);
    }
  }, []);

  // Switch between the 3D view and the plain list view
  const showView = useCallback((mode: ViewMode) => {
    clearTimeout(hoverClearTimer.current);
    setHoveredProject(null);
    setView(mode);
    window.history.replaceState(null, '', `#${mode}`);
  }, []);

  // Follow manual edits to the #index / #multiverse part of the address
  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === '#index') setView('index');
      if (window.location.hash === '#multiverse') setView('multiverse');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (view === 'index') {
    return (
      <div className="relative w-screen h-screen overflow-hidden bg-[#020205]">
        <ProjectIndex projects={projects} sector={sector} onSectorChange={setSector} onChangeView={showView} />
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020205] text-neutral-100 font-mono-code select-none">
      {/* 3D MULTIVERSE WEBGL CANVAS */}
      <MultiverseCanvas
        projects={projects}
        activeProjectId={null}
        hoveredProjectId={hoveredProject ? hoveredProject.id : null}
        onSelectProject={handleSelectProject}
        onHoverProject={handleHoverProject}
        showOrbits
        showStars
      />

      {/* SUBTLE SPECULATIVE CINEMATIC VIGNETTE & SCANLINES */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.85)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.025] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[size:100%_4px]" />

      {/* OBSERVATORY HUD OVERLAY */}
      <MultiverseHUD
        projects={projects}
        hoveredProject={hoveredProject}
        onSelectProject={handleSelectProject}
        onHoverProject={handleHoverProject}
        sector={sector}
        onSectorChange={setSector}
        onChangeView={showView}
      />
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { INITIAL_PROJECTS, ProjectWorld } from './data/projects';
import { MultiverseCanvas } from './components/MultiverseCanvas';
import { MultiverseHUD } from './components/MultiverseHUD';
import { ProjectWorldModal } from './components/ProjectWorldModal';
import { CreateWorldModal } from './components/CreateWorldModal';
import { ClassPlanetModal } from './components/ClassPlanetModal';
import { buildClassPlanets, ClassManifest } from './data/classPlanets';
import { sound } from './utils/audio';

export default function App() {
  const [projects, setProjects] = useState<ProjectWorld[]>(INITIAL_PROJECTS);
  const [activeProject, setActiveProject] = useState<ProjectWorld | null>(null);
  const [hoveredProject, setHoveredProject] = useState<ProjectWorld | null>(null);
  const [showOrbits] = useState<boolean>(true);
  const [showStars] = useState<boolean>(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [viewResetTrigger, setViewResetTrigger] = useState<number>(0);

  // Load every classmate's latest work as planets. The manifest is regenerated on every deploy
  // (scripts/sync-showcase.mjs); we also re-check it every minute so an open tab stays current.
  React.useEffect(() => {
    let cancelled = false;
    let lastStamp = '';

    const load = async () => {
      try {
        const url = new URL('showcase-manifest.json', document.baseURI);
        url.searchParams.set('t', String(Date.now()));
        const res = await fetch(url.toString(), { cache: 'no-store' });
        if (!res.ok) return;
        const manifest: ClassManifest = await res.json();
        if (cancelled || manifest.generatedAt === lastStamp) return;
        lastStamp = manifest.generatedAt;
        const classPlanets = buildClassPlanets(manifest);
        setProjects((prev) => {
          const own = prev.filter((p) => !p.classEntry);
          const known = new Map(prev.filter((p) => p.classEntry).map((p) => [p.id, p]));
          // keep existing objects' positions so planets never jump; refresh their data
          return [...own, ...classPlanets.map((p) => (known.has(p.id) ? { ...p, sphere: known.get(p.id)!.sphere } : p))];
        });
        setActiveProject((cur) => (cur?.classEntry ? classPlanets.find((p) => p.id === cur.id) ?? cur : cur));
      } catch {
        /* manifest is optional: without it the multiverse just shows the original worlds */
      }
    };

    load();
    const timer = window.setInterval(load, 60000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  // Keep space sound running at all times
  React.useEffect(() => {
    sound.start();
  }, []);

  // Select project (enter world)
  const handleSelectProject = useCallback((project: ProjectWorld) => {
    setActiveProject(project);
  }, []);

  // Return to multiverse (exit world)
  const handleCloseWorld = useCallback(() => {
    setActiveProject(null);
  }, []);

  // Next / Previous project cycling inside modal
  const handleNextProject = useCallback(() => {
    if (!activeProject) return;
    const currentIndex = projects.findIndex((p) => p.id === activeProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    sound.playHoverPing();
    setActiveProject(projects[nextIndex]);
  }, [activeProject, projects]);

  const handlePrevProject = useCallback(() => {
    if (!activeProject) return;
    const currentIndex = projects.findIndex((p) => p.id === activeProject.id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    sound.playHoverPing();
    setActiveProject(projects[prevIndex]);
  }, [activeProject, projects]);

  // Add new speculative project
  const handleAddProject = useCallback((newWorld: ProjectWorld) => {
    setProjects((prev) => [...prev, newWorld]);
  }, []);

  // Reset view vantage
  const handleResetView = useCallback(() => {
    setViewResetTrigger((prev) => prev + 1);
    setActiveProject(null);
    sound.playHoverPing();
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020205] text-neutral-100 font-mono-code select-none">
      {/* 3D MULTIVERSE WEBGL CANVAS */}
      <MultiverseCanvas
        key={viewResetTrigger}
        projects={projects}
        activeProjectId={activeProject ? activeProject.id : null}
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
        activeProject={activeProject}
        hoveredProject={hoveredProject}
        onSelectProject={handleSelectProject}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
      />

      {/* INDIVIDUAL WORLD / GALLERY MODAL */}
      {activeProject && activeProject.classEntry && (
        <ClassPlanetModal
          project={activeProject}
          onClose={handleCloseWorld}
          onNextProject={handleNextProject}
          onPrevProject={handlePrevProject}
        />
      )}
      {activeProject && !activeProject.classEntry && (
        <ProjectWorldModal
          project={activeProject}
          onClose={handleCloseWorld}
          onNextProject={handleNextProject}
          onPrevProject={handlePrevProject}
        />
      )}

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

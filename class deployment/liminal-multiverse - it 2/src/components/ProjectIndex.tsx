import React from 'react';
import { ProjectWorld } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';
import { ViewSwitcher, ViewMode } from './ViewSwitcher';
import { SectorFilter, SectorFilterValue, filterBySector } from './SectorFilter';
import { SiteBrand } from './SiteBrand';

interface ProjectIndexProps {
  projects: ProjectWorld[];
  sector: SectorFilterValue;
  onSectorChange: (sector: SectorFilterValue) => void;
  onChangeView: (view: ViewMode) => void;
}

// Plain, motion-free list of every project — an alternative to the animated 3D view
export const ProjectIndex: React.FC<ProjectIndexProps> = ({ projects, sector, onSectorChange, onChangeView }) => {
  const visible = filterBySector(projects, sector);

  return (
    <div className="absolute inset-0 overflow-y-auto bg-[#020205] text-neutral-100 font-mono-code select-text">
      <div className="mx-auto max-w-5xl p-4 md:p-6">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-neutral-800/80 pb-4">
          <SiteBrand still />
          <ViewSwitcher view="index" onChange={onChangeView} />
        </header>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2.5 py-4">
          <p className="font-chakra text-[11px] uppercase tracking-wider text-neutral-400">
            {visible.length === projects.length
              ? `${projects.length} projects`
              : `${visible.length} of ${projects.length} projects`}
          </p>
          <SectorFilter projects={projects} value={sector} onChange={onSectorChange} />
        </div>

        <ol className="divide-y divide-neutral-800/80 border-t border-neutral-800/80">
          {visible.map((project) => {
            const number = projects.findIndex((p) => p.id === project.id) + 1;
            const content = (
              <>
                <span
                  className="font-orbitron w-12 shrink-0 text-2xl font-black md:w-16 md:text-3xl"
                  style={{ color: project.themeColor }}
                >
                  {number}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="font-chakra block text-base font-bold text-white md:text-lg">{project.subtitle}</span>
                  <span className="font-chakra mt-1 block text-xs uppercase tracking-wider text-neutral-400">
                    {project.wizardOwner.avatarRune} {project.wizardOwner.name}
                  </span>
                  <span className="font-chakra mt-1 block text-[11px] uppercase tracking-wider text-neutral-500">
                    {project.sector} · {project.year}
                  </span>
                </span>

                <span className="font-chakra flex shrink-0 items-center text-xs font-bold uppercase tracking-wider">
                  {project.url ? (
                    <span className="flex items-center gap-1.5 text-cyan-300">
                      <span className="hidden sm:inline">Visit project</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  ) : (
                    <span className="text-neutral-500">Link coming soon</span>
                  )}
                </span>
              </>
            );

            const rowClass = 'flex items-center gap-4 py-5 md:gap-6';

            return (
              <li key={project.id}>
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${number}. ${project.subtitle} by ${project.wizardOwner.name} (opens in a new tab)`}
                    className={`${rowClass} -mx-3 rounded px-3 hover:bg-neutral-900/70 focus-visible:bg-neutral-900/70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-cyan-400`}
                  >
                    {content}
                  </a>
                ) : (
                  <div className={rowClass}>{content}</div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

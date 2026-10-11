import React from 'react';
import { ProjectWorld } from '../data/projects';
import { ArrowUpRight, Orbit } from 'lucide-react';

interface ProjectIndexProps {
  projects: ProjectWorld[];
  onOpenMultiverse: () => void;
}

// Plain, motion-free list of every project — an alternative to the animated 3D multiverse
export const ProjectIndex: React.FC<ProjectIndexProps> = ({ projects, onOpenMultiverse }) => {
  return (
    <div className="absolute inset-0 overflow-y-auto bg-[#020205] text-neutral-100 font-mono-code select-text">
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
        <header className="flex flex-col gap-4 border-b border-neutral-800 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-orbitron text-2xl font-black uppercase tracking-[0.2em] text-chromatic-multiverse [animation:none] md:text-3xl">
              LIMINAL MULTIVERSE
            </h1>
            <p className="font-chakra mt-2 text-xs uppercase tracking-[0.16em] text-neutral-400">
              Project index // {projects.length} projects
            </p>
          </div>

          <button
            onClick={onOpenMultiverse}
            className="flex items-center gap-2 self-start rounded border border-cyan-500/50 bg-cyan-950/30 px-3 py-1.5 text-xs text-cyan-300 hover:border-cyan-400 hover:bg-cyan-900/50 md:self-auto"
          >
            <Orbit className="h-3.5 w-3.5" />
            <span className="text-[11px] font-semibold uppercase tracking-wider">View 3D Multiverse</span>
          </button>
        </header>

        <ol className="divide-y divide-neutral-800/80">
          {projects.map((project, index) => {
            const content = (
              <>
                <span
                  className="font-orbitron w-12 shrink-0 text-2xl font-black md:w-16 md:text-3xl"
                  style={{ color: project.themeColor }}
                >
                  {index + 1}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="font-chakra block text-base font-bold text-white md:text-lg">
                    {project.subtitle}
                  </span>
                  <span className="font-chakra mt-1 block text-xs uppercase tracking-wider text-neutral-400">
                    {project.wizardOwner.name} · {project.sector} · {project.year}
                  </span>
                </span>

                <span className="font-chakra flex shrink-0 items-center gap-1 text-[11px] font-bold uppercase tracking-wider">
                  {project.url ? (
                    <span className="flex items-center gap-1 text-cyan-300">
                      Open <ArrowUpRight className="h-3.5 w-3.5" />
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

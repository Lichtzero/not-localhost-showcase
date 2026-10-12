import React from 'react';
import { ProjectWorld } from '../data/projects';

export type SectorFilterValue = 'ALL' | ProjectWorld['sector'];

const SECTORS: Array<{ value: SectorFilterValue; label: string; activeClass: string }> = [
  { value: 'ALL', label: 'All', activeClass: 'border-cyan-400 bg-cyan-950/50 text-cyan-300' },
  { value: 'BIOMETRICS & PERCEPTION', label: 'Biometrics & Perception', activeClass: 'border-amber-400 bg-amber-950/50 text-amber-300' },
  { value: 'SYNTHETIC ENTITIES', label: 'Synthetic Entities', activeClass: 'border-purple-400 bg-purple-950/50 text-purple-300' },
  { value: 'PLANETARY ALGORITHMS', label: 'Planetary Algorithms', activeClass: 'border-emerald-400 bg-emerald-950/50 text-emerald-300' },
];

export const filterBySector = (projects: ProjectWorld[], sector: SectorFilterValue) =>
  sector === 'ALL' ? projects : projects.filter((p) => p.sector === sector);

interface SectorFilterProps {
  projects: ProjectWorld[];
  value: SectorFilterValue;
  onChange: (value: SectorFilterValue) => void;
}

// Category filter shared by the 3D view's dock and the list view
export const SectorFilter: React.FC<SectorFilterProps> = ({ projects, value, onChange }) => (
  <div role="group" aria-label="Filter by category" className="pointer-events-auto flex flex-wrap items-center gap-1.5">
    {SECTORS.map((s) => (
      <button
        key={s.value}
        onClick={() => onChange(s.value)}
        aria-pressed={value === s.value}
        data-ui-element="true"
        className={`font-chakra rounded border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors ${
          value === s.value ? s.activeClass : 'border-neutral-800 bg-neutral-950/70 text-neutral-400 hover:text-white'
        }`}
      >
        {s.label} <span className="opacity-70">({filterBySector(projects, s.value).length})</span>
      </button>
    ))}
  </div>
);

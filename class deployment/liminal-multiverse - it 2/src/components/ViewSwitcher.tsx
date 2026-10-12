import React from 'react';
import { List, Orbit } from 'lucide-react';

export type ViewMode = 'multiverse' | 'index';

interface ViewSwitcherProps {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
  highlightList?: boolean;
}

const OPTIONS: Array<{ mode: ViewMode; label: string; Icon: typeof List }> = [
  { mode: 'multiverse', label: '3D View', Icon: Orbit },
  { mode: 'index', label: 'List View', Icon: List },
];

// Two-way toggle shown in the same spot on both views, so switching is always one click away
export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ view, onChange, highlightList }) => (
  <div
    role="group"
    aria-label="Choose how to browse projects"
    data-ui-element="true"
    className="pointer-events-auto inline-flex rounded-lg border border-neutral-700 bg-neutral-950/80 p-1"
  >
    {OPTIONS.map(({ mode, label, Icon }) => {
      const active = view === mode;
      const glow = highlightList && mode === 'index' && !active;
      return (
        <button
          key={mode}
          onClick={() => onChange(mode)}
          aria-pressed={active}
          className={`font-chakra flex w-28 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
            active
              ? 'bg-cyan-950/80 text-cyan-200 ring-1 ring-cyan-400/70'
              : glow
              ? 'text-cyan-200 ring-1 ring-cyan-400 shadow-[0_0_14px_rgba(6,182,212,0.5)]'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </button>
      );
    })}
  </div>
);

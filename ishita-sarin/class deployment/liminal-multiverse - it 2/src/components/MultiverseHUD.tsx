import React, { useState, useEffect } from 'react';
import { ProjectWorld } from '../data/projects';
import { ArrowUpRight, ArrowUp, Radio, List, X } from 'lucide-react';
import { ViewSwitcher, ViewMode } from './ViewSwitcher';
import { SectorFilter, SectorFilterValue, filterBySector } from './SectorFilter';
import { SiteBrand } from './SiteBrand';

const INDEX_HINT_KEY = 'liminal-index-hint-dismissed';

interface MultiverseHUDProps {
  projects: ProjectWorld[];
  hoveredProject: ProjectWorld | null;
  onSelectProject: (project: ProjectWorld) => void;
  onHoverProject: (project: ProjectWorld | null) => void;
  sector: SectorFilterValue;
  onSectorChange: (sector: SectorFilterValue) => void;
  onChangeView: (view: ViewMode) => void;
}

export const MultiverseHUD: React.FC<MultiverseHUDProps> = ({
  projects,
  hoveredProject,
  onSelectProject,
  onHoverProject,
  sector,
  onSectorChange,
  onChangeView,
}) => {
  const [telemetryTime, setTelemetryTime] = useState('');
  const [randomFrequency, setRandomFrequency] = useState('142.880');
  const [showIndexHint, setShowIndexHint] = useState(false);

  // Show the "prefer a list?" hint shortly after load, unless this visitor already dismissed it
  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(INDEX_HINT_KEY) === '1';
    } catch {}
    if (dismissed) return;
    const timer = setTimeout(() => setShowIndexHint(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const dismissIndexHint = () => {
    setShowIndexHint(false);
    try {
      localStorage.setItem(INDEX_HINT_KEY, '1');
    } catch {}
  };

  // Esc closes the hint
  useEffect(() => {
    if (!showIndexHint) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismissIndexHint();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showIndexHint]);

  useEffect(() => {
    const updateClock = () => {
      const d = new Date();
      const yr = d.getFullYear() + 28; // Speculative future epoch
      const mo = String(d.getMonth() + 1).padStart(2, '0');
      const da = String(d.getDate()).padStart(2, '0');
      const hr = String(d.getHours()).padStart(2, '0');
      const mi = String(d.getMinutes()).padStart(2, '0');
      const se = String(d.getSeconds()).padStart(2, '0');
      const ms = String(Math.floor(d.getMilliseconds() / 10)).padStart(2, '0');
      setTelemetryTime(`EPOCH ${yr}.${mo}.${da} // ${hr}:${mi}:${se}.${ms} UTC`);
    };
    updateClock();
    const interval = setInterval(updateClock, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const freqInterval = setInterval(() => {
      const base = 140 + Math.random() * 80;
      setRandomFrequency(base.toFixed(3));
    }, 2800);
    return () => clearInterval(freqInterval);
  }, []);

  const filteredProjects = filterBySector(projects, sector);
  const dockScrollRef = React.useRef<HTMLDivElement>(null);

  const scrollDock = (direction: 'left' | 'right') => {
    dockScrollRef.current?.scrollBy({ left: direction === 'left' ? -260 : 260, behavior: 'smooth' });
  };

  const hoveredNumber = hoveredProject ? projects.findIndex((p) => p.id === hoveredProject.id) + 1 : 0;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-4 md:p-6 select-none font-mono-code">
      {/* TOP BAR */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-neutral-800/80 pb-4 backdrop-blur-xs">
        <SiteBrand />

        <div className="flex flex-wrap items-center gap-3">
          {/* Telemetry Indicator */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded border border-neutral-800 bg-neutral-950/70 text-[11px] text-neutral-400">
            <Radio className="h-3 w-3 text-cyan-400 animate-pulse" />
            <span>{telemetryTime}</span>
            <span className="text-neutral-600">|</span>
            <span className="text-amber-400/90">{randomFrequency} MHz</span>
          </div>

          <div className="relative">
            <ViewSwitcher view="multiverse" onChange={onChangeView} highlightList={showIndexHint} />

            {/* Hint pointing visitors who'd rather skip the 3D view to the List View button */}
            {showIndexHint && (
              <div
                role="status"
                data-ui-element="true"
                className="pointer-events-auto absolute left-0 md:left-auto md:right-0 top-full z-30 mt-4 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-cyan-500/60 bg-neutral-950/95 p-5 shadow-[0_0_30px_rgba(6,182,212,0.25)] backdrop-blur animate-fade-in"
              >
                {/* Pointer notch aimed at the List View button */}
                <div className="absolute -top-2 left-[164px] md:left-auto md:right-[52px] h-4 w-4 rotate-45 border-l border-t border-cyan-500/60 bg-neutral-950" />

                <button
                  onClick={dismissIndexHint}
                  aria-label="Dismiss"
                  className="absolute right-2 top-2 rounded p-1.5 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-200"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="flex items-start gap-3 pr-6">
                  <ArrowUp className="mt-0.5 h-6 w-6 shrink-0 text-cyan-300" />
                  <div>
                    <p className="font-chakra text-base font-bold text-white">Don't want the 3D view?</p>
                    <p className="font-chakra mt-1 text-sm text-neutral-300">
                      Switch to List View to see every project in a simple list, no animation.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onChangeView('index')}
                  className="font-chakra mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-400 bg-cyan-950/60 px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-cyan-200 hover:bg-cyan-900/60"
                >
                  <List className="h-4 w-4" />
                  Open List View
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* HOVER CARD: details for the planet (or dock entry) under the pointer */}
      <div className="flex-1 flex items-center justify-end pointer-events-none md:pr-4">
        {hoveredProject && (() => {
          // Tint the card with this planet's own colours so each project feels distinct
          const main = hoveredProject.themeColor;
          const accent = hoveredProject.sphere.colorTertiary;
          // Lightened versions for text, so even dark planet colours stay readable
          const mainText = `color-mix(in srgb, ${main} 55%, white)`;
          const accentText = `color-mix(in srgb, ${accent} 55%, white)`;
          return (
            <div
              key={hoveredProject.id}
              data-ui-element="true"
              onClick={() => onSelectProject(hoveredProject)}
              onMouseEnter={() => onHoverProject(hoveredProject)}
              onMouseLeave={() => onHoverProject(null)}
              className={`hidden md:block relative overflow-hidden pointer-events-auto max-w-sm w-full p-5 rounded-xl border-2 backdrop-blur-md animate-fade-in ${
                hoveredProject.url ? 'cursor-pointer' : ''
              }`}
              style={{
                borderColor: `${main}cc`,
                background: `linear-gradient(135deg, ${main}40 0%, rgba(10,10,12,0.92) 45%, ${accent}30 100%)`,
                boxShadow: `0 0 36px ${main}55, 0 8px 32px rgba(0,0,0,0.8)`,
              }}
            >
              {/* Accent bar along the top edge */}
              <div
                className="absolute inset-x-0 top-0 h-1.5"
                style={{ background: `linear-gradient(90deg, ${main}, ${accent})` }}
              />

              <div className="flex items-start gap-3">
                <span
                  className="font-orbitron flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-2xl font-black text-black"
                  style={{ background: `linear-gradient(135deg, ${main}, ${accent})` }}
                >
                  {hoveredNumber}
                </span>
                <div className="min-w-0">
                  <h2 className="font-chakra text-lg font-bold leading-snug text-white">{hoveredProject.subtitle}</h2>
                  <p className="font-chakra mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: accentText }}>
                    {hoveredProject.wizardOwner.avatarRune} {hoveredProject.wizardOwner.name}
                  </p>
                </div>
              </div>

              <span
                className="font-chakra mt-3 inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                style={{ color: mainText, borderColor: `${main}aa`, backgroundColor: `${main}33` }}
              >
                {hoveredProject.sector} · {hoveredProject.year}
              </span>

              <p
                className="mt-3 border-l-[3px] pl-2.5 text-xs italic leading-snug text-neutral-200"
                style={{ borderColor: main }}
              >
                {hoveredProject.observerFigure.quote}
              </p>

              <div
                className="font-chakra mt-4 flex items-center gap-1.5 border-t pt-3 text-xs font-bold uppercase tracking-wider"
                style={{ borderColor: `${main}55` }}
              >
                {hoveredProject.url ? (
                  <span className="flex items-center gap-1.5" style={{ color: accentText }}>
                    Visit project <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                ) : (
                  <span className="text-neutral-400">Link coming soon</span>
                )}
              </div>
            </div>
          );
        })()}
      </div>

      {/* BOTTOM: controls hint, category filter and project quick-select dock */}
      <footer className="border-t border-neutral-800/80 pt-3 flex flex-col gap-2.5 backdrop-blur-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2.5">
          <p className="font-chakra text-[11px] uppercase tracking-wider text-neutral-400">
            {projects.length} projects
            <span className="hidden md:inline"> · Drag to rotate · Scroll to zoom · Click a planet to open it</span>
            <span className="md:hidden"> · Drag to rotate · Tap a planet to open it</span>
          </p>
          <SectorFilter projects={projects} value={sector} onChange={onSectorChange} />
        </div>

        <div className="relative flex items-center pointer-events-auto">
          <button
            onClick={() => scrollDock('left')}
            data-ui-element="true"
            aria-label="Scroll project list left"
            className="hidden sm:flex shrink-0 items-center justify-center w-7 h-8 rounded border border-neutral-800 bg-neutral-950/90 text-neutral-400 hover:text-white hover:border-cyan-400 transition-colors mr-1.5"
          >
            ‹
          </button>

          <div ref={dockScrollRef} className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 w-full">
            {filteredProjects.map((proj) => {
              const number = projects.findIndex((p) => p.id === proj.id) + 1;
              const isHovered = hoveredProject?.id === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => onSelectProject(proj)}
                  onMouseEnter={() => onHoverProject(proj)}
                  onMouseLeave={() => onHoverProject(null)}
                  onFocus={() => onHoverProject(proj)}
                  onBlur={() => onHoverProject(null)}
                  data-ui-element="true"
                  title={`${proj.subtitle} — ${proj.wizardOwner.name}`}
                  className={`group shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full border bg-neutral-950/90 transition-colors text-xs ${
                    isHovered ? 'border-cyan-400 text-white' : 'border-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: proj.themeColor }} />
                  <span className="font-orbitron text-[10px] font-bold text-neutral-400 group-hover:text-cyan-400">
                    {number}
                  </span>
                  <span className="font-chakra text-[11px] tracking-wider uppercase font-semibold whitespace-nowrap">
                    {proj.wizardOwner.name}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => scrollDock('right')}
            data-ui-element="true"
            aria-label="Scroll project list right"
            className="hidden sm:flex shrink-0 items-center justify-center w-7 h-8 rounded border border-neutral-800 bg-neutral-950/90 text-neutral-400 hover:text-white hover:border-cyan-400 transition-colors ml-1.5"
          >
            ›
          </button>
        </div>
      </footer>
    </div>
  );
};

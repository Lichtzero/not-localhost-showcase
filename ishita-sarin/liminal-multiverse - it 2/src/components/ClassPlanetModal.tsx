import React, { useEffect, useMemo, useState } from 'react';
import {
  X,
  ExternalLink,
  GitCommit,
  Clock,
  ChevronLeft,
  ChevronRight,
  Github,
  FileCode2,
  Moon,
  Loader2,
} from 'lucide-react';
import type { ProjectWorld } from '../data/projects';
import { KIND_LABEL, resolveAsset, timeAgo } from '../data/classPlanets';
import type { ClassIteration } from '../data/classPlanets';
import { sound } from '../utils/audio';

interface ClassPlanetModalProps {
  project: ProjectWorld;
  onClose: () => void;
  onNextProject: () => void;
  onPrevProject: () => void;
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export const ClassPlanetModal: React.FC<ClassPlanetModalProps> = ({ project, onClose, onNextProject, onPrevProject }) => {
  const person = project.classEntry!;
  const color = project.themeColor;

  // Which iteration is being previewed. Always starts on the latest one.
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSelected(0);
  }, [person.slug]);

  const iteration: ClassIteration | null = person.iterations[selected] ?? null;
  const previewSrc = iteration?.previewUrl ? resolveAsset(iteration.previewUrl) : null;

  // Some browsers never fire onLoad for PDFs, so don't leave the spinner up forever.
  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 4000);
    return () => window.clearTimeout(t);
  }, [previewSrc]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && e.altKey) onNextProject();
      if (e.key === 'ArrowLeft' && e.altKey) onPrevProject();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onNextProject, onPrevProject]);

  // Headline = the commit behind the latest piece of work; dormant folders fall back to any activity.
  const latestCommit = person.latest?.commit ?? person.activity[0] ?? null;
  const isFresh = useMemo(
    () => !!person.updatedAt && Date.now() - new Date(person.updatedAt).getTime() < 48 * 3600 * 1000,
    [person.updatedAt],
  );

  return (
    <div
      data-ui-element="true"
      className="absolute inset-0 z-30 flex flex-col lg:flex-row bg-[#03030a]/95 backdrop-blur-md text-neutral-100"
      role="dialog"
      aria-label={`${person.name} — project preview`}
    >
      {/* ---------------------------------------------------------- SIDEBAR */}
      <aside className="lg:w-[360px] shrink-0 max-h-[42vh] lg:max-h-none overflow-y-auto border-b lg:border-b-0 lg:border-r border-neutral-800/80 p-5 flex flex-col gap-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-orbitron text-[10px] tracking-[0.25em] text-neutral-500">{project.code}</div>
            <h2 className="font-orbitron text-2xl font-bold mt-1 leading-tight" style={{ color, textShadow: `0 0 18px ${color}66` }}>
              {person.name}
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playExitWarp();
              onClose();
            }}
            className="p-2 rounded border border-neutral-800 text-neutral-400 hover:text-white hover:border-cyan-400 transition-all"
            title="Back to the multiverse (Esc)"
          >
            <X size={16} />
          </button>
        </div>

        {/* LATEST UPDATE */}
        <section className="rounded-lg border p-3.5" style={{ borderColor: `${color}55`, background: `${color}0d` }}>
          <div className="flex items-center gap-2 font-chakra text-[11px] tracking-[0.2em] uppercase font-semibold" style={{ color }}>
            <Clock size={12} />
            {person.latest ? 'Latest update' : 'Last activity'}
            {isFresh && (
              <span className="ml-auto px-1.5 py-0.5 rounded text-[9px] bg-emerald-400/15 text-emerald-300 border border-emerald-400/40">NEW</span>
            )}
          </div>
          {latestCommit ? (
            <>
              <div className="mt-2 font-orbitron text-lg text-white">{timeAgo(latestCommit.date)}</div>
              <div className="text-[11px] text-neutral-500">{fmtDate(latestCommit.date)}</div>
              <div className="mt-2.5 flex items-start gap-2 text-[12px] text-neutral-300">
                <GitCommit size={13} className="mt-0.5 shrink-0 text-neutral-500" />
                <span className="leading-snug">“{latestCommit.subject}”</span>
              </div>
              <div className="mt-1 text-[10px] text-neutral-500 pl-5">
                {latestCommit.author} · {latestCommit.sha}
              </div>
            </>
          ) : (
            <p className="mt-2 text-[12px] text-neutral-400">Nothing pushed yet.</p>
          )}
        </section>

        {/* PROJECT */}
        {iteration && (
          <section>
            <div className="flex items-center gap-2">
              <span
                className="px-1.5 py-0.5 rounded text-[9px] font-chakra tracking-widest font-semibold border"
                style={{ color, borderColor: `${color}66` }}
              >
                {KIND_LABEL[iteration.kind]}
              </span>
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider">{iteration.label}</span>
            </div>
            <h3 className="mt-2 font-syne text-lg font-bold leading-snug">{iteration.title}</h3>
            {iteration.description && <p className="mt-1.5 text-[12px] leading-relaxed text-neutral-400">{iteration.description}</p>}
          </section>
        )}

        {/* ITERATIONS */}
        {person.iterations.length > 1 && (
          <section>
            <div className="font-chakra text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-2">
              Iterations ({person.iterations.length})
            </div>
            <div className="flex flex-col gap-1.5">
              {person.iterations.map((it, i) => (
                <button
                  key={it.githubUrl}
                  onClick={() => {
                    sound.playHoverPing();
                    setSelected(i);
                  }}
                  className={`flex items-center justify-between gap-3 text-left px-3 py-2 rounded border text-[11px] transition-all ${
                    i === selected
                      ? 'bg-white/5 text-white'
                      : 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600'
                  }`}
                  style={i === selected ? { borderColor: color } : undefined}
                >
                  <span className="truncate">
                    {it.label}
                    {i === 0 && <span className="ml-2 text-[9px] text-emerald-300">LATEST</span>}
                  </span>
                  <span className="shrink-0 text-neutral-500">{timeAgo(it.commit?.date)}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ACTIVITY */}
        {person.activity.length > 1 && (
          <section>
            <div className="font-chakra text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-2">Recent activity</div>
            <ul className="flex flex-col gap-1.5">
              {person.activity.slice(0, 5).map((c) => (
                <li key={c.sha} className="text-[11px] text-neutral-400 flex gap-2">
                  <span className="text-neutral-600 shrink-0">{timeAgo(c.date)}</span>
                  <span className="truncate" title={c.subject}>{c.subject}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ACTIONS */}
        <div className="mt-auto flex flex-col gap-2">
          {previewSrc && (
            <a
              href={previewSrc}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-3 py-2 rounded border text-[11px] font-chakra tracking-wider uppercase font-semibold transition-all hover:bg-white/5"
              style={{ borderColor: color, color }}
            >
              <ExternalLink size={13} /> Open full page
            </a>
          )}
          <a
            href={iteration?.githubUrl ?? person.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 px-3 py-2 rounded border border-neutral-800 text-[11px] font-chakra tracking-wider uppercase font-semibold text-neutral-300 hover:text-white hover:border-neutral-500 transition-all"
          >
            <Github size={13} /> View on GitHub
          </a>
          <div className="flex gap-2 pt-1">
            <button
              onClick={onPrevProject}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded border border-neutral-800 text-[11px] text-neutral-400 hover:text-white hover:border-cyan-400 transition-all"
              title="Previous planet (Alt+←)"
            >
              <ChevronLeft size={14} /> Prev planet
            </button>
            <button
              onClick={onNextProject}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded border border-neutral-800 text-[11px] text-neutral-400 hover:text-white hover:border-cyan-400 transition-all"
              title="Next planet (Alt+→)"
            >
              Next planet <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* ---------------------------------------------------------- PREVIEW */}
      <main className="relative flex-1 min-h-0 bg-black">
        {/* live page / app / pdf */}
        {previewSrc && iteration && (
          <>
            <iframe
              key={previewSrc}
              src={previewSrc}
              title={`${person.name} — ${iteration.title}`}
              className="absolute inset-0 w-full h-full border-0 bg-white"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-pointer-lock"
              allow="fullscreen"
              onLoad={() => setLoading(false)}
            />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#03030a] text-neutral-400 gap-2 text-xs font-chakra tracking-widest uppercase">
                <Loader2 size={16} className="animate-spin" /> Tuning into {person.name}…
              </div>
            )}
          </>
        )}

        {/* source only */}
        {!previewSrc && iteration && (
          <div className="absolute inset-0 overflow-y-auto p-8 flex items-center justify-center">
            <div className="max-w-xl w-full">
              {iteration.thumbnail && (
                <img
                  src={resolveAsset(iteration.thumbnail)}
                  alt=""
                  className="w-full max-h-72 object-cover rounded-lg border border-neutral-800 mb-6"
                />
              )}
              <div className="flex items-center gap-2 font-chakra text-[11px] tracking-[0.2em] uppercase text-neutral-500">
                <FileCode2 size={14} /> No live preview for this project
              </div>
              <h3 className="mt-2 font-syne text-2xl font-bold">{iteration.title}</h3>
              {iteration.note && <p className="mt-2 text-[12px] text-amber-300/80">{iteration.note}</p>}
              <p className="mt-3 text-[12px] text-neutral-400">
                This one is code that needs to be run on a computer, so it can’t be shown in the browser. Here is what’s inside:
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-neutral-300">
                {iteration.files.map((f) => (
                  <li key={f} className="truncate" title={f}>· {f}</li>
                ))}
              </ul>
              {iteration.fileCount > iteration.files.length && (
                <p className="mt-2 text-[11px] text-neutral-500">…and {iteration.fileCount - iteration.files.length} more files</p>
              )}
            </div>
          </div>
        )}

        {/* dormant */}
        {!iteration && (
          <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
            <div className="max-w-md">
              <Moon size={36} className="mx-auto text-neutral-600" />
              <h3 className="mt-4 font-orbitron text-xl tracking-wider text-neutral-300">AWAITING FIRST TRANSMISSION</h3>
              <p className="mt-3 text-[12px] leading-relaxed text-neutral-500">
                {person.name} hasn’t pushed any work yet. As soon as something lands in{' '}
                <code className="text-neutral-300">{person.slug}/task-01/iteration-01/</code> this planet wakes up with a live
                preview.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

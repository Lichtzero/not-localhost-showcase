import React from "react";
import { StudentProject } from "@/data/types";

interface BookCoverProps {
  project: StudentProject;
  size?: "standard" | "large";
}

export function BookCover({ project, size = "standard" }: BookCoverProps) {
  const { coverStyle, projectTitle, studentName, number, category, year } = project;

  // Render distinct layout styles based on project cover specification
  const renderLayoutContent = () => {
    switch (coverStyle.layoutType) {
      case "editorial-split":
        return (
          <div className="h-full flex flex-col justify-between p-5 bg-[#f5efe6] text-stone-900 border-l border-white/40">
            <div className="flex justify-between items-start border-b border-stone-800/15 pb-3">
              <span className="font-mono text-[10px] tracking-wider uppercase text-amber-800 font-semibold">
                {coverStyle.badgeText}
              </span>
              <span className="font-mono text-xs font-bold text-stone-700">{year}</span>
            </div>

            <div className="my-auto space-y-3">
              <div className="w-10 h-10 rounded-full border border-orange-600/40 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-orange-600"></div>
              </div>
              <h3 className="font-serif text-2xl font-normal tracking-tight text-stone-900 leading-tight">
                {projectTitle}
              </h3>
              <p className="font-sans text-[11px] text-stone-600 line-clamp-2">
                {project.subtitle}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-800/15 flex justify-between items-end">
              <div>
                <p className="text-[9px] font-mono uppercase tracking-wider text-stone-500">Author</p>
                <p className="text-xs font-medium text-stone-900">{studentName}</p>
              </div>
              <span className="font-mono text-xs font-bold text-orange-700">№ {number}</span>
            </div>
          </div>
        );

      case "monochrome-brutalist":
        return (
          <div className="h-full flex flex-col justify-between p-5 bg-[#090a0f] text-emerald-400 font-mono border-l-2 border-emerald-500/40">
            <div className="flex justify-between items-center text-[10px] border-b border-emerald-500/30 pb-2">
              <span className="animate-pulse flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                TTY.SESSION
              </span>
              <span className="text-emerald-500/80">0x{number}</span>
            </div>

            <div className="my-auto py-2 space-y-2">
              <div className="text-[9px] text-emerald-500/70 leading-none select-none overflow-hidden h-14 opacity-80">
                +---+---+---+---+<br />
                | S | Y | N | X |<br />
                | A | S | C | I |<br />
                +---+---+---+---+
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white font-mono leading-tight">
                {projectTitle}
              </h3>
              <p className="text-[10px] text-emerald-300/80 font-mono">
                {project.subtitle}
              </p>
            </div>

            <div className="pt-2 border-t border-emerald-500/30 text-[10px] flex justify-between items-center">
              <span className="text-stone-300 font-sans">{studentName}</span>
              <span className="bg-emerald-950 px-1.5 py-0.5 rounded text-emerald-300 text-[9px] border border-emerald-500/30">
                STK//{number}
              </span>
            </div>
          </div>
        );

      case "blueprint-lines":
        return (
          <div className="h-full flex flex-col justify-between p-5 bg-[#0b2447] text-sky-100 relative overflow-hidden border-l border-sky-400/30">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf815_1px,transparent_1px),linear-gradient(to_bottom,#38bdf815_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            <div className="relative z-10 flex justify-between items-start border-b border-sky-400/25 pb-2">
              <span className="font-mono text-[10px] text-sky-300">{coverStyle.badgeText}</span>
              <span className="font-mono text-[10px] text-sky-400">R: {number}/15</span>
            </div>

            <div className="relative z-10 my-auto space-y-2.5">
              <div className="w-12 h-12 border border-sky-400/50 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-sky-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="9" strokeWidth="1.2" strokeDasharray="3 2" />
                  <line x1="12" y1="3" x2="12" y2="21" strokeWidth="1.2" />
                  <line x1="3" y1="12" x2="21" y2="12" strokeWidth="1.2" />
                </svg>
              </div>
              <h3 className="font-sans font-bold text-xl text-white tracking-tight leading-tight">
                {projectTitle}
              </h3>
              <p className="text-[11px] text-sky-200/80 leading-snug">
                {project.subtitle}
              </p>
            </div>

            <div className="relative z-10 pt-2.5 border-t border-sky-400/25 flex justify-between items-center text-xs">
              <span className="font-medium text-white">{studentName}</span>
              <span className="font-mono text-[10px] text-sky-300">GEO_SYS</span>
            </div>
          </div>
        );

      case "swiss-grid":
        return (
          <div className="h-full flex flex-col justify-between p-5 bg-[#c81e3d] text-white border-l border-white/20">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-black tracking-widest bg-white text-rose-700 px-1.5 py-0.5">
                {number}
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase opacity-80">{category}</span>
            </div>

            <div className="my-auto space-y-2">
              <h3 className="font-sans text-3xl font-black uppercase tracking-tighter leading-none text-white">
                {projectTitle.split(":")[0]}
              </h3>
              <p className="text-xs font-medium text-amber-200 uppercase tracking-wider">
                {projectTitle.split(":")[1] || project.subtitle}
              </p>
            </div>

            <div className="pt-3 border-t border-white/30 flex justify-between items-end">
              <span className="font-sans text-xs font-semibold">{studentName}</span>
              <span className="font-mono text-[10px] opacity-75">{year}</span>
            </div>
          </div>
        );

      case "generative-mesh":
        return (
          <div className="h-full flex flex-col justify-between p-5 bg-[#032018] text-emerald-100 border-l border-emerald-400/20 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-emerald-500/15 blur-xl pointer-events-none" />

            <div className="flex justify-between items-center text-[10px] font-mono text-emerald-400/80 border-b border-emerald-500/20 pb-2">
              <span>{coverStyle.badgeText}</span>
              <span>GROWTH_0{number}</span>
            </div>

            <div className="my-auto space-y-3 relative z-10">
              <div className="w-14 h-14 rounded-full border border-emerald-400/40 flex items-center justify-center p-2">
                <svg className="w-full h-full text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" strokeWidth="1.2" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-normal text-emerald-50 tracking-tight leading-tight">
                {projectTitle}
              </h3>
              <p className="text-[11px] text-emerald-200/80 line-clamp-2">
                {project.subtitle}
              </p>
            </div>

            <div className="pt-2 border-t border-emerald-500/20 flex justify-between items-center text-xs">
              <span className="text-emerald-100 font-medium">{studentName}</span>
              <span className="font-mono text-[10px] text-emerald-400">BIO_GLYPH</span>
            </div>
          </div>
        );

      case "sonic-bands":
        return (
          <div className="h-full flex flex-col justify-between p-5 bg-[#250e38] text-purple-100 border-l border-purple-400/30">
            <div className="flex justify-between items-center text-[10px] font-mono text-purple-300">
              <span>{coverStyle.badgeText}</span>
              <span className="bg-purple-900/80 px-2 py-0.5 rounded-full border border-purple-500/40">
                ACOUSTIC
              </span>
            </div>

            <div className="my-auto space-y-3">
              {/* Audio frequency wave simulation */}
              <div className="flex items-center gap-1 h-8 opacity-80">
                {[4, 12, 24, 16, 32, 20, 8, 28, 14, 22, 10, 18].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}px` }}
                    className="w-1.5 rounded-full bg-gradient-to-t from-purple-500 to-pink-300"
                  />
                ))}
              </div>
              <h3 className="font-sans font-bold text-xl text-white tracking-tight leading-tight">
                {projectTitle}
              </h3>
              <p className="text-[11px] text-purple-200/80 leading-snug">
                {project.subtitle}
              </p>
            </div>

            <div className="pt-2.5 border-t border-purple-500/30 flex justify-between items-center text-xs">
              <span className="font-medium text-white">{studentName}</span>
              <span className="font-mono text-[10px] text-purple-300">FOLIO.{number}</span>
            </div>
          </div>
        );

      case "abstract-cutout":
        return (
          <div className="h-full flex flex-col justify-between p-5 bg-[#171717] text-stone-100 border-l border-amber-500/30 relative">
            <div className="flex justify-between items-start">
              <span className="font-mono text-[10px] bg-amber-500 text-stone-950 font-bold px-2 py-0.5 rounded">
                № {number}
              </span>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">{year}</span>
            </div>

            <div className="my-auto space-y-3">
              <div className="w-12 h-12 bg-amber-500/10 border-2 border-dashed border-amber-400/50 rounded flex items-center justify-center">
                <div className="w-5 h-5 bg-amber-400 rotate-45" />
              </div>
              <h3 className="font-serif text-2xl text-stone-50 leading-tight">
                {projectTitle}
              </h3>
              <p className="text-[11px] text-stone-400">
                {project.subtitle}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-800 flex justify-between items-center text-xs">
              <span className="font-sans text-stone-200 font-medium">{studentName}</span>
              <span className="font-mono text-[10px] text-amber-400">CIRCULAR</span>
            </div>
          </div>
        );

      case "tactile-diagram":
        return (
          <div className="h-full flex flex-col justify-between p-5 bg-[#9a3412] text-amber-50 border-l border-amber-300/30">
            <div className="flex justify-between items-center text-[10px] font-mono border-b border-amber-400/30 pb-2">
              <span className="font-bold text-amber-200">{coverStyle.badgeText}</span>
              <span>{category}</span>
            </div>

            <div className="my-auto space-y-2.5">
              <div className="p-2 border border-amber-300/40 rounded bg-black/15 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-300"></span>
                <span className="text-[10px] font-mono text-amber-200">CIVIC_NETWORK_INTERFACE</span>
              </div>
              <h3 className="font-sans text-xl font-bold text-white tracking-tight leading-tight">
                {projectTitle}
              </h3>
              <p className="text-[11px] text-amber-100/80 leading-snug">
                {project.subtitle}
              </p>
            </div>

            <div className="pt-2 border-t border-amber-400/30 flex justify-between items-center text-xs">
              <span className="font-medium text-white">{studentName}</span>
              <span className="font-mono text-[10px] text-amber-200">PUB.{number}</span>
            </div>
          </div>
        );

      case "kinetic-waves":
        return (
          <div className="h-full flex flex-col justify-between p-5 bg-[#0f172a] text-cyan-50 border-l border-cyan-400/40 relative">
            <div className="flex justify-between items-center text-[10px] font-mono text-cyan-300 border-b border-cyan-500/25 pb-2">
              <span className="font-semibold text-cyan-200">{coverStyle.badgeText}</span>
              <span>GIT_COLLAB</span>
            </div>

            <div className="my-auto space-y-3">
              <div className="space-y-1">
                <div className="h-1 bg-cyan-400 w-3/4 rounded-full"></div>
                <div className="h-1 bg-blue-500 w-full rounded-full"></div>
                <div className="h-1 bg-indigo-500 w-1/2 rounded-full"></div>
              </div>
              <h3 className="font-serif text-2xl text-white tracking-tight leading-tight">
                {projectTitle}
              </h3>
              <p className="text-[11px] text-cyan-200/80">
                {project.subtitle}
              </p>
            </div>

            <div className="pt-2.5 border-t border-cyan-500/25 flex justify-between items-center text-xs">
              <span className="font-medium text-white">{studentName}</span>
              <span className="font-mono text-[10px] text-cyan-300">COHORT.{number}</span>
            </div>
          </div>
        );

      case "minimal-typographic":
        return (
          <div className="h-full flex flex-col justify-between p-5 bg-[#eab308] text-stone-950 border-l border-white/40">
            <div className="flex justify-between items-start">
              <span className="font-serif text-3xl font-bold leading-none text-stone-900">{number}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-800 font-semibold">{year}</span>
            </div>

            <div className="my-auto space-y-2">
              <h3 className="font-serif text-2xl font-bold tracking-tight text-stone-950 leading-tight">
                {projectTitle}
              </h3>
              <div className="w-12 h-0.5 bg-stone-950 my-2"></div>
              <p className="font-sans text-[11px] text-stone-800 font-medium">
                {project.subtitle}
              </p>
            </div>

            <div className="pt-2 border-t border-stone-950/20 flex justify-between items-center text-xs">
              <span className="font-bold text-stone-950">{studentName}</span>
              <span className="font-mono text-[10px] text-stone-800">MONO.P</span>
            </div>
          </div>
        );

      case "solar-glow":
        return (
          <div className="h-full flex flex-col justify-between p-5 bg-[#042f2e] text-teal-100 border-l border-teal-400/30 relative">
            <div className="flex justify-between items-center text-[10px] font-mono text-teal-300">
              <span>{coverStyle.badgeText}</span>
              <span className="px-1.5 py-0.5 rounded bg-teal-900 border border-teal-400/40 text-teal-200">
                CALM_UI
              </span>
            </div>

            <div className="my-auto space-y-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-200 shadow-lg shadow-teal-500/20" />
              <h3 className="font-serif text-2xl text-white tracking-tight leading-tight">
                {projectTitle}
              </h3>
              <p className="text-[11px] text-teal-200/80">
                {project.subtitle}
              </p>
            </div>

            <div className="pt-2.5 border-t border-teal-400/25 flex justify-between items-center text-xs">
              <span className="font-medium text-white">{studentName}</span>
              <span className="font-mono text-[10px] text-teal-300">№ {number}</span>
            </div>
          </div>
        );

      case "origami-fold":
        return (
          <div className="h-full flex flex-col justify-between p-5 bg-[#e7e5e4] text-stone-900 border-l border-stone-400/40">
            <div className="flex justify-between items-center text-[10px] font-mono border-b border-stone-300 pb-2">
              <span className="font-bold text-stone-800">{coverStyle.badgeText}</span>
              <span className="text-stone-500">PAPER_CIRC</span>
            </div>

            <div className="my-auto space-y-3">
              <div className="w-12 h-12 border-2 border-stone-800 flex items-center justify-center rotate-12">
                <div className="w-6 h-6 border border-stone-800 rotate-45" />
              </div>
              <h3 className="font-sans font-black text-xl text-stone-950 tracking-tight leading-tight">
                {projectTitle}
              </h3>
              <p className="text-[11px] text-stone-600 font-sans">
                {project.subtitle}
              </p>
            </div>

            <div className="pt-2.5 border-t border-stone-300 flex justify-between items-center text-xs">
              <span className="font-semibold text-stone-900">{studentName}</span>
              <span className="font-mono text-[10px] text-stone-700">№ {number}</span>
            </div>
          </div>
        );

      case "botanical-glyph":
        return (
          <div className="h-full flex flex-col justify-between p-5 bg-[#075985] text-sky-50 border-l border-sky-300/40">
            <div className="flex justify-between items-center text-[10px] font-mono border-b border-sky-400/30 pb-2">
              <span className="font-bold text-sky-200">{coverStyle.badgeText}</span>
              <span>2060_CLIMATE</span>
            </div>

            <div className="my-auto space-y-3">
              <div className="w-10 h-10 rounded-full border border-sky-300/50 flex items-center justify-center">
                <svg className="w-6 h-6 text-sky-200" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12" strokeWidth="1.5" />
                  <path d="M12 6V12L16 14" strokeWidth="1.5" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-white tracking-tight leading-tight">
                {projectTitle}
              </h3>
              <p className="text-[11px] text-sky-100/80">
                {project.subtitle}
              </p>
            </div>

            <div className="pt-2 border-t border-sky-400/30 flex justify-between items-center text-xs">
              <span className="font-medium text-white">{studentName}</span>
              <span className="font-mono text-[10px] text-sky-200">ARCH.{number}</span>
            </div>
          </div>
        );

      case "archival-stamp":
        return (
          <div className="h-full flex flex-col justify-between p-5 bg-[#78350f] text-amber-50 border-l border-amber-400/40">
            <div className="flex justify-between items-start">
              <span className="font-mono text-[10px] border border-amber-300/40 px-2 py-0.5 rounded text-amber-200">
                {coverStyle.badgeText}
              </span>
              <span className="font-mono text-xs font-bold text-amber-300">{year}</span>
            </div>

            <div className="my-auto space-y-2.5">
              <div className="w-10 h-10 rounded-full border border-dashed border-amber-300/50 flex items-center justify-center text-xs font-mono font-bold text-amber-200">
                {number}
              </div>
              <h3 className="font-serif text-2xl text-white tracking-tight leading-tight">
                {projectTitle}
              </h3>
              <p className="text-[11px] text-amber-100/80">
                {project.subtitle}
              </p>
            </div>

            <div className="pt-2.5 border-t border-amber-400/30 flex justify-between items-center text-xs">
              <span className="font-medium text-white">{studentName}</span>
              <span className="font-mono text-[10px] text-amber-200">ANTHRO</span>
            </div>
          </div>
        );

      case "playful-duotone":
      default:
        return (
          <div className="h-full flex flex-col justify-between p-5 bg-[#581c87] text-fuchsia-50 border-l border-fuchsia-400/40">
            <div className="flex justify-between items-center text-[10px] font-mono text-fuchsia-200 border-b border-fuchsia-400/30 pb-2">
              <span className="font-bold">{coverStyle.badgeText}</span>
              <span>BINDING_0{number}</span>
            </div>

            <div className="my-auto space-y-3">
              <div className="w-12 h-6 border-b-2 border-r-2 border-fuchsia-300 transform -skew-x-12" />
              <h3 className="font-serif text-2xl text-white tracking-tight leading-tight">
                {projectTitle}
              </h3>
              <p className="text-[11px] text-fuchsia-100/80">
                {project.subtitle}
              </p>
            </div>

            <div className="pt-2 border-t border-fuchsia-400/30 flex justify-between items-center text-xs">
              <span className="font-medium text-white">{studentName}</span>
              <span className="font-mono text-[10px] text-fuchsia-300">№ {number}</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`w-full h-full relative select-none rounded-[3px] overflow-hidden shadow-inner ${
        size === "large" ? "text-base" : "text-sm"
      }`}
    >
      {/* Front cover textured sheen / subtle deboss border */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/10 pointer-events-none z-20" />
      <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/40 via-black/15 to-transparent pointer-events-none z-20" />
      {renderLayoutContent()}
    </div>
  );
}

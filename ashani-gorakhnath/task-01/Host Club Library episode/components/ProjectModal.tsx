"use client";

import React, { useEffect, useCallback } from "react";
import { StudentProject } from "@/data/types";
import { BookCover } from "./BookCover";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  BookOpen,
  Sparkles,
  Lightbulb,
  Cpu,
  Layers,
  Heart,
  Compass
} from "lucide-react";

interface ProjectModalProps {
  project: StudentProject | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function ProjectModal({ project, onClose, onNext, onPrev }: ProjectModalProps) {
  // Handle ESC and Arrow key navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, handleKeyDown]);

  if (!project) return null;

  const { details, coverStyle } = project;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Background click to dismiss */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      {/* Main Modal Folio Container */}
      <div className="relative w-full max-w-5xl bg-[#111317] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Sticky Header Navigation Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#16181f]/95 backdrop-blur-sm z-30">
          <div className="flex items-center gap-3">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: coverStyle.accentColor }}
            />
            <span className="font-mono text-xs text-stone-400">
              VOLUME {project.number} OF 15
            </span>
            <span className="text-white/20">•</span>
            <span className="font-mono text-xs text-rose-400">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Prev / Next controls */}
            <div className="flex items-center gap-1 mr-2 border-r border-white/10 pr-2">
              <button
                onClick={onPrev}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Previous volume (Left Arrow)"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={onNext}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Next volume (Right Arrow)"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
              aria-label="Close project reader (Escape)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-10 space-y-12">
          {/* Top Hero Layout: 3D Book Cover + Project Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Visual Book Artifact */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div
                className="w-[200px] sm:w-[240px] aspect-[1/1.4] rounded-lg shadow-2xl relative border border-white/15 overflow-hidden"
                style={{
                  boxShadow: `0 20px 40px -10px ${coverStyle.spineColor}40`,
                }}
              >
                <BookCover project={project} size="large" />
              </div>
              <div className="mt-4 text-center">
                <span className="text-[11px] font-mono text-stone-400">
                  Artifact № {project.number} • Class Codex
                </span>
              </div>
            </div>

            {/* Right Column: Title, Student Info, Category */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-rose-500/15 text-rose-300 border border-rose-500/30">
                  {project.category}
                </span>
                <span className="px-2.5 py-1 rounded text-xs font-mono text-stone-400 bg-white/5 border border-white/10">
                  Batch {project.year}
                </span>
              </div>

              <h2
                id="project-modal-title"
                className="text-2xl sm:text-4xl font-serif font-normal text-white tracking-tight leading-tight"
              >
                {project.projectTitle}
              </h2>

              <p className="text-base text-stone-300 leading-relaxed font-sans">
                {project.subtitle}
              </p>

              {/* Student Metadata Card */}
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-serif text-lg font-bold text-white shadow-md flex-shrink-0"
                  style={{ backgroundColor: coverStyle.spineColor }}
                >
                  {project.studentName.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white">
                      {project.studentName}
                    </h4>
                    <span className="text-[11px] font-mono text-rose-400">
                      ({project.studentRole})
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 leading-normal">
                    {project.studentBio}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded text-[11px] font-mono text-stone-400 bg-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-white/10" />

          {/* Section: Project Brief & Research Question */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>Project Brief &amp; Research Question</span>
            </div>
            <p className="text-lg sm:text-xl font-serif text-ivory leading-relaxed bg-white/[0.02] p-5 rounded-xl border border-white/5">
              &ldquo;{details.brief}&rdquo;
            </p>
          </div>

          {/* Section: What I Care About (Personal Philosophy) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider">
              <Heart className="w-4 h-4" />
              <span>What I Care About</span>
            </div>
            <p className="text-stone-300 font-sans text-sm sm:text-base leading-relaxed">
              {details.whatICareAbout}
            </p>
          </div>

          {/* Dual Column: Design Process & Experiments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Design Process */}
            <div className="space-y-4 p-5 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Design Process &amp; Key Decisions</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-300">
                {details.designProcess.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="font-mono text-xs text-sky-400 font-bold mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Experiments & Explorations */}
            <div className="space-y-4 p-5 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider">
                <Lightbulb className="w-4 h-4" />
                <span>Experiments &amp; Explorations</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-300">
                {details.experiments.map((exp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <span className="leading-relaxed">{exp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section: Final Outcome & Showcase Media */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Final Outcome &amp; Deliverables</span>
            </div>
            <p className="text-stone-200 font-sans text-sm sm:text-base leading-relaxed">
              {details.finalOutcome}
            </p>

            {/* Media Gallery Frames */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {details.media.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-white/[0.03] border border-white/10 p-4 space-y-3"
                >
                  <div className="w-full aspect-video rounded-lg bg-black/40 border border-white/5 flex flex-col items-center justify-center p-4 text-center">
                    <div
                      className="w-10 h-10 rounded-full mb-2 flex items-center justify-center text-white/90 shadow-md"
                      style={{ backgroundColor: coverStyle.accentColor }}
                    >
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[11px] text-stone-400 uppercase tracking-widest">
                      {item.type} preview
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 font-sans italic leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Reflections & Lessons Learned */}
          <div className="space-y-3 p-5 rounded-xl bg-rose-500/[0.04] border border-rose-500/20">
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>Reflections &amp; Lessons Learned</span>
            </div>
            <p className="text-stone-300 font-sans text-sm sm:text-base leading-relaxed">
              {details.reflections}
            </p>
          </div>

          {/* External Links */}
          {details.externalLinks && details.externalLinks.length > 0 && (
            <div className="pt-2 flex flex-wrap gap-3">
              {details.externalLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-colors"
                >
                  {link.type === "github" ? (
                    <Github className="w-3.5 h-3.5" />
                  ) : (
                    <ExternalLink className="w-3.5 h-3.5" />
                  )}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom Pagination Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#16181f] flex items-center justify-between text-xs font-mono text-stone-400">
          <span>Use &larr; &rarr; arrow keys or buttons to browse volumes</span>
          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white font-medium"
          >
            Close folio [Esc]
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { BookOpen, Compass, Sparkles, GitBranch } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#0d0e12]/60 relative">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-rose-500 font-mono text-xs uppercase tracking-widest">
            <Compass className="w-4 h-4" />
            <span>Studio Manifesto</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-tight">
            A Collective Library of 15 Worlds.
          </h2>
        </div>

        {/* Editorial Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-stone-300 font-sans text-base sm:text-lg leading-relaxed">
          <div className="md:col-span-7 space-y-6">
            <p className="font-serif text-xl sm:text-2xl text-ivory leading-snug">
              Design education is not about producing identical portfolio cases
              for corporate recruitment. It is about daring to inhabit questions
              that do not yet have standardized answers.
            </p>
            <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
              This digital library represents the culmination of a collaborative
              studio semester at Srishti Manipal Institute of Art, Design and Technology.
              Rather than scattering our projects across individual personal websites,
              we chose to build one shared shelf — an experimental digital bookshop
              where each student has bound their inquiries into a distinct physical codex.
            </p>
            <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
              Here, the book is the interface. Turning a page is navigation. And each
              volume documents not only the polished final outcome, but the discarded
              sketches, the late-night doubts, the material friction, and the human
              commitments behind the work.
            </p>
          </div>

          <div className="md:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
                <GitBranch className="w-4 h-4" />
                <span>Open-Source Publishing</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                Every line of this website, including its structured data and
                3D book mechanics, lives publicly on GitHub. Classmates contribute
                updates, imagery, and process reflections through collaborative
                pull requests.
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-stone-400">
                <span>Next.js • Tailwind • 3D CSS</span>
                <span className="text-rose-400">Public Domain / CC-BY</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Pedagogical Intent</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                &ldquo;We learn faster in motion than in meditation. The first act of design
                is not to plan, but to begin.&rdquo;
              </p>
              <span className="block text-[11px] font-mono text-stone-400">
                — Studio Cohort Charter
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

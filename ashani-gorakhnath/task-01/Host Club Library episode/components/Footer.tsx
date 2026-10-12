import React from "react";
import Image from "next/image";
import { Github, Heart, BookOpen, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-14 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#090a0d] text-stone-400">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between">
          {/* Left: Branding & University info */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-white/95 inline-block shadow-sm">
                <Image
                  src="/logos/university-logos.png"
                  alt="Srishti Manipal Institute of Art, Design and Technology"
                  width={300}
                  height={42}
                  className="h-7 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-xs text-stone-400 font-sans max-w-md leading-relaxed">
              The Class Project Library is a collaborative digital repository showcasing
              assignments, speculative inquiries, and tactile experiments from the 2026 cohort.
            </p>
          </div>

          {/* Right: GitHub contribution & Links */}
          <div className="md:col-span-6 flex flex-col md:items-end space-y-3">
            <div className="flex items-center gap-4 text-xs font-mono">
              <a
                href="#collection"
                className="text-stone-300 hover:text-white transition-colors"
              >
                Collection
              </a>
              <span className="text-stone-700">•</span>
              <a
                href="#about"
                className="text-stone-300 hover:text-white transition-colors"
              >
                About
              </a>
              <span className="text-stone-700">•</span>
              <a
                href="#contributors"
                className="text-stone-300 hover:text-white transition-colors"
              >
                Contributors
              </a>
              <span className="text-stone-700">•</span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            </div>
            <p className="text-[11px] font-mono text-stone-400">
              Published with Next.js, React &amp; CSS 3D Transforms • Open Source
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-stone-400">
          <p>© 2026 Srishti Manipal Institute of Art, Design &amp; Technology (MAHE)</p>
          <p className="flex items-center gap-1.5">
            Crafted collaboratively by the class cohort with
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}

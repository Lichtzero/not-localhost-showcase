"use client";

import React from "react";
import { ArrowDown, Sparkles, BookOpen, Layers } from "lucide-react";

export function Hero() {
  const scrollToCollection = () => {
    const el = document.getElementById("collection");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-24 sm:pt-28 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 border-b border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-rose-500/10 via-amber-500/5 to-indigo-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Main Typography Column */}
          <div className="lg:col-span-8 space-y-5">
            {/* Context meta label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-stone-300">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              <span>Srishti Manipal Institute of Art, Design &amp; Technology</span>
              <span className="text-white/30">•</span>
              <span className="text-stone-400">Class Library 2026</span>
            </div>

            {/* Exact Required Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-ivory leading-[1.12]">
              Build one site together for the class&apos;s work.
            </h1>

            {/* Exact Required Supporting Text */}
            <div className="space-y-2 text-stone-300 text-base sm:text-lg max-w-2xl font-sans leading-relaxed font-normal">
              <p>
                It should make room for each project, and for the people behind it:
                what we care about, the choices we made, and the interactions we
                wanted to try.
              </p>
              <p className="text-stone-400 text-sm sm:text-base font-mono">
                Everyone contributes through GitHub; the site lives on the public web.
              </p>
            </div>

            {/* Call to action & Quick Metrics */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToCollection}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-rose-950/40 hover:shadow-rose-600/25 hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                <span>Explore the collection</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
              </button>

              <div className="flex items-center gap-3 text-xs font-mono text-stone-400 pl-2">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-stone-500" />
                  15 Custom 3D Volumes
                </span>
                <span className="text-stone-600">•</span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-stone-500" />
                  Tactile Interactive Codex
                </span>
              </div>
            </div>
          </div>

          {/* Right Side Visual Teaser: glimpse of stacked spine preview */}
          <div className="lg:col-span-4 hidden lg:flex flex-col justify-end items-end">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm max-w-xs w-full space-y-2.5 shadow-2xl">
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 border-b border-white/10 pb-2">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Interactive Library</span>
                </span>
                <span className="text-rose-400 font-semibold">15 Authors</span>
              </div>
              <p className="text-xs text-stone-300 font-sans leading-relaxed">
                Hover to tilt each volume in 3D space. Click to lift, inspect
                the physical codex, and read the designer&apos;s full process.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[10px] font-mono text-stone-400">
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">3D Perspective</span>
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">Layered Paper</span>
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">Spines</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

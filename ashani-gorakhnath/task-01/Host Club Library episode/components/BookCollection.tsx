"use client";

import React, { useState, useMemo } from "react";
import { STUDENT_PROJECTS } from "@/data/students";
import { StudentProject } from "@/data/types";
import { Book3D } from "./Book3D";
import { Sparkles, SlidersHorizontal, BookOpen, Layers } from "lucide-react";

interface BookCollectionProps {
  onSelectProject: (project: StudentProject) => void;
}

export function BookCollection({ onSelectProject }: BookCollectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = new Set(STUDENT_PROJECTS.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return STUDENT_PROJECTS;
    return STUDENT_PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Group projects into 3 curated editorial shelves (5 books per shelf)
  const shelves = useMemo(() => {
    if (selectedCategory !== "All") {
      return [filteredProjects];
    }
    const shelf1 = STUDENT_PROJECTS.slice(0, 5);
    const shelf2 = STUDENT_PROJECTS.slice(5, 10);
    const shelf3 = STUDENT_PROJECTS.slice(10, 15);
    return [shelf1, shelf2, shelf3];
  }, [filteredProjects, selectedCategory]);

  return (
    <section id="collection" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header & Interactive Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-rose-500 font-mono text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Spatial Library • 15 Volumes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              The Book Collection
            </h2>
            <p className="text-stone-400 text-sm max-w-xl font-sans">
              Each book is a tactile portal into an individual research journey.
              Hover over any volume to inspect its depth and spine, or click to open the full project.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center flex-wrap gap-1.5">
            <span className="text-xs font-mono text-stone-500 mr-2 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-rose-600 text-white shadow-md shadow-rose-950/40"
                    : "bg-white/5 text-stone-300 hover:bg-white/10 hover:text-white border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop & Tablet: Staggered Editorial Shelves */}
        <div className="space-y-16 sm:space-y-24">
          {shelves.map((shelfProjects, shelfIdx) => (
            <div key={shelfIdx} className="relative">
              {/* Shelf Index Marker */}
              <div className="flex items-center justify-between mb-4 px-2">
                <span className="font-mono text-xs text-stone-500 tracking-wider">
                  SHELF 0{shelfIdx + 1} //{" "}
                  {shelfIdx === 0
                    ? "TACTILE & SPECULATIVE ESSAYS"
                    : shelfIdx === 1
                    ? "SOUND, SYSTEMS & CIVIC INFRASTRUCTURES"
                    : "EDITORIAL EXPERIMENTS & MATERIAL COMPUTING"}
                </span>
                <span className="font-mono text-xs text-stone-600">
                  {shelfProjects.length} VOLUMES
                </span>
              </div>

              {/* Books Shelf Row (Scrollable on mobile, beautiful spatial flex on desktop) */}
              <div className="relative pt-6 pb-12 px-4 sm:px-6 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent border-t border-white/5 overflow-x-auto overflow-y-visible no-scrollbar">
                <div className="flex items-center justify-around gap-6 sm:gap-10 min-w-max lg:min-w-0 mx-auto py-4">
                  {shelfProjects.map((project, idx) => (
                    <Book3D
                      key={project.id}
                      project={project}
                      onSelect={onSelectProject}
                      index={shelfIdx * 5 + idx}
                    />
                  ))}
                </div>

                {/* Physical Wooden/Slate Shelf Plinth at the base of the books */}
                <div className="absolute bottom-6 left-2 right-2 h-3 rounded-sm bg-gradient-to-b from-[#232733] to-[#12141a] shadow-2xl border-t border-white/20">
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-black/60"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="pt-4 text-center">
          <p className="text-xs font-mono text-stone-500">
            Tip: Press [Tab] to navigate through volumes using your keyboard, and press [Enter] to open any project.
          </p>
        </div>
      </div>
    </section>
  );
}

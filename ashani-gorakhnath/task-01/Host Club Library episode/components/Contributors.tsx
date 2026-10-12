"use client";

import React, { useState } from "react";
import { STUDENT_PROJECTS } from "@/data/students";
import { StudentProject } from "@/data/types";
import { Users, ArrowUpRight, Github, BookOpen, Search } from "lucide-react";

interface ContributorsProps {
  onSelectProject: (project: StudentProject) => void;
}

export function Contributors({ onSelectProject }: ContributorsProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContributors = STUDENT_PROJECTS.filter(
    (p) =>
      p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="contributors" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-rose-500 font-mono text-xs uppercase tracking-widest">
              <Users className="w-4 h-4" />
              <span>Cohort Directory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              Class Contributors
            </h2>
            <p className="text-stone-400 text-sm max-w-xl font-sans">
              15 distinct points of view, authored collaboratively through Git.
              Select any contributor to inspect their book and design process.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search author, project, category..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        {/* 15 Contributors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContributors.map((project) => (
            <div
              key={project.id}
              className="group p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              {/* Top row: Avatar + Contributor Name & Role */}
              <div className="flex items-start gap-3.5">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-serif text-sm font-bold text-white shadow-md flex-shrink-0"
                  style={{ backgroundColor: project.coverStyle.spineColor }}
                >
                  {project.studentName.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white group-hover:text-rose-400 transition-colors">
                      {project.studentName}
                    </h3>
                    <span className="font-mono text-[10px] text-stone-400">
                      № {project.number}
                    </span>
                  </div>
                  <p className="text-xs text-rose-300/80 font-mono">
                    {project.studentRole}
                  </p>
                </div>
              </div>

              {/* Middle: Short Bio & Project Title */}
              <div className="space-y-2">
                <p className="text-xs text-stone-300 font-sans leading-relaxed line-clamp-2">
                  {project.studentBio}
                </p>
                <div className="p-2.5 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between">
                  <div className="truncate mr-2">
                    <span className="text-[10px] font-mono text-stone-400 block uppercase">Project</span>
                    <span className="text-xs font-serif text-stone-200 truncate block">
                      {project.projectTitle}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-stone-300 border border-white/10 flex-shrink-0">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => onSelectProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 group-hover:translate-x-0.5 transition-all"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open Volume</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-white p-1 rounded transition-colors"
                  title="View GitHub profile"
                  aria-label={`View ${project.studentName}'s GitHub`}
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

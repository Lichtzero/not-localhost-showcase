"use client";

import React, { useState, useRef, useCallback } from "react";
import { StudentProject } from "@/data/types";
import { BookCover } from "./BookCover";

interface Book3DProps {
  project: StudentProject;
  onSelect: (project: StudentProject) => void;
  index: number;
}

export function Book3D({ project, onSelect, index }: Book3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Default natural rest tilt for organic shelf feeling
  // Stagger slightly by index so the 15 books don't look cloned
  const naturalAngleY = -18 + ((index % 5) - 2) * 2.5;
  const naturalAngleX = 4 + (index % 3) * 1.5;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Small responsive interactive tilt
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    setRotateY(naturalAngleY + deltaX * 16);
    setRotateX(naturalAngleX - deltaY * 12);
  }, [naturalAngleX, naturalAngleY]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(naturalAngleX);
    setRotateY(naturalAngleY);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(project);
    }
  };

  // Dimensions
  const bookWidth = 220; // px
  const bookHeight = 310; // px
  const bookDepth = 26; // px

  const currentRotateX = isHovered ? rotateX : naturalAngleX;
  const currentRotateY = isHovered ? rotateY : naturalAngleY;
  const currentTranslateZ = isHovered ? 45 : 0;
  const currentScale = isHovered ? 1.05 : 1;

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-label={`Open project ${project.projectTitle} by ${project.studentName}`}
      onClick={() => onSelect(project)}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg p-3 transition-transform duration-200"
      style={{ perspective: "1200px" }}
    >
      {/* 3D Book Assembly */}
      <div
        className="relative transition-all duration-300 ease-out preserve-3d"
        style={{
          width: `${bookWidth}px`,
          height: `${bookHeight}px`,
          transform: `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) translateZ(${currentTranslateZ}px) scale(${currentScale})`,
        }}
      >
        {/* Dynamic Contact / Drop Shadow */}
        <div
          className={`absolute inset-0 rounded-lg transition-all duration-300 pointer-events-none -z-10 ${
            isHovered
              ? "book-shadow-hover opacity-90 scale-95 translate-y-7"
              : "book-shadow-ambient opacity-75 scale-90 translate-y-4"
          }`}
        />

        {/* FRONT COVER */}
        <div
          className="absolute inset-0 preserve-3d rounded-r-[3px] rounded-l-[1px] overflow-hidden bg-stone-900 border border-white/10"
          style={{
            transform: `translateZ(${bookDepth / 2}px)`,
            boxShadow: isHovered
              ? "inset 0 0 0 1px rgba(255,255,255,0.2), 0 10px 25px rgba(0,0,0,0.4)"
              : "inset 0 0 0 1px rgba(255,255,255,0.08)",
          }}
        >
          <BookCover project={project} />
        </div>

        {/* BOOK SPINE (Left Side) */}
        <div
          className="absolute top-0 bottom-0 left-0 preserve-3d flex flex-col justify-between items-center py-4 px-1 select-none book-spine-crease border-y border-black/30"
          style={{
            width: `${bookDepth}px`,
            height: `${bookHeight}px`,
            backgroundColor: project.coverStyle.spineColor,
            transform: `translateX(-${bookDepth / 2}px) rotateY(-90deg)`,
            transformOrigin: "center center",
          }}
        >
          {/* Top Spine Number */}
          <span className="font-mono text-[9px] font-bold text-white/90 tracking-tighter">
            {project.number}
          </span>

          {/* Vertical Spine Title */}
          <div
            className="flex-1 flex items-center justify-center overflow-hidden my-2"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            <span className="font-sans text-[10px] font-semibold text-white/95 tracking-wide truncate max-h-[220px]">
              {project.projectTitle.split(":")[0]}
            </span>
          </div>

          {/* Bottom Spine Student Monogram */}
          <span className="font-mono text-[8px] uppercase tracking-widest text-white/70">
            {project.studentName.split(" ").map(n => n[0]).join("")}
          </span>
        </div>

        {/* PAGE BLOCK EDGES (Right Side) */}
        <div
          className="absolute top-0 bottom-0 right-0 preserve-3d book-pages-side"
          style={{
            width: `${bookDepth}px`,
            height: `${bookHeight - 6}px`,
            top: "3px",
            transform: `translateX(${bookDepth / 2 - 3}px) rotateY(90deg)`,
            transformOrigin: "center center",
          }}
        />

        {/* TOP PAGE BLOCK EDGE */}
        <div
          className="absolute left-0 right-0 top-0 preserve-3d book-pages-top"
          style={{
            height: `${bookDepth}px`,
            width: `${bookWidth - 6}px`,
            left: "3px",
            transform: `translateY(-${bookDepth / 2 - 3}px) rotateX(90deg)`,
            transformOrigin: "center center",
          }}
        />

        {/* BOTTOM PAGE BLOCK EDGE */}
        <div
          className="absolute left-0 right-0 bottom-0 preserve-3d book-pages-top"
          style={{
            height: `${bookDepth}px`,
            width: `${bookWidth - 6}px`,
            left: "3px",
            transform: `translateY(${bookDepth / 2 - 3}px) rotateX(-90deg)`,
            transformOrigin: "center center",
          }}
        />

        {/* BACK COVER */}
        <div
          className="absolute inset-0 rounded-l-[3px] rounded-r-[1px] bg-stone-900 border border-white/5"
          style={{
            transform: `translateZ(-${bookDepth / 2}px) rotateY(180deg)`,
          }}
        />
      </div>

      {/* Floating Hover Label underneath */}
      <div
        className={`mt-6 text-center transition-all duration-200 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        }`}
      >
        <p className="font-serif text-sm font-medium text-white truncate max-w-[220px]">
          {project.projectTitle}
        </p>
        <p className="font-mono text-[11px] text-rose-400">
          by {project.studentName}
        </p>
      </div>
    </div>
  );
}

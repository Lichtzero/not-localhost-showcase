"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BookOpen, Menu, X, Github } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0c0d10]/90 backdrop-blur-md border-b border-white/10 shadow-lg py-2.5"
          : "bg-gradient-to-b from-[#0c0d10]/95 via-[#0c0d10]/60 to-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Institutional Logos (Supplied Original Source of Truth) */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="group block relative p-1.5 rounded-lg bg-white/95 hover:bg-white transition-all shadow-sm ring-1 ring-white/20"
              title="Srishti Manipal Institute of Art, Design and Technology | MAHE"
            >
              <Image
                src="/logos/university-logos.png"
                alt="Srishti Manipal Institute of Art, Design and Technology | Manipal Academy of Higher Education"
                width={360}
                height={51}
                priority
                className="h-8 sm:h-9 w-auto object-contain transition-opacity duration-200"
              />
            </a>

            {/* Collaborative Class Tag */}
            <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-white/15">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Class Publication
              </span>
              <span className="text-xs text-stone-400 font-sans">
                15 Student Portfolios
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a
              href="#collection"
              className="text-stone-300 hover:text-white transition-colors duration-200 flex items-center gap-1.5 py-1 text-[13px] tracking-wide"
            >
              <BookOpen className="w-4 h-4 text-rose-500" />
              <span>Collection</span>
            </a>
            <a
              href="#about"
              className="text-stone-300 hover:text-white transition-colors duration-200 py-1 text-[13px] tracking-wide"
            >
              About
            </a>
            <a
              href="#contributors"
              className="text-stone-300 hover:text-white transition-colors duration-200 py-1 text-[13px] tracking-wide"
            >
              Contributors
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono text-stone-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-all"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Contribute</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 text-stone-200 hover:text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-rose-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-3 pb-2 animate-fadeIn">
            <div className="flex items-center gap-2 px-1 text-xs text-stone-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Srishti Manipal • Collaborative Class Library
            </div>
            <a
              href="#collection"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-stone-200 hover:bg-white/5 hover:text-white"
            >
              <BookOpen className="w-4 h-4 text-rose-500" />
              <span>Collection</span>
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm text-stone-200 hover:bg-white/5 hover:text-white"
            >
              About
            </a>
            <a
              href="#contributors"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm text-stone-200 hover:bg-white/5 hover:text-white"
            >
              Contributors
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-mono text-stone-300 bg-white/5 border border-white/10"
            >
              <Github className="w-4 h-4" />
              <span>Contribute via GitHub</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

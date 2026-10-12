import React from 'react';

interface SiteBrandProps {
  // Turn off the decorative motion (used on the animation-free list view)
  still?: boolean;
}

// Logo, site title and tagline — identical on the 3D view and the list view
export const SiteBrand: React.FC<SiteBrandProps> = ({ still = false }) => (
  <div className="flex items-center gap-3.5">
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded border border-cyan-500/50 bg-neutral-950/90 shadow-[0_0_20px_rgba(0,240,255,0.25)]">
      {!still && <div className="absolute h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping opacity-80" />}
      <div className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
      <div
        className={`absolute inset-0 rounded-full border border-cyan-400/40 scale-125 ${
          still ? '' : 'animate-spin [animation-duration:12s]'
        }`}
      />
    </div>

    <div>
      <div className="flex items-center gap-2.5 flex-wrap">
        <h1
          className={`font-orbitron text-lg md:text-2xl font-black tracking-[0.24em] uppercase text-chromatic-multiverse glow-chromatic-multiverse ${
            still ? '[animation:none]' : ''
          }`}
        >
          LIMINAL MULTIVERSE
        </h1>
        <span className="font-chakra text-[10px] px-2 py-0.5 rounded-full border border-emerald-400/50 text-emerald-300 bg-emerald-950/40 font-bold tracking-widest">
          OBSERVATORY 2050
        </span>
      </div>
      <p className="hidden sm:block font-chakra text-[10px] md:text-[11px] text-neutral-400 tracking-[0.16em] uppercase font-medium mt-0.5">
        SPECULATIVE DESIGN COLLECTIVE // SURVEILLANCE • SYNTHETIC COGNITION • UNCANNY FUTURES
      </p>
    </div>
  </div>
);

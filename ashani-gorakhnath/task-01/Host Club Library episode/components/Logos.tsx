import React from "react";

export function SrishtiLogo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Srishti Emblem */}
      <svg
        viewBox="0 0 160 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        aria-label="Srishti Manipal Institute of Art, Design and Technology"
      >
        {/* Red Geometric / Art & Design Crest */}
        <g>
          <rect x="0" y="4" width="40" height="40" rx="6" fill="#e11d48" />
          {/* Stylized S monogram geometric motif */}
          <path
            d="M26 14C23 11 15 11.5 15 17C15 23 27 21 27 28C27 34 18 35 14 31"
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="8" r="2.2" fill="#fef08a" />
          <circle cx="28" cy="36" r="2" fill="#ffffff" opacity="0.8" />
        </g>
        {/* Srishti Typography */}
        <text
          x="48"
          y="20"
          fill="#F5F2EB"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="17"
          letterSpacing="-0.5px"
        >
          SRISHTI
        </text>
        <text
          x="48"
          y="31"
          fill="#e11d48"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="9.5"
          letterSpacing="1px"
        >
          MANIPAL INSTITUTE
        </text>
        <text
          x="48"
          y="41"
          fill="#94A3B8"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="500"
          fontSize="7.5"
          letterSpacing="0.4px"
        >
          OF ART, DESIGN &amp; TECHNOLOGY
        </text>
      </svg>
    </div>
  );
}

export function MaheLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* MAHE Crest */}
      <svg
        viewBox="0 0 140 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        aria-label="Manipal Academy of Higher Education"
      >
        {/* Official MAHE Flame Crest */}
        <g>
          {/* Lamp base */}
          <path
            d="M6 28C6 32 16 35 22 35C28 35 38 32 38 28C38 25 32 23 22 23C12 23 6 25 6 28Z"
            fill="#d97706"
          />
          {/* Flame rising */}
          <path
            d="M22 6C22 6 15 15 17 21C18 24 20 25 22 25C24 25 26 24 27 21C29 15 22 6 22 6Z"
            fill="#ea580c"
          />
          <path
            d="M22 12C22 12 18 17 19 20C20 22 21 22.5 22 22.5C23 22.5 24 22 25 20C26 17 22 12 22 12Z"
            fill="#facc15"
          />
        </g>
        {/* MAHE Typography */}
        <text
          x="45"
          y="18"
          fill="#F5F2EB"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="15"
          letterSpacing="1px"
        >
          MANIPAL
        </text>
        <text
          x="45"
          y="28"
          fill="#cbd5e1"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="600"
          fontSize="7.5"
          letterSpacing="0.6px"
        >
          ACADEMY OF HIGHER EDUCATION
        </text>
        <text
          x="45"
          y="37"
          fill="#64748b"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="400"
          fontSize="6"
          letterSpacing="0.4px"
        >
          (Institution of Eminence)
        </text>
      </svg>
    </div>
  );
}

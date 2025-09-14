import React from "react";

type Props = {
  className?: string;
  height?: number;
  title?: string;
};

export default function PokedexLogo({
  className = "",
  height = 80,
  title = "Pokedex",
}: Props) {
  return (
    <div className={className} style={{ lineHeight: 0 }}>
      <svg
        role="img"
        aria-label={title}
        height={height}
        viewBox="0 0 800 220"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: "visible", display: "block" }}
      >
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#1b3f6b" floodOpacity="0.35" />
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="none" />
        <text
          x="50%"
          y="140"
          textAnchor="middle"
          fontFamily="Impact, 'Arial Black', system-ui, sans-serif"
          fontSize="120"
          fill="#ffcc00"
          stroke="#2a75bb"
          strokeWidth="10"
          paintOrder="stroke fill"
          filter="url(#shadow)"
          style={{ letterSpacing: 4 }}
        >
          POKÉDEX
        </text>
      </svg>
    </div>
  );
}


import React from 'react';

/**
 * Atmospheric Tech Background
 * - Provides subtle depth, structural tech grid, and ambient midnight blooms
 * - Eliminates the pitch-black void while strictly avoiding garish neon
 * - Uses deep sapphire, slate indigo, and midnight cobalt tones
 */
export const CyberBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#07090E]">
      {/* Subtle Tech Grid Layer with smooth perspective fade */}
      <div className="absolute inset-0 cyber-grid-bg opacity-35" />

      {/* Subtle Circuit Matrix Dots */}
      <div className="absolute inset-0 circuit-dots opacity-20" />

      {/* 1. Top Section Ambient Sapphire Bloom (Hero & Marquee area) */}
      <div className="absolute -top-32 -right-32 w-[42rem] h-[42rem] rounded-full bg-blue-900/15 blur-[160px]" />
      <div className="absolute top-24 -left-32 w-[38rem] h-[38rem] rounded-full bg-indigo-900/12 blur-[170px]" />

      {/* 2. Mid Section Ambient Bloom (Events Catalog area) */}
      <div className="absolute top-[35%] -right-40 w-[45rem] h-[45rem] rounded-full bg-blue-800/10 blur-[180px]" />
      <div className="absolute top-[48%] -left-40 w-[42rem] h-[42rem] rounded-full bg-indigo-800/10 blur-[180px]" />

      {/* 3. Lower Section Ambient Bloom (Code of Conduct & Contact area) */}
      <div className="absolute top-[70%] right-[10%] w-[40rem] h-[40rem] rounded-full bg-blue-900/12 blur-[190px]" />
      <div className="absolute -bottom-32 -left-20 w-[44rem] h-[44rem] rounded-full bg-slate-800/20 blur-[180px]" />

      {/* Subtle Vignette Gradient to keep focus centered */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#07090E]/30 to-[#07090E]/70" />

      {/* Ultra-Fine Organic Grain Texture */}
      <div className="grain-overlay" />
    </div>
  );
};

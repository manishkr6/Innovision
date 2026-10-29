import React from 'react';
import { FEST_INFO } from '../../data/events';

export const MarqueeStrip = () => {
  const items = FEST_INFO.marqueeItems;
  const repeated = [...items, ...items, ...items];

  return (
    <div className="relative w-full py-4 overflow-hidden border-y border-white/[0.12] bg-gradient-to-r from-[#090D18]/95 via-[#0C1222]/95 to-[#090D18]/95 backdrop-blur-xl shadow-lg z-20">
      {/* Side gradient fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#07090E] via-[#07090E]/80 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#07090E] via-[#07090E]/80 to-transparent z-10" />

      {/* Top subtle highlight line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/25 to-transparent" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {repeated.map((name, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 px-6 text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-300 hover:text-blue-300 transition-colors select-none"
          >
            <span className="font-semibold whitespace-nowrap">{name}</span>
            <span className="text-blue-400/60 text-[10px]">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
};

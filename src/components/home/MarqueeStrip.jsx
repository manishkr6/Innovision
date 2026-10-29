import React from 'react';
import { FEST_INFO } from '../../data/events';

// Prayer-flag colours cycle through the separators
const dots = ['bg-flag-blue', 'bg-flag-red', 'bg-flag-green', 'bg-flag-yellow'];

export const MarqueeStrip = () => {
  const items = FEST_INFO.marqueeItems;
  const repeated = [...items, ...items];

  return (
    <div className="relative w-full py-4 overflow-hidden bg-marigold-500" aria-hidden="true">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {repeated.map((name, idx) => (
          <div key={idx} className="flex items-center gap-5 px-5 select-none">
            <span className="font-heading text-base sm:text-lg font-bold text-white whitespace-nowrap">{name}</span>
            <span className={`w-2.5 h-2.5 rounded-full ring-2 ring-white/70 ${dots[idx % dots.length]}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

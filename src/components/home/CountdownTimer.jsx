import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { FEST_INFO } from '../../data/events';

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(FEST_INFO.countdownTarget).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const blocks = [
    { label: 'DAYS', value: String(timeLeft.days).padStart(2, '0') },
    { label: 'HOURS', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'MINUTES', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'SECONDS', value: String(timeLeft.seconds).padStart(2, '0') },
  ];

  return (
    <div className="flex flex-col items-center select-none w-full max-w-md xl:max-w-lg mx-auto">
      
      {/* Top Countdown Header */}
      <div className="flex items-center gap-1.5 mb-2.5">
        <Clock className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
        <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-blue-300 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]">
          Fest Commencement Countdown
        </span>
      </div>

      {/* Main Container with subtle specular corner borders */}
      <div className="w-full rounded-2xl p-3.5 sm:p-4 backdrop-blur-xl bg-[#0B0F19]/90 border border-blue-500/25 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition-all duration-300 relative group overflow-hidden">
        
        {/* Subtle top specular sheen */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

        {/* Horizontal Row: Numbers + Colons */}
        <div className="flex items-center justify-around sm:justify-center sm:gap-4 md:gap-6 text-center">
          {blocks.map((block, idx) => (
            <React.Fragment key={block.label}>
              <div className="flex flex-col items-center min-w-[44px] sm:min-w-[60px]">
                <span className="font-display text-2xl sm:text-4xl xl:text-5xl font-black text-white tracking-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)]">
                  {block.value}
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] text-slate-400 font-semibold uppercase tracking-widest mt-0.5">
                  {block.label}
                </span>
              </div>

              {/* Colon separator */}
              {idx < blocks.length - 1 && (
                <span className="font-display text-xl sm:text-3xl text-indigo-400/80 font-light -mt-2 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] animate-pulse">
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>

    </div>
  );
};

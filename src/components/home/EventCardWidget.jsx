import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, ArrowUpRight } from 'lucide-react';

export const EventCardWidget = ({ className = '' }) => {
  const navigate = useNavigate();
  const [hackathonHovered, setHackathonHovered] = useState(false);
  const [esportsHovered, setEsportsHovered] = useState(false);

  return (
    <div className={`relative flex items-end gap-2.5 sm:gap-3 select-none ${className}`}>
      
      {/* 1. Web & AI Hackathon Card */}
      <motion.div
        animate={{ y: [-3, 4, -3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        onClick={() => navigate('/events/web-hackathon')}
        onMouseEnter={() => setHackathonHovered(true)}
        onMouseLeave={() => setHackathonHovered(false)}
        className="relative flex-1 sm:w-28 xl:w-32 2xl:w-36 rounded-2xl backdrop-blur-xl bg-[#0B0F19]/90 border border-blue-500/25 p-2 shadow-xl hover:border-blue-400/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all duration-300 cursor-pointer group"
      >
        {/* Visual Thumbnail */}
        <div className="relative w-full h-16 rounded-xl overflow-hidden bg-gradient-to-tr from-slate-900 to-blue-950 border border-blue-500/20 flex items-center justify-center group-hover:scale-[1.03] transition-transform">
          <div className="relative z-10 w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-400/40 flex items-center justify-center text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.4)]">
            <span className="font-mono text-[10px] font-bold">AI</span>
          </div>
          <ArrowUpRight className="absolute top-1.5 right-1.5 w-3 h-3 text-blue-400 opacity-60 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Card Title Label */}
        <div className="mt-1.5 text-center">
          <span className="font-body text-[11px] font-bold text-slate-100 group-hover:text-blue-300 transition-colors block leading-tight">
            Web Hackathon
          </span>
          <span className="font-mono text-[8px] text-blue-400 tracking-wider uppercase font-semibold">
            // FULL-DAY SPRINT
          </span>
        </div>

        {/* Hover Tooltip */}
        {hackathonHovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute -top-14 left-1/2 -translate-x-1/2 w-44 p-2 rounded-xl bg-[#0B0F19]/95 border border-blue-500/40 backdrop-blur-md shadow-2xl z-50 pointer-events-none"
          >
            <p className="font-body text-[9px] text-slate-200 leading-tight text-center font-medium">
              Build full-stack &amp; AI solutions for Innovision 2026
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* 2. Esports Arena Card */}
      <motion.div
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        onClick={() => navigate('/events/bgmi')}
        onMouseEnter={() => setEsportsHovered(true)}
        onMouseLeave={() => setEsportsHovered(false)}
        className="relative flex-1 sm:w-28 xl:w-32 2xl:w-36 rounded-2xl backdrop-blur-xl bg-[#0B0F19]/90 border border-indigo-500/25 p-2 shadow-xl hover:border-indigo-400/60 hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-all duration-300 cursor-pointer group"
      >
        {/* Visual Thumbnail */}
        <div className="relative w-full h-16 rounded-xl overflow-hidden bg-gradient-to-tr from-slate-900 to-indigo-950 border border-indigo-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
          <div className="relative z-10 w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.4)]">
            <Gamepad2 className="w-3.5 h-3.5" />
          </div>
          <ArrowUpRight className="absolute top-1.5 right-1.5 w-3 h-3 text-indigo-400 opacity-60 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Card Title Label */}
        <div className="mt-1.5 text-center">
          <span className="font-body text-[11px] font-bold text-slate-100 group-hover:text-indigo-300 transition-colors block leading-tight">
            Esports Arena
          </span>
          <span className="font-mono text-[8px] text-indigo-400 tracking-wider uppercase font-semibold">
            // BGMI • MLBB
          </span>
        </div>
      </motion.div>

    </div>
  );
};

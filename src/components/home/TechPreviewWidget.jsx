import React from 'react';
import { motion } from 'framer-motion';

export const TechPreviewWidget = ({ className = '' }) => {
  return (
    <div className={`relative select-none ${className}`}>
      
      {/* Floating Code Symbol < > with ambient glow */}
      <motion.div
        animate={{ y: [-3, 5, -3], rotate: [0, 2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-9 left-1 font-mono text-lg sm:text-xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] pointer-events-none z-30"
      >
        &lt; / &gt;
      </motion.div>

      {/* Main Preview Window */}
      <motion.div
        animate={{ y: [3, -4, 3] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        className="relative w-32 sm:w-36 xl:w-40 rounded-2xl backdrop-blur-xl bg-[#0B0F19]/90 border border-blue-500/25 p-2.5 shadow-xl hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 group"
      >
        {/* Window Bar */}
        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/[0.08]">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="font-mono text-[7px] text-blue-300 tracking-wider font-semibold">
            main.tsx
          </span>
        </div>

        {/* Code Preview Area */}
        <div className="w-full h-14 rounded-lg overflow-hidden bg-[#07090E] border border-white/[0.08] p-1.5 relative flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <span className="font-mono text-[7px] text-indigo-400 font-bold">const</span>
              <span className="font-mono text-[7px] text-slate-100">innovision</span>
              <span className="font-mono text-[7px] text-slate-400">=</span>
              <span className="font-mono text-[7px] text-emerald-400 font-semibold">2026</span>
            </div>
            <div className="flex items-center gap-1 pl-2">
              <span className="font-mono text-[6px] text-slate-400">status:</span>
              <span className="font-mono text-[6px] text-blue-300 font-bold">&quot;ONLINE&quot;</span>
            </div>
            <div className="flex items-center gap-1 pl-2">
              <span className="font-mono text-[6px] text-slate-400">campus:</span>
              <span className="font-mono text-[6px] text-slate-200">&quot;ICFAI SIKKIM&quot;</span>
            </div>
          </div>

          {/* Active Status Indicator */}
          <div className="flex items-center justify-between pt-0.5 border-t border-white/10">
            <span className="font-mono text-[6px] text-slate-400">v2.6.0</span>
            <span className="font-mono text-[6px] text-emerald-400 flex items-center gap-0.5 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              LIVE
            </span>
          </div>
        </div>

        {/* Metric Bar */}
        <div className="mt-2 space-y-1">
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-4/5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-[0_0_6px_#3B82F6]" />
          </div>
          <div className="flex justify-between items-center text-[7px] font-mono text-slate-400">
            <span>Latency</span>
            <span className="text-blue-300 font-semibold">12ms</span>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

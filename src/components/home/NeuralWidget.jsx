import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Cpu } from 'lucide-react';

export const NeuralWidget = ({ className = '' }) => {
  const [modelMode, setModelMode] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const models = [
    { name: 'AI Neural Model', rate: '98.4%', status: 'Inference Active', color: '#60A5FA' },
    { name: 'Vision-Net v4', rate: '99.1%', status: 'Vision Synthesized', color: '#818CF8' },
    { name: 'LLM Reasoning', rate: '97.8%', status: 'Context Active', color: '#38BDF8' }
  ];

  const current = models[modelMode];

  const handleCycleModel = () => {
    setModelMode((prev) => (prev + 1) % models.length);
  };

  return (
    <motion.div
      animate={{ y: [-3, 4, -3] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCycleModel}
      className={`relative w-full max-w-[260px] lg:w-48 xl:w-56 2xl:w-60 rounded-2xl backdrop-blur-xl bg-[#0B0F19]/90 border border-indigo-500/25 p-3.5 shadow-xl hover:border-indigo-400/50 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)] transition-all duration-300 cursor-pointer group select-none ${className}`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/[0.08]">
        <span className="font-mono text-[11px] sm:text-xs font-semibold text-slate-200 tracking-wide flex items-center gap-1.5">
          <BrainCircuit className="w-3.5 h-3.5 text-blue-400" />
          {current.name}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34D399]" />
          <span className="text-[7px] font-mono text-emerald-400 font-bold">READY</span>
        </span>
      </div>

      {/* Interactive Node Graph with Active Synaptic Pulses */}
      <div className="relative h-24 sm:h-28 flex items-center justify-center my-0.5">
        <svg viewBox="0 0 160 100" fill="none" className="w-full h-full max-w-[180px]">
          <defs>
            <linearGradient id="neuralGradRich" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>
            <filter id="centerGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Connection Tracks */}
          <path d="M80 50L30 25" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
          <path d="M80 50L130 25" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
          <path d="M80 50L30 75" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
          <path d="M80 50L130 75" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />

          {/* Animated Synaptic Laser Energy Streams */}
          <path
            d="M80 50L30 25"
            stroke="url(#neuralGradRich)"
            strokeWidth="1.6"
            strokeDasharray="8 6"
            className="animate-pulse"
          />
          <path
            d="M80 50L130 25"
            stroke="url(#neuralGradRich)"
            strokeWidth="1.6"
            strokeDasharray="8 6"
            className="animate-pulse"
          />
          <path
            d="M80 50L30 75"
            stroke="url(#neuralGradRich)"
            strokeWidth="1.6"
            strokeDasharray="8 6"
            className="animate-pulse"
          />
          <path
            d="M80 50L130 75"
            stroke="url(#neuralGradRich)"
            strokeWidth="1.6"
            strokeDasharray="8 6"
            className="animate-pulse"
          />

          {/* 4 Outer Nodes with subtle glow rings */}
          <circle cx="30" cy="25" r="5" fill="#07090E" stroke="#38BDF8" strokeWidth="1.6" />
          <circle cx="30" cy="25" r="2" fill="#38BDF8" />

          <circle cx="130" cy="25" r="5" fill="#07090E" stroke="#818CF8" strokeWidth="1.6" />
          <circle cx="130" cy="25" r="2" fill="#818CF8" />

          <circle cx="30" cy="75" r="5" fill="#07090E" stroke="#818CF8" strokeWidth="1.6" />
          <circle cx="30" cy="75" r="2" fill="#818CF8" />

          <circle cx="130" cy="75" r="5" fill="#07090E" stroke="#60A5FA" strokeWidth="1.6" />
          <circle cx="130" cy="75" r="2" fill="#60A5FA" />

          {/* Concentric Ambient Pulse Rings around Center */}
          <circle cx="80" cy="50" r="16" stroke="rgba(96,165,250,0.3)" strokeWidth="1" strokeDasharray="3 3" className="animate-spin-slow" />

          {/* Central Glowing Core Node */}
          <circle
            cx="80"
            cy="50"
            r={isHovered ? 12 : 10}
            fill="url(#neuralGradRich)"
            filter="url(#centerGlow)"
            className="transition-all duration-300"
          />
          <circle cx="80" cy="50" r="4.5" fill="#FFFFFF" />
        </svg>

        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#07090E]/90 rounded-xl backdrop-blur-sm pointer-events-none transition-opacity">
            <span className="font-mono text-[9px] text-blue-300 text-center px-1 font-semibold">
              Click to cycle model
            </span>
          </div>
        )}
      </div>

      {/* Bottom Progress Bar & Live Telemetry */}
      <div className="space-y-1">
        <div className="flex justify-between font-mono text-[9px] text-slate-300">
          <span>Inference Rate</span>
          <span className="text-blue-400 font-bold">{current.rate}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
            style={{ width: current.rate }}
          />
        </div>
      </div>
    </motion.div>
  );
};

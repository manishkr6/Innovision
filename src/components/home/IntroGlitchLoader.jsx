import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const IntroGlitchLoader = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const fullText = "INNOVISION 2026";
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      onComplete?.();
      return;
    }

    const hasSeenIntro = sessionStorage.getItem('innovision_intro_seen');
    if (hasSeenIntro) {
      onComplete?.();
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setStage(1), 400);
        setTimeout(() => {
          sessionStorage.setItem('innovision_intro_seen', 'true');
          onComplete?.();
        }, 1200);
      }
    }, 70);

    return () => clearInterval(interval);
  }, [prefersReduced, onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('innovision_intro_seen', 'true');
    onComplete?.();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 1 ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#07090E] text-white p-6 overflow-hidden"
    >
      {/* Subtle Tech Grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30" />

      {/* Main Terminal Box */}
      <div className="relative z-10 max-w-xl w-full p-8 rounded-2xl bg-[#0D111C]/90 border border-white/10 text-center shadow-2xl">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08] text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-slate-300" />
            <span>SYS.INIT // ICFAI.SIKKIM.FST</span>
          </div>
          <span className="text-slate-500">v2.6.0_STABLE</span>
        </div>

        {/* Institution Badges */}
        <div className="mb-4 space-y-1">
          <p className="font-mono text-xs text-slate-300 tracking-widest uppercase font-semibold">
            The ICFAI University, Sikkim
          </p>
          <p className="font-body text-xs text-slate-400">
            Faculty of Science &amp; Technology Presents
          </p>
        </div>

        {/* Typing Title */}
        <div className="my-6 min-h-[70px] flex items-center justify-center">
          <h1 className="font-display text-4xl sm:text-6xl tracking-wider font-extrabold text-white">
            {displayText}
            <span className="inline-block w-2.5 h-8 sm:h-12 ml-1 bg-white animate-pulse" />
          </h1>
        </div>

        <p className="font-mono text-xs text-slate-400 tracking-wider">
          In Association With Institution&apos;s Innovation Council (MoE)
        </p>

        {/* Loading Progress Bar */}
        <div className="mt-8 w-full bg-white/5 rounded-full h-1.5 p-0.5 overflow-hidden border border-white/10">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="h-full bg-blue-500 rounded-full"
          />
        </div>

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="mt-6 text-xs font-mono text-slate-400 hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
        >
          [ Skip Intro &amp; Enter Fest ]
        </button>
      </div>
    </motion.div>
  );
};

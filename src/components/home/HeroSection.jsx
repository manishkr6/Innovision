import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Sparkles } from 'lucide-react';
import { FEST_INFO } from '../../data/events';
import { CountdownTimer } from './CountdownTimer';
import { TerminalWidget } from './TerminalWidget';
import { NeuralWidget } from './NeuralWidget';
import { EventCardWidget } from './EventCardWidget';
import { TechPreviewWidget } from './TechPreviewWidget';
import { ParticleWaveCanvas } from './ParticleWaveCanvas';
import { useLenis } from '../../hooks/useLenis';

export const HeroSection = () => {
  const { scrollTo } = useLenis();
  const heroRef = useRef(null);

  // Mouse position tracking for interactive cursor movement lighting & 3D parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, tiltX: 0, tiltY: 0 });

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = (x - centerX) / centerX; // -1 to 1
    const tiltY = (y - centerY) / centerY; // -1 to 1

    setMousePos({ x, y, tiltX, tiltY });
  };

  const handleExplore = () => {
    scrollTo('#events');
  };

  const handleRegister = () => {
    scrollTo('#events');
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center items-center pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10 bg-[#07090E]"
    >
      
      {/* Volumetric Overhead Keynote Spotlight & Ambient Aurora */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Top-down stage spotlight beam (subtle ambient keynote wash) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85vw] max-w-[1200px] h-[550px] bg-[radial-gradient(ellipse_75%_50%_at_50%_0%,rgba(59,130,246,0.12),rgba(99,102,241,0.06),transparent_75%)]" />

        {/* Top-Right Glowing Aurora Bloom */}
        <div className="absolute -top-24 -right-24 w-[34rem] sm:w-[46rem] h-[34rem] sm:h-[46rem] rounded-full bg-gradient-to-bl from-indigo-600/25 via-blue-600/15 to-transparent blur-[130px]" />
        
        {/* Bottom-Left Glowing Aurora Bloom */}
        <div className="absolute -bottom-24 -left-24 w-[32rem] sm:w-[44rem] h-[32rem] sm:h-[44rem] rounded-full bg-gradient-to-tr from-blue-600/25 via-cyan-500/15 to-transparent blur-[130px]" />

        {/* Subtle Perspective Tech Grid */}
        <div className="absolute inset-0 cyber-grid-bg opacity-35" />

        {/* Subtle Decorative Floating Glyphs */}
        <div className="absolute top-28 left-[18%] text-blue-400/50 font-mono text-xs select-none">
          {'{ innovision: 2026 }'}
        </div>
        <div className="absolute top-36 right-[17%] text-indigo-400/50 font-mono text-xs select-none">
          // 27.33°N, 88.61°E
        </div>
      </div>

      {/* 3. Interactive Particle Wave Nebula Canvas (Reacts to cursor proximity) */}
      <ParticleWaveCanvas className="z-0" />

      {/* 4. Responsive Multi-Column Cockpit Grid with 3D Mouse Parallax */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto">
        
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-4 xl:gap-8 w-full">

          {/* LEFT COLUMN: Tech Preview on top, Terminal below (with subtle 3D parallax) */}
          <motion.div
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.tiltX * 5}deg) rotateX(${-mousePos.tiltY * 5}deg) translateZ(10px)`,
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="hidden lg:flex lg:col-span-3 flex-col justify-between items-start h-[520px] py-2 z-20"
          >
            <div className="pl-2">
              <TechPreviewWidget />
            </div>
            <div className="pl-1">
              <TerminalWidget />
            </div>
          </motion.div>

          {/* CENTER COLUMN: Main Hero Headline & Festival Telemetry */}
          <motion.div
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.tiltX * 3}deg) rotateX(${-mousePos.tiltY * 3}deg)`,
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="lg:col-span-6 flex flex-col items-center text-center px-2 sm:px-4 z-30"
          >
            
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-pill-shimmer inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-4 py-1.5 rounded-full backdrop-blur-xl bg-white/[0.04] border border-blue-400/40 text-[10px] sm:text-xs font-mono mb-4 sm:mb-5 shadow-[0_0_20px_rgba(59,130,246,0.2)] max-w-full"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
              <span className="text-white font-bold whitespace-nowrap tracking-wide">
                THE ICFAI UNIVERSITY, SIKKIM
              </span>
              <span className="text-blue-400 hidden xs:inline">•</span>
              <span className="text-slate-300 font-body whitespace-nowrap">
                Faculty of Science &amp; Technology | Department of IT
              </span>
            </motion.div>

            {/* Main Heading: Titanium Chrome & Electric Holographic Finish */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative select-none my-1 w-full"
            >
              {/* Delicate subtle backlight behind title (tasteful, not overpowering) */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/08 to-purple-600/10 blur-2xl rounded-full -z-10 pointer-events-none" />

              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black uppercase tracking-tight leading-none transition-transform duration-300">
                <span className="fest-title-chroma inline-block">
                  INNOVISION
                </span>{' '}
                <span className="fest-title-electric inline-block">
                  2026
                </span>
              </h1>
            </motion.div>

            {/* Sub-header: Monospace with Subtle Accent */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-3 sm:mt-4 font-mono text-[10px] sm:text-xs xl:text-xs tracking-wider sm:tracking-widest text-blue-300 uppercase font-semibold max-w-xl leading-relaxed px-1 drop-shadow-[0_0_6px_rgba(59,130,246,0.15)]"
            >
              [ IN ASSOCIATION WITH INSTITUTION&apos;S INNOVATION COUNCIL — MINISTRY OF EDUCATION INITIATIVE ]
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-3 sm:mt-4 font-body text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed px-2 font-normal"
            >
              A Celebration of Ideas, Innovation &amp; Technology. Annual inter-collegiate IT, technical, gaming and creative fest featuring 12 dynamic competitions and official medal arenas.
            </motion.p>

            {/* Info Pills: Venue & Date with Specular Border Glow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2.5 font-mono text-[11px] sm:text-xs text-slate-200"
            >
              <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full backdrop-blur-xl bg-white/[0.04] border border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:border-blue-400 transition-colors">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate max-w-[200px] sm:max-w-none">{FEST_INFO.shortVenue}</span>
              </div>

              <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full backdrop-blur-xl bg-white/[0.04] border border-indigo-400/30 shadow-[0_0_15px_rgba(99,102,241,0.15)] hover:border-indigo-400 transition-colors">
                <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>{FEST_INFO.dateString}</span>
              </div>
            </motion.div>

            {/* CTAs: Gradient REGISTER NOW with Shimmer & Dark Glass Explore */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto"
            >
              <button
                onClick={handleRegister}
                className="btn-shimmer-sweep w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(59,130,246,0.45)] hover:shadow-[0_0_35px_rgba(99,102,241,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>REGISTER NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleExplore}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full backdrop-blur-xl bg-white/[0.04] border border-white/20 text-slate-200 font-mono text-xs font-semibold hover:border-blue-400 hover:text-white hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all cursor-pointer"
              >
                Explore 12 Events ↓
              </button>
            </motion.div>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 sm:mt-8 w-full"
            >
              <CountdownTimer />
            </motion.div>

          </motion.div>

          {/* RIGHT COLUMN: Neural Model on top, Event Cards below (with subtle 3D parallax) */}
          <motion.div
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.tiltX * 5}deg) rotateX(${-mousePos.tiltY * 5}deg) translateZ(10px)`,
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="hidden lg:flex lg:col-span-3 flex-col justify-between items-end h-[520px] py-2 z-20"
          >
            <div className="pr-2">
              <NeuralWidget />
            </div>
            <div className="pr-1">
              <EventCardWidget />
            </div>
          </motion.div>

        </div>

        {/* MOBILE & TABLET LAYOUT (< 1024px) */}
        <div className="lg:hidden mt-10 w-full max-w-md mx-auto space-y-5 px-2">
          {/* Mobile Terminal */}
          <div className="w-full">
            <TerminalWidget />
          </div>

          {/* Mobile Side-by-Side Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start w-full">
            <div className="flex justify-center sm:justify-start">
              <NeuralWidget />
            </div>
            <div className="flex justify-center sm:justify-end">
              <EventCardWidget />
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};

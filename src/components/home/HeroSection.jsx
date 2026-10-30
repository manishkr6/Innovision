import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Trophy, ArrowRight } from 'lucide-react';
import { FEST_INFO, EVENTS } from '../../data/events';
import { CountdownTimer } from './CountdownTimer';
import { useLenis } from '../../hooks/useLenis';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const festDate = new Date(FEST_INFO.countdownTarget).toLocaleDateString('en-IN', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Kolkata',
});

export const HeroSection = () => {
  const { goToSection } = useLenis();
  const reduced = useReducedMotion();

  // Staggered fade-up for hero copy; disabled when the user prefers reduced motion
  const fadeUp = (delay) =>
    reduced
      ? {}
      : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: 'easeOut' } };

  const facts = [
    { icon: Calendar, text: festDate },
    { icon: MapPin, text: FEST_INFO.city },
    { icon: Trophy, text: `${EVENTS.length} events · 4 tracks` },
  ];

  return (
    <section id="home" className="relative min-h-[100svh] flex items-end overflow-hidden bg-night">
      <img
        src="/images/photos/hero-crowd.jpg"
        alt="Festival crowd with hands raised under warm stage lights"
        className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
        fetchpriority="high"
      />
      {/* Even dark wash first so the bright spotlight beams never sit behind text, then depth gradients */}
      <div className="absolute inset-0 bg-night/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-night/85 via-night/40 to-transparent" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-14 sm:pb-20">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-end">
          <div>
            <motion.div {...fadeUp(0)} className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-flag-green px-4 py-1.5 text-xs sm:text-sm font-semibold text-white">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-white opacity-75 motion-safe:animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-white" />
                </span>
                Registrations open
              </span>
              <span className="inline-flex items-center rounded-full bg-night/60 backdrop-blur border border-white/20 px-4 py-1.5 text-xs sm:text-sm font-medium text-white">
                {FEST_INFO.faculty} · {FEST_INFO.university}
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="mt-5 font-heading font-extrabold text-white leading-[0.9] tracking-tight text-[3.25rem] sm:text-7xl lg:text-8xl"
            >
              INNOVISION
              <span className="block text-marigold-400">2026</span>
            </motion.h1>

            <motion.p {...fadeUp(0.2)} className="mt-5 max-w-xl text-lg sm:text-xl text-white leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
              {FEST_INFO.tagline}. Code, competition, esports and creativity — open to students across Sikkim.
            </motion.p>

            <motion.ul {...fadeUp(0.3)} className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-white/90">
              {facts.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2 text-sm sm:text-base font-medium">
                  <Icon className="w-4 h-4 text-marigold-400" />
                  {text}
                </li>
              ))}
            </motion.ul>

            <motion.div {...fadeUp(0.4)} className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => goToSection('#events')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-marigold-500 hover:bg-marigold-600 text-white font-semibold shadow-lg shadow-black/20 transition-colors"
              >
                Explore the events
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => goToSection('#esports')}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-night/60 hover:bg-night/80 backdrop-blur border border-white/40 text-white font-semibold transition-colors"
              >
                See the esports line-up
              </button>
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.5)}>
            <CountdownTimer />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

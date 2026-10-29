import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FEST_INFO } from '../../data/events';
import { Trophy, Calendar, Users, MapPin, Sparkles } from 'lucide-react';

const iconStyles = [
  { icon: Calendar, bg: 'bg-blue-600/15 border-blue-500/30 text-blue-400' },
  { icon: Users, bg: 'bg-indigo-600/15 border-indigo-500/30 text-indigo-400' },
  { icon: MapPin, bg: 'bg-cyan-600/15 border-cyan-500/30 text-cyan-400' },
  { icon: Trophy, bg: 'bg-amber-500/15 border-amber-500/30 text-amber-400' },
  { icon: Sparkles, bg: 'bg-purple-600/15 border-purple-500/30 text-purple-400' },
];

const CounterItem = ({ label, target, prefix = '', suffix = '', iconConfig, index }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = iconConfig.icon;

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative flex flex-col items-center p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-b from-[#0F1628]/90 via-[#0C1222]/85 to-[#090D18]/90 border border-white/[0.12] hover:border-blue-400/40 hover:bg-[#11192E]/95 shadow-xl hover:shadow-[0_14px_32px_-8px_rgba(30,58,138,0.3)] transition-all duration-300 group overflow-hidden cursor-default hover:-translate-y-1.5"
    >
      {/* Top subtle highlight line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

      {/* Metric Header */}
      <div className="flex items-center justify-between w-full mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-medium">
          // METRIC 0{index + 1}
        </span>
        <div className={`p-2 rounded-xl border ${iconConfig.bg} group-hover:scale-110 transition-transform duration-300 shadow-md`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {/* Numerals with metallic titanium-to-ice-blue gradient */}
      <div className="font-display text-4xl sm:text-5xl font-black bg-gradient-to-b from-white via-slate-100 to-blue-200 bg-clip-text text-transparent group-hover:to-blue-300 transition-colors">
        {prefix}{count}{suffix}
      </div>

      {/* Label */}
      <div className="font-mono text-xs uppercase tracking-wider text-slate-300 font-semibold mt-2.5 text-center">
        {label}
      </div>
    </motion.div>
  );
};

export const StatCounters = () => {
  return (
    <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {FEST_INFO.stats.map((stat, idx) => (
          <CounterItem
            key={stat.label}
            index={idx}
            label={stat.label}
            target={stat.value}
            prefix={stat.prefix || ''}
            suffix={stat.suffix || ''}
            iconConfig={iconStyles[idx % iconStyles.length]}
          />
        ))}
      </div>
    </section>
  );
};

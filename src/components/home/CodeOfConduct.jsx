import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  ChevronDown, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  UserCheck, 
  Clock, 
  Flame, 
  Gavel, 
  Ban,
  ShieldCheck
} from 'lucide-react';
import { CODE_OF_CONDUCT } from '../../data/events';

const iconMap = {
  '01': UserCheck,
  '02': Flame,
  '03': CheckCircle2,
  '04': Clock,
  '05': ShieldAlert,
  '06': Gavel,
  '07': Ban,
  '08': AlertTriangle,
};

export const CodeOfConduct = () => {
  const [expandedId, setExpandedId] = useState('respect');

  const toggleItem = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="code-of-conduct" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-24">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/40 border border-blue-700/40 text-blue-300 font-mono text-xs uppercase tracking-widest mb-3 shadow-md">
          <ShieldAlert className="w-3.5 h-3.5 text-blue-400" />
          <span>// FEST INTEGRITY &amp; DISCIPLINE</span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl font-black tracking-wide uppercase">
          <span className="text-white">CODE OF</span>{' '}
          <span className="text-blue-400">CONDUCT</span>
        </h2>

        <p className="mt-3 font-body text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
          Official Rules and Code of Conduct issued by the Organising Committee, Department of Information Technology, The ICFAI University, Sikkim. Applicable to all participants, team members, and attendees.
        </p>

        {/* Notice */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0C1220]/80 border border-blue-800/30 text-xs font-mono text-blue-200 backdrop-blur-xl shadow-inner">
          <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>[ Organising Committee: Valid college/university ID card mandatory at all times ]</span>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {CODE_OF_CONDUCT.map((item) => {
          const isExpanded = expandedId === item.id;
          const Icon = iconMap[item.number] || ShieldAlert;

          return (
            <motion.div
              key={item.id}
              initial={false}
              className={`rounded-2xl transition-all duration-300 border backdrop-blur-xl overflow-hidden ${
                isExpanded
                  ? 'bg-gradient-to-r from-[#0F172C] via-[#121E3B] to-[#0F172C] border-blue-500/40 shadow-xl'
                  : 'bg-[#0D1322]/85 border-white/[0.12] hover:border-blue-500/30 hover:bg-[#10182C]'
              }`}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left focus:outline-none cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-mono text-sm font-bold shrink-0 transition-all duration-300 shadow-md ${
                    isExpanded 
                      ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-blue-600/30' 
                      : 'bg-white/[0.05] text-slate-300 border border-white/10 group-hover:border-blue-400/40 group-hover:text-white'
                  }`}>
                    {item.number}
                  </div>

                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-wide group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-slate-300 mt-0.5 line-clamp-1">
                      {item.shortDesc}
                    </p>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl border transition-all duration-300 ${
                  isExpanded 
                    ? 'rotate-180 bg-blue-600/20 border-blue-400/40 text-blue-300' 
                    : 'bg-white/[0.04] border-white/10 text-slate-400 group-hover:text-white group-hover:border-white/20'
                }`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-3 border-t border-white/[0.08] font-body text-sm text-slate-200 leading-relaxed space-y-4">
                      <p>{item.fullDesc}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <div className="p-3 rounded-xl bg-[#090D18]/90 border border-blue-500/20 text-xs font-mono text-slate-300 flex items-center gap-2.5 shadow-md">
                          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                          <span>Official Fest Guideline • Verified by Faculty of Science &amp; Technology</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#090D18]/90 border border-amber-500/20 text-xs font-mono text-amber-300/90 flex items-center gap-2.5 shadow-md">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>Enforced by Disciplinary Board &amp; Conveners</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
};

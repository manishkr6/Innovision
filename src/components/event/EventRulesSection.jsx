import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  ChevronDown, 
  ShieldCheck, 
  AlertCircle, 
  Scale, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';

export const EventRulesSection = ({ event }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleRule = (idx) => {
    setExpandedIndex(prev => (prev === idx ? null : idx));
  };

  const judgingList = event.judgingCriteria || event.evaluationCriteria || [];

  return (
    <section id="rules" className="scroll-mt-36 space-y-12 mb-20">
      
      {/* Section Subheading */}
      <div className="border-b border-white/[0.08] pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-slate-400 block mb-1">
          // SECTION 02
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wide">
          <span className="text-white">RULES &amp;</span> <span className="text-blue-400">EVALUATION</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 Cols: Numbered Rules Accordion */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-display text-2xl font-bold tracking-wide flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span className="text-white">COMPETITION</span> <span className="text-blue-400">RULES</span>
          </h3>

          <div className="space-y-3">
            {(event.rules || []).map((rule, idx) => {
              const isExpanded = expandedIndex === idx;

              return (
                <div
                  key={idx}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isExpanded
                      ? 'bg-[#0E1322] border-white/20 shadow-lg'
                      : 'bg-[#0D111C]/80 border-white/[0.08] hover:border-white/15'
                  }`}
                >
                  <button
                    onClick={() => toggleRule(idx)}
                    className="w-full p-4 flex items-center justify-between gap-3 text-left focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 font-mono text-xs font-bold text-slate-200 flex items-center justify-center shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-body text-sm font-semibold text-slate-200">
                        Rule #{idx + 1}: {String(rule || '').split('.')[0]}
                      </span>
                    </div>

                    <div className={`p-1.5 rounded text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-white' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-white/[0.06] font-body text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {rule}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* General Rules if present */}
          {event.generalRules && event.generalRules.length > 0 && (
            <div className="mt-8 p-6 rounded-2xl bg-[#0D111C]/80 border border-white/[0.08] space-y-3">
              <h4 className="font-display text-xl font-bold text-white tracking-wide flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                General Regulations
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {event.generalRules.map((gr, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-400 font-mono text-xs mt-0.5">•</span>
                    <span className="leading-relaxed">{gr}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right 5 Cols: Eligibility & Evaluation */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Eligibility Criteria */}
          <div className="p-6 rounded-2xl bg-[#0D111C]/80 border border-white/[0.08] space-y-4">
            <h4 className="font-display text-xl font-bold tracking-wide flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-white">ELIGIBILITY</span> <span className="text-emerald-400">CRITERIA</span>
            </h4>

            <div className="space-y-3 font-body text-xs sm:text-sm text-slate-300">
              {Array.isArray(event.eligibility) ? (
                <ul className="space-y-2">
                  {event.eligibility.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="leading-relaxed">
                  {event.eligibility}
                </p>
              )}

              {event.isITOnly && (
                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/50 text-xs font-mono text-blue-300 flex items-start gap-2 mt-2">
                  <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Restricted to Faculty of Science &amp; Technology (BCA, MCA, B.Tech CSE/IT, B.Sc IT) students only.</span>
                </div>
              )}
            </div>
          </div>

          {/* Judging & Evaluation Parameters */}
          <div className="p-6 rounded-2xl bg-[#0D111C]/80 border border-white/[0.08] space-y-4">
            <h4 className="font-display text-xl font-bold tracking-wide flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-400" />
              <span className="text-white">JUDGING</span> <span className="text-indigo-400">CRITERIA</span>
            </h4>

            <div className="space-y-2.5">
              {judgingList.map((crit, idx) => {
                const isObj = typeof crit === 'object' && crit !== null;
                const title = isObj ? crit.criteria : crit;
                const weight = isObj ? crit.weight : null;
                const desc = isObj ? crit.description : null;

                return (
                  <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-200">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        {title}
                      </span>
                      {weight && (
                        <span className="font-mono text-xs text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 font-bold">
                          {weight}
                        </span>
                      )}
                    </div>
                    {desc && (
                      <p className="text-xs text-slate-400 pl-5.5 leading-relaxed font-normal">
                        {desc}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/[0.06] text-[11px] font-mono text-slate-400">
              Judges&apos; scores and decisions are final and binding for all participants.
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

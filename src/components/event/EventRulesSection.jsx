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
    <section id="rules" className="scroll-mt-36 space-y-10 mb-20">
      
      {/* Section Subheading */}
      <div className="border-b border-gray-200 pb-4">
        <span className="text-xs font-semibold text-marigold-600 uppercase tracking-wider block mb-1">
          Section 02
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Rules &amp; Evaluation
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 Cols: Numbered Rules Accordion */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-heading text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-gray-900" />
            <span>Competition Rules</span>
          </h3>

          <div className="space-y-3">
            {(event.rules || []).map((rule, idx) => {
              const isExpanded = expandedIndex === idx;

              return (
                <div
                  key={idx}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isExpanded
                      ? 'bg-white border-gray-300 shadow-sm'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <button
                    onClick={() => toggleRule(idx)}
                    className="w-full p-4 flex items-center justify-between gap-3 text-left focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-gray-100 border border-gray-200 font-mono text-xs font-bold text-gray-800 flex items-center justify-center shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-heading text-sm font-semibold text-gray-900">
                        Rule #{idx + 1}: {String(rule || '').split('.')[0]}
                      </span>
                    </div>

                    <div className={`p-1.5 rounded text-gray-400 transition-transform ${isExpanded ? 'rotate-180 text-gray-900' : ''}`}>
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
                        <div className="px-5 pb-5 pt-1 border-t border-gray-100 text-xs sm:text-sm text-gray-600 leading-relaxed">
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
            <div className="mt-8 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
              <h4 className="font-heading text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
                <FileText className="w-5 h-5 text-marigold-600" />
                <span>General Regulations</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                {event.generalRules.map((gr, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-marigold-600 font-bold mt-0.5">•</span>
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
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4">
            <h4 className="font-heading text-lg sm:text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Eligibility Criteria</span>
            </h4>

            <div className="space-y-3 text-xs sm:text-sm text-gray-600">
              {Array.isArray(event.eligibility) ? (
                <ul className="space-y-2">
                  {event.eligibility.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5 mt-2">
                  <AlertCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <span className="font-medium">Restricted to Faculty of Science &amp; Technology (BCA, MCA, B.Tech CSE/IT, B.Sc IT) students only.</span>
                </div>
              )}
            </div>
          </div>

          {/* Judging & Evaluation Parameters */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4">
            <h4 className="font-heading text-lg sm:text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <Scale className="w-5 h-5 text-gray-900" />
              <span>Judging Criteria</span>
            </h4>

            <div className="space-y-2.5">
              {judgingList.map((crit, idx) => {
                const isObj = typeof crit === 'object' && crit !== null;
                const title = isObj ? crit.criteria : crit;
                const weight = isObj ? crit.weight : null;
                const desc = isObj ? crit.description : null;

                return (
                  <div key={idx} className="p-3 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-gray-900">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gray-700 shrink-0" />
                        {title}
                      </span>
                      {weight && (
                        <span className="text-xs text-gray-800 bg-white px-2 py-0.5 rounded border border-gray-200 font-bold">
                          {weight}
                        </span>
                      )}
                    </div>
                    {desc && (
                      <p className="text-xs text-gray-600 pl-5.5 leading-relaxed font-normal">
                        {desc}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-medium">
              Judges&apos; scores and decisions are final and binding for all participants.
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

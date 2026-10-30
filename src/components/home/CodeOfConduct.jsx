import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, IdCard } from 'lucide-react';
import { Reveal } from '../common/Reveal';
import { CODE_OF_CONDUCT } from '../../data/events';

export const CodeOfConduct = () => {
  const [expandedId, setExpandedId] = useState(CODE_OF_CONDUCT[0]?.id);

  return (
    <section id="code-of-conduct" className="py-20 sm:py-28 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 self-start">
          <p className="text-sm font-semibold text-marigold-600">Code of conduct</p>
          <h2 className="mt-2 font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-ink leading-[1.05]">
            Play fair. Have fun.
          </h2>
          <p className="mt-5 text-ink-soft leading-relaxed">
            Rules issued by the Organising Committee, Department of Information Technology, apply to every participant,
            team member and attendee.
          </p>
          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-marigold-50 border border-marigold-100 p-4">
            <IdCard className="w-5 h-5 text-marigold-600 shrink-0 mt-0.5" />
            <p className="text-sm text-ink-soft">
              <span className="font-semibold text-ink">Carry your college ID card</span> at all times — you'll be asked
              for it at every venue.
            </p>
          </div>
        </Reveal>

        <div className="divide-y divide-ink-line rounded-3xl bg-white border border-ink-line">
          {CODE_OF_CONDUCT.map((item) => {
            const open = expandedId === item.id;
            return (
              <div key={item.id}>
                <button
                  onClick={() => setExpandedId(open ? null : item.id)}
                  aria-expanded={open}
                  className="w-full flex items-center gap-4 p-5 sm:p-6 text-left"
                >
                  <span
                    className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      open ? 'bg-marigold-500 text-white' : 'bg-paper-deep text-ink-soft'
                    }`}
                  >
                    {item.number}
                  </span>
                  <span className="flex-1">
                    <span className="block font-heading text-lg font-bold text-ink">{item.title}</span>
                    {!open && <span className="block mt-0.5 text-sm text-ink-muted line-clamp-1">{item.shortDesc}</span>}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-ink-muted transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-6 pb-6 sm:pl-20 text-ink-soft leading-relaxed">{item.fullDesc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

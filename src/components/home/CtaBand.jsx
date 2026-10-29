import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLenis } from '../../hooks/useLenis';
import { Reveal } from '../common/Reveal';

export const CtaBand = () => {
  const { scrollTo } = useLenis();
  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
      <Reveal className="relative max-w-7xl mx-auto overflow-hidden rounded-[2rem] bg-marigold-500 px-6 py-14 sm:px-14 sm:py-16 text-white">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10" aria-hidden="true" />
        <div className="absolute right-24 -bottom-24 w-56 h-56 rounded-full bg-marigold-600/50" aria-hidden="true" />
        <div className="relative grid md:grid-cols-[1.5fr_1fr] gap-8 items-center">
          <div>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
              Your stage is set.
            </h2>
            <p className="mt-3 text-lg text-white/90">Pick your event and register before the deadline.</p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 md:justify-end">
            <button
              onClick={() => scrollTo('#events')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink hover:bg-ink-soft px-7 py-3.5 font-semibold transition-colors"
            >
              Browse events <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="inline-flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 border border-white/40 px-7 py-3.5 font-semibold transition-colors"
            >
              Talk to us
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

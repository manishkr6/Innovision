import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { FEST_INFO } from '../../data/events';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Reveal } from '../common/Reveal';

const STATS = [
  { label: 'Competitions', key: 'Official Events' },
  { label: 'Tracks', key: 'Fest Tracks' },
  { label: 'Podium medals', key: 'Podium Medals' },
].map((s) => ({ ...s, value: FEST_INFO.stats.find((x) => x.label === s.key)?.value ?? 0 }));

// Counts from 0 to `value` once the number scrolls into view
const CountUp = ({ value, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) return setN(value);
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / 1200);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
};

export const AboutSection = () => (
  <section id="about" className="py-20 sm:py-28">
    <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <div>
        <p className="text-sm font-semibold text-marigold-600">About the fest</p>
        <h2 className="mt-2 font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-ink leading-[1.05]">
          Where Sikkim's students build, compete and create.
        </h2>
        <p className="mt-5 text-lg text-ink-soft leading-relaxed">
          INNOVISION is the annual IT, technical, gaming and creative fest of the {FEST_INFO.faculty},{' '}
          {FEST_INFO.university}, organised in association with the {FEST_INFO.association}.
        </p>
        <p className="mt-4 text-ink-soft leading-relaxed">
          From algorithm sprints and hackathons to BGMI squads on the big screen and live painting, there's a stage for
          every kind of talent — and medals for the best of them.
        </p>

        <dl className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white border border-ink-line p-4">
              <dt className="text-xs font-medium text-ink-muted">{s.label}</dt>
              <dd className="mt-1 font-heading text-3xl font-extrabold text-ink">
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative">
        <img
          src="/images/photos/team-laptop.jpg"
          alt="Students gathered around a laptop working on a project"
          loading="lazy"
          className="w-full aspect-[4/3] object-cover rounded-3xl shadow-xl"
        />
        <img
          src="/images/photos/painting.jpg"
          alt="An artist painting a colourful abstract canvas"
          loading="lazy"
          className="hidden sm:block absolute -bottom-10 -left-10 w-56 aspect-square object-cover rounded-2xl border-[6px] border-paper shadow-xl"
        />
        <div className="absolute top-3 right-3 sm:-top-4 sm:-right-4 rounded-2xl bg-marigold-500 text-white px-5 py-3 shadow-lg">
          <p className="text-xs font-medium opacity-90">Theme</p>
          <p className="font-heading font-bold leading-tight">Ideas · Innovation · Tech</p>
        </div>
      </div>
    </Reveal>
  </section>
);

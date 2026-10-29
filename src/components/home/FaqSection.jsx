import React from 'react';
import { Reveal } from '../common/Reveal';

// Answers restate the official rules (CODE_OF_CONDUCT) and event data — keep them in sync if those change
const FAQS = [
  {
    q: 'Who can take part?',
    a: 'Currently enrolled students of The ICFAI University, Sikkim from every department, and students of invited institutions such as Sikkim University, Sikkim Manipal University and Sikkim Skill University.',
  },
  { q: 'Is there a registration fee?', a: 'No. Every one of the 12 competitions is free to enter.' },
  {
    q: 'Can I enter more than one event?',
    a: "Yes, as long as the schedules don't clash. The organisers can't move an event to fit individual clashes, so check the schedule first.",
  },
  {
    q: 'What should I bring?',
    a: 'Your valid college ID card — it is mandatory at every venue. Bring your own devices and accessories (for esports: your phone and charger) unless an event says otherwise.',
  },
  {
    q: 'Can I use AI tools or the internet?',
    a: 'Not during competition rounds, unless the specific event rules allow it. Plagiarism, copying and impersonation lead to disqualification.',
  },
  {
    q: 'What happens if I arrive late?',
    a: 'Late arrivals may be refused entry. In esports, a team or player still absent after the waiting time loses the match by walkover.',
  },
];

export const FaqSection = () => (
  <section id="faq" className="py-20 sm:py-28 scroll-mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-semibold text-marigold-600">FAQ</p>
        <h2 className="mt-2 font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-ink">
          Good to know.
        </h2>
      </Reveal>
      <dl className="mt-10 grid md:grid-cols-2 gap-4">
        {FAQS.map((f, i) => (
          <Reveal key={f.q} delay={(i % 2) * 0.08} className="rounded-3xl bg-white border border-ink-line p-6 sm:p-7">
            <dt className="font-heading text-lg font-bold text-ink">{f.q}</dt>
            <dd className="mt-2 text-ink-soft leading-relaxed">{f.a}</dd>
          </Reveal>
        ))}
      </dl>
    </div>
  </section>
);

import React from 'react';
import { MousePointerClick, ClipboardCheck, Ticket, IdCard, Medal, Award, ScrollText, Mic2 } from 'lucide-react';
import { Reveal } from '../common/Reveal';

const STEPS = [
  { icon: MousePointerClick, title: 'Pick your event', text: 'Browse the 12 competitions and check the team size and rules.' },
  { icon: ClipboardCheck, title: 'Register online', text: 'Fill the short form on the event page before the registration deadline.' },
  { icon: Ticket, title: 'Keep your digital pass', text: 'Your pass appears under “My Passes”. Print it or keep it on your phone.' },
  { icon: IdCard, title: 'Report with your college ID', text: 'Arrive at the venue on time. Late arrivals may be refused entry.' },
];

// Mirrors the official award structure in the Code of Conduct (rule 07) and event perks
const PRIZES = [
  { icon: Medal, tone: 'bg-marigold-100 text-marigold-700', title: 'Gold medal', text: "1st place, plus a Winner's Certificate" },
  { icon: Medal, tone: 'bg-stone-200 text-stone-700', title: 'Silver medal', text: '2nd place, plus a Runner-Up Certificate' },
  { icon: ScrollText, tone: 'bg-flag-green/15 text-flag-green', title: 'Certificate for everyone', text: 'Every participant gets an official certificate' },
  { icon: Mic2, tone: 'bg-flag-blue/15 text-flag-blue', title: 'On the big stage', text: 'Medals presented at the auditorium ceremony' },
];

export const ParticipateSection = () => (
  <section id="participate" className="py-20 sm:py-28 bg-paper-deep/60 scroll-mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16">
      <div>
        <Reveal>
          <p className="text-sm font-semibold text-marigold-600">How to take part</p>
          <h2 className="mt-2 font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-ink leading-[1.05]">
            Four steps to the stage.
          </h2>
        </Reveal>
        <ol className="mt-10 grid sm:grid-cols-2 gap-4">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.08} className="relative rounded-3xl bg-white border border-ink-line p-6">
              <span className="absolute top-5 right-6 font-heading text-5xl font-extrabold text-paper-deep select-none">
                {i + 1}
              </span>
              <s.icon className="relative w-7 h-7 text-marigold-600" />
              <h3 className="relative mt-4 font-heading text-lg font-bold text-ink">{s.title}</h3>
              <p className="relative mt-1.5 text-sm text-ink-soft leading-relaxed">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>

      <Reveal delay={0.1} className="self-start rounded-3xl bg-night text-white p-7 sm:p-8">
        <Award className="w-8 h-8 text-marigold-400" />
        <h3 className="mt-4 font-heading text-3xl font-extrabold">What you win</h3>
        <p className="mt-2 text-white/70">The same award structure applies across all 12 competitions.</p>
        <ul className="mt-6 space-y-3">
          {PRIZES.map((p) => (
            <li key={p.title} className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">
              <span className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center ${p.tone}`}>
                <p.icon className="w-5 h-5" />
              </span>
              <span>
                <span className="block font-semibold">{p.title}</span>
                <span className="block text-sm text-white/80">{p.text}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-white/70">Team awards are given to every registered member. Judges' decisions are final.</p>
      </Reveal>
    </div>
  </section>
);

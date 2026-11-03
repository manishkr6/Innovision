import React from 'react';
import { Reveal } from '../common/Reveal';

const PHOTOS = [
  { src: '/images/innovision-2025/audience.jpg', alt: 'Students and guests seated in the auditorium at INNOVISION 2025' },
  { src: '/images/innovision-2025/team.jpg', alt: 'Students and faculty of the organising team with a framed certificate' },
  { src: '/images/innovision-2025/recognition.jpg', alt: 'A certificate being presented on stage at INNOVISION 2025' },
];

const INSTITUTIONS = ['Sikkim University', 'Sikkim Skill University', 'Harkamaya College of Education', 'Sikkim Manipal University'];

export const LastYearSection = () => (
  <section id="last-year" className="bg-paper py-16 sm:py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-sm font-semibold text-marigold-600">Last year</p>
        <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
          INNOVISION 2025, in real life.
        </h2>
        <p className="mt-3 max-w-2xl text-ink-soft leading-relaxed">
          Twelve events on 21 November 2025, with students joining from {INSTITUTIONS.slice(0, -1).join(', ')} and {INSTITUTIONS[INSTITUTIONS.length - 1]}. Winners took home gold and silver medals, and every participant received a certificate.
        </p>
      </Reveal>
      <Reveal delay={0.1} className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PHOTOS.map((photo) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className="w-full aspect-[5/4] object-cover rounded-2xl border border-ink-line"
          />
        ))}
      </Reveal>
    </div>
  </section>
);

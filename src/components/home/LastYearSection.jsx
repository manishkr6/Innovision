import React from 'react';
import { Reveal } from '../common/Reveal';

const PHOTOS = [
  { src: '/images/innovision-2025/painting.jpg', alt: 'A student painting during the competition at INNOVISION 2025' },
  { src: '/images/innovision-2025/team.jpg', alt: 'Students and faculty of the organising team with a framed certificate' },
  { src: '/images/innovision-2025/recognition.jpg', alt: 'A certificate being presented on stage at INNOVISION 2025' },
];

// Facts come from the university's INNOVISION 2025 report, its programme schedule and the 2025 and 2026 posters
const STORY = [
  {
    year: '2025',
    title: 'One day. Twelve events.',
    points: [
      'The School of Information Technology staged INNOVISION 2K25 on 21 November 2025, at the N.J. Yasaswy Auditorium.',
      'Students came from Sikkim University, Sikkim Skill University, Harkamaya College of Education and Sikkim Manipal University to compete.',
      "The Vice Chancellor and Pro Vice Chancellor attended, winners took gold and silver medals, and the day closed with the Achiever's and Shooting Star Awards.",
    ],
  },
  {
    year: '2026',
    title: 'More colleges. More at stake. Your turn.',
    points: [
      'Now hosted by the Faculty of Science & Technology, in association with the Institution’s Innovation Council.',
      'NextPreneur and E-Football join the line-up, alongside returning favourites like BGMI, Coding and the Treasure Hunt.',
      'Open to every college and university in Sikkim, and free to enter.',
    ],
  },
];

export const LastYearSection = () => (
  <section id="last-year" className="bg-paper py-16 sm:py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-sm font-semibold text-marigold-600">The story so far</p>
        <h2 className="mt-2 font-heading text-3xl sm:text-5xl font-extrabold text-ink tracking-tight leading-[1.05]">
          2025 set the bar. Come and raise it.
        </h2>
      </Reveal>
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        {STORY.map((chapter, i) => (
          <Reveal key={chapter.year} delay={i * 0.08} className="rounded-3xl bg-white border border-ink-line p-6 sm:p-8">
            <p className="font-heading text-4xl font-extrabold text-marigold-600">{chapter.year}</p>
            <h3 className="mt-2 font-heading text-xl font-bold text-ink">{chapter.title}</h3>
            <ul className="mt-4 space-y-3 text-ink-soft leading-relaxed">
              {chapter.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1} className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
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

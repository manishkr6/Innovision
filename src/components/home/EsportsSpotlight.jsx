import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Users, CalendarDays, MapPin } from 'lucide-react';
import { EVENTS } from '../../data/events';
import { cleanTbc, dayLabel, startTime, shortVenue } from '../../data/eventUtils';
import { Reveal } from '../common/Reveal';

const esports = EVENTS.filter((e) => e.track.startsWith('C.'));

export const EsportsSpotlight = () => (
  <section id="esports" className="bg-night text-white py-20 sm:py-28">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-marigold-400">Esports Arena</p>
          <h2 className="mt-2 font-heading text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Squad up. The big screen is waiting.
          </h2>
        </div>
        <p className="max-w-md text-white/70">
          Three titles, knockout brackets and a grand final played live in the auditorium. Bring your own device and
          your best squad.
        </p>
      </Reveal>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {esports.map((event, i) => (
          <Reveal key={event.slug} delay={i * 0.1}>
          <Link
            to={`/events/${event.slug}`}
            className="group flex flex-col h-full overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 hover:ring-marigold-400/60 transition"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={event.image}
                alt={`${event.title} official artwork`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col flex-1 p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-heading text-2xl font-bold">{event.title.replace(' Tournament', '')}</h3>
                <ArrowUpRight className="w-5 h-5 shrink-0 text-white/70 group-hover:text-marigold-400 transition-colors" />
              </div>
              <p className="mt-2 text-sm text-white/70 line-clamp-2">{event.shortDesc}</p>
              <div className="mt-4 space-y-1.5 text-sm text-white/70">
                <p className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-marigold-400" />
                  {dayLabel(event)} · {startTime(event)}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-marigold-400" />
                  {shortVenue(event)}
                </p>
              </div>
              <div className="mt-auto pt-5 flex flex-wrap gap-2 text-xs font-medium">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1">
                  <Users className="w-3.5 h-3.5" />
                  {cleanTbc(event.teamSize.label)}
                </span>
                <span className="rounded-full bg-marigold-500/20 text-marigold-400 px-3 py-1">
                  {event.registrationFee} · {event.maxSlots} slots
                </span>
              </div>
            </div>
          </Link>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-xs text-white/70">
        Game names, logos and artwork are trademarks of their respective publishers (KRAFTON, Vizta Games, KONAMI) and
        are used only to identify the tournaments.
      </p>
    </div>
  </section>
);

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, ArrowRight, Info } from 'lucide-react';
import { EVENTS } from '../../data/events';
import { TRACKS, trackOf, splitTitle, eventDays, startTime, startMinutes, shortVenue, cleanTbc } from '../../data/eventUtils';
import { Reveal } from '../common/Reveal';

// Timed events per day sorted by start; submission-window events (no fixed slot) are listed separately
const timedFor = (day) =>
  EVENTS.filter((e) => eventDays(e).includes(day) && startMinutes(e) !== null).sort(
    (a, b) => startMinutes(a) - startMinutes(b)
  );
const allFest = EVENTS.filter((e) => startMinutes(e) === null);

const Row = ({ event }) => {
  const [name] = splitTitle(event.title);
  const track = TRACKS[trackOf(event)];
  const start = startTime(event);
  const end = cleanTbc(event.time).split(' - ')[1];
  return (
    <li>
      <Link
        to={`/events/${event.slug}`}
        className="group grid grid-cols-[5.5rem_1fr_auto] sm:grid-cols-[8rem_1fr_auto] items-center gap-4 px-5 sm:px-6 py-4 hover:bg-paper transition-colors"
      >
        <span className="font-heading font-bold text-ink tabular-nums">
          {start ?? 'Open'}
          {end && <span className="block text-xs font-sans font-medium text-ink-muted">to {end}</span>}
        </span>
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-heading text-lg font-bold text-ink">{name}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${track.chip}`}>{track.label}</span>
          </span>
          <span className="mt-0.5 flex items-center gap-1.5 text-sm text-ink-muted truncate">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            {shortVenue(event)}
          </span>
        </span>
        <ArrowRight className="w-4 h-4 text-ink-muted group-hover:text-marigold-600 group-hover:translate-x-0.5 transition" />
      </Link>
    </li>
  );
};

export const ScheduleSection = () => {
  const [day, setDay] = useState(1);
  const timed = timedFor(day);

  return (
    <section id="schedule" className="py-20 sm:py-28 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-marigold-600">Schedule</p>
            <h2 className="mt-2 font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-ink">
              Plan your fest.
            </h2>
          </div>
          <div role="tablist" className="inline-flex self-start rounded-full bg-white border border-ink-line p-1">
            {[1, 2].map((d) => (
              <button
                key={d}
                role="tab"
                aria-selected={day === d}
                onClick={() => setDay(d)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                  day === d ? 'bg-ink text-white' : 'text-ink-soft hover:text-ink'
                }`}
              >
                Day {d}
                <span className="ml-1.5 opacity-60">({timedFor(d).length})</span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-8 divide-y divide-ink-line rounded-3xl bg-white border border-ink-line overflow-hidden">
            {timed.map((e) => (
              <Row key={e.slug} event={e} />
            ))}
          </ul>
        </Reveal>

        {allFest.length > 0 && (
          <Reveal delay={0.15}>
            <h3 className="mt-10 flex items-center gap-2 text-sm font-semibold text-ink-muted">
              <Clock className="w-4 h-4" /> Running all fest — submit any time
            </h3>
            <ul className="mt-3 divide-y divide-ink-line rounded-3xl bg-white border border-ink-line overflow-hidden">
              {allFest.map((e) => (
                <Row key={e.slug} event={e} />
              ))}
            </ul>
          </Reveal>
        )}

        <p className="mt-6 flex items-start gap-2 text-sm text-ink-muted">
          <Info className="w-4 h-4 mt-0.5 shrink-0" />
          Timings are provisional and will be confirmed closer to the fest. Check each event page before you report.
        </p>
      </div>
    </section>
  );
};

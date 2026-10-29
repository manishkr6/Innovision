import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Users, ArrowRight, MapPin } from 'lucide-react';
import { EVENTS } from '../../data/events';
import { TRACKS, trackOf, cleanTbc, splitTitle, shortVenue } from '../../data/eventUtils';
import { Reveal } from '../common/Reveal';

export const EventsGrid = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EVENTS.filter(
      (e) =>
        (activeTab === 'all' || trackOf(e) === activeTab) &&
        (!q || [e.title, e.tagline, e.genre, e.track].join(' ').toLowerCase().includes(q))
    );
  }, [activeTab, query]);

  const tabs = [
    { key: 'all', label: 'All events', count: EVENTS.length },
    ...Object.entries(TRACKS).map(([key, t]) => ({
      key,
      label: t.label,
      count: EVENTS.filter((e) => trackOf(e) === key).length,
    })),
  ];

  return (
    <section id="events" className="py-20 sm:py-28 bg-paper-deep/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-marigold-600">The line-up</p>
            <h2 className="mt-2 font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-ink">
              {EVENTS.length} competitions. Pick yours.
            </h2>
          </div>
          <label className="relative w-full lg:w-80">
            <span className="sr-only">Search events</span>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events"
              className="w-full rounded-full bg-white border border-ink-line pl-11 pr-10 py-3 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-marigold-400"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-ink-muted hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </label>
        </Reveal>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
                activeTab === t.key
                  ? 'bg-ink text-white border-ink'
                  : 'bg-white text-ink-soft border-ink-line hover:border-ink-muted'
              }`}
            >
              {t.label} <span className="opacity-60">({t.count})</span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 text-center rounded-3xl bg-white border border-ink-line py-16 px-6">
            <p className="font-heading text-xl font-bold text-ink">No events match “{query}”</p>
            <button
              onClick={() => {
                setQuery('');
                setActiveTab('all');
              }}
              className="mt-4 text-sm font-semibold text-marigold-600 hover:underline"
            >
              Show all events
            </button>
          </div>
        ) : (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => {
              const track = TRACKS[trackOf(event)];
              const [name, sub] = splitTitle(event.title);
              return (
                <Link
                  key={event.slug}
                  to={`/events/${event.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-white border border-ink-line hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-paper-deep">
                    <img
                      src={event.image}
                      alt={name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <span className={`self-start rounded-full px-3 py-1 text-xs font-semibold ${track.chip}`}>
                      {track.label}
                    </span>
                    <h3 className="mt-3 font-heading text-2xl font-bold text-ink leading-tight">{name}</h3>
                    {sub && <p className="text-sm font-medium text-ink-muted">{sub}</p>}
                    <p className="mt-3 text-sm text-ink-soft leading-relaxed line-clamp-2">{event.tagline}</p>
                    <div className="mt-4 text-sm text-ink-muted">
                      <p className="flex items-center gap-2 truncate">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span className="truncate">{shortVenue(event)}</span>
                      </p>
                    </div>
                    <div className="mt-auto pt-5 border-t border-ink-line/70 flex items-center justify-between text-sm">
                      <span className="inline-flex items-center gap-1.5 text-ink-muted">
                        <Users className="w-4 h-4" />
                        {cleanTbc(event.teamSize.label)}
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-marigold-600">
                        Details <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { EVENTS, getRelatedEvents } from '../../data/events';
import { TiltCard } from '../common/TiltCard';

export const RelatedEvents = ({ currentSlug }) => {
  const navigate = useNavigate();
  const currentIndex = EVENTS.findIndex((e) => e.slug === currentSlug);
  
  const prevEvent = (currentIndex > 0 ? EVENTS[currentIndex - 1] : EVENTS[EVENTS.length - 1]) || EVENTS[0];
  const nextEvent = (currentIndex >= 0 && currentIndex < EVENTS.length - 1 ? EVENTS[currentIndex + 1] : EVENTS[0]) || EVENTS[0];
  
  const relatedEvents = getRelatedEvents(currentSlug, 3);

  return (
    <div className="space-y-16 pt-8 border-t border-white/[0.08]">
      
      {/* Previous / Next Event Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Previous */}
        <Link
          to={`/events/${prevEvent.slug}`}
          className="p-5 rounded-2xl bg-[#0D111C]/80 border border-white/[0.08] hover:border-white/20 group transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/[0.04] text-slate-400 group-hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block">
                ← PREVIOUS EVENT
              </span>
              <span className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                {prevEvent.title}
              </span>
            </div>
          </div>
        </Link>

        {/* Next */}
        <Link
          to={`/events/${nextEvent.slug}`}
          className="p-5 rounded-2xl bg-[#0D111C]/80 border border-white/[0.08] hover:border-white/20 group transition-all flex items-center justify-between text-right"
        >
          <div className="flex flex-col flex-1 items-end">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block">
              NEXT EVENT →
            </span>
            <span className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
              {nextEvent.title}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/[0.04] text-slate-400 group-hover:text-white transition-colors ml-3">
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Related Events Row */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide">
              <span className="text-white">RELATED</span> <span className="text-blue-400">EVENTS</span>
            </h3>
          </div>
          <Link
            to="/#events"
            className="font-mono text-xs text-blue-400 hover:text-white hover:underline flex items-center gap-1 transition-colors"
          >
            <span>View All 12 Events</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedEvents.map((event) => (
            <TiltCard
              key={event.id}
              onClick={() => navigate(`/events/${event.slug}`)}
              className="rounded-2xl bg-[#0D111C]/80 border border-white/[0.08] hover:border-white/20 cursor-pointer flex flex-col justify-between group overflow-hidden shadow-lg transition-all"
            >
              {/* Photo Thumbnail */}
              <div className="relative w-full h-32 overflow-hidden bg-slate-950">
                <img
                  src={event.image}
                  alt={event.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D111C] via-transparent to-transparent" />
                <span className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase backdrop-blur-md ${
                  event.isITOnly
                    ? 'bg-blue-600/90 text-white border border-blue-400/30'
                    : 'bg-slate-900/80 text-slate-200 border border-white/20'
                }`}>
                  {event.categoryLabel}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-display text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-1">
                    {event.title}
                  </h4>
                  <p className="font-body text-xs text-slate-400 line-clamp-2 mb-4">
                    {event.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>{event.teamSize.label}</span>
                  <span className="text-slate-300 font-semibold group-hover:text-white transition-colors flex items-center gap-1">
                    Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

    </div>
  );
};

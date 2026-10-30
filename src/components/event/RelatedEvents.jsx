import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, Users } from 'lucide-react';
import { EVENTS, getRelatedEvents } from '../../data/events';
import { cleanTbc } from '../../data/eventUtils';

export const RelatedEvents = ({ currentSlug }) => {
  const navigate = useNavigate();
  const currentIndex = EVENTS.findIndex((e) => e.slug === currentSlug);
  
  const prevEvent = (currentIndex > 0 ? EVENTS[currentIndex - 1] : EVENTS[EVENTS.length - 1]) || EVENTS[0];
  const nextEvent = (currentIndex >= 0 && currentIndex < EVENTS.length - 1 ? EVENTS[currentIndex + 1] : EVENTS[0]) || EVENTS[0];
  
  const relatedEvents = getRelatedEvents(currentSlug, 3);

  return (
    <div className="space-y-16 pt-12 border-t border-gray-200">
      
      {/* Previous / Next Event Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Previous */}
        <Link
          to={`/events/${prevEvent.slug}`}
          className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md group transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 group-hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold block">
                ← Previous Event
              </span>
              <span className="font-heading text-base sm:text-lg font-bold text-gray-900 group-hover:text-marigold-600 transition-colors">
                {prevEvent.title}
              </span>
            </div>
          </div>
        </Link>

        {/* Next */}
        <Link
          to={`/events/${nextEvent.slug}`}
          className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md group transition-all flex items-center justify-between text-right"
        >
          <div className="flex flex-col flex-1 items-end">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold block">
              Next Event →
            </span>
            <span className="font-heading text-base sm:text-lg font-bold text-gray-900 group-hover:text-marigold-600 transition-colors">
              {nextEvent.title}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 group-hover:text-gray-900 transition-colors ml-3.5">
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Related Events Row */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-marigold-600" />
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Related Events
            </h3>
          </div>
          <Link
            to="/#events"
            className="text-xs font-semibold text-marigold-600 hover:underline flex items-center gap-1 transition-colors"
          >
            <span>View All 12 Events</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => navigate(`/events/${event.slug}`)}
              className="rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between group overflow-hidden transition-all duration-300"
            >
              {/* Photo Thumbnail */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={event.image}
                  alt={event.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-xs ${
                  event.isITOnly
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/90 backdrop-blur-md text-gray-800 border border-gray-200'
                }`}>
                  {event.categoryLabel}
                </span>
              </div>

              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-heading text-xl font-bold text-gray-900 group-hover:text-marigold-600 transition-colors mb-1.5">
                    {event.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
                    {event.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 text-gray-500 font-medium">
                    <Users className="w-3.5 h-3.5" />
                    {cleanTbc(event.teamSize.label)}
                  </span>
                  <span className="font-semibold text-marigold-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

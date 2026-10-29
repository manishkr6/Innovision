import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, 
  Globe, 
  Gamepad2, 
  Swords, 
  Trophy, 
  Camera, 
  Palette, 
  Compass, 
  Lightbulb, 
  HelpCircle, 
  Keyboard, 
  Video, 
  Search, 
  X, 
  ArrowRight, 
  Users, 
  Calendar, 
  Sparkles,
  Layers
} from 'lucide-react';
import { EVENTS } from '../../data/events';
import { TiltCard } from '../common/TiltCard';

// Map icon strings to Lucide components
const iconMap = {
  'code': Code,
  'globe': Globe,
  'gamepad-2': Gamepad2,
  'swords': Swords,
  'trophy': Trophy,
  'camera': Camera,
  'palette': Palette,
  'compass': Compass,
  'lightbulb': Lightbulb,
  'help-circle': HelpCircle,
  'keyboard': Keyboard,
  'video': Video,
};

export const EventsGrid = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'it', 'general'
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Filter events based on active tab and search query
  const filteredEvents = useMemo(() => {
    return EVENTS.filter((event) => {
      // Category tab match
      const matchesTab =
        activeTab === 'all'
          ? true
          : activeTab === 'it'
          ? event.category === 'it'
          : event.category === 'all';

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.genre.toLowerCase().includes(query) ||
        event.tagline.toLowerCase().includes(query) ||
        event.shortDesc.toLowerCase().includes(query);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const handleCardClick = (slug) => {
    navigate(`/events/${slug}`);
  };

  const itCount = useMemo(() => EVENTS.filter(e => e.category === 'it').length, []);
  const generalCount = useMemo(() => EVENTS.filter(e => e.category === 'all').length, []);

  return (
    <section id="events" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/40 border border-blue-700/40 text-blue-300 font-mono text-xs uppercase tracking-widest mb-3 shadow-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span>// COMPETE &amp; CONQUER</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl sm:text-6xl font-black tracking-wide uppercase"
        >
          <span className="text-white">EVENTS</span>{' '}
          <span className="text-blue-400">CATALOG</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 font-body text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed"
        >
          Discover 12 high-octane competitions spanning algorithms, full-stack hacking, battle royales, fine arts, and startup pitches. Click any event card to explore detailed rules and claim your spot.
        </motion.p>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/[0.12]">
        
        {/* Category Segmented Control */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0C1220]/80 border border-white/10 backdrop-blur-xl w-full sm:w-auto overflow-x-auto shadow-inner">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-600/25 border border-blue-400/30'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            <span>All Events</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'all' ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-slate-400'}`}>
              {EVENTS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('it')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'it'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-600/25 border border-blue-400/30'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            <span>For IT Students</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'it' ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-slate-400'}`}>
              {itCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('general')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'general'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-600/25 border border-blue-400/30'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            <span>For All Students</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'general' ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-slate-400'}`}>
              {generalCount}
            </span>
          </button>
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, tags, esports..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#0C1220]/80 backdrop-blur-xl border border-white/15 text-slate-100 placeholder-slate-400 font-body text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Event Cards Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-2xl bg-[#0D1322]/80 border border-white/10 backdrop-blur-xl">
          <p className="font-mono text-slate-300 text-sm">
            // NO EVENTS FOUND MATCHING &quot;{searchQuery}&quot;
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveTab('all');
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white font-mono text-xs hover:bg-blue-500 transition-colors shadow-md"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredEvents.map((event, index) => {
              const EventIcon = iconMap[event.icon] || Trophy;

              return (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  className="h-full"
                >
                  <TiltCard
                    onClick={() => handleCardClick(event.slug)}
                    className="h-full flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#0E1526]/90 via-[#0B101E]/90 to-[#080C16]/95 backdrop-blur-xl border border-white/[0.12] hover:border-blue-400/40 hover:bg-[#11192E]/95 shadow-xl hover:shadow-[0_16px_36px_-8px_rgba(15,23,42,0.8),0_0_24px_rgba(37,99,235,0.15)] transition-all duration-300 group overflow-hidden cursor-pointer"
                  >
                    {/* Top subtle highlight line */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent z-20" />

                    {/* Real Event Photo Banner */}
                    <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-950">
                      <img
                        src={event.image}
                        alt={event.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80";
                        }}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.92] group-hover:brightness-100"
                      />
                      
                      {/* Gradient Vignette Overlay for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B101E] via-[#0B101E]/50 to-transparent" />

                      {/* Top Badges pinned over photo */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] font-bold tracking-wider uppercase backdrop-blur-md shadow-md ${
                            event.isITOnly
                              ? 'bg-blue-600/95 text-white border border-blue-400/40'
                              : 'bg-indigo-600/90 text-white border border-indigo-400/40'
                          }`}
                        >
                          <Sparkles className="w-3 h-3 text-white" />
                          {event.categoryLabel}
                        </span>

                        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-200 px-2.5 py-1 rounded-full bg-slate-900/85 border border-white/20 backdrop-blur-md shadow-md">
                          {event.genre}
                        </span>
                      </div>

                      {/* Icon badge positioned fully inside the photo */}
                      <div className="absolute bottom-3.5 left-6 z-10">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#121B32]/95 via-[#0D1527]/90 to-[#0A1020]/95 backdrop-blur-md border border-blue-500/40 text-blue-300 shadow-xl group-hover:scale-105 group-hover:border-blue-400 group-hover:text-blue-200 transition-all duration-300">
                          <EventIcon className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 pt-5 flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="font-display text-2xl font-bold tracking-wide text-white group-hover:text-blue-300 transition-colors">
                          {event.title}
                        </h3>
                        <p className="font-mono text-xs text-blue-400/90 font-medium mt-1 mb-2.5">
                          {event.tagline}
                        </p>
                        <p className="font-body text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2 mb-4">
                          {event.shortDesc}
                        </p>
                      </div>

                      {/* Card Footer: Metadata + Interactive View Details Button */}
                      <div className="pt-3 border-t border-white/[0.08] mt-auto">
                        <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300 mb-3.5">
                          <div className="flex items-center gap-1.5 truncate">
                            <Users className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                            <span className="truncate">{event.teamSize.label}</span>
                          </div>
                          <div className="flex items-center gap-1.5 truncate">
                            <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                            <span className="truncate">{event.date.split('-')[0]}</span>
                          </div>
                        </div>

                        {/* Interactive Action Bar */}
                        <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider text-blue-400 group-hover:text-blue-300 transition-colors">
                          <span>EXPLORE EVENT &amp; RULES</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                        </div>
                      </div>
                    </div>

                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

    </section>
  );
};

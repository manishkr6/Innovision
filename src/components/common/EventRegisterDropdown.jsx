import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronRight, Sparkles } from 'lucide-react';
import { EVENTS } from '../../data/events';
import { TRACKS, trackOf, splitTitle } from '../../data/eventUtils';
import { globalLenisInstance, scrollToTarget } from '../../hooks/useLenis';

const TRACK_BADGES = {
  A: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
  B: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
  C: 'bg-rose-500/20 text-rose-300 border-rose-400/30',
  D: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
};

/**
 * EventRegisterDropdown
 *
 * Renders a "Register" trigger button (customisable label, style, icon) that on hover or click
 * reveals a floating popover list of all 12 fest competitions with thumbnail images, titles,
 * and track badges. Clicking any event directs straight to that event's detail page (/events/:slug).
 *
 * Props:
 * - label: button label (e.g. "Register now" or "Register free")
 * - icon: optional React node trailing or leading the button
 * - buttonClassName: classes applied to the trigger button
 * - className: classes applied to the relative container
 * - direction: 'down' (e.g. Navbar) or 'up' (e.g. Hero section)
 * - align: 'right' | 'left'
 * - onOpenChange: optional callback when popover open state changes
 */
export const EventRegisterDropdown = ({
  label = 'Register now',
  icon = null,
  buttonClassName = '',
  className = 'relative inline-block',
  direction = 'down',
  align = 'right',
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false); // When true (opened via click), mouseleave won't close it
  const [query, setQuery] = useState('');
  const containerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  // Notify parent if onOpenChange is provided
  useEffect(() => {
    if (onOpenChange) onOpenChange(isOpen);
  }, [isOpen, onOpenChange]);

  // Filtered events
  const filteredEvents = useMemo(() => {
    if (!query.trim()) return EVENTS;
    const q = query.trim().toLowerCase();
    return EVENTS.filter((e) =>
      [e.title, e.tagline, e.genre, e.track].join(' ').toLowerCase().includes(q)
    );
  }, [query]);

  // Clear pending close timer
  const cancelCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  // Hover handlers
  const handleMouseEnter = () => {
    cancelCloseTimer();
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (isPinned) return; // Keep open if user explicitly pinned it by clicking
    cancelCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 220);
  };

  // Click handler on the button
  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    cancelCloseTimer();

    if (isOpen && isPinned) {
      // Toggle off
      setIsOpen(false);
      setIsPinned(false);
    } else {
      // Pin open
      setIsOpen(true);
      setIsPinned(true);
    }
  };

  // Outside click & escape key handling
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setIsPinned(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsPinned(false);
      }
    };

    document.addEventListener('pointerdown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Navigate to event details and scroll down to registration section
  const handleSelectEvent = (slug) => {
    cancelCloseTimer();
    setIsOpen(false);
    setIsPinned(false);
    setQuery('');

    const targetPath = `/events/${slug}`;
    navigate(`${targetPath}#register`);

    // If already on this event's page, trigger smooth scroll directly
    if (window.location.pathname === targetPath) {
      setTimeout(() => {
        const el = document.getElementById('register');
        if (el) {
          scrollToTarget(el);
        }
      }, 50);
    }
  };

  // Dropdown animation variants
  const isUp = direction === 'up';
  const motionVariants = {
    initial: {
      opacity: 0,
      y: isUp ? 8 : -8,
      scale: 0.96,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.18, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      y: isUp ? 6 : -6,
      scale: 0.96,
      transition: { duration: 0.14, ease: 'easeIn' },
    },
  };

  // Positioning classes
  const placementClass = isUp
    ? 'bottom-full mb-3'
    : 'top-full mt-3';

  const alignClass = align === 'left'
    ? 'left-0 sm:left-0 origin-bottom-left'
    : 'right-0 sm:right-0 origin-top-right';

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={handleButtonClick}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={buttonClassName}
      >
        <span>{label}</span>
        {icon}
      </button>

      {/* Popover Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={motionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`absolute z-50 w-[calc(100vw-2rem)] max-w-[380px] sm:w-[410px] rounded-2xl bg-[#0E0C15] border border-white/20 text-white shadow-[0_24px_60px_-10px_rgba(0,0,0,0.9)] backdrop-blur-2xl ring-1 ring-white/10 overflow-hidden ${placementClass} ${alignClass}`}
            role="dialog"
            aria-label="Fest competitions list"
          >
            {/* Header */}
            <div className="p-3.5 sm:p-4 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-marigold-500/20 border border-marigold-500/30 flex items-center justify-center text-marigold-400">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-sm text-white tracking-tight leading-tight">
                      Choose an Event
                    </h3>
                  </div>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-marigold-500/15 text-marigold-300 border border-marigold-500/30">
                  {EVENTS.length} Events · Free Entry
                </span>
              </div>

              {/* Quick Search */}
              <div className="relative mt-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Quick search (e.g. BGMI, Code, Quiz)..."
                  className="w-full pl-8 pr-8 py-2 text-xs rounded-xl bg-white/[0.07] border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-marigold-400 focus:bg-white/[0.12] focus:ring-1 focus:ring-marigold-400/50 transition-all"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-white/50 hover:text-white transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Event List */}
            <div
              data-lenis-prevent
              className="max-h-[330px] sm:max-h-[360px] overflow-y-auto p-2 space-y-1.5 overscroll-contain pr-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/40"
            >
              {filteredEvents.length === 0 ? (
                <div className="py-10 text-center px-4">
                  <p className="text-xs text-white/60">
                    No competitions match &ldquo;{query}&rdquo;
                  </p>
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="mt-2 text-xs font-semibold text-marigold-400 hover:underline"
                  >
                    Clear search filter
                  </button>
                </div>
              ) : (
                filteredEvents.map((event) => {
                  const trackLetter = trackOf(event);
                  const track = TRACKS[trackLetter];
                  const badgeClass =
                    TRACK_BADGES[trackLetter] || 'bg-white/10 text-white/80 border-white/20';
                  const [name, sub] = splitTitle(event.title);

                  return (
                    <button
                      key={event.slug}
                      type="button"
                      onClick={() => handleSelectEvent(event.slug)}
                      className="group w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all duration-200 bg-white/[0.03] hover:bg-white/[0.09] active:bg-white/[0.14] border border-transparent hover:border-white/10 cursor-pointer"
                    >
                      {/* Event Image */}
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-white/5 border border-white/15 shadow-sm">
                        <img
                          src={event.image}
                          alt={name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                        />
                      </div>

                      {/* Title & Track Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-heading font-bold text-sm text-white group-hover:text-marigold-400 transition-colors truncate leading-tight">
                            {name}
                          </h4>
                          {track && (
                            <span
                              className={`shrink-0 px-1.5 py-0.5 rounded-md text-[10px] font-semibold leading-none border ${badgeClass}`}
                            >
                              {track.label}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/70 group-hover:text-white/90 transition-colors truncate mt-1">
                          {sub || event.genre || event.tagline}
                        </p>
                      </div>

                      {/* Action Pill / Arrow Button */}
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-white/[0.05] group-hover:bg-marigold-500 group-hover:text-white text-white/40 transition-all duration-200 shadow-sm">
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-black/50 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-white/60 text-[11px] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Click any event to register
              </span>
              <span className="font-semibold text-marigold-400 text-[11px]">
                Free Entry
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

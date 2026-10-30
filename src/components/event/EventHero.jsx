import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  ArrowDown, 
  Share2, 
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
  Sparkles
} from 'lucide-react';
import { useLenis } from '../../hooks/useLenis';

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

export const EventHero = ({ event }) => {
  const { scrollTo } = useLenis();
  const EventIcon = iconMap[event.icon] || Trophy;

  const handleRegisterClick = () => {
    scrollTo('#register');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${event.title} - INNOVISION 2026`,
        text: event.shortDesc,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Event URL copied to clipboard!');
    }
  };

  return (
    <section className="relative pt-28 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-6">
        <Link to="/" className="hover:text-gray-900 transition-colors">HOME</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link to="/#events" className="hover:text-gray-900 transition-colors">EVENTS</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-900 font-semibold uppercase">{event.slug}</span>
      </nav>

      {/* Main Hero Card */}
      <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-white border border-gray-200 shadow-sm relative overflow-hidden">
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Left Details Cluster */}
          <div className="max-w-2xl space-y-5">
            
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                event.isITOnly
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'bg-gray-100 text-gray-800 border border-gray-200'
              }`}>
                <Sparkles className="w-3.5 h-3.5" />
                {event.categoryLabel}
              </span>

              <span className="px-3 py-1 rounded-full bg-paper-deep text-gray-700 border border-gray-200 text-xs font-medium">
                {event.genre}
              </span>

              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                Registrations Open
              </span>
            </div>

            {/* Event Title & Icon */}
            <div className="flex items-start gap-4 pt-1">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 shrink-0 shadow-sm">
                <EventIcon className="w-7 h-7 sm:w-9 sm:h-9 text-gray-900" />
              </div>

              <div>
                <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.05]">
                  {event.title}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 font-medium mt-1.5">
                  {event.tagline}
                </p>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed pt-1">
              {event.shortDesc}
            </p>

            {/* Quick Metadata Chips */}
            <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3 text-xs font-medium text-gray-700">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gray-50 border border-gray-200">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gray-50 border border-gray-200">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gray-50 border border-gray-200">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gray-50 border border-gray-200">
                <Users className="w-4 h-4 text-gray-500" />
                <span>{event.teamSize.label}</span>
              </div>
            </div>

          </div>

          {/* Right Showcase: Real Event Photo + CTAs */}
          <div className="flex flex-col gap-4 shrink-0 lg:w-80">
            {/* Real Event Photo Showcase */}
            <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden border border-gray-200 shadow-sm group bg-gray-100">
              <img
                src={event.image}
                alt={event.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80";
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-medium text-white">
                <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                  {event.genre}
                </span>
                <span className="text-white/90 font-medium">
                  Official Event
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <button
              onClick={handleRegisterClick}
              className="w-full py-3.5 px-6 rounded-full bg-black hover:bg-gray-800 text-white font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Register Now</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={handleShare}
              className="w-full py-2.5 px-6 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 hover:text-gray-900 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5 text-gray-500" />
              <span>Share Event</span>
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};

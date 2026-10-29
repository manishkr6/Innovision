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
import { MagneticButton } from '../common/MagneticButton';
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
    <section className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
        <Link to="/" className="hover:text-white transition-colors">HOME</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <Link to="/#events" className="hover:text-white transition-colors">EVENTS</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-blue-400 uppercase">{event.slug}</span>
      </nav>

      {/* Main Hero Card */}
      <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#0D111C]/85 backdrop-blur-xl border border-white/[0.08] shadow-2xl relative overflow-hidden">
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Left Details Cluster */}
          <div className="max-w-2xl space-y-4">
            
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider ${
                event.isITOnly
                  ? 'bg-blue-600/90 text-white border border-blue-400/30'
                  : 'bg-slate-800 text-slate-200 border border-white/10'
              }`}>
                <Sparkles className="w-3.5 h-3.5" />
                {event.categoryLabel}
              </span>

              <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-xs text-slate-300 uppercase tracking-wider">
                {event.genre}
              </span>

              <span className="px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Registrations Open
              </span>
            </div>

            {/* Event Title & Icon */}
            <div className="flex items-start gap-4 pt-2">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#080910] border border-white/15 text-slate-200 shrink-0 shadow-lg">
                <EventIcon className="w-7 h-7 sm:w-9 sm:h-9" />
              </div>

              <div>
                <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-wide text-white">
                  {event.title}
                </h1>
                <p className="font-mono text-xs sm:text-base text-slate-400 font-medium mt-1">
                  {event.tagline}
                </p>
              </div>
            </div>

            {/* Short Description */}
            <p className="font-body text-slate-400 text-xs sm:text-sm leading-relaxed pt-1">
              {event.shortDesc}
            </p>

            {/* Quick Metadata Chips */}
            <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10">
                <Users className="w-4 h-4 text-slate-400" />
                <span>{event.teamSize.label}</span>
              </div>
            </div>

          </div>

          {/* Right Showcase: Real Event Photo + CTAs */}
          <div className="flex flex-col gap-4 shrink-0 lg:w-80">
            {/* Real Event Photo Showcase */}
            <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden border border-white/15 shadow-xl group">
              <img
                src={event.image}
                alt={event.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80";
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-200">
                <span className="px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/20">
                  {event.genre}
                </span>
                <span className="text-slate-300 font-medium">
                  Official Event
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <MagneticButton
              onClick={handleRegisterClick}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all flex items-center justify-center gap-2"
            >
              <span>Register Now</span>
              <ArrowDown className="w-4 h-4" />
            </MagneticButton>

            <button
              onClick={handleShare}
              className="py-2.5 px-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Event</span>
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  ArrowUp,
  Cpu,
  Award
} from 'lucide-react';
import { FEST_INFO } from '../../data/events';
import { MountainLaptopMotif } from './MountainLaptopMotif';
import { useLenis } from '../../hooks/useLenis';

export const Footer = () => {
  const { scrollTo } = useLenis();

  const handleBackToTop = () => {
    scrollTo(0);
  };

  return (
    <footer className="relative z-10 border-t border-white/[0.12] bg-gradient-to-b from-[#080B14] to-[#04060A] text-slate-300 pt-16 pb-12 overflow-hidden">
      {/* Top subtle highlight line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/25 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: Brand & Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/[0.08]">
          
          {/* Column 1: Fest Brand & Association (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl border border-white/15 bg-white/[0.04] flex items-center justify-center font-mono text-xs font-bold text-white">
                &lt;IV&gt;
              </div>
              <span className="font-display tracking-wider text-2xl font-black text-white">
                INNOVISION <span className="text-blue-400">2026</span>
              </span>
            </div>

            <p className="font-body text-sm text-slate-400 max-w-md leading-relaxed">
              The flagship annual IT &amp; cultural extravaganza presented by the{' '}
              <span className="text-slate-200 font-medium">Faculty of Science &amp; Technology</span>,{' '}
              <span className="text-white font-semibold">{FEST_INFO.university}</span>.
            </p>

            {/* Institution's Innovation Council Credit Badge */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3 max-w-md">
              <Award className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="text-slate-200 font-semibold block">
                  In Association With:
                </span>
                <span className="text-slate-300 font-mono text-[11px]">
                  Institution&apos;s Innovation Council (IIC)
                </span>
                <span className="text-slate-400 block text-[10px] mt-0.5">
                  Ministry of Education (MoE) Initiative, Govt. of India
                </span>
              </div>
            </div>

            {/* Sikkim Himalayan Motif miniature */}
            <div className="pt-2 max-w-xs opacity-60">
              <MountainLaptopMotif className="w-full max-w-[200px]" />
            </div>
          </div>

          {/* Column 2: Venue & Schedule (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400 flex items-center gap-2 font-semibold">
              <MapPin className="w-4 h-4 text-blue-400" />
              // VENUE &amp; TIMELINE
            </h3>

            <div className="space-y-3 font-body text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-white block">
                    N.J. Yasaswya Auditorium
                  </span>
                  <span className="text-xs text-slate-400 block leading-relaxed">
                    The ICFAI University Sikkim, Ranka Road, Lower Sichey, Gangtok, Sikkim – 737101
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-white block">
                    {FEST_INFO.dateString}
                  </span>
                  <span className="text-xs text-slate-400">
                    2 Days of Innovation &amp; Culture
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Emergency/Helpdesk contacts */}
            <div className="pt-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Central Helpdesk:
              </span>
              <div className="flex flex-wrap gap-2">
                <a
                  href="tel:+918250835009"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-200 hover:bg-white/[0.08] transition-colors"
                >
                  <Phone className="w-3 h-3 text-blue-400" />
                  +91 8250835009
                </a>
                <a
                  href="mailto:fst@iusikkim.edu.in"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-200 hover:bg-white/[0.08] transition-colors"
                >
                  <Mail className="w-3 h-3 text-indigo-400" />
                  fst@iusikkim.edu.in
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400 flex items-center gap-2 font-semibold">
              <Cpu className="w-4 h-4 text-indigo-400" />
              // PORTAL LINKS
            </h3>

            <ul className="space-y-2 text-sm font-body">
              <li>
                <a 
                  href="/" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(0);
                  }}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>&gt;</span> Home Hub
                </a>
              </li>
              <li>
                <a 
                  href="/#events" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#events');
                  }}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>&gt;</span> All 12 Events
                </a>
              </li>
              <li>
                <a 
                  href="/#code-of-conduct" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#code-of-conduct');
                  }}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>&gt;</span> Code of Conduct
                </a>
              </li>
              <li>
                <a 
                  href="/#contact" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#contact');
                  }}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>&gt;</span> Coordinators &amp; Team
                </a>
              </li>
              <li>
                <Link 
                  to="/passes" 
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>&gt;</span> My Event Passes
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={handleBackToTop}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p>© 2026 Faculty of Science &amp; Technology, The ICFAI University, Sikkim. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Official Fest Portal</span>
            <span>•</span>
            <span>Designed for Innovators</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

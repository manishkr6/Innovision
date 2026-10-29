import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Phone, Mail, ArrowUp } from 'lucide-react';
import { FEST_INFO } from '../../data/events';
import { useLenis } from '../../hooks/useLenis';

const LINKS = [
  { label: 'Esports Arena', hash: '#esports' },
  { label: 'Events', hash: '#events' },
  { label: 'Schedule', hash: '#schedule' },
  { label: 'How to take part', hash: '#participate' },
  { label: 'Code of Conduct', hash: '#code-of-conduct' },
  { label: 'FAQ', hash: '#faq' },
  { label: 'Contact', hash: '#contact' },
];

export const Footer = () => {
  const { scrollTo } = useLenis();
  const location = useLocation();
  const navigate = useNavigate();

  // Smooth-scroll on the homepage; otherwise route home first, then scroll once it has mounted
  const goTo = (e, hash) => {
    e.preventDefault();
    if (location.pathname === '/') {
      scrollTo(hash);
    } else {
      navigate(`/${hash}`);
      setTimeout(() => scrollTo(hash), 150);
    }
  };

  return (
    <footer className="relative z-10 bg-night text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-marigold-500 text-white font-heading font-extrabold text-lg flex items-center justify-center">
                IV
              </span>
              <span className="font-heading text-xl font-extrabold text-white">
                INNOVISION <span className="text-marigold-400">2026</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed max-w-sm">
              The annual IT &amp; cultural fest of the {FEST_INFO.faculty}, {FEST_INFO.university}.
            </p>
            <p className="mt-4 text-xs text-white/70 max-w-sm">
              In association with the Institution's Innovation Council — a Ministry of Education initiative, Govt. of
              India.
            </p>
          </div>

          <div className="space-y-4 text-sm">
            <h3 className="font-semibold text-white">Venue &amp; dates</h3>
            <p className="flex gap-3">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-marigold-400" />
              <span>
                <span className="block text-white">{FEST_INFO.shortVenue}</span>
                <span className="text-white/70">{FEST_INFO.venue}</span>
              </span>
            </p>
            <p className="flex gap-3">
              <Calendar className="w-4 h-4 mt-0.5 shrink-0 text-marigold-400" />
              <span className="text-white">{FEST_INFO.dateString}</span>
            </p>
          </div>

          <div className="space-y-4 text-sm">
            <h3 className="font-semibold text-white">Helpdesk</h3>
            <a href="tel:+918250835009" className="flex items-center gap-3 hover:text-white">
              <Phone className="w-4 h-4 text-marigold-400" /> +91 82508 35009
            </a>
            <a href="mailto:fst@iusikkim.edu.in" className="flex items-center gap-3 hover:text-white">
              <Mail className="w-4 h-4 text-marigold-400" /> fst@iusikkim.edu.in
            </a>
          </div>

          <nav className="space-y-3 text-sm">
            <h3 className="font-semibold text-white">Explore</h3>
            {LINKS.map((l) => (
              <a key={l.hash} href={`/${l.hash}`} onClick={(e) => goTo(e, l.hash)} className="block hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-xs text-white/70">
          <p>© 2026 {FEST_INFO.faculty}, {FEST_INFO.university}. Photos via Unsplash.</p>
          <button onClick={() => scrollTo(0)} className="inline-flex items-center gap-1.5 hover:text-white">
            <ArrowUp className="w-3.5 h-3.5" /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

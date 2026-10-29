import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, ExternalLink } from 'lucide-react';
import { Reveal } from '../common/Reveal';
import { FACULTY_COORDINATORS, STUDENT_REPRESENTATIVES, FEST_INFO } from '../../data/events';

const digits = (person) => person.cleanPhone || person.phone.replace(/[^0-9]/g, '');
const initials = (name) =>
  name
    .replace(/^(Mr|Mrs|Ms|Dr)\.\s*/, '')
    .split(' ')
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(FEST_INFO.venue)}`;

export const ContactSection = () => (
  <section id="contact" className="py-20 sm:py-28 bg-paper-deep/60 scroll-mt-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-semibold text-marigold-600">Contact</p>
        <h2 className="mt-2 font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-ink">
          Questions? Talk to the team.
        </h2>
        <p className="mt-4 text-ink-soft leading-relaxed">
          Reach the faculty coordinators or student committee by phone or WhatsApp for rules, reporting times and team
          registrations.
        </p>
      </Reveal>

      <h3 className="mt-12 text-sm font-semibold text-ink-muted">Faculty coordinators</h3>
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FACULTY_COORDINATORS.map((f) => (
          <div key={f.id} className="rounded-3xl bg-white border border-ink-line p-6 flex flex-col">
            <span className="w-12 h-12 rounded-full bg-marigold-100 text-marigold-700 font-heading font-bold flex items-center justify-center">
              {initials(f.name)}
            </span>
            <p className="mt-4 font-heading text-lg font-bold text-ink">{f.name}</p>
            <p className="text-sm text-ink-muted">{f.role}</p>
            <div className="mt-5 pt-4 border-t border-ink-line flex gap-2">
              <a href={`tel:${f.phone.replace(/\s/g, '')}`} aria-label={`Call ${f.name}`} className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-ink text-white py-2 text-sm font-medium hover:bg-ink-soft">
                <Phone className="w-4 h-4" /> Call
              </a>
              <a href={`https://wa.me/${digits(f)}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${f.name}`} className="w-10 inline-flex items-center justify-center rounded-full border border-ink-line text-flag-green hover:bg-paper-deep">
                <MessageCircle className="w-4 h-4" />
              </a>
              {f.email && (
                <a href={`mailto:${f.email}`} aria-label={`Email ${f.name}`} className="w-10 inline-flex items-center justify-center rounded-full border border-ink-line text-ink-soft hover:bg-paper-deep">
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid lg:grid-cols-[2fr_1fr] gap-6">
        <div>
          <h3 className="text-sm font-semibold text-ink-muted">Student committee</h3>
          <ul className="mt-4 grid sm:grid-cols-2 gap-3">
            {STUDENT_REPRESENTATIVES.map((s) => (
              <li key={s.id} className="flex items-center gap-3 rounded-2xl bg-white border border-ink-line p-3.5">
                <span className="w-10 h-10 shrink-0 rounded-full bg-paper-deep text-ink-soft text-sm font-bold flex items-center justify-center">
                  {initials(s.name)}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-semibold text-ink truncate">{s.name}</span>
                  <span className="block text-xs text-ink-muted truncate">{s.role} · {s.badge}</span>
                </span>
                <a href={`tel:${s.phone.replace(/\s/g, '')}`} aria-label={`Call ${s.name}`} className="p-2 rounded-full text-ink-soft hover:bg-paper-deep">
                  <Phone className="w-4 h-4" />
                </a>
                <a href={`https://wa.me/${digits(s)}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${s.name}`} className="p-2 rounded-full text-flag-green hover:bg-paper-deep">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:mt-9 self-start rounded-3xl bg-night text-white p-7">
          <MapPin className="w-6 h-6 text-marigold-400" />
          <p className="mt-4 font-heading text-xl font-bold">{FEST_INFO.shortVenue}</p>
          <p className="mt-2 text-sm text-white/70 leading-relaxed">{FEST_INFO.venue}</p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-marigold-500 hover:bg-marigold-600 px-5 py-2.5 text-sm font-semibold"
          >
            Open in Google Maps <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

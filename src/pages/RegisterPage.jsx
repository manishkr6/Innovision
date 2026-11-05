import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, ShieldCheck, Ticket } from 'lucide-react';
import { Seo } from '../components/common/Seo';
import { MasterRegistrationForm } from '../components/event/MasterRegistrationForm';

export const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-paper text-ink relative pb-24">
      <Seo
        title="Master Registration | INNOVISION 2026"
        description="Register for 12 IT, Gaming, Strategy and Creative competitions at INNOVISION 2026, The ICFAI University, Sikkim. One unified registration portal."
      />

      {/* Decorative ambient subtle warmth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-marigold-500/5 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Page Header */}
      <div className="relative z-10 pt-28 sm:pt-32 pb-4 sm:pb-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-ink-muted mb-6">
          <Link to="/" className="hover:text-ink transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-marigold-600 font-semibold uppercase tracking-wider">
            MASTER REGISTRATION (TEST B)
          </span>
        </nav>

        {/* Hero Title */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-marigold-50 border border-marigold-200 text-marigold-600 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>All 12 Competitions · One Unified Registration</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-ink tracking-tight leading-[1.05]">
            INNOVISION <span className="text-marigold-600">2026</span>
            <span className="block text-2xl sm:text-4xl text-ink-soft font-semibold mt-1">
              Master Registration Portal
            </span>
          </h1>

          <p className="max-w-2xl text-sm sm:text-base text-ink-muted leading-relaxed">
            Select your events, add your teammates, and generate your official festival entry ticket with institutional waivers applied automatically.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-ink-muted">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Official University Portal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Ticket className="w-4 h-4 text-marigold-600" />
              <span>Free for ICFAI Regular Events</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Open to All Students in Sikkim</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Component */}
      <div className="relative z-10">
        <MasterRegistrationForm />
      </div>
    </div>
  );
};

export default RegisterPage;

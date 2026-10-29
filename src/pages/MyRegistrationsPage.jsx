import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Ticket, 
  Trash2, 
  Download, 
  Calendar, 
  MapPin, 
  ArrowLeft, 
  Sparkles,
  Users
} from 'lucide-react';
import { Seo } from '../components/common/Seo';
import { TiltCard } from '../components/common/TiltCard';

export const MyRegistrationsPage = () => {
  const [passes, setPasses] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('innovision_registrations') || '[]');
      setPasses(stored);
    } catch (e) {
      setPasses([]);
    }
  }, []);

  const handleRemove = (registrationId) => {
    if (window.confirm('Are you sure you want to remove this pass from your device?')) {
      const updated = passes.filter(p => (p.id || p.registrationId) !== registrationId);
      setPasses(updated);
      localStorage.setItem('innovision_registrations', JSON.stringify(updated));
      window.dispatchEvent(new Event('innovision_registration_added'));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
      <Seo 
        title="My Registered Passes" 
        description="View and download your digital event admission passes for INNOVISION 2026."
      />

      <div className="mb-8 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO HOME HUB</span>
        </Link>

        {passes.length > 0 && (
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-md shadow-blue-500/20"
          >
            <Download className="w-4 h-4" />
            <span>Print All Passes</span>
          </button>
        )}
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-400 font-mono text-xs uppercase tracking-widest mb-3">
          <Ticket className="w-3.5 h-3.5 text-blue-400" />
          <span>// CANDIDATE PORTFOLIO</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-wide">
          <span className="text-white">MY EVENT</span> <span className="text-blue-400">PASSES</span>{' '}
          <span className="text-slate-400 text-2xl sm:text-3xl font-mono font-normal">({passes.length})</span>
        </h1>
        <p className="mt-2 font-body text-slate-400 text-sm">
          Digital verification passes stored on your current device browser session.
        </p>
      </div>

      {passes.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl bg-[#0D111C]/80 border border-white/[0.08] max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-500">
            <Ticket className="w-8 h-8" />
          </div>
          <h3 className="font-display text-2xl font-bold text-white">
            No Passes Found
          </h3>
          <p className="font-body text-xs sm:text-sm text-slate-400">
            You haven&apos;t registered for any events yet. Explore our 12 events catalog and confirm your slot!
          </p>
          <Link
            to="/#events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md shadow-blue-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Explore &amp; Register</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {passes.map((pass) => {
            const passId = pass.id || pass.registrationId;
            return (
              <TiltCard
                key={passId}
                className="p-6 sm:p-8 rounded-2xl bg-[#0D111C]/85 border border-white/[0.08] hover:border-white/20 transition-all relative overflow-hidden shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-dashed border-white/10 gap-4 mb-4">
                  <div>
                    <span className="font-mono text-xs text-slate-400 uppercase tracking-widest block mb-1">
                      CONFIRMED CANDIDATE PASS
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                      {pass.eventTitle}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-blue-300 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      {passId}
                    </span>
                    <button
                      onClick={() => handleRemove(passId)}
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                      title="Remove Pass"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Pass Data Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-body text-xs sm:text-sm mb-4">
                  <div>
                    <span className="text-slate-400 block text-[11px] font-mono">PARTICIPANT:</span>
                    <span className="font-semibold text-white">{pass.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] font-mono">ENROLLMENT NO:</span>
                    <span className="font-mono text-slate-200">{pass.enrollmentNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] font-mono">COURSE:</span>
                    <span className="text-slate-200">{pass.course}</span>
                  </div>
                  {pass.teamName && (
                    <div>
                      <span className="text-slate-400 block text-[11px] font-mono">SQUAD NAME:</span>
                      <span className="font-semibold text-white">{pass.teamName}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-400 block text-[11px] font-mono">VENUE:</span>
                    <span className="text-slate-200">{pass.venue}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] font-mono">TIMING:</span>
                    <span className="text-slate-200">{pass.date} ({pass.time})</span>
                  </div>
                </div>

                {/* Additional Team Members if any */}
                {pass.teamMembers && pass.teamMembers.length > 0 && (
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-4">
                    <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
                      TEAM MEMBERS:
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs font-body text-slate-300">
                      {pass.teamMembers.map((m, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Barcode Aesthetic */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="font-mono text-[9px] text-slate-500 tracking-widest">
                    ||| | | |||| || | || |||| | | ||| |
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">
                    VERIFIED INNOVISION ADMISSION TOKEN
                  </span>
                </div>
              </TiltCard>
            );
          })}
        </div>
      )}
    </div>
  );
};

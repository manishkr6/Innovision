import React from 'react';
import { 
  Trophy, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Layers, 
  Phone, 
  MessageSquare, 
  Gift, 
  Sparkles,
  UserCheck
} from 'lucide-react';

export const EventInfoSection = ({ event }) => {
  return (
    <section id="info" className="scroll-mt-36 space-y-12 mb-20">
      
      {/* Section Subheading */}
      <div className="border-b border-white/[0.08] pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-slate-400 block mb-1">
          // SECTION 01
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wide">
          <span className="text-white">EVENT</span> <span className="text-blue-400">OVERVIEW</span>
        </h2>
      </div>

      {/* Main Narrative & Key Specs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Deep Description */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D111C]/80 border border-white/[0.08] space-y-4">
            <h3 className="font-display text-2xl font-bold tracking-wide flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="text-white">ABOUT THE</span> <span className="text-blue-400">COMPETITION</span>
            </h3>
            <p className="font-body text-slate-300 leading-relaxed text-sm sm:text-base">
              {event.fullDesc}
            </p>
          </div>

          {/* Rounds Breakdown */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold tracking-wide flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <span className="text-white">TOURNAMENT</span> <span className="text-indigo-400">FORMAT</span>{' '}
              <span className="text-slate-400 text-sm font-mono font-normal">({event.rounds.length} Rounds)</span>
            </h3>

            <div className="space-y-4">
              {event.rounds.map((round) => (
                <div
                  key={round.roundNumber}
                  className="p-5 sm:p-6 rounded-2xl bg-[#0D111C]/80 border border-white/[0.08] hover:border-white/20 transition-all relative overflow-hidden group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 text-white font-mono text-xs font-bold flex items-center justify-center">
                        R{round.roundNumber}
                      </span>
                      <h4 className="font-display text-xl font-bold text-white">
                        {round.title}
                      </h4>
                    </div>

                    <span className="font-mono text-xs text-slate-300 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 self-start sm:self-auto">
                      Duration: {round.duration}
                    </span>
                  </div>

                  <p className="font-body text-xs sm:text-sm text-slate-400 leading-relaxed pl-0 sm:pl-11">
                    {round.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Quick Facts & Coordinator Cards */}
        <div className="space-y-6">
          
          {/* Key Quick Facts Box */}
          <div className="p-6 rounded-2xl bg-[#0D111C]/80 border border-white/[0.08] space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-slate-400 font-semibold">
              // AT A GLANCE
            </h4>

            <div className="space-y-3 font-body text-sm divide-y divide-white/[0.06]">
              <div className="pt-2 flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Team Size:</span>
                <span className="font-mono font-semibold text-white">{event.teamSize.label}</span>
              </div>
              <div className="pt-2 flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Date:</span>
                <span className="font-mono font-semibold text-white">{event.date.split('-')[0]}</span>
              </div>
              <div className="pt-2 flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Timing:</span>
                <span className="font-mono font-semibold text-white">{event.time}</span>
              </div>
              <div className="pt-2 flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Venue:</span>
                <span className="font-mono font-semibold text-white text-right max-w-[180px] truncate">{event.venue}</span>
              </div>
              <div className="pt-2 flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Registration Fee:</span>
                <span className="font-mono font-bold text-emerald-400">{event.registrationFee}</span>
              </div>
            </div>
          </div>

          {/* Prizes & Awards */}
          <div className="p-6 rounded-2xl bg-[#0D111C]/80 border border-white/[0.08] space-y-4">
            <h4 className="font-display text-xl font-bold tracking-wide flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span className="text-white">PRIZES &amp;</span> <span className="text-amber-400">RECOGNITION</span>
            </h4>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
                <span className="font-mono text-lg font-bold text-amber-400">1st</span>
                <div className="text-xs">
                  <span className="font-semibold text-white block">Winner</span>
                  <span className="text-slate-300">{event.prizes.first}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-300/10 border border-slate-400/20 flex items-center gap-3">
                <span className="font-mono text-lg font-bold text-slate-200">2nd</span>
                <div className="text-xs">
                  <span className="font-semibold text-white block">1st Runner Up</span>
                  <span className="text-slate-300">{event.prizes.second}</span>
                </div>
              </div>

              {event.prizes.third && (
                <div className="p-3 rounded-xl bg-amber-700/10 border border-amber-700/20 flex items-center gap-3">
                  <span className="font-mono text-lg font-bold text-amber-500">3rd</span>
                  <div className="text-xs">
                    <span className="font-semibold text-white block">2nd Runner Up</span>
                    <span className="text-slate-300">{event.prizes.third}</span>
                  </div>
                </div>
              )}

              {(event.prizes.all || event.prizes.participation) && (
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-blue-400">All</span>
                  <div className="text-xs">
                    <span className="font-semibold text-white block">All Participants</span>
                    <span className="text-slate-300">{event.prizes.all || event.prizes.participation}</span>
                  </div>
                </div>
              )}
            </div>

            {event.prizes.perks && event.prizes.perks.length > 0 && (
              <div className="pt-2 border-t border-white/[0.06]">
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
                  Additional Perks:
                </span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {event.prizes.perks.map((perk, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Assigned Coordinators */}
          <div className="p-6 rounded-2xl bg-[#0D111C]/80 border border-white/[0.08] space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-slate-400 flex items-center gap-1.5 font-semibold">
              <UserCheck className="w-4 h-4 text-blue-400" />
              // EVENT COORDINATORS
            </h4>

            {/* Faculty Coordinator */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">
                    Faculty In-Charge
                  </span>
                  <span className="font-display text-base font-bold text-white">
                    {event.coordinators.faculty}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${(event.coordinators?.facultyPhone || '').replace(/\s+/g, '')}`}
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 transition-colors border border-white/10"
                    title="Call Faculty Coordinator"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-400" />
                  </a>
                  <a
                    href={`https://wa.me/${(event.coordinators?.facultyPhone || '').replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-emerald-950/40 hover:bg-emerald-950/60 text-emerald-300 transition-colors border border-emerald-800/50"
                    title="WhatsApp Message"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  </a>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-400 block">
                {event.coordinators?.facultyPhone}
              </span>
            </div>

            {/* Student Coordinator */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">
                    Student Lead
                  </span>
                  <span className="font-display text-base font-bold text-white">
                    {event.coordinators?.student}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${(event.coordinators?.studentPhone || '').replace(/\s+/g, '')}`}
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 transition-colors border border-white/10"
                    title="Call Student Coordinator"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-400" />
                  </a>
                  <a
                    href={`https://wa.me/${(event.coordinators?.studentPhone || '').replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-emerald-950/40 hover:bg-emerald-950/60 text-emerald-300 transition-colors border border-emerald-800/50"
                    title="WhatsApp Message"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  </a>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-400 block">
                {event.coordinators?.studentPhone}
              </span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

import React from 'react';
import { 
  Trophy, 
  Layers, 
  Phone, 
  MessageSquare, 
  Gift, 
  Sparkles,
  UserCheck
} from 'lucide-react';

export const EventInfoSection = ({ event }) => {
  return (
    <section id="info" className="scroll-mt-36 space-y-10 mb-20">
      
      {/* Section Subheading */}
      <div className="border-b border-gray-200 pb-4">
        <span className="text-xs font-semibold text-marigold-600 uppercase tracking-wider block mb-1">
          Section 01
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Event Overview
        </h2>
      </div>

      {/* Main Narrative & Key Specs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Deep Description */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-heading text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-marigold-600" />
              <span>About the Competition</span>
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {event.fullDesc}
            </p>
          </div>

          {/* Rounds Breakdown */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-gray-900" />
              <span>Tournament Format</span>{' '}
              <span className="text-gray-500 text-sm font-normal">({event.rounds.length} Rounds)</span>
            </h3>

            <div className="space-y-4">
              {event.rounds.map((round) => (
                <div
                  key={round.roundNumber}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md transition-all relative overflow-hidden group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-gray-100 border border-gray-200 text-gray-900 font-bold text-xs flex items-center justify-center">
                        R{round.roundNumber}
                      </span>
                      <h4 className="font-heading text-lg sm:text-xl font-bold text-gray-900">
                        {round.title}
                      </h4>
                    </div>

                    <span className="text-xs font-medium text-gray-600 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 self-start sm:self-auto">
                      Duration: {round.duration}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-0 sm:pl-11">
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
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-gray-500 font-semibold font-mono">
              // At a Glance
            </h4>

            <div className="space-y-3 text-sm divide-y divide-gray-100">
              <div className="pt-2 flex items-center justify-between">
                <span className="text-gray-500">Team Size:</span>
                <span className="font-semibold text-gray-900">{event.teamSize.label}</span>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-gray-500">Date:</span>
                <span className="font-semibold text-gray-900">{event.date.split('-')[0]}</span>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-gray-500">Timing:</span>
                <span className="font-semibold text-gray-900">{event.time}</span>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-gray-500">Venue:</span>
                <span className="font-semibold text-gray-900 text-right max-w-[180px] truncate">{event.venue}</span>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-gray-500">Registration Fee:</span>
                <span className="font-bold text-emerald-700">{event.registrationFee}</span>
              </div>
            </div>
          </div>

          {/* Prizes & Awards */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4">
            <h4 className="font-heading text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <Trophy className="w-5 h-5 text-marigold-500" />
              <span>Prizes &amp; Recognition</span>
            </h4>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-amber-100 border border-amber-300 text-amber-800 font-bold text-sm flex items-center justify-center shrink-0">
                  1st
                </span>
                <div className="text-xs">
                  <span className="font-bold text-gray-900 block">Winner</span>
                  <span className="text-gray-600">{event.prizes.first}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-gray-200 border border-gray-300 text-gray-700 font-bold text-sm flex items-center justify-center shrink-0">
                  2nd
                </span>
                <div className="text-xs">
                  <span className="font-bold text-gray-900 block">1st Runner Up</span>
                  <span className="text-gray-600">{event.prizes.second}</span>
                </div>
              </div>

              {event.prizes.third && (
                <div className="p-3.5 rounded-xl bg-amber-50/40 border border-amber-200/50 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-amber-100/70 border border-amber-300/60 text-amber-900 font-bold text-sm flex items-center justify-center shrink-0">
                    3rd
                  </span>
                  <div className="text-xs">
                    <span className="font-bold text-gray-900 block">2nd Runner Up</span>
                    <span className="text-gray-600">{event.prizes.third}</span>
                  </div>
                </div>
              )}

              {(event.prizes.all || event.prizes.participation) && (
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                    All
                  </span>
                  <div className="text-xs">
                    <span className="font-bold text-gray-900 block">All Participants</span>
                    <span className="text-gray-600">{event.prizes.all || event.prizes.participation}</span>
                  </div>
                </div>
              )}
            </div>

            {event.prizes.perks && event.prizes.perks.length > 0 && (
              <div className="pt-3 border-t border-gray-100">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-2 font-mono">
                  Additional Perks:
                </span>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  {event.prizes.perks.map((perk, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Gift className="w-3.5 h-3.5 text-marigold-600 shrink-0" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Assigned Coordinators */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-gray-500 flex items-center gap-2 font-semibold font-mono">
              <UserCheck className="w-4 h-4 text-gray-700" />
              <span>// Event Coordinators</span>
            </h4>

            {/* Faculty Coordinator */}
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-medium">
                    Faculty In-Charge
                  </span>
                  <span className="font-heading text-base font-bold text-gray-900">
                    {event.coordinators.faculty}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${(event.coordinators?.facultyPhone || '').replace(/\s+/g, '')}`}
                    className="p-2 rounded-lg bg-white hover:bg-gray-100 text-gray-700 transition-colors border border-gray-200 shadow-xs"
                    title="Call Faculty Coordinator"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`https://wa.me/${(event.coordinators?.facultyPhone || '').replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors border border-emerald-200 shadow-xs"
                    title="WhatsApp Message"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
              <span className="text-xs text-gray-500 block">
                {event.coordinators?.facultyPhone}
              </span>
            </div>

            {/* Student Coordinator */}
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-medium">
                    Student Lead
                  </span>
                  <span className="font-heading text-base font-bold text-gray-900">
                    {event.coordinators?.student}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${(event.coordinators?.studentPhone || '').replace(/\s+/g, '')}`}
                    className="p-2 rounded-lg bg-white hover:bg-gray-100 text-gray-700 transition-colors border border-gray-200 shadow-xs"
                    title="Call Student Coordinator"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`https://wa.me/${(event.coordinators?.studentPhone || '').replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors border border-emerald-200 shadow-xs"
                    title="WhatsApp Message"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
              <span className="text-xs text-gray-500 block">
                {event.coordinators?.studentPhone}
              </span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

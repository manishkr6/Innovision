import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Users, 
  Search, 
  X, 
  GraduationCap, 
  ExternalLink,
  Sparkles,
  Headphones
} from 'lucide-react';
import { FACULTY_COORDINATORS, STUDENT_REPRESENTATIVES } from '../../data/events';
import { TiltCard } from '../common/TiltCard';

export const ContactSection = () => {
  const [filterType, setFilterType] = useState('all');
  const [search, setSearch] = useState('');

  const matchesSearch = (item) => {
    const query = search.toLowerCase().trim();
    if (!query) return true;
    return (
      item.name.toLowerCase().includes(query) ||
      (item.role && item.role.toLowerCase().includes(query)) ||
      (item.badge && item.badge.toLowerCase().includes(query)) ||
      item.phone.includes(query)
    );
  };

  const filteredFaculty = filterType === 'students' ? [] : FACULTY_COORDINATORS.filter(matchesSearch);
  const filteredStudents = filterType === 'faculty' ? [] : STUDENT_REPRESENTATIVES.filter(matchesSearch);

  const getBadgeStyle = (badge) => {
    const b = (badge || '').toLowerCase();
    if (b.includes('tech') || b.includes('coding') || b.includes('systems') || b.includes('hackathon')) {
      return 'bg-blue-950/70 border-blue-700/50 text-blue-300';
    }
    if (b.includes('esports') || b.includes('gaming')) {
      return 'bg-indigo-950/70 border-indigo-700/50 text-indigo-300';
    }
    if (b.includes('design') || b.includes('creative') || b.includes('media') || b.includes('pr')) {
      return 'bg-purple-950/70 border-purple-700/50 text-purple-300';
    }
    return 'bg-slate-800/70 border-slate-600/50 text-slate-300';
  };

  return (
    <section id="contact" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/40 border border-blue-700/40 text-blue-300 font-mono text-xs uppercase tracking-widest mb-3 shadow-md"
        >
          <Headphones className="w-3.5 h-3.5 text-blue-400" />
          <span>// DIRECTORY &amp; HELPDESK</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl sm:text-6xl font-black tracking-wide uppercase"
        >
          <span className="text-white">CONTACT &amp;</span>{' '}
          <span className="text-blue-400">COMMITTEE</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 font-body text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed"
        >
          Have questions regarding event rules, reporting timings, or team registrations? Reach out directly to our appointed faculty coordinators and student leads via phone or WhatsApp.
        </motion.p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 pb-6 border-b border-white/[0.12]">
        
        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0C1220]/80 border border-white/10 backdrop-blur-xl w-full sm:w-auto overflow-x-auto shadow-inner">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
              filterType === 'all'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-md shadow-blue-600/30 border border-blue-400/30'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            <span>All Contacts</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${filterType === 'all' ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-slate-400'}`}>
              {FACULTY_COORDINATORS.length + STUDENT_REPRESENTATIVES.length}
            </span>
          </button>

          <button
            onClick={() => setFilterType('faculty')}
            className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
              filterType === 'faculty'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-md shadow-blue-600/30 border border-blue-400/30'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            <span>Faculty Leads</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${filterType === 'faculty' ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-slate-400'}`}>
              {FACULTY_COORDINATORS.length}
            </span>
          </button>

          <button
            onClick={() => setFilterType('students')}
            className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
              filterType === 'students'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-md shadow-blue-600/30 border border-blue-400/30'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            <span>Student Reps</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${filterType === 'students' ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-slate-400'}`}>
              {STUDENT_REPRESENTATIVES.length}
            </span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, role or phone..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#0C1220]/80 backdrop-blur-xl border border-white/15 text-slate-100 placeholder-slate-400 font-body text-xs sm:text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* SECTION 1: FACULTY COORDINATORS */}
      {filteredFaculty.length > 0 && (
        <div className="mb-14 space-y-6">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-blue-400" />
            <h3 className="font-display text-2xl font-bold uppercase tracking-wide">
              <span className="text-white">FACULTY</span> <span className="text-blue-400">COORDINATORS</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaculty.map((coord, idx) => (
              <motion.div
                key={coord.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <TiltCard className="p-6 rounded-2xl bg-gradient-to-b from-[#0F1628]/90 via-[#0C1222]/85 to-[#090D18]/90 backdrop-blur-xl border border-white/[0.12] hover:border-blue-400/40 hover:bg-[#11192E]/95 shadow-xl hover:shadow-[0_14px_32px_-8px_rgba(30,58,138,0.3)] transition-all flex flex-col justify-between h-full group relative overflow-hidden">
                  {/* Top subtle highlight line */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-400/30 flex items-center justify-center font-display text-lg font-bold text-blue-200 shadow-md group-hover:scale-105 transition-transform">
                        {coord.name.split(' ')[1]?.[0] || 'F'}
                      </div>

                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-300 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-600/40 shadow-sm">
                        Faculty Lead
                      </span>
                    </div>

                    <h4 className="font-display text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {coord.name}
                    </h4>
                    <p className="font-mono text-xs text-blue-400/90 font-medium mt-0.5">
                      {coord.role}
                    </p>
                    <p className="font-body text-xs text-slate-300 mt-1">
                      {coord.department}
                    </p>
                  </div>

                  {/* Contact Buttons */}
                  <div className="pt-4 mt-5 border-t border-white/[0.08] space-y-2">
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${coord.phone}`}
                        className="flex-1 py-2 px-3 rounded-xl bg-white/[0.05] hover:bg-blue-600 border border-white/10 hover:border-blue-500 text-slate-200 hover:text-white font-mono text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm group/btn"
                      >
                        <Phone className="w-3.5 h-3.5 text-blue-400 group-hover/btn:text-white" />
                        <span>Call</span>
                      </a>
                      <a
                        href={`https://wa.me/${coord.cleanPhone || coord.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2 px-3 rounded-xl bg-emerald-950/50 hover:bg-emerald-600 border border-emerald-700/50 hover:border-emerald-500 text-emerald-300 hover:text-white font-mono text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm group/btn"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400 group-hover/btn:text-white" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: STUDENT REPRESENTATIVES */}
      {filteredStudents.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-indigo-400" />
            <h3 className="font-display text-2xl font-bold uppercase tracking-wide">
              <span className="text-white">STUDENT</span> <span className="text-indigo-400">REPRESENTATIVES</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredStudents.map((student, idx) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
              >
                <div className="p-4 rounded-xl bg-gradient-to-b from-[#0E1424]/90 to-[#0A0E1A]/95 backdrop-blur-xl border border-white/[0.12] hover:border-blue-400/40 hover:bg-[#11182C]/95 transition-all duration-300 flex flex-col justify-between h-full group shadow-md hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-mono text-[9px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full border shadow-sm ${getBadgeStyle(student.badge)}`}>
                        {student.badge}
                      </span>
                    </div>

                    <h5 className="font-display text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                      {student.name}
                    </h5>
                    <p className="font-mono text-xs text-blue-400/80 font-medium mt-0.5">
                      {student.role}
                    </p>
                    <p className="font-mono text-[11px] text-slate-400 mt-1">
                      {student.phone}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/[0.08] flex items-center gap-1.5">
                    <a
                      href={`tel:${student.phone}`}
                      className="flex-1 py-1.5 rounded-lg bg-white/[0.05] hover:bg-blue-600 text-slate-200 hover:text-white font-mono text-[11px] flex items-center justify-center gap-1 transition-all border border-white/10 hover:border-blue-500 shadow-sm"
                    >
                      <Phone className="w-3 h-3 text-blue-400" />
                      <span>Call</span>
                    </a>
                    <a
                      href={`https://wa.me/${student.cleanPhone || student.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-1.5 rounded-lg bg-emerald-950/50 hover:bg-emerald-600 text-emerald-300 hover:text-white font-mono text-[11px] flex items-center justify-center gap-1 transition-all border border-emerald-700/50 hover:border-emerald-500 shadow-sm"
                    >
                      <MessageSquare className="w-3 h-3 text-emerald-400" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
};

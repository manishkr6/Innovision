import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Ticket, 
  Download, 
  X, 
  Calendar, 
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const RegistrationSuccessModal = ({ isOpen, onClose, registrationData, event }) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#3B82F6', '#6366F1', '#10B981', '#F59E0B'],
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  if (!isOpen || !registrationData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-xl rounded-3xl bg-[#0D111C] border border-white/10 p-6 sm:p-8 text-center my-8 shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Success Icon */}
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <h3 className="font-display text-3xl font-extrabold uppercase text-white tracking-wide">
            Registration Confirmed!
          </h3>
          <p className="font-body text-xs sm:text-sm text-slate-400 mt-1">
            Your spot for <span className="text-white font-semibold">{event.title}</span> has been confirmed.
          </p>

          {/* Digital Pass Card */}
          <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-left relative overflow-hidden shadow-sm">
            
            {/* Top Pass Strip */}
            <div className="flex items-center justify-between pb-3 border-b border-dashed border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-blue-400" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  INNOVISION 2026 // PASS
                </span>
              </div>
              <span className="font-mono text-xs text-blue-300 font-bold px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30">
                {registrationData.id}
              </span>
            </div>

            {/* Pass Content Details */}
            <div className="space-y-3 font-body text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Event:</span>
                <span className="font-semibold text-white text-right">{event.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Candidate:</span>
                <span className="font-semibold text-slate-200">{registrationData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Enrollment / ID:</span>
                <span className="font-mono text-slate-200">{registrationData.enrollmentNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Course &amp; Semester:</span>
                <span className="text-slate-200">{registrationData.course}</span>
              </div>

              {registrationData.teamName && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Team:</span>
                  <span className="font-semibold text-white">{registrationData.teamName}</span>
                </div>
              )}

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{event.date.split('-')[0]}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span className="max-w-[150px] truncate">{event.venue}</span>
                </div>
              </div>
            </div>

            {/* Bottom Barcode Aesthetic */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-1 font-mono text-[9px] text-slate-500 tracking-widest">
                <span>||| | | |||| || | || |||| | |</span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">
                SAVED TO LOCALSTORAGE
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Download / Print Pass</span>
            </button>

            <Link
              to="/passes"
              className="flex-1 py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 hover:text-white font-mono text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4 text-slate-300" />
              <span>View All My Passes</span>
            </Link>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Ticket, 
  Download, 
  X, 
  Calendar, 
  MapPin,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { FEST_INFO } from '../../data/events';
import { downloadPassPdf } from '../../lib/passPdf';
import { getFeeStatus } from '../../lib/feeRules';

export const RegistrationSuccessModal = ({ isOpen, onClose, registrationData, event }) => {
  const [downloadState, setDownloadState] = useState('idle');

  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#C2410C', '#2456A6', '#2F7D4F', '#D99A0B'],
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  if (!isOpen || !registrationData) return null;

  const handleDownload = async () => {
    setDownloadState('working');
    try {
      await downloadPassPdf(registrationData);
      setDownloadState('idle');
    } catch (e) {
      console.error(e);
      setDownloadState('failed');
    }
  };

  const alreadyRegistered = registrationData.alreadyRegistered;
  const feeStatus = registrationData.feeStatus || getFeeStatus(registrationData, event);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-xl rounded-3xl bg-white border border-gray-200 p-6 sm:p-8 text-center my-8 shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 hover:text-gray-900 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Success Icon */}
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            {alreadyRegistered ? "You're Already Registered" : 'Registration Confirmed!'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {alreadyRegistered
              ? <>Here is your existing pass for <span className="text-gray-900 font-semibold">{event.title}</span>.</>
              : <>Your spot for <span className="text-gray-900 font-semibold">{event.title}</span> has been confirmed.</>}
          </p>

          {/* Digital Pass Card */}
          <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-gray-50 border border-gray-200 text-left relative overflow-hidden shadow-xs">
            
            {/* Top Pass Strip */}
            <div className="flex items-center justify-between pb-3 border-b border-dashed border-gray-200 mb-4">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-marigold-600" />
                <span className="font-mono text-xs font-bold text-gray-900 uppercase tracking-wider">
                  INNOVISION 2026 // PASS
                </span>
              </div>
              <span className="font-mono text-xs text-gray-900 font-bold px-2.5 py-0.5 rounded bg-white border border-gray-200">
                {registrationData.id}
              </span>
            </div>

            {/* Pass Content Details */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Event:</span>
                <span className="font-semibold text-gray-900 text-right">{event.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{registrationData.teamName ? 'Team leader:' : 'Participant:'}</span>
                <span className="font-semibold text-gray-900">{registrationData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Enrollment / ID:</span>
                <span className="font-mono text-gray-900">{registrationData.enrollmentNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">College:</span>
                <span className="text-gray-900 text-right">{registrationData.college}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Course &amp; Semester:</span>
                <span className="text-gray-900">{registrationData.course}</span>
              </div>

              {registrationData.teamName && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Team:</span>
                  <span className="font-semibold text-gray-900">{registrationData.teamName}</span>
                </div>
              )}

              <div className="flex justify-between items-center gap-2">
                <span className="text-gray-500">Fee Status:</span>
                <span className="font-semibold text-gray-900 text-right">{feeStatus}</span>
              </div>

              <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500 font-medium">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>{FEST_INFO.dateString}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span className="max-w-[190px] truncate">{FEST_INFO.university}</span>
                </div>
              </div>
            </div>

          </div>

          <p className="mt-4 text-xs text-gray-500">
            Save your pass now and bring it with a valid college ID. {registrationData.teamName && 'This one pass covers your whole team.'}
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDownload}
              disabled={downloadState === 'working'}
              className="flex-1 py-3 px-4 rounded-full bg-black hover:bg-gray-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:bg-gray-400"
            >
              {downloadState === 'working' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span>Download Pass (PDF)</span>
            </button>

            <Link
              to="/passes"
              className="flex-1 py-3 px-4 rounded-full bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 hover:text-gray-900 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Ticket className="w-4 h-4 text-gray-500" />
              <span>View All My Passes</span>
            </Link>
          </div>

          {downloadState === 'failed' && (
            <p role="alert" className="mt-3 text-xs text-rose-600 font-medium">
              The PDF could not be created. Your registration is saved: note your token {registrationData.id} and try again from My Passes.
            </p>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

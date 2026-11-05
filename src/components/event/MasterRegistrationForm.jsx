import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserCheck, 
  Mail, 
  Phone, 
  GraduationCap, 
  Hash, 
  Users, 
  Plus, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  Gamepad2, 
  Sparkles, 
  Building2, 
  Receipt, 
  Check, 
  Copy, 
  ChevronRight,
  Ticket,
  Printer,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EVENTS } from '../../data/events';
import { TRACKS, trackOf, splitTitle } from '../../data/eventUtils';
import { INSTITUTIONS } from '../../data/institutions';

export const MasterRegistrationForm = () => {
  // -------------------------------------------------------------
  // Step 1: Selected Events State
  // -------------------------------------------------------------
  const [selectedSlugs, setSelectedSlugs] = useState([]);
  const [categoryNotice, setCategoryNotice] = useState(null);

  // Group events by Esports (Track C) vs Regular (Track A, B, D)
  const { regularEvents, esportsEvents } = useMemo(() => {
    const regular = [];
    const esports = [];
    EVENTS.forEach((e) => {
      const isEsports = trackOf(e) === 'C';
      if (isEsports) esports.push(e);
      else regular.push(e);
    });
    return { regularEvents: regular, esportsEvents: esports };
  }, []);

  const selectedEvents = useMemo(() => {
    return EVENTS.filter((e) => selectedSlugs.includes(e.slug));
  }, [selectedSlugs]);

  const hasEsportsSelected = useMemo(() => {
    return selectedEvents.some((e) => trackOf(e) === 'C');
  }, [selectedEvents]);

  const hasRegularSelected = useMemo(() => {
    return selectedEvents.some((e) => trackOf(e) !== 'C');
  }, [selectedEvents]);

  // Handle Event Selection with Category Mutex Rule:
  // "Users cannot mix esports events (which take all day) with regular events."
  const toggleEvent = (event) => {
    const isEsports = trackOf(event) === 'C';
    const isAlreadySelected = selectedSlugs.includes(event.slug);

    if (isAlreadySelected) {
      setSelectedSlugs((prev) => prev.filter((s) => s !== event.slug));
      setCategoryNotice(null);
      return;
    }

    // Check conflict rules
    if (isEsports && hasRegularSelected) {
      setCategoryNotice({
        type: 'error',
        message: 'Esports tournaments run all day and cannot be mixed with regular fest events. Deselect regular events first to choose an esports tournament.',
      });
      return;
    }

    if (!isEsports && hasEsportsSelected) {
      setCategoryNotice({
        type: 'error',
        message: 'Full-day esports tournaments run all day and cannot be mixed with regular events. Deselect your esports tournament first to pick regular competitions.',
      });
      return;
    }

    // Add event
    setSelectedSlugs((prev) => [...prev, event.slug]);
    setCategoryNotice(null);
  };

  // Switch category helper
  const handleClearCategory = (targetCategory) => {
    setSelectedSlugs((prev) =>
      prev.filter((slug) => {
        const ev = EVENTS.find((e) => e.slug === slug);
        if (!ev) return false;
        const isEsp = trackOf(ev) === 'C';
        return targetCategory === 'esports' ? isEsp : !isEsp;
      })
    );
    setCategoryNotice(null);
  };

  // -------------------------------------------------------------
  // Step 2 & 3: Form Data (Personal + Team)
  // -------------------------------------------------------------
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    enrollmentNumber: '',
    isIcfaiStudent: true, // Crucial field: default to true
    college: 'The ICFAI University, Sikkim',
    otherCollege: '',
    teamName: '',
    teamMembers: [],
    website: '', // honeypot
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedPayload, setSubmittedPayload] = useState(null);
  const [copiedPayload, setCopiedPayload] = useState(false);

  // Determine if any selected event requires/allows a team
  const teamEvents = useMemo(() => {
    return selectedEvents.filter((e) => e.teamSize && e.teamSize.max > 1);
  }, [selectedEvents]);

  const hasTeamEvents = teamEvents.length > 0;

  // Maximum team size required among selected events
  const maxTeamCapacity = useMemo(() => {
    if (!hasTeamEvents) return 1;
    return Math.max(...teamEvents.map((e) => e.teamSize.max || 1));
  }, [teamEvents, hasTeamEvents]);

  const minTeamRequired = useMemo(() => {
    if (!hasTeamEvents) return 1;
    return Math.max(...teamEvents.map((e) => e.teamSize.min || 1));
  }, [teamEvents, hasTeamEvents]);

  // Dynamic team members management
  const handleAddMember = () => {
    if (formData.teamMembers.length < maxTeamCapacity - 1) {
      setFormData((prev) => ({
        ...prev,
        teamMembers: [...prev.teamMembers, { name: '', enrollment: '' }],
      }));
    }
  };

  const handleRemoveMember = (idx) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== idx),
    }));
  };

  const handleMemberChange = (idx, field, val) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.map((m, i) => (i === idx ? { ...m, [field]: val } : m)),
    }));
  };

  // -------------------------------------------------------------
  // Validation & Submission (Invoice generated upon submit)
  // -------------------------------------------------------------
  const validateForm = () => {
    const errs = {};

    if (selectedEvents.length === 0) {
      errs.events = 'Please select at least one event to register.';
    }

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      errs.fullName = 'Full name must be at least 3 letters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(phoneDigits.replace(/^(?:91|0)(?=\d{10}$)/, ''))) {
      errs.phone = 'Please enter a valid 10-digit Indian phone number.';
    }

    if (!formData.course.trim()) {
      errs.course = 'Please enter your course and semester.';
    }

    if (!formData.enrollmentNumber.trim()) {
      errs.enrollmentNumber = 'Please enter your university enrollment / roll number.';
    }

    if (!formData.isIcfaiStudent) {
      if (!formData.college.trim()) {
        errs.college = 'Please select your college or university.';
      } else if (formData.college === 'Other' && !formData.otherCollege.trim()) {
        errs.otherCollege = 'Please type your college or university name.';
      }
    }

    // Team validation if a team event strictly requires teammates
    if (hasTeamEvents) {
      if (minTeamRequired > 1 && !formData.teamName.trim()) {
        errs.teamName = 'Team name is required for team competitions.';
      }

      // Check required minimum additional teammates
      const requiredTeammates = minTeamRequired - 1;
      if (formData.teamMembers.length < requiredTeammates) {
        errs.teamMembers = `This event requires a team of at least ${minTeamRequired} members (add ${requiredTeammates - formData.teamMembers.length} more teammate${requiredTeammates - formData.teamMembers.length > 1 ? 's' : ''}).`;
      } else {
        const incomplete = formData.teamMembers.some((m) => !m.name.trim() || !m.enrollment.trim());
        if (incomplete) {
          errs.teamMembers = 'Please fill in both name and enrollment number for all teammates.';
        }
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Spam trap
    if (formData.website) {
      return;
    }

    if (!validateForm()) {
      // Scroll to the first error smoothly
      const firstErrorEl = document.querySelector('[data-error="true"]');
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Calculate invoice at time of submission
    const baseRate = 100;
    let subtotal = selectedEvents.length * baseRate;
    let totalWaiver = 0;

    const items = selectedEvents.map((event) => {
      const isEsports = trackOf(event) === 'C';
      let eventFee = baseRate;
      let waiver = 0;
      let isFree = false;

      // Fee Rules:
      // Base fee is ₹100 per event.
      // If user IS ICFAI student: regular events are ₹0 (Free), esports events are ₹100 each.
      // If user is NOT ICFAI student: all events (regular & esports) cost ₹100 each.
      if (formData.isIcfaiStudent && !isEsports) {
        eventFee = 0;
        waiver = baseRate;
        totalWaiver += waiver;
        isFree = true;
      }

      return {
        slug: event.slug,
        title: event.title,
        track: event.track,
        category: event.category,
        isEsports,
        baseRate,
        waiver,
        eventFee,
        isFree,
      };
    });

    const totalFee = Math.max(0, subtotal - totalWaiver);

    const finalCollege = formData.isIcfaiStudent
      ? 'The ICFAI University, Sikkim'
      : formData.college === 'Other'
      ? formData.otherCollege.trim()
      : formData.college;

    const payload = {
      registrationId: `IV26-MASTER-${Date.now().toString(36).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      isIcfaiStudent: formData.isIcfaiStudent,
      formData: {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        college: finalCollege,
        course: formData.course.trim(),
        enrollmentNumber: formData.enrollmentNumber.trim(),
        teamName: hasTeamEvents ? formData.teamName.trim() : null,
        teamMembers: hasTeamEvents
          ? formData.teamMembers.map((m) => ({
              name: m.name.trim(),
              enrollment: m.enrollment.trim(),
            }))
          : [],
      },
      selectedEvents: items.map((it) => ({
        slug: it.slug,
        title: it.title,
        track: it.track,
        isEsports: it.isEsports,
        baseRate: it.baseRate,
        waiver: it.waiver,
        fee: it.eventFee,
        isFree: it.isFree,
      })),
      invoice: {
        subtotal,
        totalWaiver,
        totalFee,
        currency: 'INR',
        items,
        eventCount: items.length,
      },
    };

    // Prevent default submission (ready to connect to Google Apps Script)
    console.log('✅ INNOVISION 2026 Master Registration Payload Generated:', payload);
    setSubmittedPayload(payload);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#EA580C', '#C2410C', '#3B82F6', '#10B981'],
      });
    } catch {
      // confetti fallback
    }
  };

  const handleCopyPayload = () => {
    if (submittedPayload) {
      navigator.clipboard.writeText(JSON.stringify(submittedPayload, null, 2));
      setCopiedPayload(true);
      setTimeout(() => setCopiedPayload(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <form onSubmit={handleSubmit} noValidate className="space-y-8 sm:space-y-10">
        
        {/* ========================================================= */}
        {/* STEP 1: EVENT SELECTION GRID                              */}
        {/* ========================================================= */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-marigold-50 border border-marigold-200 text-marigold-600 font-heading font-extrabold text-xs flex items-center justify-center">
                  01
                </span>
                <span className="text-xs uppercase tracking-wider font-semibold text-marigold-600">
                  Step 1
                </span>
              </div>
              <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Select Your Competitions
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-gray-600">
                Choose the events you wish to enter. All-day esports tournaments cannot be mixed with regular tracks.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3.5 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700">
                Selected: <span className="text-marigold-600 font-bold">{selectedSlugs.length}</span> / 12
              </span>
            </div>
          </div>

          {/* Category Mutex Warning / Banner */}
          <AnimatePresence>
            {categoryNotice && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-xs sm:text-sm"
              >
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">{categoryNotice.message}</p>
                </div>
              </motion.div>
            )}

            {hasEsportsSelected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between gap-3 text-xs text-purple-900"
              >
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>
                    <strong>Esports Mode Active:</strong> Full-day parallel tournament bracket. Regular events disabled.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleClearCategory('regular')}
                  className="px-3 py-1 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-800 text-[11px] font-semibold border border-purple-300 transition-colors cursor-pointer"
                >
                  Clear Esports
                </button>
              </motion.div>
            )}

            {hasRegularSelected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3.5 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-between gap-3 text-xs text-cyan-900"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>
                    <strong>Regular Fest Track Active:</strong> You can select multiple regular events across Tech, Strategy, and Arts.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleClearCategory('esports')}
                  className="px-3 py-1 rounded-lg bg-cyan-100 hover:bg-cyan-200 text-cyan-800 text-[11px] font-semibold border border-cyan-300 transition-colors cursor-pointer"
                >
                  Clear Regular
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Group 1: Regular Competitions (Tracks A, B, D) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-sm font-bold text-gray-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                Regular Fest Competitions (Technical, Strategy, Creative)
              </h3>
              <span className="text-[11px] text-gray-500 font-medium">9 Events Available</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {regularEvents.map((event) => {
                const isSelected = selectedSlugs.includes(event.slug);
                const isDisabled = hasEsportsSelected;
                const track = TRACKS[trackOf(event)];
                const [name] = splitTitle(event.title);

                return (
                  <button
                    key={event.slug}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => toggleEvent(event)}
                    className={`relative p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all duration-200 group cursor-pointer ${
                      isSelected
                        ? 'bg-marigold-50/80 border-marigold-500 text-gray-900 shadow-sm ring-2 ring-marigold-500'
                        : isDisabled
                        ? 'bg-gray-50/50 border-gray-100 opacity-40 cursor-not-allowed text-gray-400'
                        : 'bg-gray-50/70 border-gray-200 hover:border-gray-300 hover:bg-white text-gray-800'
                    }`}
                  >
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-gray-200 bg-gray-100">
                      <img
                        src={event.image}
                        alt={name}
                        loading="lazy"
                        className={`w-full h-full object-cover transition-transform duration-300 ${
                          isSelected ? 'scale-105' : 'group-hover:scale-105'
                        }`}
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-marigold-600/80 flex items-center justify-center">
                          <Check className="w-5 h-5 text-white stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-heading font-bold text-xs sm:text-sm text-gray-900 truncate leading-snug">
                          {name}
                        </span>
                        {track && (
                          <span className={`px-1.5 py-0.2 rounded text-[9px] font-semibold leading-tight ${track.chip}`}>
                            {track.label}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 truncate mt-0.5">
                        {event.teamSize?.label || 'Individual Entry'}
                      </p>
                      <div className="mt-1 text-[10px] text-gray-500 font-medium">
                        <span>{event.genre || 'Fest Competition'}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 2: Esports Arena (Track C) */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-sm font-bold text-purple-900 flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-purple-600" />
                Esports &amp; Gaming Arena (All-Day Full Window)
              </h3>
              <span className="text-[11px] text-gray-500 font-medium">3 Esports Tournaments</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {esportsEvents.map((event) => {
                const isSelected = selectedSlugs.includes(event.slug);
                const isDisabled = hasRegularSelected;
                const [name] = splitTitle(event.title);

                return (
                  <button
                    key={event.slug}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => toggleEvent(event)}
                    className={`relative p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all duration-200 group cursor-pointer ${
                      isSelected
                        ? 'bg-purple-50 border-purple-600 text-gray-900 shadow-sm ring-2 ring-purple-600'
                        : isDisabled
                        ? 'bg-gray-50/50 border-gray-100 opacity-40 cursor-not-allowed text-gray-400'
                        : 'bg-purple-50/30 border-purple-200/80 hover:border-purple-300 hover:bg-purple-50/70 text-gray-800'
                    }`}
                  >
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-purple-200 bg-purple-50">
                      <img
                        src={event.image}
                        alt={name}
                        loading="lazy"
                        className={`w-full h-full object-cover transition-transform duration-300 ${
                          isSelected ? 'scale-105' : 'group-hover:scale-105'
                        }`}
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-purple-600/80 flex items-center justify-center">
                          <Check className="w-5 h-5 text-white stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-heading font-bold text-xs sm:text-sm text-gray-900 truncate leading-snug">
                          {name}
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-purple-100 text-purple-800 border border-purple-200">
                          Esports
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 truncate mt-0.5">
                        {event.teamSize?.label || 'Individual'}
                      </p>
                      <div className="mt-1 text-[10px] text-purple-700 font-medium">
                        <span>{event.genre || 'Tournament'}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {errors.events && (
            <p data-error="true" className="text-xs text-rose-600 flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {errors.events}
            </p>
          )}
        </section>

        {/* ========================================================= */}
        {/* STEP 2: PERSONAL DETAILS & ICFAI ELIGIBILITY              */}
        {/* ========================================================= */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
          <div className="border-b border-gray-200 pb-5">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-marigold-50 border border-marigold-200 text-marigold-600 font-heading font-extrabold text-xs flex items-center justify-center">
                02
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-marigold-600">
                Step 2
              </span>
            </div>
            <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Personal &amp; Institutional Details
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">
              Provide your details for your official festival pass. Invoice &amp; ticket will be automatically generated upon submission.
            </p>
          </div>

          {/* CRUCIAL FIELD: Are you an ICFAI University student? */}
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-wider font-bold text-gray-700">
              Are you an ICFAI University, Sikkim student? *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    isIcfaiStudent: true,
                    college: 'The ICFAI University, Sikkim',
                  })
                }
                className={`p-4 rounded-2xl border text-left flex items-center gap-3.5 transition-all cursor-pointer ${
                  formData.isIcfaiStudent
                    ? 'bg-emerald-50 border-emerald-500 text-gray-900 ring-2 ring-emerald-500'
                    : 'bg-gray-50/80 border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                    formData.isIcfaiStudent
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {formData.isIcfaiStudent && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <p className="font-heading font-bold text-sm text-gray-900">Yes, I study at ICFAI University</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    isIcfaiStudent: false,
                    college: formData.college === 'The ICFAI University, Sikkim' ? '' : formData.college,
                  })
                }
                className={`p-4 rounded-2xl border text-left flex items-center gap-3.5 transition-all cursor-pointer ${
                  !formData.isIcfaiStudent
                    ? 'bg-marigold-50 border-marigold-500 text-gray-900 ring-2 ring-marigold-500'
                    : 'bg-gray-50/80 border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                    !formData.isIcfaiStudent
                      ? 'border-marigold-600 bg-marigold-600 text-white'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {!formData.isIcfaiStudent && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <p className="font-heading font-bold text-sm text-gray-900">No, Other College / University</p>
                </div>
              </button>
            </div>
          </div>

          {/* College / Institution Selector if External */}
          {!formData.isIcfaiStudent && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 pt-2"
            >
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700">
                Select Your College or University *
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors cursor-pointer appearance-none"
                >
                  <option value="" disabled className="text-gray-400">
                    -- Choose your institution in Sikkim --
                  </option>
                  {INSTITUTIONS.filter((c) => c !== 'The ICFAI University, Sikkim').map((c) => (
                    <option key={c} value={c} className="text-gray-900">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {formData.college === 'Other' && (
                <div className="pt-2">
                  <input
                    type="text"
                    value={formData.otherCollege}
                    onChange={(e) => setFormData({ ...formData, otherCollege: e.target.value })}
                    placeholder="Enter your college / institution full name *"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                  />
                  {errors.otherCollege && (
                    <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.otherCollege}
                    </p>
                  )}
                </div>
              )}

              {errors.college && (
                <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.college}
                </p>
              )}
            </motion.div>
          )}

          {/* Row 1: Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <UserCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Karma Tashi Bhutia"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none transition-colors ${
                    errors.fullName
                      ? 'border-rose-500 focus:border-rose-600 focus:ring-1 focus:ring-rose-600'
                      : 'border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900'
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none transition-colors ${
                    errors.email
                      ? 'border-rose-500 focus:border-rose-600 focus:ring-1 focus:ring-rose-600'
                      : 'border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: WhatsApp Number & Course */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-2">
                WhatsApp / Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 9876543210"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none transition-colors ${
                    errors.phone
                      ? 'border-rose-500 focus:border-rose-600 focus:ring-1 focus:ring-rose-600'
                      : 'border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-2">
                Course &amp; Semester *
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  placeholder="e.g. BCA 3rd Sem / B.Tech CSE"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none transition-colors ${
                    errors.course
                      ? 'border-rose-500 focus:border-rose-600 focus:ring-1 focus:ring-rose-600'
                      : 'border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900'
                  }`}
                />
              </div>
              {errors.course && (
                <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.course}
                </p>
              )}
            </div>
          </div>

          {/* Row 3: University Enrollment Number */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-2">
              University / College Roll / Enrollment Number *
            </label>
            <div className="relative">
              <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={formData.enrollmentNumber}
                onChange={(e) => setFormData({ ...formData, enrollmentNumber: e.target.value })}
                placeholder="e.g. 23IU24010099"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none transition-colors ${
                  errors.enrollmentNumber
                    ? 'border-rose-500 focus:border-rose-600 focus:ring-1 focus:ring-rose-600'
                    : 'border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900'
                }`}
              />
            </div>
            {errors.enrollmentNumber && (
              <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.enrollmentNumber}
              </p>
            )}
          </div>

          {/* Spam trap (invisible to humans) */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label>
              Website
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </label>
          </div>
        </section>

        {/* ========================================================= */}
        {/* STEP 3: DYNAMIC TEAM FIELDS (Revealed for Team Events)    */}
        {/* ========================================================= */}
        <AnimatePresence>
          {hasTeamEvents && (
            <motion.section
              initial={{ opacity: 0, height: 0, scale: 0.98 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6 overflow-hidden"
            >
              <div className="border-b border-gray-200 pb-5">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-marigold-50 border border-marigold-200 text-marigold-600 font-heading font-extrabold text-xs flex items-center justify-center">
                    03
                  </span>
                  <span className="text-xs uppercase tracking-wider font-semibold text-marigold-600">
                    Team Required
                  </span>
                </div>
                <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2.5">
                  <Users className="w-6 h-6 text-marigold-600" />
                  Team Roster &amp; Details
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-gray-600">
                  Required for your selected team competition(s):{' '}
                  <span className="text-gray-900 font-semibold">
                    {teamEvents.map((t) => t.title).join(', ')}
                  </span>
                </p>
              </div>

              {/* Team Name Input */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-2">
                  Team / Squad Name *
                </label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    placeholder="e.g. Apex Predators / Himalayan Coders"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none transition-colors ${
                      errors.teamName
                        ? 'border-rose-500 focus:border-rose-600 focus:ring-1 focus:ring-rose-600'
                        : 'border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900'
                    }`}
                  />
                </div>
                {errors.teamName && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.teamName}
                  </p>
                )}
              </div>

              {/* Dynamic Teammates List */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-wider font-semibold text-gray-700">
                    Additional Teammates (Leader + up to {maxTeamCapacity - 1} members)
                  </label>

                  {formData.teamMembers.length < maxTeamCapacity - 1 && (
                    <button
                      type="button"
                      onClick={handleAddMember}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-marigold-50 hover:bg-marigold-100 text-marigold-700 border border-marigold-200 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Member
                    </button>
                  )}
                </div>

                {formData.teamMembers.length === 0 && (
                  <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-200">
                    Click &ldquo;Add Member&rdquo; to input your roster details (name and roll number).
                  </p>
                )}

                {formData.teamMembers.map((member, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                        placeholder={`Member ${idx + 2} Full Name *`}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-gray-900"
                      />
                      <input
                        type="text"
                        value={member.enrollment}
                        onChange={(e) => handleMemberChange(idx, 'enrollment', e.target.value)}
                        placeholder={`Member ${idx + 2} Roll / Enrollment No. *`}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-gray-900"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(idx)}
                      className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                      title="Remove Member"
                      aria-label={`Remove member ${idx + 2}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {errors.teamMembers && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.teamMembers}
                  </p>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ========================================================= */}
        {/* SUBMISSION ACTION BAR                                     */}
        {/* ========================================================= */}
        <div className="space-y-4 pt-2">
          <button
            type="submit"
            className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-marigold-500 via-marigold-600 to-marigold-500 hover:from-marigold-600 hover:to-marigold-700 text-white font-heading font-extrabold text-base sm:text-lg tracking-wide shadow-lg shadow-marigold-500/20 hover:shadow-marigold-500/30 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 group"
          >
            <Ticket className="w-5 h-5 text-white" />
            <span>Submit Registration &amp; Generate Invoice Ticket</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-center text-xs text-gray-500">
            Invoice, ticket and fee calculations will be generated automatically upon clicking submit.
          </p>
        </div>
      </form>

      {/* ========================================================= */}
      {/* GENERATED INVOICE & OFFICIAL TICKET MODAL                 */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isSubmitted && submittedPayload && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSubmitted(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative w-full max-w-2xl rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 space-y-6 text-gray-900 my-8 z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Top Banner */}
              <div className="flex items-start justify-between gap-4 border-b border-gray-200 pb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                    <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold tracking-wide uppercase">
                        Registration Generated
                      </span>
                      <span className="text-[11px] text-gray-500">
                        {new Date(submittedPayload.timestamp).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="font-heading font-extrabold text-2xl text-gray-900 tracking-tight mt-0.5">
                      Official Festival Ticket &amp; Invoice
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 border border-gray-200 transition-colors cursor-pointer"
                  title="Print official pass"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Pass
                </button>
              </div>

              {/* Official Ticket Card (Warm paper aesthetic) */}
              <div className="rounded-2xl bg-paper border border-ink-line p-5 sm:p-6 space-y-5 relative overflow-hidden shadow-sm">
                {/* Decorative subtle saffron glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-marigold-500/5 rounded-full blur-2xl pointer-events-none" />

                {/* Ticket Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ink-line pb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-marigold-600">
                      INNOVISION 2026 PASS
                    </span>
                    <h4 className="font-heading font-bold text-lg text-gray-900">
                      The ICFAI University, Sikkim
                    </h4>
                    <p className="text-xs text-gray-600">
                      Faculty of Science &amp; Technology · Dept. of IT
                    </p>
                  </div>
                  <div className="text-left sm:text-right bg-white p-2.5 rounded-xl border border-gray-200 shadow-2xs">
                    <span className="text-[10px] text-gray-500 block uppercase tracking-wider">
                      Ticket Pass ID
                    </span>
                    <span className="font-mono text-sm font-extrabold text-marigold-600">
                      {submittedPayload.registrationId}
                    </span>
                  </div>
                </div>

                {/* Participant Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500 block text-[11px]">Participant Name</span>
                    <span className="font-bold text-gray-900">{submittedPayload.formData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Enrollment / Roll</span>
                    <span className="font-mono font-bold text-gray-900">{submittedPayload.formData.enrollmentNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Course &amp; Sem</span>
                    <span className="font-semibold text-gray-900">{submittedPayload.formData.course}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-2">
                    <span className="text-gray-500 block text-[11px]">College / University</span>
                    <span className="font-semibold text-gray-900">
                      {submittedPayload.formData.college}{' '}
                      {submittedPayload.isIcfaiStudent && (
                        <span className="text-emerald-700 font-bold text-[10px] ml-1">(ICFAI Student)</span>
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Contact Phone</span>
                    <span className="font-mono text-gray-900">{submittedPayload.formData.phone}</span>
                  </div>
                </div>

                {/* Team Info if present */}
                {submittedPayload.formData.teamName && (
                  <div className="p-3 rounded-xl bg-white border border-gray-200 text-xs space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-gray-700 font-semibold">
                      <Users className="w-3.5 h-3.5 text-marigold-600" />
                      <span>Team Name: <strong className="text-gray-900">{submittedPayload.formData.teamName}</strong></span>
                    </div>
                    {submittedPayload.formData.teamMembers.length > 0 && (
                      <p className="text-[11px] text-gray-600 pl-5">
                        Teammates: {submittedPayload.formData.teamMembers.map((m) => `${m.name} (${m.enrollment})`).join(', ')}
                      </p>
                    )}
                  </div>
                )}

                {/* Dashed Separator */}
                <div className="border-t border-dashed border-gray-300 pt-4">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Receipt className="w-3.5 h-3.5 text-marigold-600" />
                      Generated Itemized Invoice
                    </span>
                    <span>Rate / Status</span>
                  </div>

                  {/* Selected Events Breakdown Table */}
                  <div className="space-y-2 text-xs">
                    {submittedPayload.invoice.items.map((item) => (
                      <div
                        key={item.slug}
                        className="flex items-center justify-between py-2 border-b border-gray-200/80 last:border-b-0"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{item.title}</span>
                          {item.isEsports ? (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-purple-100 text-purple-800 border border-purple-200">
                              Esports Arena
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-cyan-100 text-cyan-800 border border-cyan-200">
                              Regular Event
                            </span>
                          )}
                        </div>

                        <div>
                          {item.isFree ? (
                            <div className="flex items-center gap-1.5">
                              <span className="line-through text-gray-400 text-[11px]">₹{item.baseRate}</span>
                              <span className="font-bold text-emerald-700 text-xs px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">
                                FREE (₹0)
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-gray-900 text-xs">₹{item.eventFee}</span>
                              {item.isEsports && submittedPayload.isIcfaiStudent && (
                                <span className="text-[10px] text-purple-700 font-semibold px-1.5 py-0.5 rounded bg-purple-50 border border-purple-200">
                                  Esports Arena Fee
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Calculations Total Bar */}
                  <div className="mt-4 pt-3 border-t border-gray-200 space-y-1.5 text-xs">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({submittedPayload.invoice.eventCount} Competitions):</span>
                      <span className="text-gray-900 font-medium">₹{submittedPayload.invoice.subtotal}</span>
                    </div>

                    {submittedPayload.invoice.totalWaiver > 0 && (
                      <div className="flex justify-between text-emerald-700 font-medium">
                        <span>ICFAI Student Waiver (100% free on regular events):</span>
                        <span>-₹{submittedPayload.invoice.totalWaiver}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-2 border-t border-gray-200 text-sm">
                      <span className="font-heading font-extrabold text-gray-900 text-base">
                        Total Amount Payable:
                      </span>
                      <span className="font-heading font-extrabold text-2xl text-marigold-600">
                        ₹{submittedPayload.totalFee}
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-600 pt-1">
                      {submittedPayload.totalFee === 0 ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> 100% Free Entry for ICFAI Student. Present this ticket at the registration desk.
                        </span>
                      ) : submittedPayload.isIcfaiStudent ? (
                        <span className="text-purple-700 font-medium">
                          ₹{submittedPayload.totalFee} entry fee for esports tournament. (Regular fest events are free for ICFAI students). Payable at the desk.
                        </span>
                      ) : (
                        <span>
                          ₹{submittedPayload.totalFee} payable at the registration desk on fest day.
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Developer JSON Payload Section for Google Apps Script */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-cyan-600" />
                    Generated JSON Payload (ready for Google Apps Script):
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyPayload}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 border border-gray-200 transition-colors cursor-pointer"
                  >
                    {copiedPayload ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy JSON
                      </>
                    )}
                  </button>
                </div>

                <div className="relative rounded-2xl bg-gray-900 border border-gray-800 p-3.5 max-h-48 overflow-y-auto text-[11px] font-mono text-cyan-300 leading-relaxed">
                  <pre>{JSON.stringify(submittedPayload, null, 2)}</pre>
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Done / Close
                </button>
                <button
                  type="button"
                  onClick={handleCopyPayload}
                  className="px-5 py-2.5 rounded-full bg-marigold-500 hover:bg-marigold-600 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  {copiedPayload ? (
                    <>
                      <Check className="w-4 h-4" />
                      Payload Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Submission Data
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

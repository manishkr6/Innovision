import React, { useState } from 'react';
import { 
  UserCheck, 
  Mail, 
  Phone, 
  GraduationCap, 
  Hash, 
  Users, 
  Plus, 
  Trash2, 
  Loader2, 
  AlertCircle
} from 'lucide-react';
import { RegistrationSuccessModal } from './RegistrationSuccessModal';

export const EventRegistrationForm = ({ event }) => {
  const isTeamEvent = (event.teamSize?.max || 1) > 1;

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    enrollmentNumber: '',
    teamName: '',
    teamMembers: [''],
    agreedToRules: false,
    confirmedITStatus: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Dynamic team members management
  const handleAddMember = () => {
    if (formData.teamMembers.length < event.teamSize.max - 1) {
      setFormData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, '']
      }));
    }
  };

  const handleRemoveMember = (idx) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== idx)
    }));
  };

  const handleMemberChange = (idx, val) => {
    const updated = [...formData.teamMembers];
    updated[idx] = val;
    setFormData(prev => ({ ...prev, teamMembers: updated }));
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your full name (at least 3 letters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Please specify your degree and semester.';
    }

    if (!formData.enrollmentNumber.trim()) {
      newErrors.enrollmentNumber = 'Please enter your university roll / enrollment number.';
    }

    if (isTeamEvent) {
      if (!formData.teamName.trim()) {
        newErrors.teamName = 'Please enter a team name.';
      }

      // Check min team members
      const validMembers = formData.teamMembers.filter(m => m.trim().length > 0);
      const minAdditionalMembers = Math.max(0, event.teamSize.min - 1);
      if (validMembers.length < minAdditionalMembers) {
        newErrors.teamMembers = `This event requires at least ${event.teamSize.min} total members (Leader + ${minAdditionalMembers} member${minAdditionalMembers > 1 ? 's' : ''}).`;
      }
    }

    if (event.isITOnly && !formData.confirmedITStatus) {
      newErrors.confirmedITStatus = 'You must confirm your IT / Computer Science eligibility to register.';
    }

    if (!formData.agreedToRules) {
      newErrors.agreedToRules = 'You must agree to the event rules and Code of Conduct.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate transmission & registration generation
    setTimeout(() => {
      const generatedId = `IV26-${event.slug.toUpperCase().slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`;

      const registrationRecord = {
        id: generatedId,
        eventSlug: event.slug,
        eventTitle: event.title,
        registeredAt: new Date().toISOString(),
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        course: formData.course.trim(),
        enrollmentNumber: formData.enrollmentNumber.trim(),
        teamName: isTeamEvent ? formData.teamName.trim() : null,
        teamMembers: isTeamEvent ? formData.teamMembers.filter(m => m.trim().length > 0) : [],
        venue: event.venue,
        date: event.date,
        time: event.time,
      };

      // Save to localStorage
      try {
        const existing = JSON.parse(localStorage.getItem('innovision_registrations') || '[]');
        localStorage.setItem('innovision_registrations', JSON.stringify([...existing, registrationRecord]));
        window.dispatchEvent(new Event('innovision_registration_added'));
      } catch (err) {
        console.error('Failed to save to localStorage', err);
      }

      /* 
       * INTEGRATION PLACEHOLDER:
       * You can seamlessly post registrationRecord to Web3Forms, Google Apps Script,
       * or your custom API endpoint right here:
       * 
       * fetch('https://api.web3forms.com/submit', {
       *   method: 'POST',
       *   headers: { 'Content-Type': 'application/json' },
       *   body: JSON.stringify({ access_key: 'YOUR_KEY_HERE', ...registrationRecord })
       * });
       */

      setSuccessData(registrationRecord);
      setIsSubmitting(false);
      setShowSuccessModal(true);

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        course: '',
        enrollmentNumber: '',
        teamName: '',
        teamMembers: [''],
        agreedToRules: false,
        confirmedITStatus: false,
      });
      setErrors({});
    }, 1200);
  };

  return (
    <section id="register" className="scroll-mt-36 space-y-10 mb-24">
      
      {/* Section Subheading */}
      <div className="border-b border-white/[0.08] pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-slate-400 block mb-1">
          // SECTION 03
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wide">
          <span className="text-white">EVENT</span> <span className="text-blue-400">REGISTRATION</span>
        </h2>
        <p className="font-body text-xs sm:text-sm text-slate-400 mt-1">
          Fill out the participant roster below to secure your spot in {event.title}. Registrations close 24 hours prior to fest commencement.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#0D111C]/85 backdrop-blur-xl border border-white/[0.08] shadow-2xl max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Row 1: Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <UserCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Karma Tashi Bhutia"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border text-slate-100 font-body text-sm focus:outline-none transition-colors ${
                    errors.fullName ? 'border-rose-500 focus:border-rose-400' : 'border-white/10 focus:border-white/30'
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-xs text-rose-400 font-body flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@student.icfai.edu"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border text-slate-100 font-body text-sm focus:outline-none transition-colors ${
                    errors.email ? 'border-rose-500 focus:border-rose-400' : 'border-white/10 focus:border-white/30'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-rose-400 font-body flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Phone Number & Course */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                WhatsApp / Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 9876543210"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border text-slate-100 font-body text-sm focus:outline-none transition-colors ${
                    errors.phone ? 'border-rose-500 focus:border-rose-400' : 'border-white/10 focus:border-white/30'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs text-rose-400 font-body flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                Course &amp; Semester *
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  placeholder="e.g. BCA 3rd Sem / B.Tech CSE"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border text-slate-100 font-body text-sm focus:outline-none transition-colors ${
                    errors.course ? 'border-rose-500 focus:border-rose-400' : 'border-white/10 focus:border-white/30'
                  }`}
                />
              </div>
              {errors.course && (
                <p className="mt-1 text-xs text-rose-400 font-body flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.course}
                </p>
              )}
            </div>
          </div>

          {/* Row 3: University Enrollment Number */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
              University Roll / Enrollment Number *
            </label>
            <div className="relative">
              <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={formData.enrollmentNumber}
                onChange={(e) => setFormData({ ...formData, enrollmentNumber: e.target.value })}
                placeholder="e.g. IUS/2024/BCA/042"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border text-slate-100 font-body text-sm focus:outline-none transition-colors ${
                  errors.enrollmentNumber ? 'border-rose-500 focus:border-rose-400' : 'border-white/10 focus:border-white/30'
                }`}
              />
            </div>
            {errors.enrollmentNumber && (
              <p className="mt-1 text-xs text-rose-400 font-body flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.enrollmentNumber}
              </p>
            )}
          </div>

          {/* Team Fields: Only Shown for Team Events */}
          {isTeamEvent && (
            <div className="pt-4 border-t border-white/[0.06] space-y-4">
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                  Team Name *
                </label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    placeholder="e.g. Sikkim Cyber Ninjas"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border text-slate-100 font-body text-sm focus:outline-none transition-colors ${
                      errors.teamName ? 'border-rose-500 focus:border-rose-400' : 'border-white/10 focus:border-white/30'
                    }`}
                  />
                </div>
                {errors.teamName && (
                  <p className="mt-1 text-xs text-rose-400 font-body flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.teamName}
                  </p>
                )}
              </div>

              {/* Dynamic Additional Members */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-xs uppercase tracking-wider text-slate-300">
                    Additional Teammates (Max {event.teamSize.max - 1})
                  </label>
                  {formData.teamMembers.length < event.teamSize.max - 1 && (
                    <button
                      type="button"
                      onClick={handleAddMember}
                      className="inline-flex items-center gap-1 text-xs font-mono text-blue-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Member
                    </button>
                  )}
                </div>

                {formData.teamMembers.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={member}
                      onChange={(e) => handleMemberChange(idx, e.target.value)}
                      placeholder={`Member #${idx + 2} Full Name & Roll No`}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-slate-100 font-body text-sm focus:outline-none focus:border-white/30 transition-colors"
                    />
                    {formData.teamMembers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(idx)}
                        className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                        title="Remove Member"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}

                {errors.teamMembers && (
                  <p className="mt-1 text-xs text-rose-400 font-body flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.teamMembers}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* IT Student Declaration Checkbox */}
          {event.isITOnly && (
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-800/40">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.confirmedITStatus}
                  onChange={(e) => setFormData({ ...formData, confirmedITStatus: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-black accent-blue-600 focus:ring-0"
                />
                <span className="font-body text-xs sm:text-sm text-slate-200">
                  <span className="font-semibold text-blue-300 block mb-0.5">
                    IT Student Eligibility Declaration:
                  </span>
                  I confirm that I am currently an enrolled, bonafide student in an IT / Computer Science / BCA / MCA / B.Tech program.
                </span>
              </label>
              {errors.confirmedITStatus && (
                <p className="mt-2 text-xs text-rose-400 font-body flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.confirmedITStatus}
                </p>
              )}
            </div>
          )}

          {/* General Code of Conduct Agreement Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreedToRules}
                onChange={(e) => setFormData({ ...formData, agreedToRules: e.target.checked })}
                className="mt-1 w-4 h-4 rounded border-white/20 bg-black accent-blue-600 focus:ring-0"
              />
              <span className="font-body text-xs sm:text-sm text-slate-300">
                I have read, understood, and solemnly agree to adhere to the{' '}
                <a href="#rules" className="text-blue-400 underline">Rules &amp; Regulations</a> of this event and the overarching{' '}
                <a href="/#code-of-conduct" className="text-indigo-400 underline">INNOVISION 2026 Code of Conduct</a>.
              </span>
            </label>
            {errors.agreedToRules && (
              <p className="mt-2 text-xs text-rose-400 font-body flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.agreedToRules}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-mono text-sm font-bold uppercase tracking-wider text-white transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 flex items-center justify-center gap-2 cursor-pointer ${
                isSubmitting
                  ? 'bg-blue-600/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>TRANSMITTING REGISTRATION...</span>
                </>
              ) : (
                <span>CONFIRM REGISTRATION &amp; ISSUE PASS</span>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* Success Modal */}
      <RegistrationSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        registrationData={successData}
        event={event}
      />

    </section>
  );
};

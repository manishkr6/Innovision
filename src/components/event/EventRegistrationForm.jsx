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
      <div className="border-b border-gray-200 pb-4">
        <span className="text-xs font-semibold text-marigold-600 uppercase tracking-wider block mb-1">
          Section 03
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Event Registration
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed">
          Fill out the participant roster below to secure your spot in {event.title}. Registrations close 24 hours prior to fest commencement.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-sm max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Row 1: Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    errors.fullName ? 'border-rose-500 focus:border-rose-600' : 'border-gray-200 focus:border-gray-900'
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
                  placeholder="name@student.icfai.edu"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none transition-colors ${
                    errors.email ? 'border-rose-500 focus:border-rose-600' : 'border-gray-200 focus:border-gray-900'
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

          {/* Row 2: Phone Number & Course */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    errors.phone ? 'border-rose-500 focus:border-rose-600' : 'border-gray-200 focus:border-gray-900'
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
                    errors.course ? 'border-rose-500 focus:border-rose-600' : 'border-gray-200 focus:border-gray-900'
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
              University Roll / Enrollment Number *
            </label>
            <div className="relative">
              <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={formData.enrollmentNumber}
                onChange={(e) => setFormData({ ...formData, enrollmentNumber: e.target.value })}
                placeholder="e.g. IUS/2024/BCA/042"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none transition-colors ${
                  errors.enrollmentNumber ? 'border-rose-500 focus:border-rose-600' : 'border-gray-200 focus:border-gray-900'
                }`}
              />
            </div>
            {errors.enrollmentNumber && (
              <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.enrollmentNumber}
              </p>
            )}
          </div>

          {/* Team Fields: Only Shown for Team Events */}
          {isTeamEvent && (
            <div className="pt-4 border-t border-gray-200 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-2">
                  Team Name *
                </label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    placeholder="e.g. Sikkim Cyber Ninjas"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none transition-colors ${
                      errors.teamName ? 'border-rose-500 focus:border-rose-600' : 'border-gray-200 focus:border-gray-900'
                    }`}
                  />
                </div>
                {errors.teamName && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.teamName}
                  </p>
                )}
              </div>

              {/* Dynamic Additional Members */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-wider font-semibold text-gray-700">
                    Additional Teammates (Max {event.teamSize.max - 1})
                  </label>
                  {formData.teamMembers.length < event.teamSize.max - 1 && (
                    <button
                      type="button"
                      onClick={handleAddMember}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-gray-900 hover:text-black transition-colors cursor-pointer"
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
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                    />
                    {formData.teamMembers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(idx)}
                        className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                        title="Remove Member"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}

                {errors.teamMembers && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.teamMembers}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* IT Student Declaration Checkbox */}
          {event.isITOnly && (
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.confirmedITStatus}
                  onChange={(e) => setFormData({ ...formData, confirmedITStatus: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black"
                />
                <span className="text-xs sm:text-sm text-gray-700">
                  <span className="font-semibold text-blue-900 block mb-0.5">
                    IT Student Eligibility Declaration:
                  </span>
                  I confirm that I am currently an enrolled, bonafide student in an IT / Computer Science / BCA / MCA / B.Tech program.
                </span>
              </label>
              {errors.confirmedITStatus && (
                <p className="mt-2 text-xs text-rose-600 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.confirmedITStatus}
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
                className="mt-1 w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black"
              />
              <span className="text-xs sm:text-sm text-gray-600">
                I have read, understood, and solemnly agree to adhere to the{' '}
                <a href="#rules" className="text-marigold-600 underline font-semibold">Rules &amp; Regulations</a> of this event and the overarching{' '}
                <a href="/#code-of-conduct" className="text-marigold-600 underline font-semibold">INNOVISION 2026 Code of Conduct</a>.
              </span>
            </label>
            {errors.agreedToRules && (
              <p className="mt-2 text-xs text-rose-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.agreedToRules}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-black hover:bg-gray-800'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>Transmitting Registration...</span>
                </>
              ) : (
                <span>Confirm Registration &amp; Issue Pass</span>
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

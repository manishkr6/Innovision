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
  AlertCircle,
  Building2
} from 'lucide-react';
import { RegistrationSuccessModal } from './RegistrationSuccessModal';
import { submitRegistration } from '../../lib/registrationApi';
import { addPass } from '../../lib/passStore';
import { getClashingEvents, splitTitle } from '../../data/eventUtils';

export const EventRegistrationForm = ({ event }) => {
  const minSize = event.teamSize?.min || 1;
  const maxSize = event.teamSize?.max || 1;
  const allowsTeam = maxSize > 1;
  const requiresTeam = minSize > 1;
  const requiredTeammates = minSize - 1;
  const clashingEvents = getClashingEvents(event);

  const emptyForm = () => ({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    course: '',
    enrollmentNumber: '',
    teamName: '',
    teamMembers: Array.from({ length: requiredTeammates }, () => ({ name: '', enrollment: '' })),
    agreedToRules: false,
    confirmedITStatus: false,
    website: '', // spam trap: hidden from people, bots tend to fill it
  });

  // Form State
  const [formData, setFormData] = useState(emptyForm);

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Dynamic team members management
  const handleAddMember = () => {
    if (formData.teamMembers.length < maxSize - 1) {
      setFormData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, { name: '', enrollment: '' }]
      }));
    }
  };

  const handleRemoveMember = (idx) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== idx)
    }));
  };

  const handleMemberChange = (idx, field, val) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((m, i) => (i === idx ? { ...m, [field]: val } : m))
    }));
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
    if (!/^[6-9]\d{9}$/.test(phoneDigits.replace(/^(?:91|0)(?=\d{10}$)/, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!formData.college.trim()) {
      newErrors.college = 'Please enter your college or university.';
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Please specify your degree and semester.';
    }

    if (!formData.enrollmentNumber.trim()) {
      newErrors.enrollmentNumber = 'Please enter your university roll / enrollment number.';
    }

    if (allowsTeam) {
      const members = formData.teamMembers.map(m => ({ name: m.name.trim(), enrollment: m.enrollment.trim() }));
      const filled = members.filter(m => m.name || m.enrollment);
      const isTeamEntry = requiresTeam || filled.length > 0;

      if (isTeamEntry && !formData.teamName.trim()) {
        newErrors.teamName = 'Please enter a team name.';
      }

      const enrollments = [formData.enrollmentNumber, ...filled.map(m => m.enrollment)].map(v => v.trim().toUpperCase()).filter(Boolean);
      if (filled.length < requiredTeammates) {
        newErrors.teamMembers = `This event needs at least ${minSize} participants: the leader and ${requiredTeammates} teammate${requiredTeammates > 1 ? 's' : ''}.`;
      } else if (filled.some(m => !m.name || !m.enrollment)) {
        newErrors.teamMembers = 'Please give both a name and an enrollment number for every teammate.';
      } else if (new Set(enrollments).size !== enrollments.length) {
        newErrors.teamMembers = 'The same enrollment number is entered more than once.';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    const members = allowsTeam
      ? formData.teamMembers
          .map(m => ({ name: m.name.trim(), enrollment: m.enrollment.trim() }))
          .filter(m => m.name || m.enrollment)
      : [];

    const details = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      college: formData.college.trim(),
      course: formData.course.trim(),
      enrollmentNumber: formData.enrollmentNumber.trim(),
      teamName: members.length > 0 ? formData.teamName.trim() : null,
      teamMembers: members,
    };

    setIsSubmitting(true);
    try {
      const result = await submitRegistration({
        eventSlug: event.slug,
        ...details,
        members,
        agreedToRules: formData.agreedToRules,
        confirmedITStatus: formData.confirmedITStatus,
        website: formData.website,
      });

      // A repeat submission gets the details the sheet already holds, not what was just typed.
      const registrationRecord = {
        ...details,
        ...result.record,
        id: result.token,
        confirmed: true,
        alreadyRegistered: result.duplicate === true,
        eventSlug: event.slug,
        eventTitle: event.title,
        registeredAt: result.registeredAt,
      };

      addPass(registrationRecord);
      setSuccessData(registrationRecord);
      setShowSuccessModal(true);
      setFormData(emptyForm());
      setErrors({});
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
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
          Entry is free. Fill in your details below to secure your spot in {event.title}.
        </p>
      </div>

      {clashingEvents.length > 0 && (
        <p className="max-w-4xl mx-auto p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 leading-relaxed">
          You can enter as many events as you like if they don&apos;t clash. On the current provisional timetable, this event overlaps with {clashingEvents.map(e => splitTitle(e.title)[0]).join(', ')}, so you can enter only one of them.
        </p>
      )}

      {/* Main Form Container */}
      <div className="relative p-6 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-sm max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Row 1: Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-2">
                {requiresTeam ? 'Team Leader Full Name *' : 'Full Name *'}
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
                  placeholder="name@example.com"
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

          {/* Row 3: College & Enrollment Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-2">
              College / University *
            </label>
            <div className="relative">
              <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                placeholder="e.g. The ICFAI University, Sikkim"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none transition-colors ${
                  errors.college ? 'border-rose-500 focus:border-rose-600' : 'border-gray-200 focus:border-gray-900'
                }`}
              />
            </div>
            {errors.college && (
              <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.college}
              </p>
            )}
          </div>

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
          </div>

          {/* Spam trap: invisible to people and skipped by keyboard and screen readers */}
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

          {/* Team Fields: Only Shown for Events That Allow Teams */}
          {allowsTeam && (
            <div className="pt-4 border-t border-gray-200 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-2">
                  {requiresTeam ? 'Team Name *' : 'Team Name (if entering as a team)'}
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
                    {requiresTeam
                      ? `Teammates (${minSize === maxSize ? maxSize - 1 : `${minSize - 1} to ${maxSize - 1}`})`
                      : `Teammates (optional, up to ${maxSize - 1})`}
                  </label>
                  {formData.teamMembers.length < maxSize - 1 && (
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

                {!requiresTeam && formData.teamMembers.length === 0 && (
                  <p className="text-xs text-gray-500">Entering alone? Leave this empty and you&apos;re registered as an individual.</p>
                )}

                {formData.teamMembers.map((member, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                        placeholder={`Member ${idx + 2} full name`}
                        aria-label={`Member ${idx + 2} full name`}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                      />
                      <input
                        type="text"
                        value={member.enrollment}
                        onChange={(e) => handleMemberChange(idx, 'enrollment', e.target.value)}
                        placeholder={`Member ${idx + 2} enrollment no.`}
                        aria-label={`Member ${idx + 2} enrollment number`}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                      />
                    </div>
                    {formData.teamMembers.length > requiredTeammates && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(idx)}
                        className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                        title="Remove Member"
                        aria-label={`Remove member ${idx + 2}`}
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
            {submitError && (
              <p role="alert" className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-700 flex items-start gap-2 font-medium">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> <span>{submitError}</span>
              </p>
            )}
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
                  <span>Saving your registration...</span>
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

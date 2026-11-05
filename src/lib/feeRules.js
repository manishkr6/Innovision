import { getEventBySlug } from '../data/events.js';

/**
 * Checks if the event is an E-Gaming / E-Sports event.
 */
export const isEsportsEvent = (eventOrSlugOrPass) => {
  if (!eventOrSlugOrPass) return false;

  const slug = (
    eventOrSlugOrPass.eventSlug ||
    eventOrSlugOrPass.slug ||
    (typeof eventOrSlugOrPass === 'string' ? eventOrSlugOrPass : '')
  ).toLowerCase();

  const title = (eventOrSlugOrPass.eventTitle || eventOrSlugOrPass.title || '').toLowerCase();
  const track = (eventOrSlugOrPass.track || '').toLowerCase();
  const categoryLabel = (eventOrSlugOrPass.categoryLabel || '').toLowerCase();
  const genre = (eventOrSlugOrPass.genre || '').toLowerCase();

  if (track.includes('esport') || track.includes('gaming')) return true;
  if (categoryLabel.includes('esport') || categoryLabel.includes('gaming')) return true;
  if (genre.includes('esport') || genre.includes('gaming')) return true;

  const esportsSlugs = ['bgmi', 'moba-legends', 'e-football', 'battlegrounds', 'mobile-legends', 'mlbb', 'pes', 'fifa'];
  if (slug && esportsSlugs.some((s) => slug === s || slug.startsWith(s))) {
    return true;
  }

  if (title.includes('bgmi') || title.includes('moba') || title.includes('e-football') || title.includes('esport')) {
    return true;
  }

  // Fallback: lookup in events list by slug
  if (slug) {
    const found = getEventBySlug(slug);
    if (found) {
      const fTrack = (found.track || '').toLowerCase();
      const fCat = (found.categoryLabel || '').toLowerCase();
      const fGenre = (found.genre || '').toLowerCase();
      if (fTrack.includes('esport') || fTrack.includes('gaming') || fCat.includes('esport') || fGenre.includes('esport')) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Checks if a college name corresponds to The ICFAI University, Sikkim.
 * Handles case-sensitivity and standard variations (e.g. "The ICFAI University, Sikkim", "ICFAI University", "IUS", etc.).
 */
export const isIcfaiCollege = (college) => {
  if (!college || typeof college !== 'string') return false;
  const normalized = college.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
  return (
    normalized.includes('icfai') ||
    normalized === 'ius' ||
    normalized.startsWith('ius ') ||
    normalized.endsWith(' ius') ||
    normalized.includes(' ius ')
  );
};

/**
 * Calculates the number of team members in a registration.
 * Leader (1) + teammates. Fallback to event minimum team size if team registered.
 */
export const getTeamMemberCount = (pass, event) => {
  const ev = event || (pass?.eventSlug ? getEventBySlug(pass.eventSlug) : null);
  const validTeammates = Array.isArray(pass?.teamMembers)
    ? pass.teamMembers.filter((m) => m && (typeof m === 'string' ? m.trim() : (m.name?.trim() || m.enrollment?.trim())))
    : [];

  if (validTeammates.length > 0) {
    return 1 + validTeammates.length;
  }

  if (pass?.teamName && ev?.teamSize?.min && ev.teamSize.min > 1) {
    return ev.teamSize.min;
  }

  return 1;
};

/**
 * Computes the Fee Status string based on the event and college:
 * 1. E-Gaming/E-Sports: ₹100 per member -> "₹[Total Amount] (Payable at venue)"
 * 2. Non-E-Sports:
 *    - ICFAI: "Free (Only for ICFAI Students)"
 *    - Other: "Registration fee will be collected at the venue"
 */
export const getFeeStatus = (pass, event) => {
  const ev = event || (pass?.eventSlug ? getEventBySlug(pass.eventSlug) : null);
  const isEsports = isEsportsEvent(ev) || isEsportsEvent(pass);

  if (isEsports) {
    const memberCount = getTeamMemberCount(pass, ev);
    const totalAmount = memberCount * 100;
    return `₹${totalAmount} (Payable at venue)`;
  }

  const college = pass?.college || '';
  if (isIcfaiCollege(college)) {
    return 'Free (Only for ICFAI Students)';
  }

  return 'Registration fee will be collected at the venue';
};

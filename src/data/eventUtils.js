// Presentation helpers shared by the homepage sections (events grid, esports spotlight)
import { EVENTS } from './events';

// Track letter (from event.track, e.g. "C. Esports and Gaming Arena") -> label + prayer-flag colour classes
export const TRACKS = {
  A: { label: 'Technical', chip: 'bg-flag-blue/15 text-flag-blue' },
  B: { label: 'Strategy', chip: 'bg-flag-yellow/25 text-marigold-700' },
  C: { label: 'Esports', chip: 'bg-flag-red/15 text-flag-redText' },
  D: { label: 'Creative', chip: 'bg-flag-green/15 text-flag-greenText' },
};

export const trackOf = (event) => event.track.charAt(0);

export const cleanTbc = (s) => s.replace(/\s*\[TBC\]/g, '').trim();

// "Code Clash (Coding Competition)" -> ["Code Clash", "Coding Competition"]
export const splitTitle = (title) => {
  const m = title.match(/^(.*?)\s*\((.*)\)$/);
  return m ? [m[1], m[2]] : [title, null];
};

export const timeLabel = (event) => (event.slot ? `${event.time} (provisional)` : event.time);

// Events whose provisional slot overlaps this one. The fest is one day, so only times are compared.
export const getClashingEvents = (event) =>
  event.slot
    ? EVENTS.filter((other) => other.slug !== event.slug && other.slot && other.slot.start < event.slot.end && event.slot.start < other.slot.end)
    : [];

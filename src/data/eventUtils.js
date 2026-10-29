// Presentation helpers shared by the homepage sections (grid, schedule, esports spotlight)

// Track letter (from event.track, e.g. "C. Esports and Gaming Arena") -> label + prayer-flag colour classes
export const TRACKS = {
  A: { label: 'Technical', chip: 'bg-flag-blue/15 text-flag-blue' },
  B: { label: 'Strategy', chip: 'bg-flag-yellow/25 text-marigold-700' },
  C: { label: 'Esports', chip: 'bg-flag-red/15 text-flag-red' },
  D: { label: 'Creative', chip: 'bg-flag-green/15 text-flag-green' },
};

export const trackOf = (event) => event.track.charAt(0);

export const cleanTbc = (s) => s.replace(/\s*\[TBC\]/g, '').trim();

// "Code Clash (Coding Competition)" -> ["Code Clash", "Coding Competition"]
export const splitTitle = (title) => {
  const m = title.match(/^(.*?)\s*\((.*)\)$/);
  return m ? [m[1], m[2]] : [title, null];
};

// "Day 1 & Day 2 - November 2026" -> [1, 2]
export const eventDays = (event) => [...event.date.matchAll(/Day (\d)/g)].map((m) => Number(m[1]));

export const dayLabel = (event) => {
  const days = eventDays(event);
  return days.length > 1 ? `Days ${days.join(' & ')}` : `Day ${days[0]}`;
};

// "10:30 AM - 01:30 PM [TBC]" -> "10:30 AM"; submission windows return null
export const startTime = (event) => event.time.match(/^\d{1,2}:\d{2} [AP]M/)?.[0] ?? null;

// Minutes since midnight for sorting; null when the event has no fixed slot
export const startMinutes = (event) => {
  const t = startTime(event);
  if (!t) return null;
  const [, h, m, ap] = t.match(/(\d{1,2}):(\d{2}) ([AP]M)/);
  return ((Number(h) % 12) + (ap === 'PM' ? 12 : 0)) * 60 + Number(m);
};

// "Advanced Computing Lab, Faculty of Science & Technology" -> "Advanced Computing Lab"
export const shortVenue = (event) => event.venue.split(/,| \(/)[0];

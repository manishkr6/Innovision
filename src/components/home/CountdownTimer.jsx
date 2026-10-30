import React, { useState, useEffect } from 'react';
import { FEST_INFO } from '../../data/events';

const getTimeLeft = () => {
  const difference = new Date(FEST_INFO.countdownTarget).getTime() - Date.now();
  if (difference <= 0) return null;
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference % 86400000) / 3600000),
    minutes: Math.floor((difference % 3600000) / 60000),
    seconds: Math.floor((difference % 60000) / 1000),
  };
};

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  // Recompute once a second against the fixed target so drift never accumulates
  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const blocks = timeLeft
    ? [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
      ]
    : [];

  return (
    <div className="w-full rounded-3xl bg-paper/95 backdrop-blur p-5 sm:p-6 shadow-2xl shadow-black/30">
      <p className="text-sm font-semibold text-ink-soft">
        {timeLeft ? 'The fest begins in' : 'INNOVISION 2026 is live!'}
      </p>
      {timeLeft && (
        <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
          {blocks.map((b) => (
            <div key={b.label} className="rounded-2xl bg-white border border-ink-line py-3 text-center">
              <span className="block font-heading text-3xl sm:text-4xl font-extrabold text-ink tabular-nums">
                {String(b.value).padStart(2, '0')}
              </span>
              <span className="block mt-0.5 text-xs sm:text-sm font-medium text-ink-muted">{b.label}</span>
            </div>
          ))}
        </div>
      )}
      <p className="mt-4 text-sm text-ink-muted">
        Venue: <span className="font-medium text-ink-soft">{FEST_INFO.shortVenue}</span>
      </p>
    </div>
  );
};

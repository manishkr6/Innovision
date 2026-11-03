import React, { useEffect, useState } from 'react';
import { useLenis } from '../../hooks/useLenis';

// Phones have no Register button in the collapsed navbar, so this keeps one in reach past the hero.
export const MobileRegisterBar = () => {
  const { goToSection } = useLenis();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.8;
      const nearEnd = window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 500;
      setVisible(pastHero && !nearEnd);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  if (!visible) return null;

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-night/95 backdrop-blur px-4 py-3 flex items-center justify-between gap-3">
      <p className="text-sm font-semibold text-white">Free entry · 12 events</p>
      <button
        onClick={() => goToSection('#events')}
        className="shrink-0 px-5 py-2.5 rounded-full bg-marigold-500 hover:bg-marigold-600 text-white text-sm font-semibold transition-colors"
      >
        Register free
      </button>
    </div>
  );
};

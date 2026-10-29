import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { MarqueeStrip } from '../components/home/MarqueeStrip';
import { StatCounters } from '../components/home/StatCounters';
import { EventsGrid } from '../components/home/EventsGrid';
import { CodeOfConduct } from '../components/home/CodeOfConduct';
import { ContactSection } from '../components/home/ContactSection';
import { IntroGlitchLoader } from '../components/home/IntroGlitchLoader';
import { Seo } from '../components/common/Seo';

export const HomePage = () => {
  const [introCompleted, setIntroCompleted] = useState(() => {
    return !!sessionStorage.getItem('innovision_intro_seen');
  });

  return (
    <>
      <Seo 
        title="INNOVISION 2026 | Annual IT & Cultural Fest" 
        description="Join INNOVISION 2026, the annual IT & cultural fest of the Faculty of Science & Technology, The ICFAI University, Sikkim in association with Institution's Innovation Council."
      />

      {/* Cinematic Glitch Intro on First Load */}
      {!introCompleted && (
        <IntroGlitchLoader onComplete={() => setIntroCompleted(true)} />
      )}

      {/* 1a. Advertisement / Hero Banner */}
      <HeroSection />

      {/* Infinite Event Names Marquee */}
      <MarqueeStrip />

      {/* Animated Stat Counters */}
      <StatCounters />

      {/* 1b. Event Details Section (Catalog Grid) */}
      <EventsGrid />

      {/* 1c. Code of Conduct Section */}
      <CodeOfConduct />

      {/* 1d. Contact & Organizing Committee Section */}
      <ContactSection />
    </>
  );
};

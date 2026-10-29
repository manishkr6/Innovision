import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { MarqueeStrip } from '../components/home/MarqueeStrip';
import { AboutSection } from '../components/home/AboutSection';
import { EsportsSpotlight } from '../components/home/EsportsSpotlight';
import { EventsGrid } from '../components/home/EventsGrid';
import { CodeOfConduct } from '../components/home/CodeOfConduct';
import { ContactSection } from '../components/home/ContactSection';
import { Seo } from '../components/common/Seo';

export const HomePage = () => (
  <>
    <Seo
      title="INNOVISION 2026 | Annual IT & Cultural Fest"
      description="Join INNOVISION 2026, the annual IT & cultural fest of the Faculty of Science & Technology, The ICFAI University, Sikkim in association with Institution's Innovation Council."
    />
    <HeroSection />
    <MarqueeStrip />
    <AboutSection />
    <EsportsSpotlight />
    <EventsGrid />
    <CodeOfConduct />
    <ContactSection />
  </>
);

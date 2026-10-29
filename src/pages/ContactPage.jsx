import React from 'react';
import { ContactSection } from '../components/home/ContactSection';
import { Seo } from '../components/common/Seo';

export const ContactPage = () => {
  return (
    <div className="pt-8 pb-12">
      <Seo 
        title="Contact & Organizing Committee" 
        description="Connect with event coordinators and student representatives of INNOVISION 2026 at The ICFAI University, Sikkim."
      />
      <ContactSection />
    </div>
  );
};

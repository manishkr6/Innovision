import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getEventBySlug } from '../data/events';
import { EventHero } from '../components/event/EventHero';
import { EventTabBar } from '../components/event/EventTabBar';
import { EventInfoSection } from '../components/event/EventInfoSection';
import { EventRulesSection } from '../components/event/EventRulesSection';
import { EventRegistrationForm } from '../components/event/EventRegistrationForm';
import { RelatedEvents } from '../components/event/RelatedEvents';
import { Seo } from '../components/common/Seo';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export const EventDetailPage = () => {
  const { slug } = useParams();
  const event = getEventBySlug(slug);

  if (!event) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-16 bg-paper text-ink">
        <div className="p-4 rounded-2xl bg-white border border-gray-200 mb-4 text-gray-900 shadow-sm">
          <AlertCircle className="w-8 h-8 text-marigold-600" />
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-gray-900 uppercase tracking-tight mb-2">
          Event Not Found
        </h1>
        <p className="text-sm text-gray-600 max-w-md mb-6 leading-relaxed">
          Could not find event with identifier &quot;{slug}&quot;. Explore the full catalog of 12 competitions.
        </p>
        <Link
          to="/#events"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black hover:bg-gray-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pb-24 bg-paper text-ink">
      <Seo
        title={`${event.title} | ${event.categoryLabel}`}
        description={`${event.title} - ${event.tagline}. Organized by Faculty of Science & Technology, The ICFAI University, Sikkim.`}
      />

      {/* Hero Banner */}
      <EventHero event={event} />

      {/* Sticky Tab Bar */}
      <EventTabBar />

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2a. Event Info */}
        <EventInfoSection event={event} />

        {/* 2b. Rules & Regulations */}
        <EventRulesSection event={event} />

        {/* 2c. Event Registration Form */}
        <EventRegistrationForm event={event} />

        {/* Bottom Navigation & Related Events */}
        <RelatedEvents currentSlug={event.slug} />
      </div>

    </div>
  );
};

export default EventDetailPage;

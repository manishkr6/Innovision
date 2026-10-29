import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { HomePage } from './pages/HomePage';
import { EventDetailPage } from './pages/EventDetailPage';
import { ContactPage } from './pages/ContactPage';
import { MyRegistrationsPage } from './pages/MyRegistrationsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useSmoothScrollSetup } from './hooks/useLenis';

// Pages not yet redesigned keep their original dark styling until the registration phase
const Legacy = ({ children }) => (
  <div className="bg-cyber-dark text-slate-100 font-body min-h-screen">{children}</div>
);

export const App = () => {
  // One Lenis instance + route/hash scroll handling for the whole app
  useSmoothScrollSetup();

  return (
    <div className="relative min-h-screen bg-paper text-ink flex flex-col justify-between">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-ink focus:text-white focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <ScrollProgressBar />

      <Navbar />

      <main id="main" className="flex-grow relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events/:slug" element={<Legacy><EventDetailPage /></Legacy>} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/passes" element={<Legacy><MyRegistrationsPage /></Legacy>} />
          <Route path="*" element={<Legacy><NotFoundPage /></Legacy>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;

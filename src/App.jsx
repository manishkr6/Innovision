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
import { useLenis } from './hooks/useLenis';

// Pages not yet redesigned keep their original dark styling until the registration phase
const Legacy = ({ children }) => (
  <div className="bg-cyber-dark text-slate-100 font-body min-h-screen">{children}</div>
);

export const App = () => {
  // Initialize Lenis smooth scrolling
  useLenis();

  return (
    <div className="relative min-h-screen bg-paper text-ink flex flex-col justify-between">
      <ScrollProgressBar />

      <Navbar />

      <main className="flex-grow relative z-10">
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

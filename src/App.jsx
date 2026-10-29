import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CustomCursor } from './components/common/CustomCursor';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { CyberBackground } from './components/common/CyberBackground';
import { HomePage } from './pages/HomePage';
import { EventDetailPage } from './pages/EventDetailPage';
import { ContactPage } from './pages/ContactPage';
import { MyRegistrationsPage } from './pages/MyRegistrationsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useLenis } from './hooks/useLenis';

export const App = () => {
  const location = useLocation();
  // Initialize Lenis smooth scrolling
  useLenis();

  return (
    <div className="relative min-h-screen bg-cyber-dark text-slate-100 flex flex-col justify-between selection:bg-cyber-cyan selection:text-cyber-darker transition-colors duration-300">
      
      {/* Scroll Progress Bar at the top */}
      <ScrollProgressBar />

      {/* Cyberpunk Grid & Blobs Ambient Background */}
      <CyberBackground />

      {/* Sticky Main Navigation */}
      <Navbar />

      {/* Main Routed Content - Instant & Reliable Route Mounting */}
      <main className="flex-grow relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events/:slug" element={<EventDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/passes" element={<MyRegistrationsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Comprehensive Official Footer */}
      <Footer />

      {/* Difference Circle Cursor Follower */}
      <CustomCursor />

    </div>
  );
};

export default App;

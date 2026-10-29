import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Ticket, ChevronRight } from 'lucide-react';
import { useLenis } from '../../hooks/useLenis';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [regCount, setRegCount] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollTo } = useLenis();

  const navLinks = [
    { key: 'home', label: 'Home', href: '/' },
    { key: 'esports', label: 'Esports', href: '/#esports', isAnchor: true },
    { key: 'events', label: 'Events', href: '/#events', isAnchor: true },
    { key: 'schedule', label: 'Schedule', href: '/#schedule', isAnchor: true },
    { key: 'code-of-conduct', label: 'Rules', href: '/#code-of-conduct', isAnchor: true },
    { key: 'contact', label: 'Contact', href: '/#contact', isAnchor: true },
  ];
  // Homepage section ids tracked by the scroll-spy, in page order
  const spyIds = navLinks.filter((l) => l.isAnchor).map((l) => l.key);

  // Check saved registrations count in localStorage
  useEffect(() => {
    const updateCount = () => {
      try {
        const stored = JSON.parse(localStorage.getItem('innovision_registrations') || '[]');
        setRegCount(stored.length);
      } catch (e) {
        setRegCount(0);
      }
    };
    updateCount();
    window.addEventListener('storage', updateCount);
    window.addEventListener('innovision_registration_added', updateCount);
    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('innovision_registration_added', updateCount);
    };
  }, []);

  // Handle header blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Dynamic Scroll-Spy and Active Link Tracker
  useEffect(() => {
    if (location.pathname.startsWith('/events/')) {
      setActiveSection('events');
      return;
    }
    if (location.pathname === '/passes') {
      setActiveSection('passes');
      return;
    }

    if (location.pathname === '/' || location.pathname === '') {
      // Active = last tracked section whose top has passed the header; contact wins at the very bottom
      const handleScrollSpy = () => {
        const scrollY = window.scrollY;
        const isNearBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 100;
        if (isNearBottom) return setActiveSection('contact');
        let current = 'home';
        for (const id of spyIds) {
          const el = document.getElementById(id);
          if (el && scrollY + 200 >= el.offsetTop) current = id;
        }
        setActiveSection(current);
      };

      const hashKey = location.hash.replace('#', '');
      if (spyIds.includes(hashKey)) setActiveSection(hashKey);

      window.addEventListener('scroll', handleScrollSpy, { passive: true });
      return () => window.removeEventListener('scroll', handleScrollSpy);
    }
  }, [location.pathname, location.hash]);

  const isLinkActive = (link) => {
    if (link.key === 'home') {
      return location.pathname === '/' && activeSection === 'home';
    }
    return activeSection === link.key;
  };

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setActiveSection(link.key);

    if (link.isAnchor) {
      const targetHash = link.href.replace('/', '');
      window.history.replaceState(null, '', `/${targetHash}`);

      if (location.pathname === '/') {
        scrollTo(targetHash);
      } else {
        navigate(`/${targetHash}`);
        setTimeout(() => {
          scrollTo(targetHash);
        }, 150);
      }
    } else {
      window.history.replaceState(null, '', '/');
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
    }
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    setActiveSection('home');
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState(null, '', '/');
    }
  };

  const handleRegisterClick = () => {
    setActiveSection('events');
    window.history.replaceState(null, '', '/#events');
    if (location.pathname === '/') {
      scrollTo('#events');
    } else {
      navigate('/#events');
      setTimeout(() => {
        scrollTo('#events');
      }, 150);
    }
    setMobileMenuOpen(false);
  };

  // Transparent over the hero photo / dark pages; solid paper bar once scrolled or on light pages
  const solid = isScrolled || mobileMenuOpen || location.pathname === '/contact';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid
          ? 'py-3 bg-paper/95 backdrop-blur-md border-b border-ink-line shadow-sm'
          : 'py-5 bg-gradient-to-b from-black/40 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" onClick={handleLogoClick} className="flex items-center gap-3 focus:outline-none">
            <span className="w-10 h-10 rounded-xl bg-marigold-500 text-white font-heading font-extrabold text-lg flex items-center justify-center shadow-sm">
              IV
            </span>
            <span className="flex flex-col leading-tight">
              <span className={`font-heading text-lg sm:text-xl font-extrabold tracking-tight ${solid ? 'text-ink' : 'text-white'}`}>
                INNOVISION <span className="text-marigold-500">2026</span>
              </span>
              <span className={`text-xs font-medium ${solid ? 'text-ink-muted' : 'text-white/75'}`}>
                ICFAI University, Sikkim
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    solid
                      ? active ? 'bg-ink text-white' : 'text-ink-soft hover:bg-paper-deep'
                      : active ? 'bg-white text-ink' : 'text-white/90 hover:bg-white/15'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {regCount > 0 && (
              <Link
                to="/passes"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium border transition-colors ${
                  solid ? 'border-ink-line text-ink-soft hover:bg-paper-deep' : 'border-white/40 text-white hover:bg-white/15'
                }`}
                title="View your registered event passes"
              >
                <Ticket className="w-4 h-4" />
                My Passes ({regCount})
              </Link>
            )}
            <button
              onClick={handleRegisterClick}
              className="px-5 py-2.5 rounded-full bg-marigold-500 hover:bg-marigold-600 text-white text-sm font-semibold shadow-sm transition-colors"
            >
              Register now
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={`lg:hidden p-2 rounded-lg ${solid ? 'text-ink' : 'text-white'}`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-paper border-b border-ink-line px-4 pt-3 pb-5 overflow-hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`flex items-center justify-between px-3 py-3 rounded-xl text-base font-medium ${
                    isLinkActive(link) ? 'bg-paper-deep text-ink' : 'text-ink-soft'
                  }`}
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4 text-ink-muted" />
                </a>
              ))}
              {regCount > 0 && (
                <Link
                  to="/passes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-3 rounded-xl text-base font-medium text-ink-soft"
                >
                  <Ticket className="w-4 h-4" /> My Passes ({regCount})
                </Link>
              )}
              <button
                onClick={handleRegisterClick}
                className="mt-2 py-3 rounded-full bg-marigold-500 text-white font-semibold"
              >
                Register now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

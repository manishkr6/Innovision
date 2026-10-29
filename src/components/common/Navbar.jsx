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
    { key: 'events', label: 'Events', href: '/#events', isAnchor: true },
    { key: 'code-of-conduct', label: 'Code of Conduct', href: '/#code-of-conduct', isAnchor: true },
    { key: 'contact', label: 'Contact', href: '/#contact', isAnchor: true },
  ];

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
      const handleScrollSpy = () => {
        const contactEl = document.getElementById('contact');
        const conductEl = document.getElementById('code-of-conduct');
        const eventsEl = document.getElementById('events');

        const scrollY = window.scrollY;
        const windowBottom = window.innerHeight + scrollY;
        const isNearBottom = windowBottom >= document.documentElement.scrollHeight - 100;

        if (contactEl && (isNearBottom || scrollY + 200 >= contactEl.offsetTop)) {
          setActiveSection('contact');
        } else if (conductEl && scrollY + 200 >= conductEl.offsetTop) {
          setActiveSection('code-of-conduct');
        } else if (eventsEl && scrollY + 200 >= eventsEl.offsetTop) {
          setActiveSection('events');
        } else {
          setActiveSection('home');
        }
      };

      if (location.hash === '#contact') {
        setActiveSection('contact');
      } else if (location.hash === '#code-of-conduct') {
        setActiveSection('code-of-conduct');
      } else if (location.hash === '#events') {
        setActiveSection('events');
      }

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-[#07090E]/90 backdrop-blur-md border-b border-white/[0.08] shadow-lg'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left: <IV> Badge + INNOVISION 2026 */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl border border-white/15 bg-white/[0.04] flex items-center justify-center text-white font-mono text-xs font-bold group-hover:border-white/30 transition-all">
              &lt;IV&gt;
            </div>
            
            <div className="flex flex-col text-left">
              <span className="font-display tracking-wider text-xl sm:text-2xl font-black text-white">
                INNOVISION <span className="text-blue-400 text-lg">2026</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
                ICFAI SIKKIM // FST
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isLinkActive(link);

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative font-body text-sm tracking-wide transition-all py-1.5 px-1 cursor-pointer ${
                    active
                      ? 'text-white font-semibold'
                      : 'text-slate-400 hover:text-white font-medium'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* My Passes Pill if registered */}
            {regCount > 0 && (
              <Link
                to="/passes"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all ${
                  activeSection === 'passes'
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                    : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.06]'
                }`}
                title="View your registered event tickets"
              >
                <Ticket className="w-3.5 h-3.5 text-blue-400" />
                <span>My Passes ({regCount})</span>
              </Link>
            )}

            {/* Pill-shaped REGISTER button */}
            <button
              onClick={handleRegisterClick}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-mono text-xs font-bold tracking-wider uppercase shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 hover:scale-105 active:scale-95 transition-all"
            >
              REGISTER
            </button>
          </div>

          {/* Mobile Menu Hamburger button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile navigation menu"
              className="p-2 rounded-lg border border-white/10 bg-white/[0.04] text-slate-200 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-b border-white/10 bg-[#07090E]/95 backdrop-blur-xl px-4 pt-4 pb-6 overflow-hidden"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const active = isLinkActive(link);

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-body text-base font-medium transition-colors ${
                      active
                        ? 'text-white bg-white/[0.06] font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className={`w-4 h-4 ${active ? 'text-blue-400' : 'text-slate-500'}`} />
                  </a>
                );
              })}

              {regCount > 0 && (
                <Link
                  to="/passes"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg border font-mono text-sm ${
                    activeSection === 'passes'
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                      : 'bg-white/[0.03] border-white/10 text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-blue-400" />
                    My Saved Passes ({regCount})
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              )}

              <button
                onClick={handleRegisterClick}
                className="w-full mt-2 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 font-mono text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                REGISTER NOW
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

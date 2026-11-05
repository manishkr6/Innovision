import { useEffect, useCallback, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

// Space kept above a section when scrolling to it, so the fixed header never covers its heading
export const HEADER_OFFSET = 80;

// The single Lenis instance for the app (created by useSmoothScrollSetup); null under reduced motion
export let globalLenisInstance = null;

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll to a selector, element or pixel offset through Lenis, falling back to native scrolling
export const scrollToTarget = (target, { immediate = false, offset } = {}) => {
  let targetNumber = null;

  if (typeof target === 'number') {
    targetNumber = target;
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      const isRegister =
        (typeof target === 'string' && target.includes('register')) ||
        (el.id === 'register');
      // For #register, clear the fixed navbar + sticky tab bar (~125px)
      const clearOffset = isRegister ? 125 : HEADER_OFFSET;
      const appliedOffset = offset !== undefined ? -offset : clearOffset;
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      targetNumber = Math.max(0, el.getBoundingClientRect().top + currentScroll - appliedOffset);
    }
  }

  if (targetNumber !== null) {
    if (globalLenisInstance) {
      globalLenisInstance.scrollTo(targetNumber, { immediate, duration: 0.9 });
      return;
    }
    const behavior = immediate || reducedMotion() ? 'auto' : 'smooth';
    window.scrollTo({ top: targetNumber, behavior });
  }
};

// Wait (up to ~2s) for a section to mount after a route change, then scroll to it
const scrollWhenReady = (hash, opts) => {
  let frames = 0;
  let raf;
  const attempt = () => {
    const el = document.querySelector(hash);
    if (el) {
      // For #register, use smooth scroll so user sees the scroll down to the registration form
      const isRegister = hash === '#register';
      const immediate = isRegister ? false : opts?.immediate;
      return scrollToTarget(el, { ...opts, immediate });
    }
    if (frames++ < 120) raf = requestAnimationFrame(attempt);
  };
  attempt();
  return () => cancelAnimationFrame(raf);
};

/**
 * Call ONCE (in App). Owns the Lenis instance and all route/hash scroll behaviour:
 * - new page without a hash -> jump to top
 * - URL with a hash (link click, deep link, refresh, back/forward) -> scroll to that section once it exists
 */
export const useSmoothScrollSetup = () => {
  const location = useLocation();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    globalLenisInstance = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      globalLenisInstance = null;
    };
  }, [prefersReduced]);

  // New page -> jump instantly; same page (section links, Home, back/forward) -> smooth scroll
  const prevPath = useRef(null);
  useEffect(() => {
    const samePage = prevPath.current === location.pathname;
    prevPath.current = location.pathname;
    if (location.hash) return scrollWhenReady(location.hash, { immediate: !samePage });
    scrollToTarget(0, { immediate: !samePage });
  }, [location.pathname, location.hash, location.key]);
};

/**
 * Navigation helpers for any component (does NOT create a Lenis instance).
 * goToSection('#events') works from any page and adds a history entry, so Back returns to where you were.
 */
export const useLenis = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollTo = useCallback((target, opts) => scrollToTarget(target, opts), []);

  const goToSection = useCallback(
    (hash) => {
      if (location.pathname === '/' && location.hash === hash) scrollToTarget(hash);
      else navigate(`/${hash}`);
    },
    [location.pathname, location.hash, navigate]
  );

  const goHome = useCallback(() => {
    if (location.pathname === '/' && !location.hash) scrollToTarget(0);
    else navigate('/');
  }, [location.pathname, location.hash, navigate]);

  return { scrollTo, goToSection, goHome };
};

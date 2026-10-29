import React, { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Modern High-End Difference Circle Cursor
 * - Removes glowing colored particle trails/dust
 * - Pure white circle lens with `mix-blend-mode: difference`
 * - Rest state: Crisp 16px circular follower
 * - Hover state: Smoothly expands to 68px over text, headings, buttons, and links
 * - Inverts colors of text and elements beneath it in real time
 * - Click feedback: Elastic spring compression
 */
export const CustomCursor = () => {
  const prefersReduced = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorRef = useRef(null);

  // Mutable refs for high-performance 60/120fps render loop without re-renders
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const scale = useRef(1);
  const isHoveredRef = useRef(false);
  const isClickingRef = useRef(false);
  const isInputRef = useRef(false);
  const animFrameId = useRef(null);

  useEffect(() => {
    // Disable on touch devices (mobile, tablets)
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    // Helper: Detect whether target element is text or interactive
    const checkHoverTarget = (target) => {
      if (!target || target === document.body || target === document.documentElement) {
        return { isHover: false, isInput: false };
      }

      // Check form inputs
      if (target.closest('input, textarea, select')) {
        return { isHover: true, isInput: true };
      }

      // Interactive clickable elements
      if (
        target.closest(
          'a, button, [role="button"], .cursor-pointer, [data-cursor-hover], [data-magnetic], summary'
        )
      ) {
        return { isHover: true, isInput: false };
      }

      // Headings & Text Containers (all headings, paragraphs, labels, codes)
      if (
        target.closest(
          'h1, h2, h3, h4, h5, h6, p, label, code, pre, blockquote, dt, dd, figcaption'
        )
      ) {
        return { isHover: true, isInput: false };
      }

      // Inline text spans, list items, badges with non-empty content
      const textLeaf = target.closest('span, li, strong, b, em, time, mark, small');
      if (textLeaf && textLeaf.textContent && textLeaf.textContent.trim().length > 0) {
        return { isHover: true, isInput: false };
      }

      return { isHover: false, isInput: false };
    };

    const onMouseMove = (e) => {
      if (!isVisible) {
        setIsVisible(true);
        pos.current.x = e.clientX;
        pos.current.y = e.clientY;
      }

      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const { isHover, isInput } = checkHoverTarget(e.target);
      isHoveredRef.current = isHover;
      isInputRef.current = isInput;
      setIsHovered(isHover);
    };

    const onScroll = () => {
      if (mouse.current.x >= 0 && mouse.current.y >= 0) {
        const el = document.elementFromPoint(mouse.current.x, mouse.current.y);
        const { isHover, isInput } = checkHoverTarget(el);
        isHoveredRef.current = isHover;
        isInputRef.current = isInput;
        setIsHovered(isHover);
      }
    };

    const onMouseDown = () => {
      isClickingRef.current = true;
      setIsClicking(true);
    };

    const onMouseUp = () => {
      isClickingRef.current = false;
      setIsClicking(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // High-performance animation loop
    const render = () => {
      // Fluid physics position lerp (0.24 is snappy yet buttery smooth)
      const posLerp = 0.24;
      pos.current.x += (mouse.current.x - pos.current.x) * posLerp;
      pos.current.y += (mouse.current.y - pos.current.y) * posLerp;

      // Dynamic scale computation based on state
      let targetScale = 1.0;
      if (isInputRef.current) {
        targetScale = 0.5; // Compact dot inside inputs for typing clarity
      } else if (isHoveredRef.current) {
        // Expands to ~68px on hover (16px * 4.25 = 68px)
        targetScale = isClickingRef.current ? 3.4 : 4.25;
      } else if (isClickingRef.current) {
        targetScale = 0.75;
      }

      // Smooth elastic scale lerp
      scale.current += (targetScale - scale.current) * 0.18;

      // Apply GPU-accelerated transform
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) scale(${scale.current})`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (prefersReduced || isTouchDevice) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`fixed top-0 left-0 w-4 h-4 rounded-full bg-white pointer-events-none select-none z-[999999] will-change-transform transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        mixBlendMode: 'difference',
      }}
    />
  );
};

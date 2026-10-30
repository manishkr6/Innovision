import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Fades children up once when they scroll into view; renders statically under prefers-reduced-motion
export const Reveal = ({ children, delay = 0, className = '', as = 'div' }) => {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  if (reduced) return <Tag className={className}>{children}</Tag>;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </Tag>
  );
};

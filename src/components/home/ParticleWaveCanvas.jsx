import React, { useEffect, useRef } from 'react';

/**
 * High-Performance Celestial Nebula Canvas
 * Features:
 * - Fluid cosmic wave ribbons with sapphire, electric blue, and silver stardust
 * - Flowing 3D perspective cyber grid with traveling signal pulses
 * - Zero artificial colored spotlight attached to mouse
 */
export const ParticleWaveCanvas = ({ className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    let time = 0;

    // Generate static stardust stars in background
    const numStars = 65;
    const stars = [];
    for (let s = 0; s < numStars; s++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.5 ? '#93C5FD' : '#E2E8F0',
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      // 1. Draw subtle twinkling background stars
      for (let s = 0; s < stars.length; s++) {
        const star = stars[s];
        const alpha = 0.2 + Math.sin(time * star.twinkleSpeed * 60 + star.phase) * 0.25;
        if (alpha > 0.05) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // 2. Top-Right Cosmic Nebula Wave
      const trWidth = width * 0.65;
      const numParticlesTR = 240;

      for (let i = 0; i < numParticlesTR; i++) {
        const u = i / numParticlesTR;
        const angle = u * Math.PI * 2.8 + time * 0.18;
        const radius = 60 + u * (trWidth * 0.7);

        // Fluid organic wave motion
        const wave1 = Math.sin(u * 10 + time * 1.2) * 26;
        const wave2 = Math.cos(u * 6 - time * 0.8) * 16;
        const px = width - 30 - Math.cos(angle * 0.55) * radius + wave1;
        const py = 30 + Math.sin(angle * 0.48) * (radius * 0.52) + wave2;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const depth = (Math.sin(u * 8 + time) + 1) / 2;
          const size = 1.0 + depth * 2.2;
          const alpha = 0.18 + depth * 0.45;

          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = i % 3 === 0
            ? `rgba(96, 165, 250, ${alpha})`
            : i % 3 === 1
            ? `rgba(129, 140, 248, ${alpha})`
            : `rgba(241, 245, 249, ${alpha * 0.85})`;
          ctx.fill();
        }
      }

      // 3. Bottom-Left Flowing Cosmic Ribbon
      const numParticlesBL = 220;
      for (let j = 0; j < numParticlesBL; j++) {
        const u = j / numParticlesBL;
        const waveX = u * (width * 0.55);
        const baseWaveY = height * 0.74 + Math.sin(u * 7 + time * 1.1) * 50;
        const secondary = Math.cos(u * 12 - time * 1.5) * 24;
        const py = baseWaveY + secondary;
        const px = waveX + Math.sin(j * 0.4 + time) * 14;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const depth = (Math.sin(u * 7 + time) + 1) / 2;
          const size = 1.1 + depth * 2.3;
          const alpha = 0.18 + depth * 0.45;

          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = j % 2 === 0
            ? `rgba(56, 189, 248, ${alpha})`
            : `rgba(99, 102, 241, ${alpha * 0.9})`;
          ctx.fill();
        }
      }

      // 4. Perspective Cyber Horizon Grid with Traveling Pulses
      const cols = Math.min(Math.floor(width / 32), 42);
      const rows = 16;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const normX = (c / cols - 0.5) * 2;
          const normY = r / rows;

          const z = 1 + normY * 2.4;
          const px = width / 2 + (normX * width * 0.58) / z;
          const py = height * 0.54 + (normY * height * 0.46);

          const wave = Math.sin(c * 0.35 + time * 1.2) * Math.cos(r * 0.4 + time) * 5;
          const finalY = py + wave;

          // Grid signal pulse traveling through
          const pulse = (Math.sin(c * 0.5 - time * 2.5) + 1) / 2;
          const pulseBoost = pulse > 0.85 ? 0.25 : 0;

          const alpha = 0.03 + normY * 0.1 + pulseBoost;

          if (px >= 0 && px <= width && finalY <= height) {
            ctx.fillStyle = `rgba(148, 163, 184, ${alpha})`;
            ctx.fillRect(px, finalY, 1.4, 1.4);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
    />
  );
};

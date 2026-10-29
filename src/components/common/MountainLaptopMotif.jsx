import React from 'react';

export const MountainLaptopMotif = ({ className = "w-full max-w-lg h-auto" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 600 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto opacity-75"
      >
        <defs>
          <linearGradient id="peakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#6366F1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1E293B" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="laptopGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0B0F19" />
            <stop offset="50%" stopColor="#131B2E" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
        </defs>

        {/* Outer Tech Circuit Ring */}
        <circle cx="300" cy="200" r="180" stroke="#3B82F6" strokeWidth="1" strokeDasharray="6 6" opacity="0.2" />
        <circle cx="300" cy="200" r="150" stroke="#6366F1" strokeWidth="1" strokeDasharray="4 8" opacity="0.15" />

        {/* Circuit Traces running behind */}
        <g opacity="0.3" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round">
          <path d="M100 240H170L210 200H240" />
          <circle cx="100" cy="240" r="2.5" fill="#94A3B8" />
          <path d="M500 240H430L390 200H360" />
          <circle cx="500" cy="240" r="2.5" fill="#94A3B8" />
          <path d="M220 80V120L250 150" />
          <circle cx="220" cy="80" r="2.5" fill="#6366F1" />
          <path d="M380 80V120L350 150" />
          <circle cx="380" cy="80" r="2.5" fill="#6366F1" />
        </g>

        {/* Himalayan Mountain Peaks (Kanchenjunga Silhouette) */}
        <polygon points="120,290 220,130 310,240" fill="url(#peakGrad)" opacity="0.35" />
        <polygon points="290,240 380,110 480,290" fill="url(#peakGrad)" opacity="0.35" />
        
        {/* Central Majestic Peak */}
        <polygon points="190,290 300,70 410,290" fill="url(#peakGrad)" opacity="0.65" />
        <polyline points="300,70 285,130 300,160 315,130 300,70" fill="#93C5FD" opacity="0.75" />
        <line x1="300" y1="70" x2="300" y2="290" stroke="#60A5FA" strokeWidth="1.5" opacity="0.4" strokeDasharray="6 4" />
        
        {/* Mountain Contour Wireframes */}
        <line x1="240" y1="180" x2="360" y2="180" stroke="#60A5FA" strokeWidth="1" opacity="0.3" />
        <line x1="210" y1="230" x2="390" y2="230" stroke="#818CF8" strokeWidth="1" opacity="0.3" />

        {/* Modern Laptop Silhouette */}
        <rect x="200" y="190" width="200" height="120" rx="8" fill="url(#laptopGrad)" stroke="#334155" strokeWidth="1.5" />
        <rect x="210" y="200" width="180" height="100" rx="4" fill="#07090E" />
        
        {/* Screen Display Content */}
        <g>
          <text x="225" y="225" fill="#60A5FA" fontFamily="monospace" fontSize="11" fontWeight="bold">&lt;/&gt;</text>
          <text x="350" y="225" fill="#818CF8" fontFamily="monospace" fontSize="11" fontWeight="bold">&#123;..&#125;</text>
          <path d="M225 255L245 255L255 240L265 270L275 250L285 258L300 255H375" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="248" y="285" fill="#64748B" fontFamily="monospace" fontSize="9" letterSpacing="2">INNOVISION 26</text>
        </g>

        {/* Laptop Keyboard Base */}
        <path d="M165 315L195 312H405L435 315L445 328H155L165 315Z" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
        <line x1="170" y1="326" x2="430" y2="326" stroke="#38BDF8" strokeWidth="1.5" opacity="0.5" />
        <rect x="270" y="317" width="60" height="8" rx="2" fill="#07090E" stroke="#334155" strokeWidth="1" />

        {/* Subtle nodes around */}
        <circle cx="210" cy="110" r="3" fill="#60A5FA" opacity="0.6" />
        <circle cx="390" cy="100" r="3" fill="#818CF8" opacity="0.6" />
        <circle cx="160" cy="190" r="2.5" fill="#94A3B8" opacity="0.5" />
        <circle cx="440" cy="190" r="2.5" fill="#94A3B8" opacity="0.5" />
      </svg>
    </div>
  );
};

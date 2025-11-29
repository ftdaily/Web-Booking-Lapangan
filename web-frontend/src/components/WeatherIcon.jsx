import React from 'react';

// Small set of inline SVG icons to replace emoji. Minimal, accessible.
const Icon = ({ type = 'clear', size = 36 }) => {
  switch (type) {
    case 'clear':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <circle cx="12" cy="12" r="4" fill="#FBBF24" />
          <g stroke="#FBBF24" strokeWidth="1.2">
            <path d="M12 2v2" strokeLinecap="round" />
            <path d="M12 20v2" strokeLinecap="round" />
            <path d="M4.93 4.93l1.414 1.414" strokeLinecap="round" />
            <path d="M17.657 17.657l1.414 1.414" strokeLinecap="round" />
            <path d="M2 12h2" strokeLinecap="round" />
            <path d="M20 12h2" strokeLinecap="round" />
            <path d="M4.93 19.07l1.414-1.414" strokeLinecap="round" />
            <path d="M17.657 6.343l1.414-1.414" strokeLinecap="round" />
          </g>
        </svg>
      );
    case 'cloud':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 17a4 4 0 0 0-4-4H8a4 4 0 1 0 0 8h12" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'rain':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 14a4 4 0 0 0-4-4H8a4 4 0 1 0 0 8h12" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 20l-1.5 2" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 20l-1.5 2" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 20l-1.5 2" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'storm':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 14a4 4 0 0 0-4-4H8a4 4 0 1 0 0 8h12" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 13l-2 4h3l-1 4" stroke="#F43F5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'snow':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 14a4 4 0 0 0-4-4H8a4 4 0 1 0 0 8h12" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <g stroke="#94a3b8" strokeWidth="1.2">
            <path d="M8 18h0" strokeLinecap="round" />
            <path d="M8 20h0" strokeLinecap="round" />
            <path d="M10 19h0" strokeLinecap="round" />
            <path d="M12 18h0" strokeLinecap="round" />
          </g>
        </svg>
      );
    case 'mist':
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12h16" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 16h16" stroke="#e2e8f0" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
  }
};

export default Icon;

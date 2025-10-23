import React from 'react';

export const PuzzleIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M20.5 11H19v-1a1 1 0 00-1-1h-1v-1a1 1 0 00-1-1h-1v-1a1 1 0 00-1-1H7a1 1 0 00-1 1v1H5a1 1 0 00-1 1v1H3a1 1 0 00-1 1v6a1 1 0 001 1h1v1a1 1 0 001 1h1v1a1 1 0 001 1h6a1 1 0 001-1v-1h1a1 1 0 001-1v-1h1a1 1 0 001-1v-2h1.5a1.5 1.5 0 000-3z"/>
  </svg>
);

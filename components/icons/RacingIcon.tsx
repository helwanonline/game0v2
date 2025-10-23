import React from 'react';

export const RacingIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M2 3h2v18H2V3zm4 0h2v9h10V3h2v9h-2v3h2v6h-2v-3H8v3H6V3zm2 2v5h8V5H8z"/>
  </svg>
);

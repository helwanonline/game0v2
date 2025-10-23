import React from 'react';

export const ActionIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M22.414 3.586l-2-2a1 1 0 00-1.414 0L17.5 3H12v1.5l-3.293 3.293a1 1 0 000 1.414L10.5 14.5l-5.793 5.793a1 1 0 000 1.414l2 2a1 1 0 001.414 0L14.5 17.5l5.293-5.293a1 1 0 000-1.414L16.5 7.5V5h2.086l1.5-1.5a1 1 0 00.328-1.914zM15 9.586l3.207 3.207-3.5 3.5L11.5 13.086l3.5-3.5z"/>
  </svg>
);

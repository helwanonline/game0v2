import React from 'react';

export const AdventureIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path fillRule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1.5-3.5l4-4-4-4v8z" clipRule="evenodd"/>
    <path d="M10.293 8.293l-1.414 1.414L12 12.828l3.121-3.121-1.414-1.414L12 10l-1.707-1.707z"/>
  </svg>
);

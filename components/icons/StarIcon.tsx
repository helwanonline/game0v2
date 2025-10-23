import React from 'react';

// Fix: Defined a props interface and used React.FC to correctly type the component.
// This ensures that special React props like 'key' are handled correctly by TypeScript.
interface StarIconProps {
  className?: string;
  filled?: boolean;
}

export const StarIcon: React.FC<StarIconProps> = ({ className = 'w-4 h-4', filled = true }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"} 
    stroke="currentColor"
    strokeWidth={filled ? "0" : "2"}
    className={className}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.321l5.522.802a.563.563 0 01.312.956l-4 3.898a.563.563 0 00-.162.59l.946 5.499a.563.563 0 01-.815.592L12 18.348l-4.935 2.595a.563.563 0 01-.815-.592l.946-5.499a.563.563 0 00-.162-.59l-4-3.898a.563.563 0 01.312-.956l5.522-.802a.563.563 0 00.475-.321L11.48 3.5z" 
    />
  </svg>
);

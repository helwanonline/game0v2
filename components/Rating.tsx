import React from 'react';
import { StarIcon } from './icons/StarIcon';

interface RatingProps {
  rating: number; 
  maxRating?: number;
}

export const Rating: React.FC<RatingProps> = ({ rating, maxRating = 3 }) => {
  return (
    <div className="flex items-center" aria-label={`Rating: ${rating} out of ${maxRating}`}>
      {Array.from({ length: maxRating }, (_, i) => (
        <StarIcon key={i} className="w-3.5 h-3.5 text-yellow-400" filled={i < rating} />
      ))}
    </div>
  );
};

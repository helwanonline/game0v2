import React from 'react';
import type { Language } from '../types';
import { Category, CATEGORY_DETAILS } from '../types';

const ALL_CATEGORIES = Object.values(Category);

interface CategoryGridProps {
  language: Language;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ language }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {ALL_CATEGORIES.map(cat => {
        const details = CATEGORY_DETAILS[cat];
        return (
          <a
            key={cat}
            href={`#/${details.slug}`}
            className="block p-6 bg-secondary rounded-xl text-center font-bold text-lg text-light-text hover:bg-gray-700 hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
          >
            {details[language]}
          </a>
        );
      })}
    </div>
  );
};

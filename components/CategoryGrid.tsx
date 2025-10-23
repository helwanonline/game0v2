import React from 'react';
import type { Language } from '../types';
import { Category, CATEGORY_DETAILS } from '../types';

const ALL_CATEGORIES = Object.values(Category);

interface CategoryGridProps {
  language: Language;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ language }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
      {ALL_CATEGORIES.map(cat => {
        const details = CATEGORY_DETAILS[cat];
        const Icon = details.icon;
        return (
          <a
            key={cat}
            href={`#/${details.slug}`}
            className="block p-4 bg-secondary rounded-xl text-center font-bold text-light-text hover:bg-gray-700 hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center gap-3 aspect-square"
          >
            <Icon className="w-10 h-10 text-accent" />
            <span className="text-sm">{details[language]}</span>
          </a>
        );
      })}
    </div>
  );
};

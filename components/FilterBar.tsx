
import React from 'react';
import { Category, CATEGORY_TRANSLATIONS, Language } from '../types';

interface FilterBarProps {
  activeCategory: Category | 'All';
  setActiveCategory: (category: Category | 'All') => void;
  language: Language;
}

const ALL_CATEGORIES = Object.values(Category);

export const FilterBar: React.FC<FilterBarProps> = ({ activeCategory, setActiveCategory, language }) => {
  const buttonClasses = (isActive: boolean) =>
    `px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent ${
      isActive
        ? 'bg-accent text-white shadow-md'
        : 'bg-secondary text-dark-text hover:bg-gray-700 hover:text-light-text'
    }`;

  return (
    <div className="py-4 overflow-x-auto">
      <div className="flex justify-center items-center gap-2 md:gap-4 px-4">
        <button
          onClick={() => setActiveCategory('All')}
          className={buttonClasses(activeCategory === 'All')}
        >
          {language === 'ar' ? 'الكل' : 'All'}
        </button>
        {ALL_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={buttonClasses(activeCategory === category)}
          >
            {CATEGORY_TRANSLATIONS[category][language]}
          </button>
        ))}
      </div>
    </div>
  );
};

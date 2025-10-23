
import React from 'react';
import type { Language } from '../types';

interface TagCloudProps {
    tags: string[];
    activeTag: string | null;
    onTagSelect: (tag: string | null) => void;
    language: Language;
}

export const TagCloud: React.FC<TagCloudProps> = ({ tags, activeTag, onTagSelect, language }) => {

    const buttonClasses = (isActive: boolean) =>
    `px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent ${
      isActive
        ? 'bg-accent text-white shadow-md'
        : 'bg-primary text-dark-text hover:bg-gray-800 hover:text-light-text'
    }`;


    return (
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
            <button
                onClick={() => onTagSelect(null)}
                className={buttonClasses(activeTag === null)}
            >
                {language === 'ar' ? 'كل الوسوم' : 'All Tags'}
            </button>
            {tags.map(tag => (
                <button 
                    key={tag}
                    onClick={() => onTagSelect(tag)}
                    className={buttonClasses(activeTag === tag)}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
}

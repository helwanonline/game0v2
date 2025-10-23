import React from 'react';
import type { Language } from '../types';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  language: Language;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({ currentPage, totalPages, onPageChange, language }) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const buttonClasses = (disabled: boolean) => 
    `px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent ${
      disabled 
        ? 'bg-gray-800 text-dark-text cursor-not-allowed'
        : 'bg-secondary text-light-text hover:bg-gray-700'
    }`;


  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button onClick={handlePrev} disabled={currentPage === 1} className={buttonClasses(currentPage === 1)}>
        {language === 'ar' ? 'السابق' : 'Previous'}
      </button>
      <span className="text-dark-text">
        {language === 'ar' ? `صفحة ${currentPage} من ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages} className={buttonClasses(currentPage === totalPages)}>
        {language === 'ar' ? 'التالي' : 'Next'}
      </button>
    </div>
  );
};

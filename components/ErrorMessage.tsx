import React from 'react';
import type { Language } from '../types';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
  language: Language;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry, language }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 my-10 bg-secondary rounded-lg">
      <p className="text-xl font-semibold text-red-500 mb-4">
        {language === 'ar' ? 'حدث خطأ' : 'An Error Occurred'}
      </p>
      <p className="text-dark-text mb-6">
        {language === 'ar' ? 'لم نتمكن من تحميل المحتوى. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.' : 'We couldn\'t load the content. Please check your internet connection and try again.'}
      </p>
      <button
        onClick={onRetry}
        className="bg-accent text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 hover:bg-accent-hover"
      >
        {language === 'ar' ? 'إعادة المحاولة' : 'Retry'}
      </button>
       <p className="text-xs text-gray-600 mt-4">Error: {message}</p>
    </div>
  );
};

import React from 'react';
import type { Language } from '../types';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-secondary border-t border-gray-800 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-dark-text">
           <a href="#/">
             <img className="h-12 w-auto mx-auto mb-4" src="https://i.postimg.cc/qRDFtvc0/5199logo.png" alt="5199.online Logo" />
           </a>
          <p>
            &copy; {year} 5199.online. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="#/about" className="hover:text-light-text transition-colors">{language === 'ar' ? 'من نحن' : 'About Us'}</a>
            <a href="#/contact" className="hover:text-light-text transition-colors">{language === 'ar' ? 'اتصل بنا' : 'Contact Us'}</a>
          </div>
          <p className="text-xs mt-6 max-w-lg mx-auto">
            {language === 'ar' ? 'جميع الألعاب على 5199.online منسقة بعناية لتوفير تجربة آمنة وممتعة ومناسبة للعائلة.' : 'All games on 5199.online are carefully curated to provide a safe, fun, and family-friendly experience.'}
          </p>
        </div>
      </div>
    </footer>
  );
};
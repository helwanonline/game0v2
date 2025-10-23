
import React from 'react';
import type { Language } from '../types';

export const OpenSourceGamesPage: React.FC<{language: Language}> = ({language}) => (
    <div className="container mx-auto text-center p-10 flex flex-col items-center justify-center h-full min-h-[50vh]">
        <h1 className="text-4xl font-bold text-accent">
            {language === 'ar' ? 'ألعاب مفتوحة المصدر' : 'Open Source Games'}
        </h1>
        <p className="mt-4 text-dark-text text-lg max-w-md">
            {language === 'ar' ? 'سيتم إضافة هذا القسم قريبًا، مع مجموعة رائعة من الألعاب المجانية ومفتوحة المصدر!' : 'This section is coming soon, with a great collection of free and open-source games!'}
        </p>
    </div>
);

export default OpenSourceGamesPage;
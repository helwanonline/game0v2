import React from 'react';
import { CategoryPage } from './CategoryPage';
import type { Game, Language } from '../types';
import { Category } from '../types';

interface OpenSourceGamesPageProps {
  language: Language;
  onPlay: (game: Game) => void;
}

export const OpenSourceGamesPage: React.FC<OpenSourceGamesPageProps> = ({ language, onPlay }) => {
  const openSourceCategories = [Category.OpenSource];
  const pageTitle = language === 'ar' ? 'ألعاب مفتوحة المصدر' : 'Open Source Games';

  return (
    <CategoryPage
      language={language}
      onPlay={onPlay}
      categories={openSourceCategories}
      pageTitleOverride={pageTitle}
    />
  );
};

export default OpenSourceGamesPage;


import React from 'react';
import { CategoryPage } from './CategoryPage';
import type { Game, Language } from '../types';
import { Category } from '../types';

interface BoysGamesPageProps {
  language: Language;
  onPlay: (game: Game) => void;
}

export const BoysGamesPage: React.FC<BoysGamesPageProps> = ({ language, onPlay }) => {
  const boysCategories = [Category.Action, Category.Adventure, Category.Racing];
  const pageTitle = language === 'ar' ? 'ألعاب أولاد' : 'Boys Games';

  return (
    <CategoryPage
      language={language}
      onPlay={onPlay}
      categories={boysCategories}
      pageTitleOverride={pageTitle}
    />
  );
};

export default BoysGamesPage;
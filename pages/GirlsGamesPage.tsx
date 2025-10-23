import React from 'react';
import { CategoryPage } from './CategoryPage';
import type { Game, Language } from '../types';
import { Category } from '../types';

interface GirlsGamesPageProps {
  language: Language;
  onPlay: (game: Game) => void;
}

export const GirlsGamesPage: React.FC<GirlsGamesPageProps> = ({ language, onPlay }) => {
  const girlsCategories = [Category.Girls, Category.Puzzle];
  const pageTitle = language === 'ar' ? 'ألعاب بنات' : 'Girls Games';

  return (
    <CategoryPage
      language={language}
      onPlay={onPlay}
      categories={girlsCategories}
      pageTitleOverride={pageTitle}
    />
  );
};

export default GirlsGamesPage;

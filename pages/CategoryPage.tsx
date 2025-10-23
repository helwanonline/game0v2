
import React, { useMemo, useEffect } from 'react';
import { useGames } from '../hooks/useGames';
import { GameGrid } from '../components/GameGrid';
import type { Game, Language, Category } from '../types';
import { CATEGORY_TRANSLATIONS } from '../types';
import { SEO } from '../components/SEO';
import { ErrorMessage } from '../components/ErrorMessage';


interface CategoryPageProps {
  language: Language;
  onPlay: (game: Game) => void;
  categories: Category[];
  pageTitleOverride?: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ language, onPlay, categories, pageTitleOverride }) => {
  const { games, loading, error, refetch } = useGames();

  const filteredGames = useMemo(() => {
    return games.filter(game => categories.includes(game.category));
  }, [games, categories]);
  
  const pageTitle = useMemo(() => {
      if (pageTitleOverride) return pageTitleOverride;
      if (categories.length === 1) {
          return CATEGORY_TRANSLATIONS[categories[0]][language];
      }
      return language === 'ar' ? 'الألعاب' : 'Games';
  }, [categories, language, pageTitleOverride]);

  const pageDescription = language === 'ar' ? `تصفح أفضل الألعاب في قسم ${pageTitle}` : `Browse the best games in the ${pageTitle} section`;

  return (
    <>
      <SEO title={pageTitle} description={pageDescription} language={language} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-4 md:py-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-light-text mb-4">
            {pageTitle}
          </h1>
          <p className="max-w-2xl mx-auto text-dark-text">
            {pageDescription}
          </p>
        </div>
        {error ? (
          <ErrorMessage message={error} onRetry={refetch} language={language} />
        ) : (
          <GameGrid games={filteredGames} language={language} onPlay={onPlay} isLoading={loading} />
        )}
      </div>
    </>
  );
};

export default CategoryPage;
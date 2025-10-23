
import React from 'react';
import { useGames } from '../hooks/useGames';
import { GameGrid } from '../components/GameGrid';
import type { Game, Language } from '../types';
import { SEO } from '../components/SEO';
import { ErrorMessage } from '../components/ErrorMessage';

type PageTitleKey = 'newGames' | 'popularGames';

interface GenericGamesPageProps {
  language: Language;
  onPlay: (game: Game) => void;
  pageTitleKey: PageTitleKey;
  gameSorter: (a: Game, b: Game) => number;
}

const translations: Record<PageTitleKey, { en: string; ar: string }> = {
    newGames: { en: 'New Games', ar: 'الألعاب الجديدة' },
    popularGames: { en: 'Most Popular Games', ar: 'الألعاب الأكثر لعبًا' },
};

export const GenericGamesPage: React.FC<GenericGamesPageProps> = ({ language, onPlay, pageTitleKey, gameSorter }) => {
  const { games, loading, error, refetch } = useGames();
  const sortedGames = [...games].sort(gameSorter);

  const pageTitle = translations[pageTitleKey][language];
  const pageDescription = language === 'ar' ? `استكشف مجموعتنا الكاملة من ${pageTitle}` : `Explore our full collection of ${pageTitle}`;

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
          <GameGrid games={sortedGames} language={language} onPlay={onPlay} isLoading={loading} />
        )}
      </div>
    </>
  );
};

export default GenericGamesPage;
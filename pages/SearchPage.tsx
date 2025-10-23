import React, { useMemo } from 'react';
import { useGames } from '../hooks/useGames';
import { GameGrid } from '../components/GameGrid';
import type { Game, Language } from '../types';
import { SEO } from '../components/SEO';
import { ErrorMessage } from '../components/ErrorMessage';

interface SearchPageProps {
  query: string;
  language: Language;
  onPlay: (game: Game) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ query, language, onPlay }) => {
  const { games, loading, error, refetch } = useGames();

  const searchResults = useMemo(() => {
    if (!query) return [];
    const lowerCaseQuery = query.toLowerCase();
    return games.filter(game => 
      game.name_en.toLowerCase().includes(lowerCaseQuery) ||
      game.name_ar.toLowerCase().includes(lowerCaseQuery)
    );
  }, [games, query]);

  const pageTitle = language === 'ar' ? `نتائج البحث عن: "${query}"` : `Search results for: "${query}"`;
  const pageDescription = language === 'ar' ? `تصفح نتائج البحث عن ${query} على 5199.online.` : `Browse search results for ${query} on 5199.online.`;

  return (
    <>
      <SEO title={pageTitle} description={pageDescription} language={language} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-4 md:py-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-light-text mb-4">
            {pageTitle}
          </h1>
        </div>

        {error ? (
          <ErrorMessage message={error} onRetry={refetch} language={language} />
        ) : (
          <GameGrid games={searchResults} language={language} onPlay={onPlay} isLoading={loading} />
        )}

        {!loading && searchResults.length === 0 && (
          <div className="text-center py-16 px-4">
              <h2 className="text-2xl font-bold text-light-text mb-2">
                  {language === 'ar' ? 'لم يتم العثور على نتائج' : 'No Results Found'}
              </h2>
              <p className="text-dark-text">
                  {language === 'ar' ? `عذرًا، لم نجد أي ألعاب تطابق بحثك عن "${query}".` : `Sorry, we couldn't find any games matching "${query}".`}
              </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
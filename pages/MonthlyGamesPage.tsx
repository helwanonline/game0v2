
import React, { useState, useEffect, useMemo } from 'react';
import type { Category, Language, Game } from '../types';
import { useGames } from '../hooks/useGames';
import { FilterBar } from '../components/FilterBar';
import { GameGrid } from '../components/GameGrid';
import { SEO } from '../components/SEO';
import { ErrorMessage } from '../components/ErrorMessage';


interface MonthlyGamesPageProps {
  language: Language;
  onPlay: (game: Game) => void;
}

const getMonthYear = (lang: Language) => {
  const date = new Date();
  const month = date.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US', { month: 'long' });
  const year = date.getFullYear();
  return { month, year };
};

export const MonthlyGamesPage: React.FC<MonthlyGamesPageProps> = ({ language, onPlay }) => {
  const { games, loading, error, refetch } = useGames();
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const { month, year } = getMonthYear(language);

  const pageTitle = language === 'ar' ? `أفضل ألعاب شهر ${month}` : `Top Games of ${month}`;
  
  const pageDescription = language === 'ar'
      ? `مجموعة منتقاة من أكثر الألعاب تشويقًا وشعبية هذا الشهر. العب مباشرة بدون تحميل!`
      : "A curated collection of this month's most exciting and popular games. Play instantly, no download required!";
  
  const filteredGames = useMemo(() => {
    if (activeCategory === 'All') {
      return games;
    }
    return games.filter((game) => game.category === activeCategory);
  }, [games, activeCategory]);

  return (
    <>
      <SEO title={pageTitle} description={pageDescription} language={language} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-8 md:py-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-hover to-accent mb-4">
            {language === 'ar' ? `أفضل ألعاب شهر ${month} ${year}` : `Top Games of ${month} ${year}`}
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-dark-text">
            {pageDescription}
          </p>
        </div>

        <FilterBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} language={language} />
        
        {error ? (
          <ErrorMessage message={error} onRetry={refetch} language={language} />
        ) : (
          <div className="py-8">
            <GameGrid 
              games={filteredGames}
              language={language}
              onPlay={onPlay}
              isLoading={loading}
            />
          </div>
        )}


        <div className="text-center mt-12">
            <a href="#" className="text-accent hover:text-accent-hover transition-colors">
              {language === 'ar' ? 'عرض ألعاب الشهر الماضي ←' : "View Last Month's Games →"}
            </a>
        </div>
      </div>
    </>
  );
};

export default MonthlyGamesPage;
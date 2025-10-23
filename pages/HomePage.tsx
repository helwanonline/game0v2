
import React, { useMemo } from 'react';
import { useGames } from '../hooks/useGames';
import { GameGrid } from '../components/GameGrid';
import { CategoryGrid } from '../components/CategoryGrid';
import { FeaturedGame } from '../components/FeaturedGame';
import type { Game, Language } from '../types';
import { SEO } from '../components/SEO';
import { ErrorMessage } from '../components/ErrorMessage';

interface HomePageProps {
  language: Language;
  onPlay: (game: Game) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ language, onPlay }) => {
  const { games, loading, error, refetch } = useGames();

  // Pick the most played game as the featured one
  const featuredGame = useMemo(() => {
    if (games.length === 0) return null;
    return games.reduce((prev, current) => (prev.playCount > current.playCount) ? prev : current);
  }, [games]);

  // Popular games are already sorted by playCount from the hook
  const popularGames = games.slice(0, 12);
  // New games are sorted by ID descending to simulate "newest first"
  const newGames = [...games].sort((a, b) => b.id - a.id).slice(0, 12);

  return (
    <>
       <SEO 
        title={language === 'ar' ? 'الرئيسية - العب أفضل الألعاب المجانية' : 'Home - Play the Best Free Games'}
        description={language === 'ar' ? 'مئات الألعاب المجانية أونلاين تعمل على جميع الأجهزة بسرعة وسلاسة. اكتشف ألعاب جديدة يوميًا!' : 'Hundreds of free online games that work on all devices. Discover new games daily!'}
        language={language}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-8">
        
        {featuredGame && !loading && !error && <FeaturedGame game={featuredGame} onPlay={onPlay} language={language} />}
        
        {error && <ErrorMessage message={error} onRetry={refetch} language={language} />}

        <section>
          <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{language === 'ar' ? 'الألعاب الأكثر لعبًا' : 'Most Popular Games'}</h2>
              <a href="#/popular" className="text-sm font-semibold text-accent hover:text-accent-hover">{language === 'ar' ? 'عرض الكل' : 'View All'}</a>
          </div>
          <GameGrid games={popularGames} language={language} onPlay={onPlay} isLoading={loading} gamesPerPage={12} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{language === 'ar' ? 'الأقسام' : 'Categories'}</h2>
          <CategoryGrid language={language} />
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{language === 'ar' ? 'الألعاب الجديدة' : 'New Games'}</h2>
              <a href="#/new-games" className="text-sm font-semibold text-accent hover:text-accent-hover">{language === 'ar' ? 'عرض الكل' : 'View All'}</a>
          </div>
          <GameGrid games={newGames} language={language} onPlay={onPlay} isLoading={loading} gamesPerPage={12} />
        </section>
      </div>
    </>
  );
};

export default HomePage;
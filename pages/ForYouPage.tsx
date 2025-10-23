
import React, { useContext, useMemo } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { useGames } from '../hooks/useGames';
import { GameGrid } from '../components/GameGrid';
import type { Game, Language } from '../types';
import { SEO } from '../components/SEO';
import { SparklesIcon } from '../components/icons/SparklesIcon';

interface ForYouPageProps {
  language: Language;
  onPlay: (game: Game) => void;
}

export const ForYouPage: React.FC<ForYouPageProps> = ({ language, onPlay }) => {
  const { games, loading } = useGames();
  const { favoriteIds } = useContext(FavoritesContext);

  const recommendedGames = useMemo(() => {
    if (favoriteIds.length === 0 || games.length === 0) {
      // If no favorites, recommend top 12 most popular games
      return games.slice(0, 12);
    }

    const favoriteGames = games.filter(game => favoriteIds.includes(game.id));
    const favoriteCategories = [...new Set(favoriteGames.map(game => game.category))];
    
    // Find other games in those categories that are not already favorited
    const recommendations = games.filter(game => 
      !favoriteIds.includes(game.id) && favoriteCategories.includes(game.category)
    );
    
    // Sort recommendations by popularity and take the top ones
    return recommendations.sort((a, b) => b.playCount - a.playCount).slice(0, 24);

  }, [games, favoriteIds]);

  const pageTitle = language === 'ar' ? 'ألعاب مقترحة لأجلك' : 'Games For You';
  const pageDescription = language === 'ar' ? 'اكتشف ألعابًا جديدة بناءً على اهتماماتك وتفضيلاتك.' : 'Discover new games based on your interests and favorites.';

  return (
    <>
      <SEO title={pageTitle} description={pageDescription} language={language} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-4 md:py-8">
          <SparklesIcon className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-light-text mb-4">
            {pageTitle}
          </h1>
          <p className="max-w-2xl mx-auto text-dark-text">
            {favoriteIds.length > 0
                ? (language === 'ar' ? 'لقد اخترنا هذه الألعاب خصيصًا لك بناءً على الألعاب التي أحببتها!' : 'We picked these just for you based on the games you liked!')
                : (language === 'ar' ? 'هذه هي أشهر الألعاب لدينا! ابدأ في تفضيل الألعاب لتحصل على توصيات مخصصة.' : 'Here are our most popular games! Start favoriting games to get personalized recommendations.')
            }
          </p>
        </div>
        <GameGrid games={recommendedGames} language={language} onPlay={onPlay} isLoading={loading} />
      </div>
    </>
  );
};

export default ForYouPage;
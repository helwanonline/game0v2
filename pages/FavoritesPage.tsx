import React, { useContext, useMemo } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { useGames } from '../hooks/useGames';
import { GameGrid } from '../components/GameGrid';
import type { Game, Language } from '../types';
import { SEO } from '../components/SEO';
import { HeartIcon } from '../components/icons/HeartIcon';

interface FavoritesPageProps {
  language: Language;
  onPlay: (game: Game) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ language, onPlay }) => {
  const { games, loading } = useGames();
  const { favoriteIds } = useContext(FavoritesContext);

  const favoriteGames = useMemo(() => {
    return games.filter(game => favoriteIds.includes(game.id));
  }, [games, favoriteIds]);

  const pageTitle = language === 'ar' ? 'ألعابي المفضلة' : 'My Favorite Games';
  const pageDescription = language === 'ar' ? 'مجموعتك الشخصية من الألعاب المفضلة على 5199.online.' : 'Your personal collection of favorite games on 5199.online.';

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
        {favoriteGames.length > 0 ? (
          <GameGrid games={favoriteGames} language={language} onPlay={onPlay} isLoading={loading} />
        ) : (
          <div className="text-center py-16 px-4">
              <HeartIcon className="w-16 h-16 text-dark-text mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-light-text mb-2">
                  {language === 'ar' ? 'قائمتك فارغة!' : 'Your list is empty!'}
              </h2>
              <p className="text-dark-text">
                  {language === 'ar' ? 'انقر على أيقونة القلب على أي لعبة لإضافتها إلى هنا.' : 'Click the heart icon on any game to add it here.'}
              </p>
          </div>
        )}
      </div>
    </>
  );
};

export default FavoritesPage;
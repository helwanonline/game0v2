
import React, { useContext } from 'react';
import type { Game, Language } from '../types';
import { CATEGORY_TRANSLATIONS } from '../types';
import { PlayIcon } from './icons/PlayIcon';
import { FavoritesContext } from '../context/FavoritesContext';
import { HeartIcon } from './icons/HeartIcon';
import { HeartOutlineIcon } from './icons/HeartOutlineIcon';
import { useInView } from '../hooks/useInView';
import { useGamePreloader } from '../context/GamePreloaderContext';
import { Rating } from './Rating';

interface GameCardProps {
  game: Game;
  language: Language;
  onPlay: (game: Game) => void;
}

const formatPlayCount = (count: number, lang: Language) => {
  if (count >= 1000000) {
    const millions = (count / 1000000).toFixed(1);
    return lang === 'ar' ? `${millions} مليون` : `${millions}M`;
  }
  if (count >= 1000) {
    const thousands = Math.round(count / 1000);
    return lang === 'ar' ? `${thousands} ألف` : `${thousands}K`;
  }
  return count.toString();
};

export const GameCard: React.FC<GameCardProps> = ({ game, language, onPlay }) => {
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);

  // Fix: Specified HTMLAnchorElement as the generic type for useInView to match the `<a>` element's ref.
  const { ref, inView } = useInView<HTMLAnchorElement>({
    threshold: 0.1,
    triggerOnce: true,
  });
  useGamePreloader(game.gameUrl, inView);
  
  const handleFavorite = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite(game.id);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `https://placehold.co/400x400/0D1117/8B949E?text=${encodeURIComponent(game.name_en)}`;
  };

  return (
    <a href={`#/game/${game.slug}`} data-testid={`game-card-${game.id}`} ref={ref} className="relative aspect-square rounded-xl overflow-hidden shadow-lg group transition-all duration-300 hover:shadow-glow hover:-translate-y-1">
        {/* Background Image */}
        <img
          src={game.thumbnailUrl}
          alt={language === 'ar' ? game.name_ar : game.name_en}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          onError={handleImageError}
        />
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Favorite Button */}
        <button onClick={handleFavorite} className="absolute top-3 right-3 z-20 p-1.5 bg-black/50 rounded-full text-white hover:text-red-500 hover:scale-110 transition-all duration-200">
            {isFavorite(game.id) ? <HeartIcon className="w-5 h-5 text-red-500" /> : <HeartOutlineIcon className="w-5 h-5" />}
        </button>

        {/* Text Content */}
        <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
            <h3 className="text-lg font-bold text-shadow truncate">
                {language === 'ar' ? game.name_ar : game.name_en}
            </h3>
            <div className="flex items-center gap-3 text-xs text-light-text text-shadow-sm opacity-90 mt-1">
                <span>{CATEGORY_TRANSLATIONS[game.category][language]}</span>
                <span className="opacity-50">•</span>
                <span>{formatPlayCount(game.playCount, language)} {language === 'ar' ? 'لعبة' : 'plays'}</span>
                {game.rating && (
                    <>
                        <span className="opacity-50">•</span>
                        <Rating rating={game.rating} />
                    </>
                )}
            </div>
        </div>

        {/* Hover Overlay with Glassmorphism and Play Icon */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <PlayIcon className="w-16 h-16 text-white/90 drop-shadow-lg" />
        </div>

        <style>{`
            .text-shadow {
                text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.9);
            }
            .text-shadow-sm {
                text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.9);
            }
        `}</style>
    </a>
  );
};
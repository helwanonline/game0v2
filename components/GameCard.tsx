
import React, { useState, useContext } from 'react';
import type { Game, Language } from '../types';
import { CATEGORY_TRANSLATIONS } from '../types';
import { PlayIcon } from './icons/PlayIcon';
import { FavoritesContext } from '../context/FavoritesContext';
import { HeartIcon } from './icons/HeartIcon';
import { HeartOutlineIcon } from './icons/HeartOutlineIcon';
import { useInView } from '../hooks/useInView';
import { useGamePreloader } from '../context/GamePreloaderContext';

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
  const [imgSrc, setImgSrc] = useState(game.thumbnailUrl);
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  useGamePreloader(game.gameUrl, inView);

  const handleCardClick = () => {
    onPlay(game);
  };
  
  const handleFavorite = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite(game.id);
  };

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
      e.preventDefault();
      e.stopPropagation();
      window.location.hash = `#/search?q=${encodeURIComponent(tag)}`;
  };


  const handleImageError = () => {
    setImgSrc('/placeholder.png');
  };

  return (
    <div onClick={handleCardClick} data-testid={`game-card-${game.id}`} ref={ref} className="cursor-pointer bg-secondary rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-glow hover:-translate-y-2 flex flex-col group">
      <div className="relative w-full aspect-square">
        <img
          src={imgSrc}
          alt={language === 'ar' ? game.name_ar : game.name_en}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        <button onClick={handleFavorite} className="absolute top-2 right-2 z-10 p-1.5 bg-black/50 rounded-full text-white hover:text-red-500 hover:scale-110 transition-all duration-200">
            {isFavorite(game.id) ? <HeartIcon className="w-5 h-5 text-red-500" /> : <HeartOutlineIcon className="w-5 h-5" />}
        </button>

        <div className="absolute bottom-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-full">
          {formatPlayCount(game.playCount, language)} {language === 'ar' ? 'لعبة' : 'plays'}
        </div>
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-base font-bold text-light-text truncate">
          {language === 'ar' ? game.name_ar : game.name_en}
        </h3>
        <p className="text-xs text-dark-text mb-2">
          {CATEGORY_TRANSLATIONS[game.category][language]}
        </p>
         <div className="flex flex-wrap gap-1 mb-3">
          {game.tags.slice(0, 2).map(tag => (
            <a key={tag} href={`#/search?q=${encodeURIComponent(tag)}`} onClick={(e) => handleTagClick(e, tag)} className="text-xs bg-gray-700 text-dark-text px-2 py-0.5 rounded-full hover:bg-accent hover:text-white transition-colors">
                {tag}
            </a>
          ))}
        </div>
        <div className="mt-auto">
          <button
            onClick={(e) => { e.stopPropagation(); onPlay(game); }}
            className="w-full flex items-center justify-center gap-2 bg-accent text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent-hover focus:ring-opacity-50"
          >
            <PlayIcon className="w-5 h-5" />
            <span>{language === 'ar' ? 'العب الآن' : 'Play Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
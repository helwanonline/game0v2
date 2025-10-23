
import React, { useEffect, useState, useContext } from 'react';
import { Spinner } from './Spinner';
import type { Game, Language } from '../types';
import { ShareButtons } from './ShareButtons';
import { FavoritesContext } from '../context/FavoritesContext';
import { HeartIcon } from './icons/HeartIcon';
import { HeartOutlineIcon } from './icons/HeartOutlineIcon';
import { useIsGamePreloaded } from '../context/GamePreloaderContext';
import { RelatedGames } from './RelatedGames';

interface GamePlayerModalProps {
  isOpen: boolean;
  game: Game | null;
  language: Language;
  onClose: () => void;
  onPlay: (game: Game) => void;
}

export const GamePlayerModal: React.FC<GamePlayerModalProps> = ({ isOpen, game, language, onClose, onPlay }) => {
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
  const isGamePreloaded = useIsGamePreloaded();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
      setIsIframeLoading(true);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !game) {
    return null;
  }

  const gameName = language === 'ar' ? game.name_ar : game.name_en;
  const gameDescription = language === 'ar' ? game.description_ar : game.description_en;
  const shareUrl = `${window.location.origin}${window.location.pathname}#/games/${game.slug}`;
  const shareTitle = language === 'ar' ? `العب ${gameName} على 5199.online!` : `Play ${gameName} on 5199.online!`;
  const isPreloaded = isGamePreloaded(game.gameUrl);

  const handleFavoriteToggle = () => {
      toggleFavorite(game.id);
  };
  
  const handleRelatedGamePlay = (relatedGame: Game) => {
    onClose();
    // Use a timeout to ensure the modal has closed before opening a new one or navigating
    setTimeout(() => {
        onPlay(relatedGame);
    }, 300);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex flex-col items-center justify-center p-2 sm:p-4 transition-opacity duration-300"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div 
        className="bg-secondary rounded-xl shadow-xl w-full h-full max-w-6xl flex flex-col overflow-hidden animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-3 bg-primary border-b border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
             <button onClick={handleFavoriteToggle} className="text-white hover:text-red-500 transition-colors p-1">
                {isFavorite(game.id) ? <HeartIcon className="w-6 h-6 text-red-500" /> : <HeartOutlineIcon className="w-6 h-6" />}
             </button>
             <h2 className="text-lg font-bold text-light-text truncate flex-1">{gameName}</h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 mx-4">
              <ShareButtons url={shareUrl} title={shareTitle} />
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700"
            aria-label="Close game player"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>
        <div className="flex-grow bg-black relative">
          {isIframeLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-light-text">
              <Spinner />
              <p className="mt-4">{isPreloaded ? (language === 'ar' ? 'جاري بدء اللعبة...' : 'Starting game...') : (language === 'ar' ? 'جاري تحميل اللعبة...' : 'Loading game...')}</p>
            </div>
          )}
          <iframe
            src={game.gameUrl}
            title={gameName}
            className={`w-full h-full border-0 transition-opacity duration-500 ${isIframeLoading ? 'opacity-0' : 'opacity-100'}`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-pointer-lock"
            allow="fullscreen; gamepad; autoplay"
            allowFullScreen
            onLoad={() => setIsIframeLoading(false)}
          ></iframe>
        </div>
        {gameDescription && (
            <div className="flex-shrink-0 p-4 border-t border-gray-700 max-h-24 sm:max-h-28 overflow-y-auto bg-primary">
                <p className="text-sm text-dark-text leading-relaxed">{gameDescription}</p>
            </div>
        )}
         <footer className="sm:hidden flex items-center justify-center p-2 bg-primary border-t border-gray-700">
            <ShareButtons url={shareUrl} title={shareTitle} />
        </footer>
      </div>
      <div className="w-full max-w-6xl mt-4 flex-shrink-0">
         <RelatedGames 
            current_game_id={game.id} 
            category={game.category} 
            onPlay={handleRelatedGamePlay}
            language={language} 
         />
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
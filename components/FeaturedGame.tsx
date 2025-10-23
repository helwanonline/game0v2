
import React from 'react';
import type { Game, Language } from '../types';
import { PlayIcon } from './icons/PlayIcon';

// Fix: Added the `onPlay` prop to the interface to align with its usage in HomePage.
interface FeaturedGameProps {
  game: Game;
  language: Language;
  onPlay: (game: Game) => void;
}

export const FeaturedGame: React.FC<FeaturedGameProps> = ({ game, language, onPlay }) => {
  const title = language === 'ar' ? game.name_ar : game.name_en;
  const description = language === 'ar' ? game.description_ar : game.description_en;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://placehold.co/1280x720/0D1117/8B949E?text=Image+Not+Found';
    e.currentTarget.style.objectPosition = 'center';
  };


  return (
    <section className="relative rounded-xl overflow-hidden text-white min-h-[300px] md:min-h-[400px] flex items-end p-6 md:p-10 shadow-lg">
      <div className="absolute inset-0">
        <img
          src={game.thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover object-center"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>
      <div className="relative z-10 max-w-2xl">
        <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-2">
          {language === 'ar' ? 'لعبة الأسبوع' : 'Game of the Week'}
        </h2>
        <h3 className="text-3xl md:text-5xl font-extrabold mb-3 text-shadow">
          {title}
        </h3>
        {description && (
          <p className="text-base md:text-lg text-light-text mb-6 text-shadow-sm max-w-prose">
            {description}
          </p>
        )}
        <a
          href={`#/game/${game.slug}`}
          onClick={(e) => { e.preventDefault(); onPlay(game); }}
          className="inline-flex items-center justify-center gap-2 bg-accent text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-accent-hover hover:shadow-glow focus:outline-none focus:ring-4 focus:ring-accent-hover focus:ring-opacity-50 transform hover:scale-105"
        >
          <PlayIcon className="w-6 h-6" />
          <span className="text-lg">{language === 'ar' ? 'العب الآن' : 'Play Now'}</span>
        </a>
      </div>
      <style>{`
        .text-shadow {
          text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.7);
        }
        .text-shadow-sm {
          text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </section>
  );
};
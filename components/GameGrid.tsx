import React, { useState, useMemo, useEffect } from 'react';
import { GameCard } from './GameCard';
import { PaginationControls } from './PaginationControls';
import { GameCardSkeleton } from './GameCardSkeleton';
import type { Game, Language } from '../types';

interface GameGridProps {
  games: Game[];
  language: Language;
  onPlay: (game: Game) => void;
  isLoading: boolean;
  gamesPerPage?: number;
}

export const GameGrid: React.FC<GameGridProps> = ({ games, language, onPlay, isLoading, gamesPerPage = 24 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalPages = Math.ceil(games.length / gamesPerPage);

  const paginatedGames = useMemo(() => {
    if (gamesPerPage === 0) return games; // Show all games if gamesPerPage is 0
    const startIndex = (currentPage - 1) * gamesPerPage;
    return games.slice(startIndex, startIndex + gamesPerPage);
  }, [games, currentPage, gamesPerPage]);
  
  // Reset page to 1 and trigger transition when the source list of games changes
  useEffect(() => {
    setCurrentPage(1);
    // Create a subtle fade transition when the list of games updates.
    if (!isLoading) {
      setIsTransitioning(true);
      const timer = setTimeout(() => setIsTransitioning(false), 300); // Duration matches transition
      return () => clearTimeout(timer);
    }
  }, [games, isLoading]);

  if (isLoading) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {Array.from({ length: gamesPerPage > 0 ? gamesPerPage : 12 }).map((_, index) => (
                <GameCardSkeleton key={index} />
            ))}
        </div>
    );
  }

  if (games.length === 0) {
    return <div className="text-center p-10 text-dark-text">{language === 'ar' ? 'لا توجد ألعاب تطابق هذا الفلتر.' : 'No games match this filter.'}</div>;
  }

  return (
    <>
      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
        {paginatedGames.map((game) => (
          <GameCard 
            key={game.id} 
            game={game} 
            language={language}
            onPlay={onPlay}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <PaginationControls 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          language={language}
        />
      )}
    </>
  );
};

import React, { useMemo } from 'react';
import type { Game, Language, Category } from '../types';
import { useGames } from '../hooks/useGames';
import { GameCard } from './GameCard';

interface RelatedGamesProps {
    current_game_id: number;
    category: Category;
    onPlay: (game: Game) => void;
    language: Language;
}

export const RelatedGames: React.FC<RelatedGamesProps> = ({ current_game_id, category, onPlay, language }) => {
    const { games, loading } = useGames();

    const relatedGames = useMemo(() => {
        return games
            .filter(game => game.category === category && game.id !== current_game_id)
            .slice(0, 10); // Show up to 10 related games
    }, [games, category, current_game_id]);

    if (loading || relatedGames.length === 0) {
        return null;
    }

    return (
        <section>
            <h3 className="text-2xl font-bold mb-4 text-light-text">{language === 'ar' ? 'قد يعجبك أيضاً' : 'You Might Also Like'}</h3>
            <div className="relative">
                <div className="flex overflow-x-auto space-x-4 rtl:space-x-reverse pb-4">
                    {relatedGames.map(game => (
                        <div key={game.id} className="w-48 sm:w-56 flex-shrink-0">
                           <GameCard game={game} language={language} onPlay={onPlay} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
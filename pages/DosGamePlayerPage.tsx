
import React, { useEffect, useRef, useState } from 'react';
import type { Game, Language } from '../types';
import { useGames } from '../hooks/useGames';
import { SEO } from '../components/SEO';
import { Spinner } from '../components/Spinner';
import { RelatedGames } from '../components/RelatedGames';

declare const Dos: any;

interface DosGamePlayerPageProps {
  slug: string;
  language: Language;
  onPlay: (game: Game) => void;
}

export const DosGamePlayerPage: React.FC<DosGamePlayerPageProps> = ({ slug, language, onPlay }) => {
  const { games } = useGames();
  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const foundGame = games.find(g => g.slug === slug);
    if (foundGame) {
      setGame(foundGame);
    }
  }, [games, slug]);

  useEffect(() => {
    if (game && canvasRef.current && typeof Dos !== 'undefined') {
        setIsLoading(true);
        const dos = Dos(canvasRef.current, {
            onprogress: () => setIsLoading(true),
        });
        dos.run(game.gameUrl).then(() => {
            setIsLoading(false);
        });
        return () => {
            dos.stop();
        };
    }
  }, [game]);

  if (!game) {
    return <div className="h-[80vh] flex items-center justify-center"><Spinner /></div>;
  }
  
  const gameName = language === 'ar' ? game.name_ar : game.name_en;
  const description = language === 'ar' ? game.description_ar : game.description_en;

  return (
    <>
      <SEO 
        title={gameName} 
        description={description || ''} 
        language={language} 
        imageUrl={game.thumbnailUrl}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4">
             <a href={`#/${game.engine === 'dos' ? 'popular' : ''}`} className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors">
                {language === 'ar' ? '← العودة إلى الألعاب' : '← Back to Games'}
            </a>
        </div>
        <h1 className="text-3xl font-bold text-center mb-6">{gameName}</h1>
        <div className="relative w-full max-w-4xl mx-auto aspect-[4/3] bg-black rounded-lg overflow-hidden">
          <div ref={canvasRef} className="w-full h-full"></div>
          {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 text-white">
                  <Spinner/>
                  <p className="mt-4">{language === 'ar' ? 'جاري تحميل اللعبة الكلاسيكية...' : 'Loading classic game...'}</p>
              </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto mt-8">
            <RelatedGames 
                current_game_id={game.id} 
                category={game.category} 
                onPlay={onPlay}
                language={language}
            />
        </div>
      </div>
    </>
  );
};

export default DosGamePlayerPage;
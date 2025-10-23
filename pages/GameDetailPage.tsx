import React, { useEffect, useRef, useState, useContext } from 'react';
import type { Game, Language } from '../types';
import { useGames } from '../hooks/useGames';
import { SEO } from '../components/SEO';
import { Spinner } from '../components/Spinner';
import { RelatedGames } from '../components/RelatedGames';
import { ShareButtons } from '../components/ShareButtons';
import { FavoritesContext } from '../context/FavoritesContext';
import { HeartIcon } from '../components/icons/HeartIcon';
import { HeartOutlineIcon } from '../components/icons/HeartOutlineIcon';
import { FullscreenIcon } from '../components/icons/FullscreenIcon';
import { FullscreenExitIcon } from '../components/icons/FullscreenExitIcon';
import { Leaderboard } from '../components/Leaderboard';
import { supabase } from '../lib/supabaseClient';
import { AuthContext } from '../context/AuthContext';


declare const Dos: any;

interface GameDetailPageProps {
  slug: string;
  language: Language;
}

const GameDetailPage: React.FC<GameDetailPageProps> = ({ slug, language }) => {
  const { games } = useGames();
  const { user } = useContext(AuthContext);
  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundGame = games.find(g => g.slug === slug);
    if (foundGame) {
      setGame(foundGame);
      setIsLoading(true); 
    }
  }, [games, slug]);

  // DOS game engine initialization
  useEffect(() => {
    if (game && game.engine === 'dos' && canvasRef.current && typeof Dos !== 'undefined') {
        const dos = Dos(canvasRef.current, {});
        dos.run(game.gameUrl).then(() => {
            setIsLoading(false);
        });
        return () => {
            dos.stop();
        };
    }
  }, [game]);
  
  // Save score on page leave (simulated)
  useEffect(() => {
    const saveScore = async () => {
        if(game && user && supabase) {
            const score = Math.floor(Math.random() * 10000) + 100; // Simulate a score
             await supabase
                .from('scores')
                .insert({ game_id: game.id, user_id: user.id, score: score });
        }
    };
    
    // Using beforeunload is not reliable, so we save when the component unmounts (e.g., navigating away)
    return () => {
        saveScore();
    }

  }, [game, user]);

  const toggleFullscreen = () => {
    if (!gameContainerRef.current) return;

    if (!document.fullscreenElement) {
        gameContainerRef.current.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
  };

  useEffect(() => {
      const onFullscreenChange = () => {
          setIsFullscreen(!!document.fullscreenElement);
      };
      document.addEventListener('fullscreenchange', onFullscreenChange);
      return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const handlePlayRelatedGame = (relatedGame: Game) => {
    window.location.hash = `#/game/${relatedGame.slug}`;
  };

  if (!game) {
    return <div className="h-[80vh] flex items-center justify-center"><Spinner /></div>;
  }
  
  const gameName = language === 'ar' ? game.name_ar : game.name_en;
  const description = language === 'ar' ? game.description_ar : game.description_en;
  const pageUrl = `${window.location.origin}${window.location.pathname}#/game/${game.slug}`;

  const gameSchema = {
    '@type': 'VideoGame',
    name: gameName,
    description: description || `Play ${gameName} online for free on 5199.online.`,
    url: pageUrl,
    image: game.thumbnailUrl.startsWith('http') ? game.thumbnailUrl : `${window.location.origin}${game.thumbnailUrl}`,
    genre: game.category,
    playMode: 'SinglePlayer',
    applicationCategory: 'Game',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      name: '5199.online',
    },
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: { '@type': 'PlayAction' },
      userInteractionCount: game.playCount,
    },
  };

  return (
    <>
      <SEO 
        title={gameName} 
        description={description || ''} 
        language={language} 
        imageUrl={game.thumbnailUrl}
        schema={gameSchema}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-center my-4">{gameName}</h1>
        </header>

        <div ref={gameContainerRef} className="relative w-full max-w-5xl mx-auto aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
          {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 text-white">
                  <Spinner/>
                  <p className="mt-4">{language === 'ar' ? 'جاري تحميل اللعبة...' : 'Loading game...'}</p>
              </div>
          )}

          {game.engine === 'dos' ? (
             <div ref={canvasRef} className="w-full h-full"></div>
          ) : (
             <iframe
                src={game.gameUrl}
                title={gameName}
                className={`w-full h-full border-0 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-pointer-lock"
                allow="fullscreen; gamepad; autoplay"
                allowFullScreen
                onLoad={() => setIsLoading(false)}
            ></iframe>
          )}
        </div>
        
        <div className="max-w-5xl mx-auto mt-4 flex justify-between items-center">
            <ShareButtons url={pageUrl} title={gameName} />
            <div className="flex items-center gap-4">
                 <button onClick={() => toggleFavorite(game.id)} className="text-white hover:text-red-500 transition-colors p-1 flex items-center gap-2">
                    {isFavorite(game.id) ? <HeartIcon className="w-6 h-6 text-red-500" /> : <HeartOutlineIcon className="w-6 h-6" />}
                     <span className="text-sm hidden sm:inline">{language === 'ar' ? 'إضافة للمفضلة' : 'Favorite'}</span>
                </button>
                <button onClick={toggleFullscreen} className="text-white hover:text-accent-hover transition-colors p-1 flex items-center gap-2">
                   {isFullscreen ? <FullscreenExitIcon className="w-6 h-6" /> : <FullscreenIcon className="w-6 h-6" />}
                   <span className="text-sm hidden sm:inline">{isFullscreen ? (language === 'ar' ? 'خروج' : 'Exit') : (language === 'ar' ? 'ملء الشاشة' : 'Fullscreen')}</span>
                </button>
            </div>
        </div>

        <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                {description && (
                    <div className="bg-secondary p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-2">{language === 'ar' ? 'عن اللعبة' : 'About the Game'}</h2>
                        <p className="text-dark-text leading-relaxed">{description}</p>
                    </div>
                )}
            </div>
            <div>
                <Leaderboard gameId={game.id} language={language} />
            </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12">
            {/* Fix: Passed the handlePlayRelatedGame function to satisfy the required onPlay prop. */}
            <RelatedGames 
                current_game_id={game.id} 
                category={game.category} 
                language={language}
                onPlay={handlePlayRelatedGame}
            />
        </div>
      </div>
    </>
  );
};

export default GameDetailPage;
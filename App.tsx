
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Spinner } from './components/Spinner';

import type { Language, Game } from './types';
import { Category, CATEGORY_DETAILS } from './types';

// Lazy load page components for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const MonthlyGamesPage = lazy(() => import('./pages/MonthlyGamesPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const GenericGamesPage = lazy(() => import('./pages/GenericGamesPage'));
const OpenSourceGamesPage = lazy(() => import('./pages/OpenSourceGamesPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const BoysGamesPage = lazy(() => import('./pages/BoysGamesPage'));
const GirlsGamesPage = lazy(() => import('./pages/GirlsGamesPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const ForYouPage = lazy(() => import('./pages/ForYouPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const GameDetailPage = lazy(() => import('./pages/GameDetailPage'));
const AIStudioPage = lazy(() => import('./pages/AIStudioPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));


const accentColors = ['#2F81F7', '#3FB950', '#F7B92F', '#A371F7', '#E85382'];

function lightenHexColor(hex: string, percent: number): string {
    hex = hex.replace(/^#/, '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const newR = Math.min(255, Math.floor(r * (1 + percent / 100)));
    const newG = Math.min(255, Math.floor(g * (1 + percent / 100)));
    const newB = Math.min(255, Math.floor(b * (1 + percent / 100)));

    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

function App() {
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('language') as Language) || 'ar');
  const [route, setRoute] = useState(window.location.hash || '#/');
  
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.className = `bg-primary ${language === 'ar' ? 'font-cairo' : 'font-poppins'}`;
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    let colorIndex = 0;
    const intervalId = setInterval(() => {
      colorIndex = (colorIndex + 1) % accentColors.length;
      const newColor = accentColors[colorIndex];
      const newHoverColor = lightenHexColor(newColor, 20);
      document.documentElement.style.setProperty('--color-accent-dynamic', newColor);
      document.documentElement.style.setProperty('--color-accent-hover-dynamic', newHoverColor);
    }, 30000); // Change every 30 seconds
    
    // Set initial color
    document.documentElement.style.setProperty('--color-accent-dynamic', accentColors[0]);
    document.documentElement.style.setProperty('--color-accent-hover-dynamic', lightenHexColor(accentColors[0], 20));


    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  const handlePlayGame = (game: Game) => {
    window.location.hash = `#/game/${game.slug}`;
  };

  const renderPage = () => {
    const path = route.slice(1) || '/';
    
    if (path.startsWith('/game/')) {
        const slug = path.substring('/game/'.length);
        if (slug) return <GameDetailPage slug={slug} language={language} />;
    }

    if (path.startsWith('/blog/')) {
        const slug = path.substring('/blog/'.length);
        if (slug) return <BlogPostPage slug={slug} language={language} />;
    }

    if (path.startsWith('/search')) {
      const searchParams = new URLSearchParams(path.split('?')[1] || '');
      const query = searchParams.get('q') || '';
      return <SearchPage query={query} language={language} onPlay={handlePlayGame} />;
    }

    switch (path) {
        case '/': return <HomePage language={language} onPlay={handlePlayGame} />;
        case '/new-games': return <GenericGamesPage language={language} onPlay={handlePlayGame} pageTitleKey='newGames' gameSorter={(a, b) => b.id - a.id} />;
        case '/popular': return <GenericGamesPage language={language} onPlay={handlePlayGame} pageTitleKey='popularGames' gameSorter={(a, b) => b.playCount - a.playCount} />;
        case '/monthly-games': return <MonthlyGamesPage language={language} onPlay={handlePlayGame} />;
        case '/boys-games': return <BoysGamesPage language={language} onPlay={handlePlayGame} />;
        case '/girls-games': return <GirlsGamesPage language={language} onPlay={handlePlayGame} />;
        case '/open-source-games': return <OpenSourceGamesPage language={language} onPlay={handlePlayGame} />;
        case '/blog': return <BlogPage language={language} />;
        case '/favorites': return <FavoritesPage language={language} onPlay={handlePlayGame} />;
        case '/for-you': return <ForYouPage language={language} onPlay={handlePlayGame} />;
        case '/about': return <AboutPage language={language} />;
        case '/contact': return <ContactPage language={language} />;
        case '/ai-studio': return <AIStudioPage language={language} />;
        case '/auth': return <AuthPage language={language} />;
    }

    const category = (Object.keys(CATEGORY_DETAILS) as Category[]).find(cat => CATEGORY_DETAILS[cat].slug === path.substring(1));
    if (category) {
        return <CategoryPage language={language} onPlay={handlePlayGame} categories={[category]} />;
    }

    return <HomePage language={language} onPlay={handlePlayGame} />;
  };

  return (
    <div className="bg-primary min-h-screen text-light-text flex flex-col">
      <Header language={language} setLanguage={setLanguage} currentRoute={route} />
      <main className="flex-grow">
        <Suspense fallback={<div className="h-[80vh] flex items-center justify-center"><Spinner /></div>}>
          {renderPage()}
        </Suspense>
      </main>
      <Footer language={language} />
    </div>
  );
}

export default App;
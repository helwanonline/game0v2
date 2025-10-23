import React, { createContext, useState, ReactNode, useContext, useMemo, useEffect } from 'react';

const MAX_CONCURRENT_PRELOADS = 3;

interface GamePreloaderContextType {
  requestPreload: (url: string) => void;
  isPreloaded: (url: string) => boolean;
}

const GamePreloaderContext = createContext<GamePreloaderContextType>({
  requestPreload: () => {},
  isPreloaded: () => false,
});

export const GamePreloaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preloadQueue, setPreloadQueue] = useState<string[]>([]);
  const [preloadedUrls, setPreloadedUrls] = useState<Set<string>>(new Set());
  const [currentlyPreloading, setCurrentlyPreloading] = useState<string[]>([]);

  const requestPreload = (url: string) => {
    if (!preloadedUrls.has(url) && !preloadQueue.includes(url) && !currentlyPreloading.includes(url)) {
      setPreloadQueue(prev => [...prev, url]);
    }
  };

  useEffect(() => {
    if (currentlyPreloading.length < MAX_CONCURRENT_PRELOADS && preloadQueue.length > 0) {
      const nextUrl = preloadQueue[0];
      setPreloadQueue(prev => prev.slice(1));
      setCurrentlyPreloading(prev => [...prev, nextUrl]);
    }
  }, [preloadQueue, currentlyPreloading]);

  const handlePreloadComplete = (url: string) => {
    setPreloadedUrls(prev => new Set(prev).add(url));
    setCurrentlyPreloading(prev => prev.filter(u => u !== url));
  };
  
  const isPreloaded = (url: string) => preloadedUrls.has(url);

  const value = useMemo(() => ({ requestPreload, isPreloaded }), [preloadedUrls]);

  return (
    <GamePreloaderContext.Provider value={value}>
      {children}
      <div style={{ visibility: 'hidden', position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        {currentlyPreloading.map(url => (
          <iframe
            key={url}
            src={url}
            title={`preloader-${url}`}
            onLoad={() => handlePreloadComplete(url)}
            onError={() => handlePreloadComplete(url)} // Still mark as complete to avoid retry loops
          />
        ))}
      </div>
    </GamePreloaderContext.Provider>
  );
};

export const useGamePreloader = (url: string, inView: boolean) => {
    const { requestPreload } = useContext(GamePreloaderContext);
    useEffect(() => {
        if (inView && url) {
            requestPreload(url);
        }
    }, [inView, url, requestPreload]);
};

export const useIsGamePreloaded = () => {
    const { isPreloaded } = useContext(GamePreloaderContext);
    return isPreloaded;
}
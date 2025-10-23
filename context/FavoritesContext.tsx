import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface FavoritesContextType {
  favoriteIds: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favoriteIds: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
});

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('favoriteGames');
      if (storedFavorites) {
        setFavoriteIds(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Could not load favorites from localStorage", error);
    }
  }, []);

  const persistFavorites = (ids: number[]) => {
    try {
      localStorage.setItem('favoriteGames', JSON.stringify(ids));
    } catch (error) {
      console.error("Could not save favorites to localStorage", error);
    }
  };

  const toggleFavorite = useCallback((id: number) => {
    setFavoriteIds(prevIds => {
      const newIds = prevIds.includes(id)
        ? prevIds.filter(favId => favId !== id)
        : [...prevIds, id];
      persistFavorites(newIds);
      return newIds;
    });
  }, []);

  const isFavorite = useCallback((id: number) => {
    return favoriteIds.includes(id);
  }, [favoriteIds]);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
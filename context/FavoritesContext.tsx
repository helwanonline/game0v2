import React, { createContext, useState, useEffect, ReactNode, useCallback, useContext } from 'react';
import { supabase } from '../lib/supabaseClient';
import { AuthContext } from './AuthContext';

interface FavoritesContextType {
  favoriteIds: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
  loading: boolean;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favoriteIds: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
  loading: true,
});

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const getFavoritesFromLocal = () => {
     try {
      const storedFavorites = localStorage.getItem('favoriteGames');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error("Could not load favorites from localStorage", error);
      return [];
    }
  };
  
  const persistFavoritesToLocal = (ids: number[]) => {
     try {
      localStorage.setItem('favoriteGames', JSON.stringify(ids));
    } catch (error) {
      console.error("Could not save favorites to localStorage", error);
    }
  }

  // Fetch favorites from DB when user logs in
  useEffect(() => {
    const fetchUserFavorites = async () => {
      if (!user || !supabase) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('user_favorites')
          .select('game_id')
          .eq('user_id', user.id);
        
        if (error) throw error;

        const ids = data.map(item => item.game_id);
        setFavoriteIds(ids);
      } catch (error) {
        console.error("Error fetching user favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserFavorites();
    } else {
      setFavoriteIds(getFavoritesFromLocal());
      setLoading(false);
    }
  }, [user]);


  const toggleFavorite = useCallback(async (id: number) => {
    const isCurrentlyFavorite = favoriteIds.includes(id);
    const newIds = isCurrentlyFavorite
        ? favoriteIds.filter(favId => favId !== id)
        : [...favoriteIds, id];
    
    setFavoriteIds(newIds); // Optimistic update

    if (user && supabase) {
        try {
            if (isCurrentlyFavorite) {
                // Remove from DB
                const { error } = await supabase
                    .from('user_favorites')
                    .delete()
                    .match({ user_id: user.id, game_id: id });
                if (error) throw error;
            } else {
                // Add to DB
                const { error } = await supabase
                    .from('user_favorites')
                    .insert({ user_id: user.id, game_id: id });
                if (error) throw error;
            }
        } catch (error) {
            console.error("Error updating favorite in DB:", error);
            // Revert optimistic update on error
            setFavoriteIds(favoriteIds);
        }
    } else {
        // Fallback to local storage for guests
        persistFavoritesToLocal(newIds);
    }

  }, [favoriteIds, user]);

  const isFavorite = useCallback((id: number) => {
    return favoriteIds.includes(id);
  }, [favoriteIds]);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, isFavorite, toggleFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

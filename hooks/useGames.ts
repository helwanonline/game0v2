import { useState, useEffect, useCallback } from 'react';
import type { Game } from '../types';

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/games.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: { games: Game[] } = await response.json();
      
      if (!Array.isArray(data.games)) {
        throw new Error("Fetched data is not in the expected format (missing 'games' array).");
      }

      const sortedGames = [...data.games].sort((a, b) => b.playCount - a.playCount);
      setGames(sortedGames);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred.');
      }
      console.error("Failed to fetch games:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return { games, loading, error, refetch: fetchGames };
};
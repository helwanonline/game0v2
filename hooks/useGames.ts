import { useState, useEffect, useCallback } from 'react';
import type { Game } from '../types';
import { supabase } from '../lib/supabaseClient';

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data: Game[] | null = null;
      if (supabase) {
        const { data: supabaseData, error: supabaseError } = await supabase
          .from('games')
          .select('*')
          .order('playCount', { ascending: false });

        if (supabaseError) throw new Error(`Supabase error: ${supabaseError.message}`);
        data = supabaseData as Game[];
      } else {
        // Fallback to local JSON
        const response = await fetch('/api/games.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const jsonData = await response.json();
        data = jsonData.games;
      }

      if (!data) throw new Error("No game data found.");
      
      setGames(data);
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

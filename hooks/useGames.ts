import { useState, useEffect, useCallback } from 'react';
import type { Game } from '../types';
import { supabase } from '../lib/supabaseClient';
import { checkUrl } from '../lib/gameHealth';

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unavailableGameIds, setUnavailableGameIds] = useState<Set<number>>(new Set());

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
        const response = await fetch('/api/games.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const jsonData = await response.json();
        data = jsonData.games;
      }

      if (!data) throw new Error("No game data found.");
      
      const availableGames = data.filter(game => !unavailableGameIds.has(game.id));
      setGames(availableGames);

      // Asynchronously check game health in the background
      data.forEach(async (game) => {
        if (game.engine === 'html5') { // Only check HTML5 games for now
            const isAvailable = await checkUrl(game.gameUrl);
            if (!isAvailable) {
                setUnavailableGameIds(prev => new Set(prev).add(game.id));
            }
        }
      });

    } catch (e) {
      const message = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(message);
      console.error("Failed to fetch games:", e);
    } finally {
      setLoading(false);
    }
  }, [unavailableGameIds]);

  useEffect(() => {
    // This effect runs whenever unavailableGameIds changes, to filter the main games list
    setGames(prevGames => prevGames.filter(game => !unavailableGameIds.has(game.id)));
  }, [unavailableGameIds]);

  useEffect(() => {
    fetchGames();
  }, []); // Fetch only on initial mount

  return { games, loading, error, refetch: fetchGames };
};

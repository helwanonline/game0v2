import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Language } from '../types';
import { Spinner } from './Spinner';

interface LeaderboardProps {
  gameId: number;
  language: Language;
}

interface Score {
  id: number;
  score: number;
  profiles: {
    username: string;
  } | null;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ gameId, language }) => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data, error } = await supabase
        .from('scores')
        .select(`
          id,
          score,
          profiles ( username )
        `)
        .eq('game_id', gameId)
        .order('score', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching scores:', error);
      } else {
        setScores(data as Score[]);
      }
      setLoading(false);
    };

    fetchScores();
  }, [gameId]);

  return (
    <div className="bg-secondary p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-center">{language === 'ar' ? 'لوحة الصدارة' : 'Leaderboard'}</h3>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner />
        </div>
      ) : scores.length > 0 ? (
        <ol className="space-y-3">
          {scores.map((score, index) => (
            <li key={score.id} className="flex items-center justify-between text-sm p-2 rounded-md bg-primary">
              <span className="flex items-center gap-3">
                <span className="font-bold w-6 text-center">{index + 1}</span>
                <span>{score.profiles?.username || (language === 'ar' ? 'لاعب مجهول' : 'Anonymous')}</span>
              </span>
              <span className="font-bold text-accent">{score.score.toLocaleString()}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-center text-dark-text py-10">{language === 'ar' ? 'لا توجد نقاط مسجلة بعد. كن أول من يسجل!' : 'No scores yet. Be the first!'}</p>
      )}
    </div>
  );
};

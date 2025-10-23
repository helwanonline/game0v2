import { useState, useEffect, useCallback } from 'react';
import type { Post } from '../types';
import { supabase } from '../lib/supabaseClient';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data: Post[] | null = null;
      if (supabase) {
        const { data: supabaseData, error: supabaseError } = await supabase
          .from('posts')
          .select('*')
          .order('publishedAt', { ascending: false });
        
        if (supabaseError) throw new Error(`Supabase error: ${supabaseError.message}`);
        data = supabaseData as Post[];
      } else {
        // Fallback to local JSON
        const response = await fetch('/api/posts.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const jsonData = await response.json();
        data = jsonData.posts;
      }

      if (!data) throw new Error("No post data found.");

      setPosts(data as Post[]);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred while fetching posts.');
      }
      console.error("Failed to fetch posts:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, refetch: fetchPosts };
};

import { useState, useEffect, useCallback } from 'react';
import type { Post } from '../types';

const AUTO_POST_INTERVAL = 20000; // 20 seconds for demonstration

export const useAutoBlogger = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/posts.json');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data: { posts: Post[] } = await response.json();
      const sortedPosts = data.posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      setAllPosts(sortedPosts);
      // Initially show a subset of posts
      setVisiblePosts(sortedPosts.slice(0, 3)); 
    } catch (e) {
      const message = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(message);
      console.error("Failed to fetch posts:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (allPosts.length <= visiblePosts.length) return;

    const intervalId = setInterval(() => {
      setVisiblePosts(currentVisible => {
        const nextPostIndex = allPosts.findIndex(p => !currentVisible.includes(p));
        if (nextPostIndex > -1) {
            const nextPost = allPosts[nextPostIndex];
            // Add the new post to the top and keep the list from growing too large
            const updatedList = [nextPost, ...currentVisible].slice(0, allPosts.length);
            return updatedList;
        }
        // If all posts are visible, clear interval
        clearInterval(intervalId);
        return currentVisible;
      });
    }, AUTO_POST_INTERVAL);

    return () => clearInterval(intervalId);
  }, [allPosts, visiblePosts]);

  return { visiblePosts, loading, error, fetchPosts };
};
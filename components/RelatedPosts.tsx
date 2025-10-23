
import React, { useMemo } from 'react';
import type { Language } from '../types';
import { usePosts } from '../hooks/usePosts';
import { BlogCard } from './BlogCard';

interface RelatedPostsProps {
    currentPostSlug: string;
    language: Language;
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPostSlug, language }) => {
    const { posts, loading } = usePosts();

    const relatedPosts = useMemo(() => {
        return posts
            .filter(post => post.slug !== currentPostSlug)
            .slice(0, 3); // Show up to 3 related posts
    }, [posts, currentPostSlug]);

    if (loading || relatedPosts.length === 0) {
        return null;
    }

    return (
        <section className="mt-16 border-t border-gray-800 pt-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-light-text">{language === 'ar' ? 'مقالات ذات صلة' : 'Related Articles'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map(post => (
                    <BlogCard key={post.slug} post={post} language={language} />
                ))}
            </div>
        </section>
    );
};
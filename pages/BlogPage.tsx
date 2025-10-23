
import React, { useState, useMemo } from 'react';
import type { Language, Post } from '../types';
import { usePosts } from '../hooks/usePosts';
import { BlogCard } from '../components/BlogCard';
import { Spinner } from '../components/Spinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { SEO } from '../components/SEO';
import { FeaturedPostCard } from '../components/FeaturedPostCard';
import { TagCloud } from '../components/TagCloud';

export const BlogPage: React.FC<{language: Language}> = ({language}) => {
    const { posts, loading, error, refetch } = usePosts();
    const [activeTag, setActiveTag] = useState<string | null>(null);

    const featuredPost = useMemo(() => {
        if (posts.length === 0) return null;
        return posts[0]; // The hook already sorts by most recent
    }, [posts]);

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        posts.forEach(post => {
            post.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags);
    }, [posts]);

    const filteredPosts = useMemo(() => {
        const otherPosts = posts.slice(1);
        if (!activeTag) {
            return otherPosts;
        }
        return otherPosts.filter(post => post.tags.includes(activeTag));
    }, [posts, activeTag]);

    if (loading) {
        return <div className="h-[80vh] flex items-center justify-center"><Spinner /></div>;
    }

    if (error) {
        return <ErrorMessage message={error} onRetry={refetch} language={language} />;
    }

    return (
        <>
            <SEO
                title={language === 'ar' ? 'مدونة الألعاب - آخر الأخبار والمقالات' : 'Gaming Blog - Latest News & Articles'}
                description={language === 'ar' ? 'اكتشف أحدث المقالات والمراجعات والنصائح في عالم الألعاب على مدونة 5199.online.' : 'Discover the latest articles, reviews, and tips in the world of gaming on the 5199.online blog.'}
                language={language}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center py-4 md:py-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-light-text mb-4">
                        {language === 'ar' ? 'مدونة العاب 5199.Online' : '5199.Online Games Blog'}
                    </h1>
                    <p className="max-w-2xl mx-auto text-dark-text">
                        {language === 'ar' ? 'نصائح ومقالات ممتعة ومفيدة للاعبين الصغار وعائلاتهم. اكتشف ألعابًا جديدة وآمنة!' : 'Fun and helpful tips and articles for young gamers and their families. Discover new and safe games!'}
                    </p>
                </div>
                
                {featuredPost && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-light-text">{language === 'ar' ? 'آخر مقال' : 'Latest Post'}</h2>
                        <FeaturedPostCard post={featuredPost} language={language} />
                    </section>
                )}

                <section>
                    <div className="md:flex md:justify-between md:items-center mb-6">
                         <h2 className="text-2xl font-bold text-light-text mb-4 md:mb-0">{language === 'ar' ? 'جميع المقالات' : 'All Posts'}</h2>
                         <TagCloud tags={allTags} activeTag={activeTag} onTagSelect={setActiveTag} language={language} />
                    </div>
                     {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map(post => (
                                <BlogCard key={post.slug} post={post} language={language} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 text-dark-text">
                            <p>{language === 'ar' ? 'لا توجد مقالات تطابق هذا الوسم.' : 'No posts match this tag.'}</p>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}

export default BlogPage;

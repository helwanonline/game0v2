
import React from 'react';
import type { Language } from '../types';
import { useAutoBlogger } from '../hooks/useAutoBlogger';
import { BlogCard } from '../components/BlogCard';
import { Spinner } from '../components/Spinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { SEO } from '../components/SEO';

export const BlogPage: React.FC<{language: Language}> = ({language}) => {
    const { posts, loading, error, fetchPosts } = useAutoBlogger();

    if (loading) {
        return <div className="h-[80vh] flex items-center justify-center"><Spinner /></div>;
    }

    if (error) {
        return <ErrorMessage message={error} onRetry={fetchPosts} language={language} />;
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {posts.map(post => (
                        <BlogCard key={post.slug} post={post} language={language} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default BlogPage;
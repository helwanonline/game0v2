
import React from 'react';
import type { Language } from '../types';
import { useAutoBlogger } from '../hooks/useAutoBlogger';
import { BlogCard } from '../components/BlogCard';
import { Spinner } from '../components/Spinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { SEO } from '../components/SEO';

export const BlogPage: React.FC<{language: Language}> = ({language}) => {
    const { visiblePosts, loading, error, fetchPosts } = useAutoBlogger();

    if (loading) {
        return <div className="h-[80vh] flex items-center justify-center"><Spinner /></div>;
    }

    if (error) {
        return <ErrorMessage message={error} onRetry={fetchPosts} language={language} />;
    }

    const latestPost = visiblePosts[0];
    const otherPosts = visiblePosts.slice(1);

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
                        {language === 'ar' ? 'مدونة الألعاب' : 'Game Blog'}
                    </h1>
                    <p className="max-w-2xl mx-auto text-dark-text">
                        {language === 'ar' ? 'محتوى متجدد تلقائيًا كل 20 ثانية بواسطة الذكاء الاصطناعي (محاكاة).' : 'Content auto-refreshed every 20 seconds by AI (simulation).'}
                    </p>
                </div>

                {/* Featured Post */}
                {latestPost && (
                    <a href={`#/blog/${latestPost.slug}`} className="block bg-secondary rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-glow hover:-translate-y-2 group mb-12">
                        <div className="md:flex">
                            <div className="md:w-1/2">
                                <img src={latestPost.imageUrl} alt={language === 'ar' ? latestPost.title_ar : latestPost.title_en} className="w-full h-64 md:h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            </div>
                            <div className="p-8 md:w-1/2 flex flex-col justify-center">
                                <p className="text-sm text-accent font-semibold mb-2">{language === 'ar' ? 'الأحدث' : 'Latest Post'}</p>
                                <h2 className="text-2xl md:text-3xl font-bold text-light-text mb-3">
                                    {language === 'ar' ? latestPost.title_ar : latestPost.title_en}
                                </h2>
                                <p className="text-dark-text text-base leading-relaxed mb-4">
                                    {language === 'ar' ? latestPost.excerpt_ar : latestPost.excerpt_en}
                                </p>
                                <span className="font-semibold text-accent hover:text-accent-hover mt-auto">
                                    {language === 'ar' ? 'اقرأ المزيد ←' : 'Read More →'}
                                </span>
                            </div>
                        </div>
                    </a>
                )}

                {/* Grid of other posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherPosts.map(post => (
                        <BlogCard key={post.slug} post={post} language={language} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default BlogPage;
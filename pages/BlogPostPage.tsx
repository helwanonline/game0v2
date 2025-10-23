
import React from 'react';
import type { Language } from '../types';
import { usePosts } from '../hooks/usePosts';
import { useParams } from 'react-router-dom'; // Placeholder, as we use hash
import { ShareButtons } from '../components/ShareButtons';
import { Spinner } from '../components/Spinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { SEO } from '../components/SEO';
import { RelatedPosts } from '../components/RelatedPosts';


interface BlogPostPageProps {
    slug: string;
    language: Language;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, language }) => {
    const { posts, loading, error, refetch } = usePosts();
    const post = posts.find(p => p.slug === slug);

    if (loading) {
         return <div className="h-[80vh] flex items-center justify-center"><Spinner /></div>;
    }

    if (error) {
        return <ErrorMessage message={error} onRetry={refetch} language={language} />;
    }

    if (!post) {
        return (
            <div className="container mx-auto text-center p-10">
                <h1 className="text-4xl font-bold text-accent">{language === 'ar' ? '404 - المقالة غير موجودة' : '404 - Post Not Found'}</h1>
                <p className="mt-4 text-dark-text">{language === 'ar' ? 'عذرًا، لم نتمكن من العثور على المقالة التي تبحث عنها.' : 'Sorry, we couldn\'t find the post you were looking for.'}</p>
                 <a href="#/blog" className="mt-6 inline-block text-accent hover:text-accent-hover font-semibold">
                    {language === 'ar' ? '→ العودة إلى المدونة' : '→ Back to Blog'}
                </a>
            </div>
        );
    }

    const title = language === 'ar' ? post.title_ar : post.title_en;
    const content = language === 'ar' ? post.content_ar : post.content_en;
    const publishedDate = new Date(post.publishedAt).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const shareUrl = `${window.location.origin}${window.location.pathname}#/blog/${post.slug}`;
    const shareTitle = title;
    const description = language === 'ar' ? post.excerpt_ar : post.excerpt_en;

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://placehold.co/1280x720/0D1117/8B949E?text=Image+Not+Found';
    };

    return (
        <>
            <SEO
                title={title}
                description={description}
                imageUrl={post.imageUrl}
                language={language}
                type="article"
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <article className="max-w-4xl mx-auto">
                    <header className="mb-8">
                        <div className="text-center">
                            <a href="#/blog" className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors">
                                {language === 'ar' ? '← العودة إلى المدونة' : '← Back to Blog'}
                            </a>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-light-text my-4 leading-tight">
                                {title}
                            </h1>
                            <div className="flex items-center justify-center gap-4 text-dark-text text-sm">
                                <span>{language === 'ar' ? 'نشر في' : 'Published on'} {publishedDate}</span>
                                <span>&bull;</span>
                                <span>{language === 'ar' ? `قراءة ${post.readingTime} دقائق` : `${post.readingTime} min read`}</span>
                            </div>
                        </div>
                        <img 
                            src={post.imageUrl} 
                            alt={title} 
                            className="w-full h-auto max-h-[500px] object-cover rounded-xl my-8" 
                            onError={handleImageError}
                        />
                        <div className="flex justify-center gap-2">
                            <ShareButtons url={shareUrl} title={shareTitle} />
                        </div>
                    </header>
                    <div className="prose prose-invert lg:prose-xl mx-auto text-light-text prose-p:leading-relaxed prose-headings:text-light-text">
                        {content.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </article>

                <RelatedPosts currentPostSlug={post.slug} language={language} />

                <style>{`
                    .prose { color: #C9D1D9; }
                    .prose a { color: #58A6FF; }
                    .prose strong { color: #C9D1D9; }
                `}</style>
            </div>
        </>
    );
};

export default BlogPostPage;
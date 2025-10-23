
import React from 'react';
import type { Post, Language } from '../types';

interface BlogCardProps {
    post: Post;
    language: Language;
}

const formatDate = (dateString: string, lang: Language) => {
    return new Date(dateString).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const BlogCard: React.FC<BlogCardProps> = ({ post, language }) => {
    const title = language === 'ar' ? post.title_ar : post.title_en;
    const excerpt = language === 'ar' ? post.excerpt_ar : post.excerpt_en;

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://placehold.co/800x450/0D1117/8B949E?text=Error';
    };
    
    return (
        <a href={`#/blog/${post.slug}`} className="block bg-secondary rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-glow hover:-translate-y-2 flex flex-col group">
            <div className="relative w-full aspect-[16/9] overflow-hidden">
                 <img 
                    src={post.imageUrl} 
                    alt={title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={handleImageError}
                 />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center justify-between text-xs text-dark-text mb-2">
                    <span>{formatDate(post.publishedAt, language)}</span>
                    <span>{language === 'ar' ? `قراءة ${post.readingTime} دقائق` : `${post.readingTime} min read`}</span>
                </div>
                <h3 className="text-lg font-bold text-light-text mb-3 flex-grow">
                    {title}
                </h3>
                 <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs bg-gray-700 text-dark-text px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                </div>
                <div className="mt-auto">
                    <span className="font-semibold text-accent hover:text-accent-hover">
                        {language === 'ar' ? 'اقرأ المزيد ←' : 'Read More →'}
                    </span>
                </div>
            </div>
        </a>
    );
};
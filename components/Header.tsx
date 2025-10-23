
import React, { useState } from 'react';
import type { Language } from '../types';
import { SearchIcon } from './icons/SearchIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface HeaderProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    currentRoute: string;
}

export const Header: React.FC<HeaderProps> = ({ language, setLanguage, currentRoute }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const toggleLanguage = () => {
        setLanguage(language === 'ar' ? 'en' : 'ar');
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.hash = `#/search?q=${encodeURIComponent(searchQuery.trim())}`;
            setIsSearchVisible(false);
            setSearchQuery('');
        }
    };

    const navLinkClasses = (href: string, isExact: boolean = false) => {
        const cleanedRoute = currentRoute.split('?')[0];
        const isActive = isExact ? cleanedRoute === href : cleanedRoute.startsWith(href) && href !== '#/';
        if (href === '#/' && cleanedRoute === href) { // Special case for exact home
             return `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 text-accent-hover bg-primary`;
        }

        return `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 ${
            isActive 
            ? 'text-accent-hover bg-primary' 
            : 'text-dark-text hover:text-light-text'
        }`;
    }

    const navLinks = [
        { href: '#/', ar: 'الرئيسية', en: 'Home', exact: true },
        { href: '#/new-games', ar: 'الألعاب الجديدة', en: 'New Games' },
        { href: '#/popular', ar: 'الأكثر لعبًا', en: 'Popular' },
        { href: '#/favorites', ar: 'مفضلتي', en: 'My Favorites' },
        { href: '#/for-you', ar: 'لأجلك', en: 'For You', icon: <SparklesIcon className="w-4 h-4 text-yellow-400" /> },
        { href: '#/blog', ar: 'المدونة', en: 'Blog' }
    ];

    return (
        <header className="bg-secondary sticky top-0 z-50 shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <a href="#/" className="flex-shrink-0">
                           <img className="h-10 w-auto" src="https://i.ibb.co/r2zLLDB/5199-online.png" alt="5199.online Logo" />
                        </a>
                        <nav className="hidden md:flex items-baseline space-x-4 rtl:space-x-reverse mx-4">
                            {navLinks.map(link => (
                                <a key={link.href} href={link.href} className={navLinkClasses(link.href, link.exact)}>
                                    {link.icon}
                                    <span>{language === 'ar' ? link.ar : link.en}</span>
                                </a>
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <button onClick={() => setIsSearchVisible(!isSearchVisible)} className="p-2 text-dark-text hover:text-light-text transition-colors">
                                <SearchIcon className="w-5 h-5" />
                            </button>
                            {isSearchVisible && (
                                <form onSubmit={handleSearchSubmit} className={`absolute top-full ${language === 'ar' ? 'left-0' : 'right-0'} mt-2 w-64 bg-primary p-2 rounded-md shadow-lg z-10`}>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={language === 'ar' ? 'ابحث عن لعبة...' : 'Search for a game...'}
                                        className="w-full bg-secondary text-light-text px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                        autoFocus
                                    />
                                </form>
                            )}
                        </div>
                        <button
                            onClick={toggleLanguage}
                            className="bg-primary text-accent font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                        >
                            {language === 'ar' ? 'EN' : 'عربي'}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
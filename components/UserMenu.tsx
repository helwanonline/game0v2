import React, { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import type { Language } from '../types';
import { UserIcon } from './icons/UserIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { Spinner } from './Spinner';

interface UserMenuProps {
    language: Language;
}

export const UserMenu: React.FC<UserMenuProps> = ({ language }) => {
    const { user, signOut } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleSignOut = async () => {
        setIsLoggingOut(true);
        await signOut();
        setIsOpen(false);
        setIsLoggingOut(false);
        window.location.hash = '#/';
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!user) return null;

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center w-10 h-10 bg-primary rounded-full hover:bg-gray-800 transition-colors">
                <UserIcon className="w-5 h-5 text-accent" />
            </button>
            {isOpen && (
                <div className={`absolute top-full mt-2 w-48 bg-secondary rounded-md shadow-lg z-20 ${language === 'ar' ? 'left-0' : 'right-0'}`}>
                    <div className="p-2 border-b border-gray-700">
                        <p className="text-sm text-light-text truncate">{user.email}</p>
                    </div>
                    <div className="p-1">
                        <button
                            onClick={handleSignOut}
                            disabled={isLoggingOut}
                            className="w-full text-left px-3 py-2 text-sm text-dark-text hover:bg-primary hover:text-red-500 rounded-md flex items-center gap-2 transition-colors disabled:opacity-50"
                        >
                            {isLoggingOut ? <Spinner size="w-4 h-4" /> : <LogoutIcon className="w-4 h-4" />}
                            <span>{language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

import React from 'react';
import { TwitterIcon } from './icons/TwitterIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface ShareButtonsProps {
    url: string;
    title: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    };

    const iconClasses = "w-5 h-5";
    const linkClasses = "text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700";

    return (
        <div className="flex items-center gap-2">
            <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter" className={linkClasses}>
                <TwitterIcon className={iconClasses} />
            </a>
            <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className={linkClasses}>
                <FacebookIcon className={iconClasses} />
            </a>
            <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" className={linkClasses}>
                <WhatsAppIcon className={iconClasses} />
            </a>
        </div>
    );
};
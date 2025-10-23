
import React, { useEffect } from 'react';
import type { Language } from '../types';

interface SEOProps {
  title: string;
  description: string;
  language: Language;
  keywords?: string[];
  imageUrl?: string;
  type?: 'website' | 'article';
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  language,
  keywords = ['ألعاب', 'games', 'online games', 'ألعاب أونلاين', 'free games', 'ألعاب مجانية'],
  imageUrl,
  type = 'website',
}) => {
  useEffect(() => {
    const fullTitle = `${title} | 5199.online`;
    document.title = fullTitle;
    
    const defaultImageUrl = 'https://i.ibb.co/r2zLLDB/5199-online.png';
    const finalImageUrl = imageUrl || defaultImageUrl;
    const fullImageUrl = finalImageUrl.startsWith('http') ? finalImageUrl : `${window.location.origin}${finalImageUrl}`;


    // Standard meta tags
    setMeta('description', description);
    setMeta('keywords', keywords.join(', '));

    // Open Graph (for Facebook, etc.)
    setMeta('og:title', fullTitle);
    setMeta('og:description', description);
    setMeta('og:type', type);
    setMeta('og:url', window.location.href);
    setMeta('og:site_name', '5199.online');
    setMeta('og:image', fullImageUrl);


    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', fullImageUrl);

    
    // JSON-LD Structured Data
    const schema = {
        '@context': 'https://schema.org',
        '@type': type === 'article' ? 'Article' : 'WebSite',
        'name': fullTitle,
        'description': description,
        'url': window.location.href,
        'image': fullImageUrl,
        'inLanguage': language === 'ar' ? 'ar-SA' : 'en-US',
    };
    
    const jsonLdScript = document.getElementById('json-ld-schema');
    if(jsonLdScript) {
        jsonLdScript.innerHTML = JSON.stringify(schema);
    }


  }, [title, description, language, keywords, imageUrl, type]);

  return null;
};

function setMeta(name: string, content: string) {
  let element = document.querySelector(`meta[name='${name}'], meta[property='${name}']`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}
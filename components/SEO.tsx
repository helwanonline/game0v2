
import React, { useEffect } from 'react';
import type { Language } from '../types';

interface SEOProps {
  title: string;
  description: string;
  language: Language;
  keywords?: string[];
  imageUrl?: string;
  schema?: Record<string, any>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  language,
  keywords = ['ألعاب', 'games', 'online games', 'ألعاب أونلاين', 'free games', 'ألعاب مجانية'],
  imageUrl,
  schema,
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
    setMeta('og:type', schema && schema['@type'] === 'Article' ? 'article' : 'website');
    setMeta('og:url', window.location.href);
    setMeta('og:site_name', '5199.online');
    setMeta('og:image', fullImageUrl);


    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', fullImageUrl);

    
    // JSON-LD Structured Data
    const jsonLdScript = document.getElementById('json-ld-schema');
    if(jsonLdScript) {
      if (schema) {
        const fullSchema = {
          '@context': 'https://schema.org',
          ...schema,
        };
        jsonLdScript.innerHTML = JSON.stringify(fullSchema, null, 2);
      } else {
        jsonLdScript.innerHTML = '';
      }
    }


  }, [title, description, language, keywords, imageUrl, schema]);

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

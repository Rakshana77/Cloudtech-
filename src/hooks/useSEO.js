import { useEffect } from 'react';

export const useSEO = ({
  title,
  description,
  keywords,
  ogType = 'website',
  ogImage = '/images/logo.png',
  schema
} = {}) => {
  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = title;
    }

    // Helper to set or update meta tag
    const setMetaTag = (name, value, isProperty = false) => {
      if (!value) return;
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    // 2. Set Meta tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    
    // Open Graph
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:url', window.location.href, true);

    // Twitter
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);

    // 3. Structured Data Schema injection
    let scriptElement = null;
    if (schema) {
      scriptElement = document.createElement('script');
      scriptElement.type = 'application/ld+json';
      scriptElement.text = JSON.stringify(schema);
      document.head.appendChild(scriptElement);
    }

    // Cleanup on unmount or updates
    return () => {
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, [title, description, keywords, ogType, ogImage, schema]);
};

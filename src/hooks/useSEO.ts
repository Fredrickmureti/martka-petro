
import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'organization';
  structuredData?: any;
  canonical?: string;
}

export const useSEO = ({
  title = 'Martka Petroleum - Leading Petroleum Equipment & Fuel Station Construction Company in Kenya',
  description = 'Martka Petroleum specializes in fuel dispensers, underground storage tanks, fuel pipeline systems, automation systems, and turnkey fuel station construction. Premier petroleum equipment suppliers in Kenya.',
  keywords = [
    'petroleum equipment suppliers',
    'fuel station construction company',
    'fuel dispensers Kenya',
    'digital fuel pump',
    'diesel tank installation',
    'fuel pipeline contractors',
    'calibration of fuel dispensers',
    'fuel automation system providers',
    'petroleum infrastructure company',
    'martka petroleum',
    'marka petroleum',
    'martka petro',
    'fuel management systems',
    'underground fuel tanks',
    'above ground storage tanks'
  ],
  image = 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&h=630&fit=crop',
  url,
  type = 'website',
  structuredData,
  canonical
}: SEOProps = {}) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Remove existing meta tags
    const existingMetas = document.querySelectorAll('meta[data-seo="true"]');
    existingMetas.forEach(meta => meta.remove());

    // Remove existing structured data
    const existingStructuredData = document.querySelectorAll('script[type="application/ld+json"][data-seo="true"]');
    existingStructuredData.forEach(script => script.remove());

    // Remove existing canonical
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) existingCanonical.remove();

    // Create meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords.join(', ') },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Martka Petroleum' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      
      // Open Graph
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url || window.location.href },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: 'Martka Petroleum' },
      { property: 'og:locale', content: 'en_KE' },
      
      // Twitter Cards
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:site', content: '@martkapetroleum' },
      
      // Additional SEO
      { name: 'theme-color', content: '#2563eb' },
      { name: 'msapplication-TileColor', content: '#2563eb' },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const meta = document.createElement('meta');
      if (name) meta.name = name;
      if (property) meta.setAttribute('property', property);
      meta.content = content;
      meta.setAttribute('data-seo', 'true');
      document.head.appendChild(meta);
    });

    // Add canonical link
    if (canonical || url) {
      const canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = canonical || url || window.location.href;
      document.head.appendChild(canonicalLink);
    }

    // Add structured data
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'true');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [title, description, keywords, image, url, type, structuredData, canonical]);
};

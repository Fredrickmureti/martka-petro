
import React, { useEffect } from 'react';

interface SEOOptimizerProps {
  children: React.ReactNode;
}

export const SEOOptimizer: React.FC<SEOOptimizerProps> = ({ children }) => {
  useEffect(() => {
    // Add structured data for website
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Martka Petroleum',
      url: 'https://martka-petroleum.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://martka-petroleum.com/products?search={search_term_string}',
        'query-input': 'required name=search_term_string'
      },
      sameAs: [
        'https://www.facebook.com/martkapetroleum',
        'https://www.linkedin.com/company/martka-petroleum',
        'https://twitter.com/martkapetroleum'
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(websiteSchema);
    script.id = 'website-schema';
    
    const existingScript = document.getElementById('website-schema');
    if (existingScript) {
      document.head.removeChild(existingScript);
    }
    
    document.head.appendChild(script);

    // Add performance optimizations
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    preloadLink.as = 'style';
    document.head.appendChild(preloadLink);

    // Add critical CSS for above-the-fold content
    const criticalCSS = document.createElement('style');
    criticalCSS.innerHTML = `
      .hero-section { min-height: 600px; }
      .loading-skeleton { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
    `;
    document.head.appendChild(criticalCSS);

    return () => {
      const scriptToRemove = document.getElementById('website-schema');
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, []);

  return <>{children}</>;
};

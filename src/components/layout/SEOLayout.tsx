
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { SEOOptimizer } from '@/components/seo/SEOOptimizer';
import { PageSpeedOptimizer } from '@/components/seo/PageSpeedOptimizer';

interface SEOLayoutProps {
  children: React.ReactNode;
}

export const SEOLayout: React.FC<SEOLayoutProps> = ({ children }) => {
  return (
    <HelmetProvider>
      <SEOOptimizer>
        <PageSpeedOptimizer />
        {children}
      </SEOOptimizer>
    </HelmetProvider>
  );
};


import React from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface CareersHeroProps {
  heroContent: any;
  isLoading: boolean;
  onViewPositions: () => void;
  onLearnCulture: () => void;
}

export const CareersHero = ({ 
  heroContent, 
  isLoading, 
  onViewPositions, 
  onLearnCulture 
}: CareersHeroProps) => (
  <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center">
        {isLoading ? (
          <>
            <Skeleton className="h-16 w-3/4 mx-auto mb-6 bg-slate-700" />
            <Skeleton className="h-6 w-full mx-auto bg-slate-700" />
          </>
        ) : (
          <>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {heroContent?.title?.split(' ').slice(0, -1).join(' ')}
              <span className="block text-blue-400">{heroContent?.title?.split(' ').slice(-1)[0]}</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              {heroContent?.description}
            </p>
          </>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={onViewPositions}
          >
            View Open Positions
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
            onClick={onLearnCulture}
          >
            Learn About Culture
          </Button>
        </div>
      </div>
    </div>
  </section>
);

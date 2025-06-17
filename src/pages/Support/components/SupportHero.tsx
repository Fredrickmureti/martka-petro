
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

interface SupportHeroProps {
  heroContent?: {
    title?: string;
    description?: string;
  };
  isLoading: boolean;
}

export const SupportHero = ({ heroContent, isLoading }: SupportHeroProps) => {
  return (
    <section 
      className="pt-32 pb-20 text-white overflow-hidden perspective-1500 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(30, 64, 175, 0.8)), url("https://images.unsplash.com/photo-1498050108023-c5249f4df085")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-blue-400/10 rounded-full blur-xl animate-float-gentle stagger-1"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-cyan-400/10 rounded-lg blur-lg animate-pulse-3d stagger-2"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-blue-300/10 rounded-full blur-lg animate-float-slow stagger-3"></div>
        <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-violet-400/10 rounded-lg blur-md animate-float stagger-4"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center transform-gpu perspective-1000">
          {isLoading ? (
            <>
              <Skeleton className="h-16 w-3/4 mx-auto mb-6 bg-slate-700" />
              <Skeleton className="h-6 w-full mx-auto bg-slate-700" />
            </>
          ) : (
            <>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight transform hover:scale-105 transition-all duration-700 animate-fade-in-down" 
                  style={{ 
                    animation: 'fadeInDown 1s ease-out, float 8s ease-in-out infinite',
                    transform: 'translateZ(50px)'
                  }}>
                {heroContent?.title?.split(' ').slice(0, -1).join(' ')}
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent transform hover:scale-110 transition-transform duration-500" 
                      style={{ transform: 'translateZ(80px)' }}>
                  {heroContent?.title?.split(' ').slice(-1)[0]}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed transform hover:scale-105 transition-all duration-500"
                 style={{ 
                   animation: 'fadeInUp 1s ease-out 0.3s both, floatGentle 6s ease-in-out infinite',
                   transform: 'translateZ(30px)'
                 }}>
                {heroContent?.description}
              </p>
            </>
          )}
          
          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto relative transform hover:scale-105 hover:translateZ-20 transition-all duration-500"
               style={{ animation: 'fadeInUp 1s ease-out 0.6s both' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl blur-lg"></div>
            <div className="relative glass-card rounded-xl p-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-300 z-10" size={20} />
              <Input 
                className="pl-12 pr-4 py-4 text-lg bg-white/10 border-white/20 text-white placeholder-slate-300 backdrop-blur-md"
                placeholder="Search for help articles, manuals, or FAQs..."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

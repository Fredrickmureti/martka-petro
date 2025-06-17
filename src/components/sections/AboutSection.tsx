
import React from 'react';
import { MapPin, Users, Award, Globe } from 'lucide-react';
import { useAboutContent } from '@/hooks/useContentManagement';
import { Skeleton } from '@/components/ui/skeleton';

interface AboutSectionProps {
  aboutBackground: any;
}

const AboutSection: React.FC<AboutSectionProps> = ({ aboutBackground }) => {
  const { data: aboutContent, isLoading } = useAboutContent();

  if (isLoading) {
    return (
      <section 
        className="py-20 text-white relative bg-fixed-optimized" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(15, 23, 42, ${aboutBackground?.overlay_opacity || 0.8}), rgba(30, 64, 175, ${aboutBackground?.overlay_opacity || 0.8})), url("${aboutBackground?.image_url || 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05'}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Skeleton className="h-10 w-3/4 mb-6 bg-white/20" />
              <Skeleton className="h-6 w-full mb-4 bg-white/20" />
              <Skeleton className="h-6 w-5/6 mb-8 bg-white/20" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-1/2 bg-white/20" />
                <Skeleton className="h-5 w-1/3 bg-white/20" />
              </div>
            </div>
            <div>
              <Skeleton className="w-full h-80 rounded-2xl bg-white/20" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Find the main about section
  const mainSection = aboutContent?.find(section => section.section_key === 'main_about') || aboutContent?.[0];
  const content = mainSection?.content || {};

  return (
    <section 
      className="py-20 text-white relative bg-fixed-optimized" 
      style={{ 
        backgroundImage: `linear-gradient(rgba(15, 23, 42, ${aboutBackground?.overlay_opacity || 0.8}), rgba(30, 64, 175, ${aboutBackground?.overlay_opacity || 0.8})), url("${aboutBackground?.image_url || 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05'}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-left">
            <h2 className="text-4xl font-bold mb-6">
              {mainSection?.title || "About Martka Petroleum"}
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              {content.description || mainSection?.description || "We are a leading provider of petroleum infrastructure solutions with years of experience in the industry. Our commitment to quality and innovation drives us to deliver exceptional results for our clients worldwide."}
            </p>
            
            {/* Stats Section */}
            {content.stats && (
              <div className="grid grid-cols-2 gap-4 mb-8">
                {Object.entries(content.stats).map(([key, value]: [string, any]) => (
                  <div key={key} className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <div className="text-2xl font-bold text-blue-400">{value}</div>
                    <div className="text-sm text-slate-300 capitalize">{key.replace('_', ' ')}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <MapPin className="text-blue-400" size={20} />
                <span className="text-slate-300">{content.location || "Global Operations"}</span>
              </div>
              <div className="flex items-center gap-4">
                <Users className="text-blue-400" size={20} />
                <span className="text-slate-300">{content.team_size || "Expert Team"}</span>
              </div>
              {content.founded && (
                <div className="flex items-center gap-4">
                  <Award className="text-blue-400" size={20} />
                  <span className="text-slate-300">Founded {content.founded}</span>
                </div>
              )}
              {content.markets && (
                <div className="flex items-center gap-4">
                  <Globe className="text-blue-400" size={20} />
                  <span className="text-slate-300">{content.markets}</span>
                </div>
              )}
            </div>

            {/* Highlights */}
            {content.highlights && Array.isArray(content.highlights) && (
              <div className="mt-6 space-y-2">
                <h4 className="text-lg font-semibold text-blue-400">Key Highlights</h4>
                <ul className="space-y-1">
                  {content.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-slate-300">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="animate-fade-in-right">
            <img
              src={content.image_url || "/placeholder.svg"}
              alt="About Our Company"
              className="rounded-2xl shadow-2xl hover-lift"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

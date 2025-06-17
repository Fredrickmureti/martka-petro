
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb, AlertTriangle, Info, Zap } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

const iconMap: { [key: string]: React.ElementType } = {
  Lightbulb,
  AlertTriangle,
  Info,
  Zap,
};

interface SupportContentSectionsProps {
  sections?: Tables<'support_content_sections'>[];
  isLoading: boolean;
}

export const SupportContentSections = ({ sections, isLoading }: SupportContentSectionsProps) => {
  if (isLoading) {
    return (
      <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <Card key={i} className="transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section, index) => {
            const IconComponent = section.icon ? iconMap[section.icon] || Info : Info;
            const bgColor = section.background_color || 'bg-white';
            const textColor = section.text_color || 'text-gray-900';
            
            return (
              <Card 
                key={section.id} 
                className={`${bgColor} transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                style={{ 
                  animation: `fadeInUp 0.6s ease-out ${0.1 * index}s both`
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-full ${
                      section.section_type === 'warning' 
                        ? 'bg-red-100 text-red-600' 
                        : section.section_type === 'tip'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <IconComponent size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold mb-2 ${textColor}`}>
                        {section.title}
                      </h3>
                      <p className={`${textColor} opacity-80 leading-relaxed`}>
                        {section.content}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

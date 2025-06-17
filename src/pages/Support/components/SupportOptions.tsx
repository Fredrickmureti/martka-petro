
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Phone, MessageCircle, Download, BookOpen, Users } from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  Phone,
  MessageCircle,
  Download,
  BookOpen,
  Users,
};

interface SupportOptionsProps {
  helpContent?: {
    title?: string;
    description?: string;
  };
  supportOptions?: Array<{
    title: string;
    description: string;
    availability: string;
    action_text: string;
    icon?: string;
    action_type?: string;
    action_url?: string;
  }>;
  isLoadingContent: boolean;
  isLoadingSupportOptions: boolean;
  onSupportAction: (option: any) => void;
}

export const SupportOptions = ({ 
  helpContent, 
  supportOptions, 
  isLoadingContent, 
  isLoadingSupportOptions, 
  onSupportAction 
}: SupportOptionsProps) => {
  return (
    <section className="py-20 bg-background perspective-1200">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 transform hover:scale-105 transition-all duration-500">
          {isLoadingContent ? (
            <>
              <Skeleton className="h-9 w-80 mx-auto mb-4" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">{helpContent?.title}</h2>
              <p className="text-xl text-muted-foreground animate-fade-in-up stagger-1">{helpContent?.description}</p>
            </>
          )}
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 perspective-1000">
          {isLoadingSupportOptions ? Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="transform hover:scale-105 transition-all duration-500">
                <CardContent className="p-8"><Skeleton className="h-48 w-full" /></CardContent>
              </Card>
          )) : (supportOptions || []).map((option, index) => {
            const IconComponent = option.icon ? iconMap[option.icon] || MessageCircle : MessageCircle;
            return (
            <Card key={index} 
                  className="interactive-card hover-3d-gentle group transform-gpu"
                  style={{ 
                    animation: `fadeInUp 0.8s ease-out ${0.1 * (index + 1)}s both`,
                    transformStyle: 'preserve-3d'
                  }}>
              <CardContent className="p-8 card-content">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6 card-icon group-hover:shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-500">
                  <IconComponent size={32} className="text-white transform group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-2 card-title group-hover:text-blue-600 transition-colors duration-300">{option.title}</h3>
                <p className="text-muted-foreground mb-4 transform group-hover:translateZ-10 transition-transform duration-300">{option.description}</p>
                <p className="text-sm text-blue-600 mb-4 transform group-hover:translateZ-10 transition-transform duration-300">{option.availability}</p>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 hover:translateZ-10 transition-all duration-300"
                  onClick={() => onSupportAction(option)}
                >
                  {option.action_text}
                </Button>
              </CardContent>
            </Card>
          )})}
        </div>
      </div>
    </section>
  );
};


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Phone, MessageCircle, Users, BookOpen, ExternalLink } from 'lucide-react';

interface SupportContactProps {
  contactContent?: {
    title?: string;
  };
  resourcesContent?: {
    title?: string;
  };
  contactData?: {
    subtitle?: string;
    phone?: string;
    email?: string;
    hours?: string;
  };
  resourcesData?: {
    subtitle?: string;
    features?: string[];
  };
  communityData?: {
    subtitle?: string;
  };
  isLoadingContent: boolean;
}

export const SupportContact = ({ 
  contactContent, 
  resourcesContent, 
  contactData, 
  resourcesData, 
  communityData, 
  isLoadingContent 
}: SupportContactProps) => {
  return (
    <>
      {/* Additional Resources Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-900/20 dark:to-slate-900 perspective-1000">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 transform hover:scale-105 transition-all duration-500">
            {isLoadingContent ? (
              <>
                <Skeleton className="h-9 w-96 mx-auto mb-4" />
                <Skeleton className="h-6 w-full max-w-lg mx-auto" />
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">{resourcesContent?.title || 'Additional Resources'}</h2>
                <p className="text-xl text-muted-foreground animate-fade-in-up stagger-1">{resourcesData?.subtitle || 'Access technical guides, training materials, and industry insights'}</p>
              </>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {isLoadingContent ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="hover-3d-gentle transform transition-all duration-500">
                <CardContent className="p-6"><Skeleton className="h-24 w-full" /></CardContent>
              </Card>
            )) : (resourcesData?.features || ['Technical Documentation', 'Video Tutorials', 'Best Practices Guide', 'Industry Updates']).map((feature, index) => (
              <Card key={index} 
                    className="hover-3d-gentle group transform-gpu cursor-pointer"
                    style={{ 
                      animation: `fadeInUp 0.6s ease-out ${0.1 * index}s both`,
                      transformStyle: 'preserve-3d'
                    }}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
                    <BookOpen size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300">{feature}</h3>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                    Access Now <ExternalLink size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-20 bg-background perspective-1000">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 transform hover:scale-105 transition-all duration-500">
              {isLoadingContent ? (
                <>
                  <Skeleton className="h-9 w-80 mx-auto mb-4" />
                  <Skeleton className="h-6 w-full max-w-lg mx-auto" />
                </>
              ) : (
                <>
                  <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">{contactContent?.title || 'Need More Help?'}</h2>
                  <p className="text-xl text-muted-foreground animate-fade-in-up stagger-1">{contactData?.subtitle || 'Contact our dedicated support team for personalized assistance'}</p>
                </>
              )}
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover-3d-gentle group transform-gpu" style={{ animation: 'fadeInLeft 0.6s ease-out 0.1s both' }}>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Phone size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Phone Support</h3>
                  <p className="text-muted-foreground mb-4">{contactData?.phone || '+1-800-SUPPORT'}</p>
                  <p className="text-sm text-blue-600">{contactData?.hours || '24/7 Support Available'}</p>
                </CardContent>
              </Card>

              <Card className="hover-3d-gentle group transform-gpu" style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <MessageCircle size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Email Support</h3>
                  <p className="text-muted-foreground mb-4">{contactData?.email || 'support@martkapetroleumcom'}</p>
                  <Button className="w-full">Send Email</Button>
                </CardContent>
              </Card>

              <Card className="hover-3d-gentle group transform-gpu" style={{ animation: 'fadeInRight 0.6s ease-out 0.3s both' }}>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Users size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Community</h3>
                  <p className="text-muted-foreground mb-4">{communityData?.subtitle || 'Connect with experts and peers'}</p>
                  <Button variant="outline" className="w-full">Join Community</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

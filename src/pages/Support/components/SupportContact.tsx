
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Phone, Mail, Clock } from 'lucide-react';

interface SupportContactProps {
  contactContent?: {
    title?: string;
    description?: string;
  };
  contactData?: {
    subtitle?: string;
    phone?: string;
    email?: string;
    hours?: string;
  };
  isLoadingContent: boolean;
}

export const SupportContact = ({ 
  contactContent, 
  contactData, 
  isLoadingContent 
}: SupportContactProps) => {
  return (
    <section className="py-20 bg-background perspective-1200">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 transform hover:scale-105 transition-all duration-500">
            {isLoadingContent ? (
              <>
                <Skeleton className="h-9 w-80 mx-auto mb-4" />
                <Skeleton className="h-6 w-96 mx-auto" />
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">{contactContent?.title}</h2>
                <p className="text-xl text-muted-foreground animate-fade-in-up stagger-1">{contactContent?.description}</p>
              </>
            )}
          </div>
          
          <div className="grid md:grid-cols-1 gap-8">
            {/* Contact Information Card */}
            <Card className="interactive-card hover-3d-gentle group transform-gpu animate-fade-in-up">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Get in Touch</CardTitle>
                {contactData?.subtitle && (
                  <p className="text-muted-foreground">{contactData.subtitle}</p>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {contactData?.phone && (
                    <div className="text-center p-4 rounded-lg hover:bg-slate-50 transition-colors duration-300">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Phone size={20} className="text-blue-600" />
                      </div>
                      <h4 className="font-semibold mb-1">Phone</h4>
                      <p className="text-muted-foreground">{contactData.phone}</p>
                    </div>
                  )}
                  
                  {contactData?.email && (
                    <div className="text-center p-4 rounded-lg hover:bg-slate-50 transition-colors duration-300">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Mail size={20} className="text-green-600" />
                      </div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="text-muted-foreground">{contactData.email}</p>
                    </div>
                  )}
                  
                  {contactData?.hours && (
                    <div className="text-center p-4 rounded-lg hover:bg-slate-50 transition-colors duration-300">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Clock size={20} className="text-purple-600" />
                      </div>
                      <h4 className="font-semibold mb-1">Hours</h4>
                      <p className="text-muted-foreground">{contactData.hours}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

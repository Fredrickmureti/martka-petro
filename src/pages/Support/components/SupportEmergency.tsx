
import React from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Phone } from 'lucide-react';

interface SupportEmergencyProps {
  emergencyContent?: {
    title?: string;
    description?: string;
  };
  emergencyData?: {
    phone?: string;
    email_text?: string;
    button_text?: string;
  };
  isLoadingContent: boolean;
}

export const SupportEmergency = ({ emergencyContent, emergencyData, isLoadingContent }: SupportEmergencyProps) => {
  return (
    <section className="py-20 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white perspective-1000 gradient-shift">
      <div className="container mx-auto px-6 text-center">
        <div className="transform hover:scale-105 transition-all duration-500">
          {isLoadingContent ? (
            <>
              <Skeleton className="h-9 w-80 mx-auto mb-4 bg-red-500" />
              <Skeleton className="h-12 w-full max-w-2xl mx-auto bg-red-500" />
              <Skeleton className="h-12 w-96 mx-auto bg-red-500" />
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">{emergencyContent?.title}</h2>
              <p className="text-red-100 mb-10 max-w-2xl mx-auto text-lg animate-fade-in-up stagger-1">{emergencyContent?.description}</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {emergencyData?.phone && (
                  <Button size="lg" 
                          className="bg-white text-red-600 hover:bg-red-50 transform hover:scale-110 hover:translateZ-10 hover:shadow-2xl transition-all duration-300 animate-fade-in-left stagger-2">
                    <Phone className="mr-2 transform group-hover:scale-110 transition-transform duration-300" />
                    {emergencyData.button_text || `Call Emergency: ${emergencyData.phone}`}
                  </Button>
                )}
                {emergencyData?.email_text && (
                  <Button size="lg" variant="outline" 
                          className="border-white text-white hover:bg-white hover:text-red-600 transform hover:scale-110 hover:translateZ-10 hover:shadow-2xl transition-all duration-300 animate-fade-in-right stagger-3">
                    {emergencyData.email_text}
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

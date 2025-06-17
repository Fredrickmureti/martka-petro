
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SupportFAQProps {
  faqContent?: {
    title?: string;
    description?: string;
  };
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  isLoadingContent: boolean;
  isLoadingFaqs: boolean;
}

export const SupportFAQ = ({ faqContent, faqs, isLoadingContent, isLoadingFaqs }: SupportFAQProps) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 perspective-1000">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 transform hover:scale-105 transition-all duration-500">
            {isLoadingContent ? (
              <>
                <Skeleton className="h-9 w-96 mx-auto mb-4" />
                <Skeleton className="h-6 w-full max-w-lg mx-auto" />
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">{faqContent?.title}</h2>
                <p className="text-xl text-muted-foreground animate-fade-in-up stagger-1">{faqContent?.description}</p>
              </>
            )}
          </div>
          
          <div className="space-y-6">
            {isLoadingFaqs ? Array.from({ length: 6 }).map((_, i) => 
              <Card key={i} className="transform hover:scale-102 transition-all duration-300">
                <CardContent className="p-4"><Skeleton className="h-6 w-full" /></CardContent>
              </Card>
            ) : (faqs || []).map((faq, index) => (
              <Card key={index} 
                    className="overflow-hidden hover-lift transform-gpu group"
                    style={{ 
                      animation: `fadeInLeft 0.6s ease-out ${0.1 * index}s both`,
                      transformStyle: 'preserve-3d'
                    }}>
                <CardHeader 
                  className="cursor-pointer hover:bg-slate-100/50 p-6 transition-all duration-300 group-hover:translateZ-5"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg transform group-hover:translateZ-10 transition-transform duration-300">{faq.question}</CardTitle>
                    <div className="transform group-hover:translateZ-15 group-hover:scale-110 transition-all duration-300">
                      {expandedFaq === index ? (
                        <ChevronDown size={20} className="text-blue-600 transform rotate-180 transition-transform duration-300" />
                      ) : (
                        <ChevronRight size={20} className="text-slate-400" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                {expandedFaq === index && (
                  <CardContent className="pt-0 p-6 animate-fade-in-up">
                    <div className="glass-card p-4 rounded-lg transform hover:translateZ-5 transition-transform duration-300">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

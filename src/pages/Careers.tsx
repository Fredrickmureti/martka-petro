import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import { useCareers } from '@/hooks/useCareers';
import { useCareersContent, useCareersCards } from '@/hooks/useCareersManagement';
import { Skeleton } from '@/components/ui/skeleton';
import { CareersHero } from './components/careers/CareersHero';
import { CareersBenefits } from './components/careers/CareersBenefits';
import { CareersPositions } from './components/careers/CareersPositions';
import { MapPin, Clock, DollarSign, Users, Award, Briefcase } from 'lucide-react';

const Careers = () => {
  const { data: jobs = [], isLoading: isLoadingJobs } = useCareers();
  const { data: content, isLoading: isLoadingContent } = useCareersContent();
  const { data: cards, isLoading: isLoadingCards } = useCareersCards();
  const openPositionsRef = useRef<HTMLElement>(null);

  const heroContent = content?.hero;
  const whyWorkContent = content?.why_work;
  const cultureContent = content?.culture;
  const ctaContent = content?.cta;

  const benefitCards = cards?.filter(card => card.card_type === 'benefit') || [];
  const statCards = cards?.filter(card => card.card_type === 'stat') || [];
  const cultureValues = (cultureContent?.content as any)?.values || [];
  const ctaButtons = (ctaContent?.content as any)?.buttons || [];

  const scrollToOpenPositions = () => {
    openPositionsRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const scrollToCompanyCulture = () => {
    const cultureSection = document.getElementById('company-culture');
    cultureSection?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  if (isLoadingJobs && isLoadingContent) {
    return (
      <Layout>
        <div className="pt-32 pb-16 text-center">
          <div className="text-xl">Loading careers...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <CareersHero
        heroContent={heroContent}
        isLoading={isLoadingContent}
        onViewPositions={scrollToOpenPositions}
        onLearnCulture={scrollToCompanyCulture}
      />

      <CareersBenefits
        whyWorkContent={whyWorkContent}
        benefitCards={benefitCards}
        isLoadingContent={isLoadingContent}
        isLoadingCards={isLoadingCards}
      />

      <CareersPositions
        jobs={jobs}
        isLoadingJobs={isLoadingJobs}
        openPositionsRef={openPositionsRef}
      />

      {/* Company Culture */}
      <section id="company-culture" className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              {isLoadingContent ? (
                <>
                  <Skeleton className="h-9 w-80 mb-6" />
                  <Skeleton className="h-24 w-full mb-8" />
                  <div className="space-y-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} className="h-6 w-full" />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-6">{cultureContent?.title}</h2>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {cultureContent?.description}
                  </p>
                  
                  <div className="space-y-3">
                    {cultureValues.map((item: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                {isLoadingCards ? Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square" />
                )) : statCards.slice(0, 2).map((stat, index) => (
                  <div key={index} className="aspect-square bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white flex flex-col justify-center text-center">
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-blue-100 text-sm">{stat.unit}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-4 pt-8">
                {isLoadingCards ? Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square" />
                )) : statCards.slice(2, 4).map((stat, index) => {
                  const colors = [
                    'from-purple-600 to-purple-800',
                    'from-orange-600 to-orange-800'
                  ];
                  const textColors = [
                    'text-purple-100',
                    'text-orange-100'
                  ];
                  return (
                    <div key={index} className={`aspect-square bg-gradient-to-br ${colors[index]} rounded-2xl p-6 text-white flex flex-col justify-center text-center`}>
                      <div className="text-3xl font-bold mb-2">{stat.value}</div>
                      <div className={`${textColors[index]} text-sm`}>{stat.unit}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          {isLoadingContent ? (
            <>
              <Skeleton className="h-9 w-80 mx-auto mb-4 bg-blue-500" />
              <Skeleton className="h-12 w-full max-w-2xl mx-auto mb-8 bg-blue-500" />
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Skeleton className="h-12 w-64 bg-blue-500" />
                <Skeleton className="h-12 w-48 bg-blue-500" />
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">{ctaContent?.title}</h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                {ctaContent?.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {ctaButtons.map((button: any, index: number) => {
                  if (button.type === 'primary') {
                    return (
                      <WhatsAppButton 
                        key={index}
                        messageType="quote"
                        variant="inline"
                        className="bg-white text-blue-600 hover:bg-blue-50 px-8 h-11 rounded-md text-sm font-medium"
                      />
                    );
                  }
                  return (
                    <Button 
                      key={index}
                      size="lg" 
                      className="border-white text-white hover:bg-white hover:text-blue-600"
                      variant="outline"
                      onClick={scrollToOpenPositions}
                    >
                      {button.text}
                    </Button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <WhatsAppButton />
    </Layout>
  );
};

export default Careers;

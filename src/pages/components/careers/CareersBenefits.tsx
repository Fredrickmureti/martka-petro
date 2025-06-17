
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DollarSign, Users, Award, Clock, Briefcase } from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  DollarSign,
  Award,
  Clock,
  Users,
  Briefcase,
};

interface CareersBenefitsProps {
  whyWorkContent: any;
  benefitCards: any[];
  isLoadingContent: boolean;
  isLoadingCards: boolean;
}

export const CareersBenefits = ({ 
  whyWorkContent, 
  benefitCards, 
  isLoadingContent, 
  isLoadingCards 
}: CareersBenefitsProps) => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        {isLoadingContent ? (
          <>
            <Skeleton className="h-9 w-80 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-4">{whyWorkContent?.title}</h2>
            <p className="text-muted-foreground">{whyWorkContent?.description}</p>
          </>
        )}
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {isLoadingCards ? Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="text-center">
            <CardContent className="p-6">
              <Skeleton className="h-48 w-full" />
            </CardContent>
          </Card>
        )) : benefitCards.map((benefit, index) => {
          const IconComponent = benefit.icon ? iconMap[benefit.icon] || Users : Users;
          return (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent size={32} className="text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  </section>
);


import React from 'react';
import { MapPin, Clock, DollarSign, Users, Award, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { useCareers } from '@/hooks/useCareers';
import { useCareersContent, useCareersCards } from '@/hooks/useCareersManagement';
import { Skeleton } from '@/components/ui/skeleton';

const iconMap: { [key: string]: React.ElementType } = {
  DollarSign,
  Award,
  Clock,
  Users,
  Briefcase,
};

const Careers = () => {
  const { data: jobs = [], isLoading: isLoadingJobs } = useCareers();
  const { data: content, isLoading: isLoadingContent } = useCareersContent();
  const { data: cards, isLoading: isLoadingCards } = useCareersCards();

  const heroContent = content?.hero;
  const whyWorkContent = content?.why_work;
  const cultureContent = content?.culture;
  const ctaContent = content?.cta;

  const benefitCards = cards?.filter(card => card.card_type === 'benefit') || [];
  const statCards = cards?.filter(card => card.card_type === 'stat') || [];
  const cultureValues = (cultureContent?.content as any)?.values || [];
  const ctaButtons = (ctaContent?.content as any)?.buttons || [];

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
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            {isLoadingContent ? (
              <>
                <Skeleton className="h-16 w-3/4 mx-auto mb-6 bg-slate-700" />
                <Skeleton className="h-6 w-full mx-auto bg-slate-700" />
              </>
            ) : (
              <>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  {heroContent?.title?.split(' ').slice(0, -1).join(' ')}
                  <span className="block text-blue-400">{heroContent?.title?.split(' ').slice(-1)[0]}</span>
                </h1>
                <p className="text-xl text-slate-300 mb-8">
                  {heroContent?.description}
                </p>
              </>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View Open Positions
              </Button>
              <Button size="lg" variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
                Learn About Culture
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
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

      {/* Open Positions */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
            <p className="text-muted-foreground">Find your next opportunity with our growing team</p>
          </div>
          
          <div className="space-y-6 max-w-5xl mx-auto">
            {isLoadingJobs ? Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            )) : jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        {job.department && <Badge variant="outline">{job.department}</Badge>}
                        {job.location && (
                          <Badge variant="outline" className="text-blue-600">
                            <MapPin size={12} className="mr-1" />
                            {job.location}
                          </Badge>
                        )}
                        {job.type && (
                          <Badge variant="outline">
                            <Clock size={12} className="mr-1" />
                            {job.type}
                          </Badge>
                        )}
                        {job.experience_required && (
                          <Badge variant="outline">
                            <Briefcase size={12} className="mr-1" />
                            {job.experience_required}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {job.salary_range && (
                        <div className="text-lg font-bold text-blue-600 mb-2">{job.salary_range}</div>
                      )}
                      <Button className="bg-gradient-to-r from-blue-600 to-blue-700">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {job.description && (
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                  )}
                  {job.requirements && (
                    <div>
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {(job.requirements as string[]).map((req, reqIndex) => (
                          <li key={reqIndex} className="text-sm text-muted-foreground flex items-start">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-16 bg-background">
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
                {ctaButtons.map((button: any, index: number) => (
                  <Button 
                    key={index}
                    size="lg" 
                    className={button.type === 'primary' ? 
                      "bg-white text-blue-600 hover:bg-blue-50" : 
                      "border-white text-white hover:bg-white hover:text-blue-600"
                    }
                    variant={button.type === 'primary' ? 'default' : 'outline'}
                  >
                    {button.text}
                  </Button>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Careers;


import React from 'react';
import { MapPin, Clock, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import WhatsAppButton from '@/components/common/WhatsAppButton';

interface CareersPositionsProps {
  jobs: any[];
  isLoadingJobs: boolean;
  openPositionsRef: React.RefObject<HTMLElement>;
}

export const CareersPositions = ({ jobs, isLoadingJobs, openPositionsRef }: CareersPositionsProps) => (
  <section ref={openPositionsRef} className="py-16 bg-slate-50" id="open-positions">
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
        )) : jobs.length > 0 ? jobs.map((job) => (
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
                  <WhatsAppButton 
                    messageType="careers"
                    variant="inline"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  />
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
        )) : (
          <Card className="text-center py-16">
            <CardContent>
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Open Positions Right Now</h3>
                <p className="text-gray-600 mb-6">
                  We're not actively hiring at the moment, but we're always interested in connecting with talented professionals. 
                  Feel free to reach out and introduce yourself!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <WhatsAppButton 
                    messageType="careers"
                    variant="inline"
                    className="bg-green-500 hover:bg-green-600"
                  />
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    Email Your Resume
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  </section>
);

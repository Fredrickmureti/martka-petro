
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Star, Award, TrendingUp } from 'lucide-react';

interface StatsSectionProps {
  statsContent: {
    clientsTitle: string;
    clientsValue: string;
    clientsDescription: string;
    projectsTitle: string;
    projectsValue: string;
    projectsDescription: string;
    experienceTitle: string;
    experienceValue: string;
    experienceDescription: string;
    ratingTitle: string;
    ratingValue: string;
    ratingDescription: string;
  };
}

const StatsSection: React.FC<StatsSectionProps> = ({ statsContent }) => {
  return (
    <section className="py-20 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-blue-50/30 dark:from-slate-900/50 dark:to-blue-900/30"></div>
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="border border-border bg-card text-card-foreground shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer group">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold flex items-center gap-2 text-foreground">
                <TrendingUp className="text-green-500 transform group-hover:scale-125 transition-transform duration-300" size={24} />
                {statsContent.clientsTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600 transform group-hover:scale-110 transition-transform duration-300">{statsContent.clientsValue}</div>
              <p className="text-muted-foreground">{statsContent.clientsDescription}</p>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card text-card-foreground shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer group">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold flex items-center gap-2 text-foreground">
                <CheckCircle className="text-green-500 transform group-hover:scale-125 transition-transform duration-300" size={24} />
                {statsContent.projectsTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600 transform group-hover:scale-110 transition-transform duration-300">{statsContent.projectsValue}</div>
              <p className="text-muted-foreground">{statsContent.projectsDescription}</p>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card text-card-foreground shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer group">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold flex items-center gap-2 text-foreground">
                <Award className="text-green-500 transform group-hover:scale-125 transition-transform duration-300" size={24} />
                {statsContent.experienceTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600 transform group-hover:scale-110 transition-transform duration-300">{statsContent.experienceValue}</div>
              <p className="text-muted-foreground">{statsContent.experienceDescription}</p>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card text-card-foreground shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer group">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold flex items-center gap-2 text-foreground">
                <Star className="text-green-500 transform group-hover:scale-125 transition-transform duration-300" size={24} />
                {statsContent.ratingTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600 transform group-hover:scale-110 transition-transform duration-300">{statsContent.ratingValue}</div>
              <p className="text-muted-foreground">{statsContent.ratingDescription}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

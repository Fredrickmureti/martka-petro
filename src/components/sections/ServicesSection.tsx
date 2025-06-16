
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ServicesSectionProps {
  servicesContent: any;
  servicesBackground: any;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ servicesContent, servicesBackground }) => {
  return (
    <section 
      className="py-20 relative" 
      style={{ 
        backgroundImage: `linear-gradient(rgba(248, 250, 252, ${servicesBackground.overlay_opacity || 0.9}), rgba(241, 245, 249, ${servicesBackground.overlay_opacity || 0.9})), url("${servicesBackground.image_url || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-muted/30 dark:bg-background/80"></div>
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-semibold">
            {servicesContent.badge || "Our Services"}
          </Badge>
          <h2 className="text-4xl font-bold mt-4 text-foreground">
            {servicesContent.title || "Comprehensive Petroleum Solutions"}
          </h2>
          <p className="text-muted-foreground mt-3">
            {servicesContent.subtitle || "End-to-end petroleum infrastructure services for your business needs"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-card border border-border text-card-foreground shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer group">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground group-hover:text-blue-600 transition-colors duration-300">
                {servicesContent.service1Title || "Equipment Installation"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {servicesContent.service1Description || "Professional installation of petroleum equipment and infrastructure"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border text-card-foreground shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer group">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground group-hover:text-blue-600 transition-colors duration-300">
                {servicesContent.service2Title || "Maintenance & Support"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {servicesContent.service2Description || "Ongoing maintenance and technical support for optimal performance"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border text-card-foreground shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer group">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground group-hover:text-blue-600 transition-colors duration-300">
                {servicesContent.service3Title || "Consulting Services"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {servicesContent.service3Description || "Expert consulting for petroleum infrastructure projects"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

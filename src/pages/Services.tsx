
import React from 'react';
import { Building, Settings, Wrench, Shield, Zap, Headphones } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { useServices } from '@/hooks/useServices';

const iconMap = {
  Building,
  Settings,
  Wrench,
  Shield,
  Zap,
  Headphones,
};

const Services = () => {
  const { data: services = [], isLoading } = useServices();

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent || Settings;
  };

  const getFeaturesArray = (features: any): string[] => {
    if (Array.isArray(features)) {
      return features;
    }
    return [];
  };

  if (isLoading) {
    return (
      <Layout>
        <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Comprehensive Fuel
                <span className="block text-blue-400">Infrastructure Services</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8">Loading our services...</p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Comprehensive Fuel
              <span className="block text-blue-400">Infrastructure Services</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              From initial planning to ongoing maintenance, we provide end-to-end solutions 
              for all your petroleum infrastructure needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid gap-12">
            {services.map((service, index) => {
              const IconComponent = getIcon(service.icon || 'Settings');
              const featuresArray = getFeaturesArray(service.features);
              
              return (
                <Card key={service.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                    {/* Image */}
                    {service.image_url && (
                      <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                        <img 
                          src={service.image_url} 
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <CardHeader className="p-0 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-4">
                          <IconComponent size={32} className="text-white" />
                        </div>
                        <CardTitle className="text-3xl font-bold mb-4">{service.title}</CardTitle>
                      </CardHeader>
                      
                      <CardContent className="p-0">
                        {service.description && (
                          <p className="text-lg text-muted-foreground mb-6">{service.description}</p>
                        )}
                        
                        {featuresArray.length > 0 && (
                          <div className="space-y-2 mb-6">
                            {featuresArray.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <Button className="bg-gradient-to-r from-blue-600 to-blue-700">
                          Learn More
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a personalized consultation and detailed quote for your fuel infrastructure needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Get Free Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Download Brochure
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;


import React from 'react';
import { Building, Settings, Wrench, Shield, Zap, Headphones } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

const Services = () => {
  const services = [
    {
      icon: Building,
      title: 'Fuel Station Construction',
      description: 'Complete fuel station construction from ground up with modern, efficient designs that maximize operational efficiency and customer experience.',
      features: ['Site preparation and excavation', 'Underground storage tank installation', 'Canopy and building construction', 'Safety system integration', 'Environmental compliance'],
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop'
    },
    {
      icon: Zap,
      title: 'Fuel Dispenser Installation',
      description: 'Professional installation of state-of-the-art fuel dispensers with advanced payment systems and monitoring capabilities.',
      features: ['Multi-product dispensers', 'EMV payment integration', 'Real-time monitoring', 'Preventive maintenance', 'Compliance certification'],
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop'
    },
    {
      icon: Settings,
      title: 'Computer Kit & POS Systems',
      description: 'Advanced point-of-sale systems and computer kits designed specifically for fuel station operations and convenience stores.',
      features: ['Integrated POS solutions', 'Inventory management', 'Sales reporting', 'Customer loyalty programs', 'Cloud-based analytics'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop'
    },
    {
      icon: Wrench,
      title: 'Maintenance & Advisory Services',
      description: '24/7 maintenance services and expert consulting to ensure optimal performance and regulatory compliance of your fuel infrastructure.',
      features: ['Preventive maintenance', 'Emergency repairs', 'Compliance auditing', 'Performance optimization', 'Equipment upgrades'],
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop'
    },
    {
      icon: Shield,
      title: 'Custom Fuel Infrastructure Design',
      description: 'Tailored infrastructure solutions designed to meet specific operational requirements and environmental conditions.',
      features: ['Site analysis and planning', 'Custom engineering solutions', 'Environmental impact assessment', 'Regulatory approval assistance', 'Project management'],
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=400&fit=crop'
    },
    {
      icon: Headphones,
      title: 'Technical Support & Training',
      description: 'Comprehensive support services including operator training, technical documentation, and ongoing assistance.',
      features: ['Operator training programs', 'Technical documentation', 'Remote diagnostics', 'Software updates', 'Best practices consulting'],
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop'
    },
  ];

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
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  {/* Image */}
                  <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <CardHeader className="p-0 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-4">
                        <service.icon size={32} className="text-white" />
                      </div>
                      <CardTitle className="text-3xl font-bold mb-4">{service.title}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="p-0">
                      <p className="text-lg text-muted-foreground mb-6">{service.description}</p>
                      
                      <div className="space-y-2 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button className="bg-gradient-to-r from-blue-600 to-blue-700">
                        Learn More
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
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

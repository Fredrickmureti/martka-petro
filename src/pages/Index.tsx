
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building, Settings, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import AnimatedCounter from '@/components/ui/animated-counter';
import ProjectsOverview from '@/components/sections/ProjectsOverview';
import PopularProducts from '@/components/sections/PopularProducts';
import WhatsAppButton from '@/components/common/WhatsAppButton';

const Index = () => {
  const stats = [
    { number: 500, suffix: '+', label: 'Projects Completed' },
    { number: 150, suffix: '+', label: 'Active Installations' },
    { number: 25, suffix: '+', label: 'Years Experience' },
    { number: 98, suffix: '%', label: 'Client Satisfaction' },
  ];

  const services = [
    {
      icon: Building,
      title: 'Fuel Station Construction',
      description: 'Complete fuel station construction from ground up with state-of-the-art infrastructure.',
    },
    {
      icon: Settings,
      title: 'Equipment Installation',
      description: 'Professional installation of fuel dispensers, POS systems, and monitoring equipment.',
    },
    {
      icon: Users,
      title: 'Maintenance & Support',
      description: '24/7 maintenance services and technical support for all petroleum infrastructure.',
    },
  ];

  const features = [
    'State-of-the-art fuel management systems',
    'Advanced safety protocols and compliance',
    'Custom infrastructure design solutions',
    'Environmental protection measures',
    '24/7 technical support and monitoring',
    'Cost-effective and sustainable solutions',
  ];

  return (
    <Layout>
      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-500 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Powering the
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Future of Fuel
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            World-class petroleum infrastructure solutions. From fuel station construction 
            to advanced management systems, we deliver excellence that drives your business forward.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 py-6">
              Get Started Today
              <ArrowRight className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white text-lg px-8 py-6">
              View Our Work
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-slate-300 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Core Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive petroleum infrastructure solutions designed to meet the evolving needs of modern fuel operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <service.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/services">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700">
                Explore All Services
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Overview */}
      <ProjectsOverview />

      {/* Popular Products */}
      <PopularProducts />

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Why Industry Leaders Choose 
                <span className="block text-blue-600">Martka Petroleum</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                With over 25 years of experience, we've established ourselves as the premier choice for petroleum infrastructure solutions across North America.
              </p>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                    <span className="text-lg">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/about">
                  <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                    Learn More About Us
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white">
                <div className="h-full flex flex-col justify-center">
                  <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Fuel Infrastructure?</h3>
                  <p className="text-blue-100 mb-6">
                    Get a custom consultation and quote for your petroleum infrastructure project.
                  </p>
                  <Button className="bg-white text-blue-600 hover:bg-blue-50 w-fit">
                    Get Free Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

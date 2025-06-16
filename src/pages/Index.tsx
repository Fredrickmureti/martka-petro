
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Star, MapPin, Users, Award, TrendingUp } from 'lucide-react';
import PopularProducts from '@/components/sections/PopularProducts';
import ProjectsOverview from '@/components/sections/ProjectsOverview';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Index: React.FC = () => {
  const { data: pageContent } = useQuery({
    queryKey: ['pageContent', 'home'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('page', 'home');
      
      if (error) throw error;
      return data.reduce((acc, item) => {
        acc[item.element_id] = item.content;
        return acc;
      }, {} as Record<string, any>);
    }
  });

  const heroContent = pageContent?.hero || {};
  const servicesContent = pageContent?.services || {};
  const aboutContent = pageContent?.about || {};
  const statsContent = pageContent?.stats || {};

  // Fallback content
  const heroTitle = heroContent.title || "Advanced Petroleum Infrastructure Solutions";
  const heroSubtitle = heroContent.subtitle || "Leading provider of cutting-edge petroleum equipment and infrastructure solutions for the energy sector worldwide.";

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              {heroTitle.split(' ').slice(0, -2).join(' ')} 
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {heroTitle.split(' ').slice(-2).join(' ')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
              {heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <WhatsAppButton 
                messageType="quote"
                variant="inline"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
              />
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg"
              >
                Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <TrendingUp className="text-green-500" size={24} />
                  {statsContent.clientsTitle || "Happy Clients"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">{statsContent.clientsValue || "500+"}</div>
                <p className="text-muted-foreground">{statsContent.clientsDescription || "Satisfied customers worldwide"}</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={24} />
                  {statsContent.projectsTitle || "Projects Completed"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">{statsContent.projectsValue || "1000+"}</div>
                <p className="text-muted-foreground">{statsContent.projectsDescription || "Successfully delivered projects"}</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Award className="text-green-500" size={24} />
                  {statsContent.experienceTitle || "Years of Experience"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">{statsContent.experienceValue || "15+"}</div>
                <p className="text-muted-foreground">{statsContent.experienceDescription || "Industry experience and expertise"}</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Star className="text-green-500" size={24} />
                  {statsContent.ratingTitle || "Customer Rating"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">{statsContent.ratingValue || "4.9/5"}</div>
                <p className="text-muted-foreground">{statsContent.ratingDescription || "Average customer satisfaction rating"}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
              {servicesContent.badge || "Our Services"}
            </Badge>
            <h2 className="text-4xl font-bold mt-4">{servicesContent.title || "Comprehensive Petroleum Solutions"}</h2>
            <p className="text-muted-foreground mt-3">{servicesContent.subtitle || "End-to-end petroleum infrastructure services for your business needs"}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{servicesContent.service1Title || "Equipment Installation"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{servicesContent.service1Description || "Professional installation of petroleum equipment and infrastructure"}</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{servicesContent.service2Title || "Maintenance & Support"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{servicesContent.service2Description || "Ongoing maintenance and technical support for optimal performance"}</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{servicesContent.service3Title || "Consulting Services"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{servicesContent.service3Description || "Expert consulting for petroleum infrastructure projects"}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <PopularProducts />

      {/* Projects Section */}
      <ProjectsOverview />

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">{aboutContent.title || "About Martka Petroleum"}</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                {aboutContent.description || "We are a leading provider of petroleum infrastructure solutions with years of experience in the industry. Our commitment to quality and innovation drives us to deliver exceptional results for our clients worldwide."}
              </p>
              <div className="flex items-center gap-4">
                <MapPin className="text-blue-400" size={20} />
                <span className="text-slate-300">{aboutContent.location || "Global Operations"}</span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <Users className="text-blue-400" size={20} />
                <span className="text-slate-300">{aboutContent.employees || "Expert Team"}</span>
              </div>
            </div>
            <div>
              <img
                src={aboutContent.image || "/placeholder.svg"}
                alt="About Our Company"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Get in touch with our experts today and let's discuss how we can help you achieve your petroleum infrastructure goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <WhatsAppButton 
              messageType="quote"
              variant="inline"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
            />
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
              View Our Portfolio
            </Button>
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </Layout>
  );
};

export default Index;

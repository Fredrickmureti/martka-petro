
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
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();

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

  // Fetch stats from database
  const { data: statsData } = useQuery({
    queryKey: ['pageContent', 'stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('page', 'stats');
      
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
  
  // Use database stats with fallbacks
  const statsContent = {
    clientsTitle: statsData?.clients_title?.title || "Happy Clients",
    clientsValue: statsData?.clients_value?.value || "500+",
    clientsDescription: statsData?.clients_description?.description || "Satisfied customers worldwide",
    
    projectsTitle: statsData?.projects_title?.title || "Projects Completed",
    projectsValue: statsData?.projects_value?.value || "1000+",
    projectsDescription: statsData?.projects_description?.description || "Successfully delivered projects",
    
    experienceTitle: statsData?.experience_title?.title || "Years of Experience",
    experienceValue: statsData?.experience_value?.value || "15+",
    experienceDescription: statsData?.experience_description?.description || "Industry experience and expertise",
    
    ratingTitle: statsData?.rating_title?.title || "Customer Rating",
    ratingValue: statsData?.rating_value?.value || "4.9/5",
    ratingDescription: statsData?.rating_description?.description || "Average customer satisfaction rating"
  };

  // Fallback content
  const heroTitle = heroContent.title || "Advanced Petroleum Infrastructure Solutions";
  const heroSubtitle = heroContent.subtitle || "Leading provider of cutting-edge petroleum equipment and infrastructure solutions for the energy sector worldwide.";

  // Background images
  const heroBackground = pageContent?.hero_background || {};
  const servicesBackground = pageContent?.services_background || {};
  const projectsBackground = pageContent?.projects_background || {};
  const aboutBackground = pageContent?.about_background || {};

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 30px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotateX(0deg);
          }
          50% {
            transform: translateY(-10px) rotateX(2deg);
          }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .rotate-y-3 {
          transform: rotateY(3deg);
        }
        
        .rotate-y-6 {
          transform: rotateY(6deg);
        }
        
        .rotate-x-6 {
          transform: rotateX(6deg);
        }
        
        .translateZ-5 {
          transform: translateZ(5px);
        }
        
        .translateZ-10 {
          transform: translateZ(10px);
        }
        
        .translateZ-20 {
          transform: translateZ(20px);
        }
      `}</style>
      
      <Layout>
        {/* Hero Section with Background Image */}
        <section 
          className="relative pt-32 pb-20 text-white overflow-hidden perspective-1000"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, ${heroBackground.overlay_opacity || 0.7}), rgba(30, 64, 175, ${heroBackground.overlay_opacity || 0.7})), url("${heroBackground.image_url || 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81'}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Floating geometric shapes */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
            <div className="absolute top-40 right-20 w-16 h-16 bg-cyan-400/10 rounded-lg blur-lg animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
            <div className="absolute bottom-40 left-20 w-12 h-12 bg-blue-300/10 rounded-full blur-lg animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
          </div>
          
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center transform-gpu">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight transform hover:scale-105 transition-all duration-700 animate-fade-in" 
                  style={{ 
                    animation: 'fadeInUp 1s ease-out, float 6s ease-in-out infinite',
                    transform: 'translateZ(50px)'
                  }}>
                {heroTitle.split(' ').slice(0, -2).join(' ')} 
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent transform hover:scale-110 transition-transform duration-500" 
                      style={{ transform: 'translateZ(80px)' }}>
                  {heroTitle.split(' ').slice(-2).join(' ')}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed transform hover:scale-105 transition-all duration-500"
                 style={{ 
                   animation: 'fadeInUp 1s ease-out 0.3s both, float 8s ease-in-out infinite',
                   transform: 'translateZ(30px)'
                 }}>
                {heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                   style={{ animation: 'fadeInUp 1s ease-out 0.6s both' }}>
                <div className="transform hover:scale-110 hover:rotate-1 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50"
                     style={{ transform: 'translateZ(40px)' }}>
                  <WhatsAppButton 
                    messageType="quote"
                    variant="inline"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                  />
                </div>
                <div className="transform hover:scale-110 hover:-rotate-1 transition-all duration-300 hover:shadow-2xl"
                     style={{ transform: 'translateZ(40px)' }}>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-white/30 bg-white/10 text-white hover:bg-white hover:text-blue-900 backdrop-blur-sm px-8 py-4 text-lg font-semibold transition-all duration-300"
                    onClick={() => navigate('/services')}
                  >
                    Our Services
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        {/* Stats Section with Enhanced Background */}
        <section className="py-20 bg-background relative" style={{ perspective: '1000px' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-blue-50/30 dark:from-slate-900/50 dark:to-blue-900/30"></div>
          <div className="container mx-auto px-6 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border border-border bg-card text-card-foreground shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-y-6 hover:-translate-y-4 cursor-pointer group"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      animation: 'fadeInUp 0.8s ease-out 0.1s both'
                    }}>
                <CardHeader className="space-y-2 transform group-hover:translateZ-20">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2 text-foreground">
                    <TrendingUp className="text-green-500 transform group-hover:scale-125 transition-transform duration-300" size={24} />
                    {statsContent.clientsTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="transform group-hover:translateZ-10">
                  <div className="text-4xl font-bold text-blue-600 transform group-hover:scale-110 transition-transform duration-300">{statsContent.clientsValue}</div>
                  <p className="text-muted-foreground">{statsContent.clientsDescription}</p>
                </CardContent>
              </Card>

              <Card className="border border-border bg-card text-card-foreground shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-y-6 hover:-translate-y-4 cursor-pointer group"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      animation: 'fadeInUp 0.8s ease-out 0.2s both'
                    }}>
                <CardHeader className="space-y-2 transform group-hover:translateZ-20">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2 text-foreground">
                    <CheckCircle className="text-green-500 transform group-hover:scale-125 transition-transform duration-300" size={24} />
                    {statsContent.projectsTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="transform group-hover:translateZ-10">
                  <div className="text-4xl font-bold text-blue-600 transform group-hover:scale-110 transition-transform duration-300">{statsContent.projectsValue}</div>
                  <p className="text-muted-foreground">{statsContent.projectsDescription}</p>
                </CardContent>
              </Card>

              <Card className="border border-border bg-card text-card-foreground shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-y-6 hover:-translate-y-4 cursor-pointer group"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      animation: 'fadeInUp 0.8s ease-out 0.3s both'
                    }}>
                <CardHeader className="space-y-2 transform group-hover:translateZ-20">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2 text-foreground">
                    <Award className="text-green-500 transform group-hover:scale-125 transition-transform duration-300" size={24} />
                    {statsContent.experienceTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="transform group-hover:translateZ-10">
                  <div className="text-4xl font-bold text-blue-600 transform group-hover:scale-110 transition-transform duration-300">{statsContent.experienceValue}</div>
                  <p className="text-muted-foreground">{statsContent.experienceDescription}</p>
                </CardContent>
              </Card>

              <Card className="border border-border bg-card text-card-foreground shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-y-6 hover:-translate-y-4 cursor-pointer group"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      animation: 'fadeInUp 0.8s ease-out 0.4s both'
                    }}>
                <CardHeader className="space-y-2 transform group-hover:translateZ-20">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2 text-foreground">
                    <Star className="text-green-500 transform group-hover:scale-125 transition-transform duration-300" size={24} />
                    {statsContent.ratingTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="transform group-hover:translateZ-10">
                  <div className="text-4xl font-bold text-blue-600 transform group-hover:scale-110 transition-transform duration-300">{statsContent.ratingValue}</div>
                  <p className="text-muted-foreground">{statsContent.ratingDescription}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        {/* Services Section with Background */}
        <section 
          className="py-20 relative" 
          style={{ 
            perspective: '1200px',
            backgroundImage: `linear-gradient(rgba(248, 250, 252, ${servicesBackground.overlay_opacity || 0.9}), rgba(241, 245, 249, ${servicesBackground.overlay_opacity || 0.9})), url("${servicesBackground.image_url || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-muted/30 dark:bg-background/80"></div>
          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-16 transform hover:scale-105 transition-all duration-500">
              <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-semibold transform hover:scale-110 transition-transform duration-300">
                {servicesContent.badge || "Our Services"}
              </Badge>
              <h2 className="text-4xl font-bold mt-4 text-foreground transform hover:scale-105 transition-all duration-500" 
                  style={{ animation: 'fadeInUp 0.8s ease-out' }}>
                {servicesContent.title || "Comprehensive Petroleum Solutions"}
              </h2>
              <p className="text-muted-foreground mt-3 transform hover:scale-105 transition-all duration-300">
                {servicesContent.subtitle || "End-to-end petroleum infrastructure services for your business needs"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-card border border-border text-card-foreground shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-x-6 hover:-translate-y-6 cursor-pointer group"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      animation: 'fadeInUp 0.8s ease-out 0.1s both'
                    }}>
                <CardHeader className="transform group-hover:translateZ-20">
                  <CardTitle className="text-xl font-semibold text-foreground group-hover:text-blue-600 transition-colors duration-300">
                    {servicesContent.service1Title || "Equipment Installation"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="transform group-hover:translateZ-10">
                  <p className="text-muted-foreground">
                    {servicesContent.service1Description || "Professional installation of petroleum equipment and infrastructure"}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border text-card-foreground shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-x-6 hover:-translate-y-6 cursor-pointer group"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      animation: 'fadeInUp 0.8s ease-out 0.2s both'
                    }}>
                <CardHeader className="transform group-hover:translateZ-20">
                  <CardTitle className="text-xl font-semibold text-foreground group-hover:text-blue-600 transition-colors duration-300">
                    {servicesContent.service2Title || "Maintenance & Support"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="transform group-hover:translateZ-10">
                  <p className="text-muted-foreground">
                    {servicesContent.service2Description || "Ongoing maintenance and technical support for optimal performance"}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border text-card-foreground shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-x-6 hover:-translate-y-6 cursor-pointer group"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      animation: 'fadeInUp 0.8s ease-out 0.3s both'
                    }}>
                <CardHeader className="transform group-hover:translateZ-20">
                  <CardTitle className="text-xl font-semibold text-foreground group-hover:text-blue-600 transition-colors duration-300">
                    {servicesContent.service3Title || "Consulting Services"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="transform group-hover:translateZ-10">
                  <p className="text-muted-foreground">
                    {servicesContent.service3Description || "Expert consulting for petroleum infrastructure projects"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        {/* Products Section with Background */}
        <div 
          className="transform hover:scale-[1.02] transition-transform duration-700 relative"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, ${projectsBackground.overlay_opacity || 0.95}), rgba(255, 255, 255, ${projectsBackground.overlay_opacity || 0.95})), url("${projectsBackground.image_url || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c'}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-background/50 dark:bg-background/90"></div>
          <div className="relative">
            <PopularProducts />
          </div>
        </div>

        {/* Section Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        {/* Projects Section */}
        <div className="transform hover:scale-[1.02] transition-transform duration-700">
          <ProjectsOverview />
        </div>

        {/* Section Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        {/* About Section with Background Image */}
        <section 
          className="py-20 text-white relative" 
          style={{ 
            perspective: '1000px',
            backgroundImage: `linear-gradient(rgba(15, 23, 42, ${aboutBackground.overlay_opacity || 0.8}), rgba(30, 64, 175, ${aboutBackground.overlay_opacity || 0.8})), url("${aboutBackground.image_url || 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05'}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="container mx-auto px-6 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="transform hover:scale-105 hover:rotate-y-3 transition-all duration-700" 
                   style={{ transformStyle: 'preserve-3d' }}>
                <h2 className="text-4xl font-bold mb-6 transform hover:translateZ-10 transition-all duration-500">
                  {aboutContent.title || "About Martka Petroleum"}
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-8 transform hover:translateZ-5 transition-all duration-500">
                  {aboutContent.description || "We are a leading provider of petroleum infrastructure solutions with years of experience in the industry. Our commitment to quality and innovation drives us to deliver exceptional results for our clients worldwide."}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-4 transform hover:translateX-4 transition-transform duration-300">
                    <MapPin className="text-blue-400 transform hover:scale-125 transition-transform duration-300" size={20} />
                    <span className="text-slate-300">{aboutContent.location || "Global Operations"}</span>
                  </div>
                  <div className="flex items-center gap-4 transform hover:translateX-4 transition-transform duration-300">
                    <Users className="text-blue-400 transform hover:scale-125 transition-transform duration-300" size={20} />
                    <span className="text-slate-300">{aboutContent.employees || "Expert Team"}</span>
                  </div>
                </div>
              </div>
              <div className="transform hover:scale-105 hover:rotate-y-6 transition-all duration-700 hover:shadow-2xl">
                <img
                  src={aboutContent.image || "/placeholder.svg"}
                  alt="About Our Company"
                  className="rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-500"
                  style={{ transformStyle: 'preserve-3d' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* CTA Section with Enhanced Styling */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden" style={{ perspective: '1000px' }}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
          <div className="container mx-auto px-6 text-center relative">
            <h2 className="text-4xl font-bold mb-6 transform hover:scale-110 hover:rotate-y-3 transition-all duration-500" 
                style={{ transformStyle: 'preserve-3d' }}>
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto transform hover:scale-105 transition-transform duration-500">
              Get in touch with our experts today and let's discuss how we can help you achieve your petroleum infrastructure goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <div className="transform hover:scale-110 hover:rotate-3 transition-all duration-300 hover:shadow-2xl">
                <WhatsAppButton 
                  messageType="quote"
                  variant="inline"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
                />
              </div>
              <div className="transform hover:scale-110 hover:-rotate-3 transition-all duration-300">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                  View Our Portfolio
                </Button>
              </div>
            </div>
          </div>
        </section>

        <WhatsAppButton />
      </Layout>
    </>
  );
};

export default Index;

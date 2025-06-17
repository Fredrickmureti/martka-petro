
import React from 'react';
import Layout from '@/components/layout/Layout';
import PopularProducts from '@/components/sections/PopularProducts';
import ProjectsOverview from '@/components/sections/ProjectsOverview';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import CTASection from '@/components/sections/CTASection';
import SectionSeparator from '@/components/common/SectionSeparator';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useSEO } from '@/hooks/useSEO';

const Index: React.FC = () => {
  // SEO optimization for home page
  useSEO({
    title: 'Martka Petroleum - Leading Petroleum Equipment & Fuel Station Construction Company in Kenya',
    description: 'Martka Petroleum is Kenya\'s premier petroleum equipment supplier specializing in fuel dispensers (manual & digital), underground storage tanks, fuel pipeline systems, automation systems, calibration services, and turnkey fuel station construction.',
    keywords: [
      'petroleum equipment suppliers Kenya',
      'fuel station construction company',
      'fuel dispensers Kenya',
      'digital fuel pump',
      'manual fuel dispensers',
      'diesel tank installation',
      'underground fuel storage tanks',
      'above ground storage tanks',
      'fuel pipeline contractors',
      'calibration of fuel dispensers',
      'fuel automation system providers',
      'petroleum infrastructure company',
      'martka petroleum',
      'marka petroleum',
      'martka petro',
      'marka petro',
      'martka fuel systems',
      'maka petro',
      'martka fuel pumps',
      'martka petrol machines',
      'fuel management systems',
      'pump island installation',
      'canopy installations',
      'turnkey fuel stations',
      'petroleum site infrastructure',
      'fuel equipment maintenance'
    ],
    type: 'website',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Martka Petroleum',
      alternateName: ['Marka Petroleum', 'Martka Petro', 'Marka Petro'],
      description: 'Leading petroleum equipment supplier and fuel station construction company in Kenya',
      url: 'https://martka-petroleum.com',
      logo: 'https://martka-petroleum.com/logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+254-700-000-000',
        contactType: 'customer service',
        areaServed: 'KE',
        availableLanguage: ['English', 'Swahili']
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'KE',
        addressRegion: 'Nairobi'
      },
      sameAs: [
        'https://www.facebook.com/martkapetroleum',
        'https://www.linkedin.com/company/martka-petroleum',
        'https://twitter.com/martkapetroleum'
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Petroleum Equipment & Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Fuel Dispensing Pumps',
              description: 'Manual and digital fuel dispensers for petrol stations'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Underground Storage Tanks',
              description: 'Underground and above-ground fuel storage tank systems'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Fuel Station Construction',
              description: 'Turnkey construction of complete fuel stations'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Fuel Pipeline Installation',
              description: 'Fuel pipeline systems and installations'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Equipment Calibration',
              description: 'Calibration and maintenance of fuel equipment'
            }
          }
        ]
      }
    }
  });

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

  // Background images
  const heroBackground = pageContent?.hero_background || {};
  const servicesBackground = pageContent?.services_background || {};
  const projectsBackground = pageContent?.projects_background || {};
  const aboutBackground = pageContent?.about_background || {};

  return (
    <Layout>
      <div className="smooth-scroll-container">
        <HeroSection heroContent={heroContent} heroBackground={heroBackground} />
        <SectionSeparator />
        
        <StatsSection statsContent={statsContent} />
        <SectionSeparator />
        
        <ServicesSection servicesContent={servicesContent} servicesBackground={servicesBackground} />
        <SectionSeparator />
        
        {/* Products Section with Background */}
        <div 
          className="relative bg-fixed-optimized"
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
        <SectionSeparator />
        
        {/* Projects Section */}
        <div>
          <ProjectsOverview />
        </div>
        <SectionSeparator />
        
        <AboutSection aboutBackground={aboutBackground} />
        <SectionSeparator />
        
        <CTASection />

        <WhatsAppButton />
      </div>
    </Layout>
  );
};

export default Index;

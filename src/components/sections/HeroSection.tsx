
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import WhatsAppButton from '@/components/common/WhatsAppButton';

interface HeroSectionProps {
  heroContent: any;
  heroBackground: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroContent, heroBackground }) => {
  const navigate = useNavigate();
  
  const heroTitle = heroContent.title || "Advanced Petroleum Infrastructure Solutions";
  const heroSubtitle = heroContent.subtitle || "Leading provider of cutting-edge petroleum equipment and infrastructure solutions for the energy sector worldwide.";

  return (
    <section 
      className="relative pt-32 pb-20 text-white overflow-hidden"
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
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight transition-all duration-700">
            {heroTitle.split(' ').slice(0, -2).join(' ')} 
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {heroTitle.split(' ').slice(-2).join(' ')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
            {heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="transform hover:scale-110 transition-all duration-300">
              <WhatsAppButton 
                messageType="quote"
                variant="inline"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-2xl transition-all duration-300"
              />
            </div>
            <div className="transform hover:scale-110 transition-all duration-300">
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
  );
};

export default HeroSection;


import React from 'react';
import { MapPin, Users } from 'lucide-react';

interface AboutSectionProps {
  aboutContent: any;
  aboutBackground: any;
}

const AboutSection: React.FC<AboutSectionProps> = ({ aboutContent, aboutBackground }) => {
  return (
    <section 
      className="py-20 text-white relative" 
      style={{ 
        backgroundImage: `linear-gradient(rgba(15, 23, 42, ${aboutBackground.overlay_opacity || 0.8}), rgba(30, 64, 175, ${aboutBackground.overlay_opacity || 0.8})), url("${aboutBackground.image_url || 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05'}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              {aboutContent.title || "About Martka Petroleum"}
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              {aboutContent.description || "We are a leading provider of petroleum infrastructure solutions with years of experience in the industry. Our commitment to quality and innovation drives us to deliver exceptional results for our clients worldwide."}
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <MapPin className="text-blue-400" size={20} />
                <span className="text-slate-300">{aboutContent.location || "Global Operations"}</span>
              </div>
              <div className="flex items-center gap-4">
                <Users className="text-blue-400" size={20} />
                <span className="text-slate-300">{aboutContent.employees || "Expert Team"}</span>
              </div>
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
  );
};

export default AboutSection;

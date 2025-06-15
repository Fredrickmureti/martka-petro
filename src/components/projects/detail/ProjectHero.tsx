
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types/project';

interface ProjectHeroProps {
  project: Project;
}

const ProjectHero = ({ project }: ProjectHeroProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Ongoing': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Planning': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const heroImage = project.images.find(img => img.type === 'hero') || project.images[0];

  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
      <div className="container mx-auto px-6">
        <Link to="/projects" className="inline-flex items-center text-blue-300 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="mr-2" size={20} />
          Back to Projects
        </Link>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Badge className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                {project.year}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            
            <div className="flex items-center text-blue-300 mb-6">
              <MapPin size={20} className="mr-2" />
              <span className="text-lg">{project.location}</span>
            </div>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              {project.longDescription || project.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="border-blue-300 text-blue-300">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          {heroImage && (
            <div className="relative">
              <img 
                src={heroImage.url} 
                alt={heroImage.alt}
                className="rounded-lg shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
                <p className="text-white text-sm">{heroImage.alt}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectHero;

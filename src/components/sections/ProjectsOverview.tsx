
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { fetchPublicProjects } from '@/lib/projects';
import { Project } from '@/types/project';
import { Skeleton } from '@/components/ui/skeleton';

const ProjectsOverview = () => {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['publicProjects'],
    queryFn: fetchPublicProjects
  });

  const featuredProjects = projects?.slice(0, 3) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderSkeletons = () => (
    <div className="grid md:grid-cols-3 gap-8 mb-12">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="group overflow-hidden">
            <Skeleton className="w-full h-48" />
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <Skeleton className="h-10 w-full" />
            </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore some of our most successful petroleum infrastructure projects across North America.
          </p>
        </div>

        {isLoading ? renderSkeletons() : (
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project) => {
              const heroImage = project.images.find(img => img.type === 'hero') || project.images[0];
              return(
                <Card key={project.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative">
                    <img 
                      src={heroImage?.url || '/placeholder.svg'}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin size={14} className="mr-1" />
                      <span className="mr-4">{project.location}</span>
                      <Calendar size={14} className="mr-1" />
                      <span>{project.year}</span>
                    </div>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    
                    <Link to={`/projects/${project.slug}`}>
                      <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        <div className="text-center">
          <Link to="/projects">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700">
              View All Projects
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsOverview;

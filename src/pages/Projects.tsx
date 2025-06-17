
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { useQuery } from '@tanstack/react-query';
import { fetchPublicProjects } from '@/lib/projects';
import { Skeleton } from '@/components/ui/skeleton';
import { Project } from '@/types/project';
import { useSEO } from '@/hooks/useSEO';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // SEO optimization for projects page
  useSEO({
    title: 'Petroleum Infrastructure Projects - Fuel Station Construction | Martka Petroleum',
    description: 'Explore our portfolio of successful petroleum infrastructure projects including fuel station construction, pipeline installations, storage tank systems, and turnkey petroleum facilities across Kenya and East Africa.',
    keywords: [
      'petroleum infrastructure projects',
      'fuel station construction projects',
      'pipeline installation projects',
      'storage tank projects',
      'turnkey fuel stations',
      'petroleum engineering projects',
      'martka petroleum projects',
      'fuel infrastructure Kenya',
      'petroleum construction company',
      'fuel station developers'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Petroleum Infrastructure Projects',
      description: 'Portfolio of successful petroleum infrastructure and fuel station construction projects',
      provider: {
        '@type': 'Organization',
        name: 'Martka Petroleum'
      }
    }
  });

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['publicProjects'],
    queryFn: fetchPublicProjects
  });

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'construction', label: 'Construction' },
    { id: 'installation', label: 'Installation' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'infrastructure', label: 'Infrastructure' },
  ];

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    if (activeFilter === 'all') return projects;
    return projects.filter(p => p.category === activeFilter);
  }, [projects, activeFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Ongoing': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Planning': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderSkeletons = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
            <Skeleton className="w-full h-48" />
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
        </Card>
      ))}
    </div>
  );

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects' }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <Breadcrumbs items={breadcrumbItems} className="mb-8 text-white [&_a]:text-blue-200 [&_a:hover]:text-white" />
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Project
              <span className="block text-blue-400">Portfolio</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Explore our comprehensive portfolio of successful fuel infrastructure projects 
              across North America.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className={activeFilter === filter.id ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          {isLoading ? renderSkeletons() : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project: Project) => {
                const heroImage = project.images.find(img => img.type === 'hero') || project.images[0];
                
                return (
                  <Card key={project.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative">
                      <img 
                        src={heroImage?.url || '/placeholder.svg'} 
                        alt={`${project.title} - ${project.category} project by Martka Petroleum`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-black/50 text-white border-none">
                          {project.year}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm text-blue-600 mb-2">{project.location}</p>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Link to={`/projects/${project.slug}`}>
                        <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-muted-foreground">Projects Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-muted-foreground">Active Installations</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;

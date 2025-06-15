
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'construction', label: 'Construction' },
    { id: 'installation', label: 'Installation' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'infrastructure', label: 'Infrastructure' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Metro City Fuel Complex',
      category: 'construction',
      location: 'Houston, TX',
      status: 'Completed',
      year: '2024',
      description: 'Complete fuel station construction with 12 dispensers and modern convenience store.',
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop',
      tags: ['Construction', 'POS Systems', 'Environmental Compliance']
    },
    {
      id: 2,
      title: 'Highway Express Station',
      category: 'installation',
      location: 'Dallas, TX',
      status: 'Completed',
      year: '2024',
      description: 'Advanced dispenser installation with EMV payment systems and real-time monitoring.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
      tags: ['Installation', 'EMV Systems', 'Monitoring']
    },
    {
      id: 3,
      title: 'Green Valley Infrastructure',
      category: 'infrastructure',
      location: 'Austin, TX',
      status: 'In Progress',
      year: '2024',
      description: 'Custom fuel infrastructure design for environmentally sensitive location.',
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=400&fit=crop',
      tags: ['Infrastructure', 'Environmental', 'Custom Design']
    },
    {
      id: 4,
      title: 'Interstate Service Center',
      category: 'construction',
      location: 'San Antonio, TX',
      status: 'Completed',
      year: '2023',
      description: 'Large-scale service center with multiple fuel islands and truck facilities.',
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop',
      tags: ['Construction', 'Commercial', 'Truck Facilities']
    },
    {
      id: 5,
      title: 'Urban Quick Stop',
      category: 'maintenance',
      location: 'Fort Worth, TX',
      status: 'Ongoing',
      year: '2024',
      description: 'Complete maintenance overhaul and system upgrades for urban fuel station.',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
      tags: ['Maintenance', 'Upgrades', 'Urban']
    },
    {
      id: 6,
      title: 'Regional Distribution Hub',
      category: 'infrastructure',
      location: 'El Paso, TX',
      status: 'Planning',
      year: '2024',
      description: 'Major fuel distribution infrastructure with advanced logistics systems.',
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=400&fit=crop',
      tags: ['Infrastructure', 'Distribution', 'Logistics']
    },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Ongoing': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Planning': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
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
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
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

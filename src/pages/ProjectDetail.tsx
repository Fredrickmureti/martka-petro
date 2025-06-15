
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users, DollarSign, Square, CheckCircle, Clock, Target } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getProjectBySlug } from '@/data/projects';
import ProjectGallery from '@/components/projects/ProjectGallery';
import ProjectTimeline from '@/components/projects/ProjectTimeline';
import ProjectSpecifications from '@/components/projects/ProjectSpecifications';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Link to="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </Layout>
    );
  }

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
    <Layout>
      {/* Hero Section */}
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
                {project.longDescription}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="border-blue-300 text-blue-300">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage.url} 
                alt={heroImage.caption}
                className="rounded-lg shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
                <p className="text-white text-sm">{heroImage.caption}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-8 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center">
              <Users className="text-blue-600 mr-3" size={24} />
              <div>
                <div className="font-semibold">Client</div>
                <div className="text-muted-foreground">{project.client}</div>
              </div>
            </div>
            
            {project.budget && (
              <div className="flex items-center">
                <DollarSign className="text-blue-600 mr-3" size={24} />
                <div>
                  <div className="font-semibold">Budget</div>
                  <div className="text-muted-foreground">{project.budget}</div>
                </div>
              </div>
            )}
            
            {project.area && (
              <div className="flex items-center">
                <Square className="text-blue-600 mr-3" size={24} />
                <div>
                  <div className="font-semibold">Area</div>
                  <div className="text-muted-foreground">{project.area}</div>
                </div>
              </div>
            )}
            
            <div className="flex items-center">
              <Calendar className="text-blue-600 mr-3" size={24} />
              <div>
                <div className="font-semibold">Year</div>
                <div className="text-muted-foreground">{project.year}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Gallery */}
              <ProjectGallery images={project.images} />
              
              {/* Timeline */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Project Timeline</h2>
                <ProjectTimeline timeline={project.timeline} />
              </div>
              
              {/* Case Study */}
              <div className="grid md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-orange-600">
                      <Target className="mr-2" size={20} />
                      Challenges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="text-sm">{challenge}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-600">
                      <Clock className="mr-2" size={20} />
                      Solutions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {project.solutions.map((solution, index) => (
                        <li key={index} className="text-sm">{solution}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-600">
                      <CheckCircle className="mr-2" size={20} />
                      Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {project.results.map((result, index) => (
                        <li key={index} className="text-sm">{result}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-8">
              {/* Specifications */}
              <ProjectSpecifications specifications={project.specifications} />
              
              {/* Team Members */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.teamMembers.map((member, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-semibold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Testimonial */}
              {project.testimonial && (
                <Card>
                  <CardHeader>
                    <CardTitle>Client Testimonial</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="italic text-muted-foreground mb-4">
                      "{project.testimonial.quote}"
                    </blockquote>
                    <div>
                      <div className="font-semibold">{project.testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {project.testimonial.position}, {project.testimonial.company}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;

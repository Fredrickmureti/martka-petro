
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { fetchPublicProjectBySlug } from '@/lib/projects';
import ProjectGallery from '@/components/projects/ProjectGallery';
import ProjectTimeline from '@/components/projects/ProjectTimeline';
import ProjectSpecifications from '@/components/projects/ProjectSpecifications';
import { useQuery } from '@tanstack/react-query';
import { Project } from '@/types/project';
import ProjectHero from '@/components/projects/detail/ProjectHero';
import ProjectQuickFacts from '@/components/projects/detail/ProjectQuickFacts';
import ProjectCaseStudy from '@/components/projects/detail/ProjectCaseStudy';
import ProjectTeam from '@/components/projects/detail/ProjectTeam';
import ProjectTestimonial from '@/components/projects/detail/ProjectTestimonial';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: project, isLoading, error } = useQuery<Project | null>({
    queryKey: ['project', slug],
    queryFn: () => (slug ? fetchPublicProjectBySlug(slug) : null),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-32 flex justify-center items-center">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (error || !project) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist or there was an error loading it.</p>
          <Link to="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProjectHero project={project} />

      <ProjectQuickFacts project={project} />

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-12">
              <ProjectGallery images={project.images} />
              
              <div>
                <h2 className="text-3xl font-bold mb-6">Project Timeline</h2>
                <ProjectTimeline timeline={project.timeline} />
              </div>
              
              <ProjectCaseStudy 
                challenges={project.challenges}
                solutions={project.solutions}
                results={project.results}
              />
            </div>
            
            {/* Right Column */}
            <div className="space-y-8">
              <ProjectSpecifications specifications={project.specifications} />
              <ProjectTeam teamMembers={project.teamMembers} />
              <ProjectTestimonial testimonial={project.testimonial} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;

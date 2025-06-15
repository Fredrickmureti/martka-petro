
import React from 'react';
import { Calendar, Users, DollarSign, Square } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectQuickFactsProps {
  project: Pick<Project, 'client' | 'budget' | 'area' | 'year'>;
}

const ProjectQuickFacts = ({ project }: ProjectQuickFactsProps) => {
  return (
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
              <div className="text-muted-foreground">{project.year.toString()}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectQuickFacts;

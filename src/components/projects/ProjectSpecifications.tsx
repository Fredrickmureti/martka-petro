
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectSpecification } from '@/types/project';

interface ProjectSpecificationsProps {
  specifications: ProjectSpecification[];
}

const ProjectSpecifications = ({ specifications }: ProjectSpecificationsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Specifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {specifications.map((spec, index) => (
          <div key={index} className="flex justify-between items-start py-2 border-b last:border-b-0">
            <span className="text-sm text-muted-foreground flex-1">{spec.name}:</span>
            <span className="text-sm font-medium text-right ml-2">{spec.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProjectSpecifications;

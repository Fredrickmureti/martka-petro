
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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
      <CardContent className="space-y-6">
        {specifications.map((spec, index) => (
          <div key={index}>
            <h4 className="font-semibold mb-3 text-blue-600">{spec.category}</h4>
            <div className="space-y-2">
              {spec.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex justify-between items-start">
                  <span className="text-sm text-muted-foreground flex-1">{item.label}:</span>
                  <span className="text-sm font-medium text-right ml-2">{item.value}</span>
                </div>
              ))}
            </div>
            {index < specifications.length - 1 && <Separator className="mt-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProjectSpecifications;

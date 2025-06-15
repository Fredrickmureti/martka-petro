
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Clock, CheckCircle } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectCaseStudyProps {
  challenges: Project['challenges'];
  solutions: Project['solutions'];
  results: Project['results'];
}

const ProjectCaseStudy = ({ challenges, solutions, results }: ProjectCaseStudyProps) => {
  if (!challenges || challenges.length === 0) {
    return null;
  }

  return (
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
            {challenges.map((challenge, index) => (
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
            {solutions?.map((solution, index) => (
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
            {results?.map((result, index) => (
              <li key={index} className="text-sm">{result}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectCaseStudy;

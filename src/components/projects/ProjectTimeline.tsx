
import React from 'react';
import { CheckCircle, Clock, Circle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProjectTimeline as TimelineType } from '@/types/project';

interface ProjectTimelineProps {
  timeline: TimelineType[];
}

const ProjectTimeline = ({ timeline }: ProjectTimelineProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="text-green-600" size={20} />;
      case 'in-progress': return <Clock className="text-blue-600" size={20} />;
      case 'planned': return <Circle className="text-gray-400" size={20} />;
      default: return <Circle className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planned': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {timeline.map((phase, index) => (
        <Card key={index} className="relative">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(phase.status)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{phase.phase}</h3>
                  <Badge className={getStatusColor(phase.status)}>
                    {phase.status.charAt(0).toUpperCase() + phase.status.slice(1).replace('-', ' ')}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground mb-3">{phase.description}</p>
                
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Duration:</span> {formatDate(phase.startDate)} - {formatDate(phase.endDate)}
                </div>
              </div>
            </div>
          </CardContent>
          
          {/* Connecting Line */}
          {index < timeline.length - 1 && (
            <div className="absolute left-[34px] bottom-0 w-0.5 h-4 bg-border" />
          )}
        </Card>
      ))}
    </div>
  );
};

export default ProjectTimeline;

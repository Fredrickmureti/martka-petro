
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Project } from '@/types/project';

interface ProjectTestimonialProps {
  testimonial: Project['testimonial'];
}

const ProjectTestimonial = ({ testimonial }: ProjectTestimonialProps) => {
  if (!testimonial) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Testimonial</CardTitle>
      </CardHeader>
      <CardContent>
        <blockquote className="italic text-muted-foreground mb-4">
          "{testimonial.quote}"
        </blockquote>
        <div>
          <div className="font-semibold">{testimonial.author}</div>
          <div className="text-sm text-muted-foreground">
            {testimonial.position}, {testimonial.company}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectTestimonial;


export interface ProjectImage {
  id: string;
  url: string;
  caption: string;
  type: 'hero' | 'gallery' | 'technical' | 'progress';
}

export interface ProjectSpecification {
  category: string;
  items: {
    label: string;
    value: string;
  }[];
}

export interface ProjectTimeline {
  phase: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface ProjectTeamMember {
  name: string;
  role: string;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'construction' | 'installation' | 'maintenance' | 'infrastructure';
  location: string;
  status: 'Completed' | 'In Progress' | 'Ongoing' | 'Planning';
  year: string;
  description: string;
  longDescription: string;
  images: ProjectImage[];
  tags: string[];
  specifications: ProjectSpecification[];
  timeline: ProjectTimeline[];
  teamMembers: ProjectTeamMember[];
  client: string;
  budget?: string;
  area?: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    company: string;
  };
}

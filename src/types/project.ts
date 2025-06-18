
export interface ProjectImage {
  url: string;
  alt: string;
  type: 'hero' | 'gallery' | 'technical' | 'progress';
}

export interface ProjectVideo {
  url: string;
  alt: string;
  type?: 'video' | 'youtube' | 'vimeo';
}

export interface ProjectSpecification {
  name: string;
  value: string;
}

export interface ProjectTimeline {
  date: string;
  description: string;
  status: 'completed' | 'in_progress' | 'planned';
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  location: string;
  year: number;
  status: 'Completed' | 'In Progress' | 'Ongoing' | 'Planning';
  category: 'construction' | 'installation' | 'maintenance' | 'infrastructure';
  tags: string[];
  images: ProjectImage[];
  videos?: ProjectVideo[];
  specifications: ProjectSpecification[];
  timeline: ProjectTimeline[];
  // Optional fields from mock data, not in Supabase
  longDescription?: string;
  client?: string;
  budget?: string;
  area?: string;
  teamMembers?: { name: string; role: string; }[];
  challenges?: string[];
  solutions?: string[];
  results?: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    company: string;
  };
}

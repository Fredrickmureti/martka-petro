
export interface ProjectImage {
  url: string;
  alt: string;
  type: 'hero' | 'gallery';
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
  specifications: ProjectSpecification[];
  timeline: ProjectTimeline[];
}

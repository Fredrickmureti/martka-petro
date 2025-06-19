
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { Project, ProjectImage, ProjectSpecification, ProjectVideo } from '@/types/project';

export type SupabaseProject = Tables<'projects'>;

export const mapSupabaseProjectToAppProject = (p: any): Project => {
  const gallery = (p.gallery_images as { url: string; alt: string }[]) || [];
  const rawVideos = (p.project_videos as { url: string; alt: string; type?: string }[]) || [];
  
  // Map videos with proper type validation
  const videos: ProjectVideo[] = rawVideos.map(video => ({
    url: video.url,
    alt: video.alt,
    type: (video.type === 'youtube' || video.type === 'vimeo' || video.type === 'video') 
      ? video.type 
      : 'video' as const
  }));
  
  const images: ProjectImage[] = p.hero_image_url 
    ? [{ url: p.hero_image_url, type: 'hero' as const, alt: p.name || 'Project hero image' }, ...gallery.map(img => ({ ...img, type: 'gallery' as const }))]
    : gallery.map(img => ({ ...img, type: 'gallery' as const }));

  return {
    id: p.id,
    slug: p.slug,
    title: p.name || '',
    description: p.description || '',
    location: p.location || '',
    year: p.year || new Date().getFullYear(),
    status: (p.status as Project['status']) || 'Planning',
    category: (p.category as Project['category']) || 'construction',
    tags: (p.tags as string[]) || [],
    images: images,
    videos: videos,
    specifications: (p.specifications as unknown as ProjectSpecification[]) || [],
    timeline: (p.timeline as unknown as Project['timeline']) || [],
    longDescription: p.long_description || '',
    client: p.client || '',
    budget: p.budget || '',
    area: p.area || '',
    teamMembers: (p.team_members as Project['teamMembers']) || [],
    challenges: (p.challenges as string[]) || [],
    solutions: (p.solutions as string[]) || [],
    results: (p.results as string[]) || [],
    testimonial: p.testimonial || undefined,
  };
};

export const fetchAdminProjects = async (): Promise<SupabaseProject[]> => {
  const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
};

export const fetchPublicProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase.from('projects').select('*').order('year', { ascending: false });
  if (error) throw new Error(error.message);
  return (data || []).map(mapSupabaseProjectToAppProject);
};

export const fetchPublicProjectBySlug = async (slug: string): Promise<Project | null> => {
    const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).maybeSingle();
    if (error) {
        console.error('Error fetching project by slug:', error);
        return null;
    }
    return data ? mapSupabaseProjectToAppProject(data) : null;
};

export const fetchProjectById = async (id: number): Promise<SupabaseProject | null> => {
    const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
    if (error) {
        console.error('Error fetching project by id:', error);
        return null;
    }
    return data;
}

export const createProject = async (project: TablesInsert<'projects'>) => {
    const { data, error } = await supabase.from('projects').insert(project).select().single();
    if (error) throw new Error(error.message);
    return data;
}

export const updateProject = async (id: number, project: TablesUpdate<'projects'>) => {
    const { data, error } = await supabase.from('projects').update(project).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data;
}

export const deleteProject = async (id: number) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
}

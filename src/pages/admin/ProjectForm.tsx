
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { fetchProjectById, createProject, updateProject } from '@/lib/projects';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { ProjectImagePreview } from './components/ProjectImagePreview';
import { ImageUploadField } from './components/form/ImageUploadField';
import { ProjectFormBasicFields } from './components/form/project-form/ProjectFormBasicFields';
import { ProjectFormArrayFields } from './components/form/project-form/ProjectFormArrayFields';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  location: z.string().optional(),
  year: z.coerce.number().optional(),
  status: z.enum(['Completed', 'In Progress', 'Ongoing', 'Planning']),
  category: z.enum(['construction', 'installation', 'maintenance', 'infrastructure']),
  tags: z.array(z.object({ value: z.string() })).optional(),
  hero_image_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  gallery_images: z.array(z.object({ url: z.string().url('Must be a valid URL'), alt: z.string() })).optional(),
  specifications: z.array(z.object({ name: z.string(), value: z.string() })).optional(),
  timeline: z.array(z.object({ date: z.string(), description: z.string(), status: z.enum(['completed', 'in_progress', 'planned']) })).optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const AdminProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const projectId = id ? parseInt(id, 10) : undefined;
  const queryClient = useQueryClient();

  const { data: project, isLoading } = useQuery({
    queryKey: ['adminProject', projectId],
    queryFn: () => projectId ? fetchProjectById(projectId) : null,
    enabled: !!projectId,
  });

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      tags: [],
      gallery_images: [],
      specifications: [],
      timeline: [],
    },
  });

  const watchedHeroImage = form.watch('hero_image_url');
  const watchedGalleryImages = form.watch('gallery_images');

  useEffect(() => {
    if (project) {
      const p = project as any;
      form.reset({
        title: p.name ?? '',
        slug: p.slug ?? '',
        description: p.description ?? undefined,
        location: p.location ?? undefined,
        year: p.year ?? undefined,
        status: p.status as ProjectFormValues['status'] | undefined,
        category: p.category as ProjectFormValues['category'] | undefined,
        hero_image_url: p.hero_image_url ?? '',
        tags: (p.tags || []).map((t: string) => ({ value: t })),
        gallery_images: (p.gallery_images as ProjectFormValues['gallery_images']) || [],
        specifications: (p.specifications as ProjectFormValues['specifications']) || [],
        timeline: (p.timeline as ProjectFormValues['timeline']) || [],
      });
    }
  }, [project, form]);
  
  const mutation = useMutation({
    mutationFn: (data: ProjectFormValues) => {
      const { title, ...restData } = data;
      const payload = {
        ...restData,
        name: title,
        tags: data.tags?.map(t => t.value),
      };
      return projectId ? updateProject(projectId, payload as any) : createProject(payload as any);
    },
    onSuccess: () => {
      toast.success(`Project ${projectId ? 'updated' : 'created'} successfully!`);
      queryClient.invalidateQueries({ queryKey: ['adminProjects'] });
      navigate('/admin/projects');
    },
    onError: (error) => {
      toast.error(`Failed to save project: ${error.message}`);
    },
  });

  const onSubmit = (data: ProjectFormValues) => {
    mutation.mutate(data);
  };
  
  if (isLoading) return <div className="flex justify-center items-center py-16"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>{projectId ? 'Edit Project' : 'Add New Project'}</CardTitle>
            <CardDescription>Fill out the form to {projectId ? 'update the' : 'add a new'} project.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <ProjectFormBasicFields control={form.control} />

                <FormField name="hero_image_url" control={form.control} render={({ field }) => (
                  <ImageUploadField
                    label="Hero Image"
                    value={field.value || ''}
                    onChange={field.onChange}
                    description="Upload or provide URL for the project hero image"
                    folder="projects"
                  />
                )} />

                <ProjectFormArrayFields control={form.control} />

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => navigate('/admin/projects')}>Cancel</Button>
                  <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {projectId ? 'Update' : 'Create'} Project
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:sticky lg:top-4 lg:h-fit">
        <ProjectImagePreview
          heroImageUrl={watchedHeroImage || ''}
          galleryImagesJson={JSON.stringify(watchedGalleryImages || [])}
        />
      </div>
    </div>
  );
};

export default AdminProjectForm;

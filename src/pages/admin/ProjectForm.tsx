import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchProjectById, createProject, updateProject, SupabaseProject } from '@/lib/projects';
import { Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { ProjectImagePreview } from './components/ProjectImagePreview';
import { ImageUploadField } from './components/form/ImageUploadField';

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

  const { fields: tags, append: appendTag, remove: removeTag } = useFieldArray({ control: form.control, name: 'tags' });
  const { fields: galleryImages, append: appendGalleryImage, remove: removeGalleryImage } = useFieldArray({ control: form.control, name: 'gallery_images' });
  const { fields: specifications, append: appendSpecification, remove: removeSpecification } = useFieldArray({ control: form.control, name: 'specifications' });
  const { fields: timeline, append: appendTimeline, remove: removeTimeline } = useFieldArray({ control: form.control, name: 'timeline' });

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
                <div className="grid md:grid-cols-2 gap-8">
                  <FormField name="title" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField name="slug" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Slug</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                
                <FormField name="description" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FormField name="location" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField name="year" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Year</FormLabel><FormControl><Input type="number" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField name="status" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Status</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Planning">Planning</SelectItem><SelectItem value="In Progress">In Progress</SelectItem><SelectItem value="Ongoing">Ongoing</SelectItem><SelectItem value="Completed">Completed</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                    )} />
                    <FormField name="category" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl><SelectContent><SelectItem value="construction">Construction</SelectItem><SelectItem value="installation">Installation</SelectItem><SelectItem value="maintenance">Maintenance</SelectItem><SelectItem value="infrastructure">Infrastructure</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                    )} />
                </div>

                <FormField name="hero_image_url" control={form.control} render={({ field }) => (
                  <ImageUploadField
                    label="Hero Image"
                    value={field.value || ''}
                    onChange={field.onChange}
                    description="Upload or provide URL for the project hero image"
                    folder="projects"
                  />
                )} />

                {/* Field Arrays */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Tags</h3>
                  {tags.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2 mb-2">
                      <FormField name={`tags.${index}.value`} control={form.control} render={({ field }) => (
                        <Input {...field} placeholder="Tag" />
                      )} />
                      <Button type="button" variant="destructive" size="icon" onClick={() => removeTag(index)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => appendTag({ value: '' })}>Add Tag</Button>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Gallery Images</h3>
                  {galleryImages.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 mb-2 items-center">
                      <FormField name={`gallery_images.${index}.url`} control={form.control} render={({ field }) => <Input {...field} placeholder="Image URL"/>} />
                      <FormField name={`gallery_images.${index}.alt`} control={form.control} render={({ field }) => <Input {...field} placeholder="Alt text"/>} />
                      <Button type="button" variant="destructive" size="icon" onClick={() => removeGalleryImage(index)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => appendGalleryImage({ url: '', alt: '' })}>Add Gallery Image</Button>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Specifications</h3>
                  {specifications.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 mb-2 items-center">
                      <FormField name={`specifications.${index}.name`} control={form.control} render={({ field }) => <Input {...field} placeholder="Name" />} />
                      <FormField name={`specifications.${index}.value`} control={form.control} render={({ field }) => <Input {...field} placeholder="Value" />} />
                      <Button type="button" variant="destructive" size="icon" onClick={() => removeSpecification(index)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => appendSpecification({ name: '', value: '' })}>Add Specification</Button>
                </div>

                <div>
                    <h3 className="text-lg font-medium mb-4">Timeline</h3>
                    {timeline.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-md mb-2 space-y-2">
                            <div className="flex justify-end">
                                <Button type="button" variant="destructive" size="icon" onClick={() => removeTimeline(index)}><Trash2 className="h-4 w-4"/></Button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <FormField name={`timeline.${index}.date`} control={form.control} render={({ field }) => <FormItem><FormLabel>Date</FormLabel><FormControl><Input {...field} placeholder="e.g., 2023-01-15" /></FormControl></FormItem>}/>
                                <FormField name={`timeline.${index}.status`} control={form.control} render={({ field }) => <FormItem><FormLabel>Status</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl><SelectContent><SelectItem value="completed">Completed</SelectItem><SelectItem value="in_progress">In Progress</SelectItem><SelectItem value="planned">Planned</SelectItem></SelectContent></Select></FormItem>}/>
                            </div>
                            <FormField name={`timeline.${index}.description`} control={form.control} render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl></FormItem>}/>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => appendTimeline({ date: '', description: '', status: 'planned' })}>Add Timeline Event</Button>
                </div>

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


import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchProjectById, createProject, updateProject } from '@/lib/projects';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  location: z.string().optional(),
  year: z.coerce.number().optional(),
  status: z.enum(['Completed', 'In Progress', 'Ongoing', 'Planning']),
  category: z.enum(['construction', 'installation', 'maintenance', 'infrastructure']),
  hero_image_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
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
      title: '',
      slug: '',
      description: '',
      location: '',
      status: 'Planning',
      category: 'construction',
      hero_image_url: '',
    },
  });

  useEffect(() => {
    if (project) {
      const p = project as any;
      form.reset({
        title: p.name ?? '',
        slug: p.slug ?? '',
        description: p.description ?? '',
        location: p.location ?? '',
        year: p.year ?? undefined,
        status: p.status as ProjectFormValues['status'] ?? 'Planning',
        category: p.category as ProjectFormValues['category'] ?? 'construction',
        hero_image_url: p.hero_image_url ?? '',
      });
    }
  }, [project, form]);
  
  const mutation = useMutation({
    mutationFn: (data: ProjectFormValues) => {
      const { title, ...restData } = data;
      const payload = {
        ...restData,
        name: title,
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
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{projectId ? 'Edit Project' : 'Add New Project'}</CardTitle>
          <CardDescription>Fill out the form to {projectId ? 'update the' : 'add a new'} project.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField name="title" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="slug" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              
              <FormField name="description" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FormField name="location" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="year" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="status" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Planning">Planning</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Ongoing">Ongoing</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="category" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="construction">Construction</SelectItem>
                        <SelectItem value="installation">Installation</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField name="hero_image_url" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Image URL</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      value={field.value ?? ''} 
                      placeholder="https://example.com/image.jpg"
                      type="url"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => navigate('/admin/projects')}>
                  Cancel
                </Button>
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
  );
};

export default AdminProjectForm;

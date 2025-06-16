import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, PlusCircle, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchAdminProjects, deleteProject, SupabaseProject } from '@/lib/projects';
import { ProjectPreviewCard } from './components/PreviewCard';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';

const AdminProjects = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [viewMode, setViewMode<'grid' | 'table'>('grid');
  
  const { data: projects, isLoading, error } = useQuery<SupabaseProject[]>({
    queryKey: ['adminProjects'],
    queryFn: fetchAdminProjects,
  });

  const mutation = useMutation<boolean, Error, number>({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminProjects'] });
      toast.success('Project deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete project: ${error.message}`);
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      mutation.mutate(id);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/admin/projects/form/${id}`);
  };

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground">Manage your company's projects.</p>
          </div>
        </div>
        <Card>
          <CardContent className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground">Manage your company's projects.</p>
          </div>
        </div>
        <Card>
          <CardContent className="text-red-500 text-center py-16">
            Error: {error.message}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your company's projects.</p>
        </div>
        <Button onClick={() => navigate('/admin/projects/form')}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Project List</CardTitle>
              <CardDescription>
                {projects?.length || 0} project{projects?.length !== 1 ? 's' : ''} available
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <List className="h-4 w-4 mr-2" />
                Table
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {!projects || projects.length === 0 ? (
        <Card>
          <CardContent className="text-center py-16">
            <p className="text-muted-foreground mb-4">
              No projects found. Add one to get started.
            </p>
            <Button onClick={() => navigate('/admin/projects/form')}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectPreviewCard
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        
        <Card>
          <CardHeader>
            <CardTitle>Project List</CardTitle>
            <CardDescription>All company projects are listed here.</CardDescription>
          </CardHeader>
          <CardContent>
            
            <div className="text-center py-8 text-muted-foreground">
              Table view - implement original table here if needed
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminProjects;

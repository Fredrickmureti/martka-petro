
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, PlusCircle, MoreHorizontal, Trash2, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { fetchAdminProjects, deleteProject } from '@/lib/projects';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AdminProjects = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['adminProjects'],
    queryFn: fetchAdminProjects,
  });

  const mutation = useMutation({
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

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
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
          <CardTitle>Project List</CardTitle>
          <CardDescription>All company projects are listed here.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}
          {error instanceof Error && <p className="text-red-500 text-center py-16">Error: {error.message}</p>}
          {projects && (
            <div className="border rounded-md">
                <Table>
                  <TableHeader>
                      <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px] text-right">Actions</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {projects.length === 0 ? (
                      <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                          No projects found. Add one to get started.
                          </TableCell>
                      </TableRow>
                      ) : (
                      projects.map((project) => (
                          <TableRow key={project.id}>
                          <TableCell className="font-medium">{project.title}</TableCell>
                          <TableCell>{project.category || 'N/A'}</TableCell>
                          <TableCell>{project.location || 'N/A'}</TableCell>
                          <TableCell>{project.year || 'N/A'}</TableCell>
                          <TableCell>
                              <Badge variant="secondary">{project.status || 'N/A'}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                              <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                          <MoreHorizontal className="h-4 w-4" />
                                          <span className="sr-only">Actions</span>
                                      </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => navigate(`/admin/projects/form/${project.id}`)}>
                                        <Edit className="mr-2 h-4 w-4" /> Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(project.id)}>
                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                      </DropdownMenuItem>
                                  </DropdownMenuContent>
                              </DropdownMenu>
                          </TableCell>
                          </TableRow>
                      ))
                      )}
                  </TableBody>
                </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProjects;
```

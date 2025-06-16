
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import { SupabaseProject } from '@/lib/projects';

interface ProjectsTableProps {
  projects: SupabaseProject[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const ProjectsTable = ({ projects, onEdit, onDelete }: ProjectsTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'default';
      case 'in progress':
        return 'secondary';
      case 'ongoing':
        return 'secondary';
      case 'planning':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'construction':
        return 'default';
      case 'installation':
        return 'secondary';
      case 'maintenance':
        return 'outline';
      case 'infrastructure':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Client</TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No projects found. Add one to get started.
              </TableCell>
            </TableRow>
          ) : (
            projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {project.hero_image_url && (
                      <img 
                        src={project.hero_image_url} 
                        alt={project.name || 'Project'} 
                        className="w-8 h-8 rounded object-cover"
                      />
                    )}
                    {project.name || 'Untitled Project'}
                  </div>
                </TableCell>
                <TableCell>{project.location || 'N/A'}</TableCell>
                <TableCell>
                  <Badge variant={getCategoryColor(project.category || '')}>
                    {project.category || 'N/A'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(project.status || '')}>
                    {project.status || 'N/A'}
                  </Badge>
                </TableCell>
                <TableCell>{project.year || 'N/A'}</TableCell>
                <TableCell>{project.client || 'N/A'}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => window.open(`/projects/${project.slug}`, '_blank')}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => onEdit(project.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => onDelete(project.id)} className="text-red-600 focus:text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
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
  );
};

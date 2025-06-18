
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
import { MoreHorizontal, Edit, Trash2, Eye, MapPin, Calendar, User, Briefcase } from 'lucide-react';
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
        return 'bg-green-100 text-green-800';
      case 'in progress':
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'construction':
        return 'bg-orange-100 text-orange-800';
      case 'installation':
        return 'bg-purple-100 text-purple-800';
      case 'maintenance':
        return 'bg-cyan-100 text-cyan-800';
      case 'infrastructure':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Project Name
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </div>
            </TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Year
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Client
              </div>
            </TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                  <Briefcase className="w-12 h-12" />
                  <p>No projects found. Add one to get started.</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    {project.hero_image_url && (
                      <img 
                        src={project.hero_image_url} 
                        alt={project.name || 'Project'} 
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    )}
                    <span>{project.name || 'Untitled Project'}</span>
                  </div>
                </TableCell>
                <TableCell>{project.location || 'N/A'}</TableCell>
                <TableCell>
                  <Badge className={getCategoryColor(project.category || '')}>
                    {project.category || 'N/A'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(project.status || '')}>
                    {project.status || 'N/A'}
                  </Badge>
                </TableCell>
                <TableCell>{project.year || 'N/A'}</TableCell>
                <TableCell>{project.client || 'N/A'}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
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
                      <DropdownMenuItem 
                        onSelect={() => onDelete(project.id)} 
                        className="text-red-600"
                      >
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

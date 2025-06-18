
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Eye, MapPin, Calendar, User, Briefcase } from 'lucide-react';
import { SupabaseProject } from '@/lib/projects';
import { cn } from '@/lib/utils';
import FuturisticButton from './FuturisticButton';

interface ProjectsTableProps {
  projects: SupabaseProject[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const ProjectsTable = ({ projects, onEdit, onDelete }: ProjectsTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'from-green-500/20 to-emerald-500/20 text-green-300 border-green-400/30';
      case 'in progress':
      case 'ongoing':
        return 'from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-400/30';
      case 'planning':
        return 'from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-400/30';
      default:
        return 'from-slate-500/20 to-slate-400/20 text-slate-300 border-slate-400/30';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'construction':
        return 'from-orange-500/20 to-red-500/20 text-orange-300 border-orange-400/30';
      case 'installation':
        return 'from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-400/30';
      case 'maintenance':
        return 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-400/30';
      case 'infrastructure':
        return 'from-indigo-500/20 to-blue-500/20 text-indigo-300 border-indigo-400/30';
      default:
        return 'from-slate-500/20 to-slate-400/20 text-slate-300 border-slate-400/30';
    }
  };

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl border-0",
      "bg-gradient-to-br from-slate-900/80 to-slate-800/80",
      "backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500"
    )}>
      {/* Holographic overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none rounded-xl" />
      
      {/* Neural network grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-blue-400/20 via-transparent to-purple-400/20" />
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-400/10 rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      <Table className="relative z-10">
        <TableHeader>
          <TableRow className="border-slate-700/50 hover:bg-slate-800/30">
            <TableHead className="text-blue-300 font-semibold">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Project Name
              </div>
            </TableHead>
            <TableHead className="text-blue-300 font-semibold">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </div>
            </TableHead>
            <TableHead className="text-blue-300 font-semibold">Category</TableHead>
            <TableHead className="text-blue-300 font-semibold">Status</TableHead>
            <TableHead className="text-blue-300 font-semibold">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Year
              </div>
            </TableHead>
            <TableHead className="text-blue-300 font-semibold">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Client
              </div>
            </TableHead>
            <TableHead className="w-[100px] text-right text-blue-300 font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <div className="flex flex-col items-center gap-4 text-slate-400">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <p>No projects found. Add one to get started.</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            projects.map((project, index) => (
              <TableRow 
                key={project.id}
                className={cn(
                  "border-slate-700/30 hover:bg-gradient-to-r hover:from-blue-900/20 hover:to-purple-900/20",
                  "transition-all duration-300 group animate-fade-in-up",
                  `stagger-${Math.min(index + 1, 6)}`
                )}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    {project.hero_image_url && (
                      <div className="relative">
                        <img 
                          src={project.hero_image_url} 
                          alt={project.name || 'Project'} 
                          className="w-10 h-10 rounded-lg object-cover border-2 border-blue-400/30"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-lg" />
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" />
                      <span className="text-white">{project.name || 'Untitled Project'}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-slate-300">{project.location || 'N/A'}</TableCell>
                <TableCell>
                  <Badge className={cn("bg-gradient-to-r", getCategoryColor(project.category || ''))}>
                    {project.category || 'N/A'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={cn("bg-gradient-to-r", getStatusColor(project.status || ''))}>
                    <div className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse" />
                    {project.status || 'N/A'}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-300">{project.year || 'N/A'}</TableCell>
                <TableCell className="text-slate-300">{project.client || 'N/A'}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <FuturisticButton size="sm" variant="secondary">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </FuturisticButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end"
                      className={cn(
                        "bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm",
                        "border-slate-700/50 shadow-2xl"
                      )}
                    >
                      <DropdownMenuItem 
                        onSelect={() => window.open(`/projects/${project.slug}`, '_blank')}
                        className="text-slate-300 hover:bg-blue-900/30 hover:text-white transition-colors duration-200"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onSelect={() => onEdit(project.id)}
                        className="text-slate-300 hover:bg-blue-900/30 hover:text-white transition-colors duration-200"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-slate-700/50" />
                      <DropdownMenuItem 
                        onSelect={() => onDelete(project.id)} 
                        className="text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors duration-200"
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

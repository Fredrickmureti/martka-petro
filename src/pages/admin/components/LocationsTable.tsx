
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreHorizontal, MapPin, Phone, Mail, Building2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tables } from '@/integrations/supabase/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import FuturisticButton from './FuturisticButton';

type LocationsTableProps = {
  locations: Tables<'locations'>[];
  onEdit: (location: Tables<'locations'>) => void;
  onDelete: (location: Tables<'locations'>) => void;
};

export const LocationsTable = ({ locations, onEdit, onDelete }: LocationsTableProps) => {
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
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-400/10 rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <Table className="relative z-10">
        <TableHeader>
          <TableRow className="border-slate-700/50 hover:bg-slate-800/30">
            <TableHead className="text-blue-300 font-semibold">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Location
              </div>
            </TableHead>
            <TableHead className="hidden sm:table-cell text-blue-300 font-semibold">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Address
              </div>
            </TableHead>
            <TableHead className="text-blue-300 font-semibold">City</TableHead>
            <TableHead className="hidden sm:table-cell text-blue-300 font-semibold">Country</TableHead>
            <TableHead className="hidden md:table-cell text-blue-300 font-semibold">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contact
              </div>
            </TableHead>
            <TableHead className="hidden lg:table-cell text-blue-300 font-semibold">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone
              </div>
            </TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.map((location, index) => (
            <TableRow 
              key={location.id} 
              className={cn(
                "border-slate-700/30 hover:bg-gradient-to-r hover:from-blue-900/20 hover:to-purple-900/20",
                "transition-all duration-300 group animate-fade-in-up",
                `stagger-${Math.min(index + 1, 6)}`
              )}
            >
              <TableCell className="font-medium text-white">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" />
                  {location.name}
                  {location.is_headquarters && (
                    <Badge 
                      variant="secondary" 
                      className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-400/30"
                    >
                      <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                      HQ
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell text-slate-300">{location.address}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className="bg-slate-800/50 border-blue-400/30 text-blue-300 hover:bg-blue-900/30 transition-colors duration-300"
                >
                  {location.city}
                </Badge>
              </TableCell>
              <TableCell className="hidden sm:table-cell text-slate-300">{location.country}</TableCell>
              <TableCell className="hidden md:table-cell text-slate-300">{location.email}</TableCell>
              <TableCell className="hidden lg:table-cell text-slate-300">{location.phone}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <FuturisticButton size="sm" variant="secondary">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </FuturisticButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end"
                    className={cn(
                      "bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm",
                      "border-slate-700/50 shadow-2xl"
                    )}
                  >
                    <DropdownMenuLabel className="text-blue-300">Actions</DropdownMenuLabel>
                    <DropdownMenuItem 
                      onClick={() => onEdit(location)}
                      className="text-slate-300 hover:bg-blue-900/30 hover:text-white transition-colors duration-200"
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors duration-200"
                      onClick={() => onDelete(location)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

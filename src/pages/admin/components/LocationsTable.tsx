
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
import { Button } from '@/components/ui/button';
import { Tables } from '@/integrations/supabase/types';
import { Badge } from '@/components/ui/badge';

type LocationsTableProps = {
  locations: Tables<'locations'>[];
  onEdit: (location: Tables<'locations'>) => void;
  onDelete: (location: Tables<'locations'>) => void;
};

export const LocationsTable = ({ locations, onEdit, onDelete }: LocationsTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Location
              </div>
            </TableHead>
            <TableHead className="hidden sm:table-cell">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Address
              </div>
            </TableHead>
            <TableHead>City</TableHead>
            <TableHead className="hidden sm:table-cell">Country</TableHead>
            <TableHead className="hidden md:table-cell">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contact
              </div>
            </TableHead>
            <TableHead className="hidden lg:table-cell">
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
          {locations.map((location) => (
            <TableRow key={location.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {location.name}
                  {location.is_headquarters && (
                    <Badge variant="secondary">
                      HQ
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">{location.address}</TableCell>
              <TableCell>
                <Badge variant="outline">
                  {location.city}
                </Badge>
              </TableCell>
              <TableCell className="hidden sm:table-cell">{location.country}</TableCell>
              <TableCell className="hidden md:table-cell">{location.email}</TableCell>
              <TableCell className="hidden lg:table-cell">{location.phone}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onEdit(location)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
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

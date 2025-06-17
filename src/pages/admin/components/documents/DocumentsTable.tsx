
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Download, Edit, Trash2 } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

interface DocumentsTableProps {
  documents: Tables<'documents'>[] | undefined;
  isLoading: boolean;
  onEdit: (document: Tables<'documents'>) => void;
  onDelete: (id: number) => void;
}

export const DocumentsTable = ({ documents, isLoading, onEdit, onDelete }: DocumentsTableProps) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading documents...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>File Type</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents?.map((document) => (
          <TableRow key={document.id}>
            <TableCell className="font-medium">{document.title}</TableCell>
            <TableCell>
              <Badge variant="outline">{document.category}</Badge>
            </TableCell>
            <TableCell>{document.file_type}</TableCell>
            <TableCell>{document.file_size}</TableCell>
            <TableCell>
              <div className="flex gap-1">
                {document.is_active && <Badge variant="default">Active</Badge>}
                {document.is_public && <Badge variant="secondary">Public</Badge>}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => window.open(document.file_url, '_blank')}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(document)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDelete(document.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

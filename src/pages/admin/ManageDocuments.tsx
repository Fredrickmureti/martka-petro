
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Download, FileText } from 'lucide-react';
import { 
  useAllDocuments,
  useCreateDocument,
  useUpdateDocument,
  useDeleteDocument
} from '@/hooks/useDocuments';
import { Tables } from '@/integrations/supabase/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const categoryOptions = [
  { value: 'general', label: 'General' },
  { value: 'manuals', label: 'Manuals' },
  { value: 'safety', label: 'Safety' },
  { value: 'products', label: 'Products' },
  { value: 'legal', label: 'Legal' },
  { value: 'technical', label: 'Technical' },
];

const ManageDocuments = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Tables<'documents'> | null>(null);

  const { data: documents = [], isLoading } = useAllDocuments();
  const createMutation = useCreateDocument();
  const updateMutation = useUpdateDocument();
  const deleteMutation = useDeleteDocument();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const documentData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      file_name: formData.get('file_name') as string,
      file_url: formData.get('file_url') as string,
      file_type: formData.get('file_type') as string,
      file_size: formData.get('file_size') as string,
      category: formData.get('category') as string,
      is_public: formData.get('is_public') === 'true',
      is_active: formData.get('is_active') === 'true',
      sort_order: parseInt(formData.get('sort_order') as string) || 0,
    };

    try {
      if (editingDocument) {
        await updateMutation.mutateAsync({
          id: editingDocument.id,
          document: documentData,
        });
        toast({ title: 'Success', description: 'Document updated successfully' });
      } else {
        await createMutation.mutateAsync(documentData);
        toast({ title: 'Success', description: 'Document created successfully' });
      }
      
      setIsDialogOpen(false);
      setEditingDocument(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: editingDocument ? 'Failed to update document' : 'Failed to create document',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteMutation.mutateAsync(id);
        toast({ title: 'Success', description: 'Document deleted successfully' });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete document',
          variant: 'destructive',
        });
      }
    }
  };

  const openCreateDialog = () => {
    setEditingDocument(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (document: Tables<'documents'>) => {
    setEditingDocument(document);
    setIsDialogOpen(true);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      general: 'bg-gray-100 text-gray-800',
      manuals: 'bg-blue-100 text-blue-800',
      safety: 'bg-red-100 text-red-800',
      products: 'bg-green-100 text-green-800',
      legal: 'bg-yellow-100 text-yellow-800',
      technical: 'bg-purple-100 text-purple-800',
    };
    return colors[category] || colors.general;
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Documents</h1>
          <p className="text-muted-foreground">Upload and manage downloadable documents and resources.</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Document
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading documents...</div>
      ) : (
        <div className="grid gap-4">
          {documents.map((document) => (
            <Card key={document.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="text-blue-600" size={24} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold">{document.title}</h3>
                        <Badge variant="outline" className={getCategoryColor(document.category)}>
                          {document.category}
                        </Badge>
                        <Badge variant={document.is_active ? "default" : "secondary"}>
                          {document.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Badge variant={document.is_public ? "default" : "outline"}>
                          {document.is_public ? 'Public' : 'Private'}
                        </Badge>
                      </div>
                      
                      {document.description && (
                        <p className="text-muted-foreground mb-3">{document.description}</p>
                      )}
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{document.file_type}</span>
                        <span>{document.file_size}</span>
                        <span>{document.file_name}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(document.file_url, '_blank')}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(document)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(document.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {documents.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No documents found. Click "Add Document" to create your first document.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingDocument ? 'Edit Document' : 'Add New Document'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingDocument?.title || ''}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue={editingDocument?.category || 'general'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={editingDocument?.description || ''}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="file_url">File URL</Label>
              <Input
                id="file_url"
                name="file_url"
                type="url"
                defaultValue={editingDocument?.file_url || ''}
                placeholder="https://example.com/document.pdf"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="file_name">File Name</Label>
                <Input
                  id="file_name"
                  name="file_name"
                  defaultValue={editingDocument?.file_name || ''}
                  placeholder="document.pdf"
                  required
                />
              </div>
              <div>
                <Label htmlFor="file_type">File Type</Label>
                <Input
                  id="file_type"
                  name="file_type"
                  defaultValue={editingDocument?.file_type || ''}
                  placeholder="PDF"
                  required
                />
              </div>
              <div>
                <Label htmlFor="file_size">File Size</Label>
                <Input
                  id="file_size"
                  name="file_size"
                  defaultValue={editingDocument?.file_size || ''}
                  placeholder="2.5 MB"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_public"
                  name="is_public"
                  defaultChecked={editingDocument?.is_public ?? true}
                />
                <Label htmlFor="is_public">Public</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  name="is_active"
                  defaultChecked={editingDocument?.is_active ?? true}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
              <div>
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  name="sort_order"
                  type="number"
                  defaultValue={editingDocument?.sort_order || 0}
                  min="0"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {editingDocument ? 'Update' : 'Create'} Document
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageDocuments;

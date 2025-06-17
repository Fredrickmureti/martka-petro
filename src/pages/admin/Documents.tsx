
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { FileText, Plus } from 'lucide-react';
import { useAllDocuments, useCreateDocument, useUpdateDocument, useDeleteDocument } from '@/hooks/useDocuments';
import { Tables } from '@/integrations/supabase/types';
import { DocumentForm } from './components/documents/DocumentForm';
import { DocumentsTable } from './components/documents/DocumentsTable';

const AdminDocuments = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Tables<'documents'> | null>(null);
  
  const { data: documents, isLoading } = useAllDocuments();
  const createDocument = useCreateDocument();
  const updateDocument = useUpdateDocument();
  const deleteDocument = useDeleteDocument();

  const handleSubmit = (formData: any, isEditing: boolean) => {
    if (isEditing && editingDocument) {
      updateDocument.mutate(
        { id: editingDocument.id, document: formData },
        {
          onSuccess: () => {
            setIsFormOpen(false);
            setEditingDocument(null);
          }
        }
      );
    } else {
      createDocument.mutate(formData, {
        onSuccess: () => {
          setIsFormOpen(false);
        }
      });
    }
  };

  const handleEdit = (document: Tables<'documents'>) => {
    setEditingDocument(document);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      deleteDocument.mutate(id);
    }
  };

  const handleAddNew = () => {
    setEditingDocument(null);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-muted-foreground">Manage downloadable documents and resources</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add Document
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DocumentsTable
            documents={documents}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <DocumentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingDocument={editingDocument}
        onSubmit={handleSubmit}
        isSubmitting={createDocument.isPending || updateDocument.isPending}
      />
    </div>
  );
};

export default AdminDocuments;

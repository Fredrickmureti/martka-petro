
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tables } from '@/integrations/supabase/types';

interface DocumentFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingDocument: Tables<'documents'> | null;
  onSubmit: (formData: any, isEditing: boolean) => void;
  isSubmitting: boolean;
}

export const DocumentForm = ({ 
  isOpen, 
  onClose, 
  editingDocument, 
  onSubmit, 
  isSubmitting 
}: DocumentFormProps) => {
  const [formData, setFormData] = useState({
    title: editingDocument?.title || '',
    description: editingDocument?.description || '',
    file_url: editingDocument?.file_url || '',
    file_name: editingDocument?.file_name || '',
    file_type: editingDocument?.file_type || '',
    file_size: editingDocument?.file_size || '',
    category: editingDocument?.category || 'general',
    is_public: editingDocument?.is_public ?? true,
    is_active: editingDocument?.is_active ?? true,
    sort_order: editingDocument?.sort_order || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, !!editingDocument);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      file_url: '',
      file_name: '',
      file_type: '',
      file_size: '',
      category: 'general',
      is_public: true,
      is_active: true,
      sort_order: 0,
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="specification">Specification</SelectItem>
                  <SelectItem value="brochure">Brochure</SelectItem>
                  <SelectItem value="datasheet">Datasheet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="file_url">File URL</Label>
              <Input
                id="file_url"
                value={formData.file_url}
                onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="file_name">File Name</Label>
              <Input
                id="file_name"
                value={formData.file_name}
                onChange={(e) => setFormData({ ...formData, file_name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="file_type">File Type</Label>
              <Input
                id="file_type"
                value={formData.file_type}
                onChange={(e) => setFormData({ ...formData, file_type: e.target.value })}
                placeholder="PDF, DOC, etc."
                required
              />
            </div>
            <div>
              <Label htmlFor="file_size">File Size</Label>
              <Input
                id="file_size"
                value={formData.file_size}
                onChange={(e) => setFormData({ ...formData, file_size: e.target.value })}
                placeholder="2.5 MB"
              />
            </div>
            <div>
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input
                id="sort_order"
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.is_public}
                onChange={(e) => setFormData({ ...formData, is_public: e.target.checked })}
              />
              <span>Public</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              />
              <span>Active</span>
            </label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {editingDocument ? 'Update' : 'Create'} Document
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

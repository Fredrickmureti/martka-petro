
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAllCareersContent, useUpdateCareersContent } from '@/hooks/useCareersManagement';
import { Tables } from '@/integrations/supabase/types';

export const CareersContentManager = () => {
  const { toast } = useToast();
  const [editingContent, setEditingContent] = useState<Tables<'careers_content'> | null>(null);

  const { data: contentSections = [], isLoading: isLoadingContent } = useAllCareersContent();
  const updateContentMutation = useUpdateCareersContent();

  const handleContentUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingContent) return;

    const formData = new FormData(e.currentTarget);
    const contentData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
    };

    try {
      await updateContentMutation.mutateAsync({
        id: editingContent.id,
        content: contentData,
      });
      toast({ title: 'Success', description: 'Content updated successfully' });
      setEditingContent(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update content',
        variant: 'destructive',
      });
    }
  };

  if (isLoadingContent) {
    return <div className="text-center py-8">Loading content...</div>;
  }

  return (
    <>
      <div className="grid gap-6">
        {contentSections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="capitalize">{section.section_key?.replace('_', ' ')}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingContent(section)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <strong>Title:</strong> {section.title}
                </div>
                <div>
                  <strong>Description:</strong> {section.description}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingContent && (
        <Dialog open={!!editingContent} onOpenChange={() => setEditingContent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit {editingContent.section_key?.replace('_', ' ')}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleContentUpdate} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingContent.title || ''}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingContent.description || ''}
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setEditingContent(null)}>
                  Cancel
                </Button>
                <Button type="submit">Update</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

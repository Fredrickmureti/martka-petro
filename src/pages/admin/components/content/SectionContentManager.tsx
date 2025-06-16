
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ContentSectionCard from '../ContentSectionCard';

interface SectionContentManagerProps {
  title: string;
  description: string;
  sections: any[];
  isLoading: boolean;
  onUpdateSection: (sectionId: number, data: any) => Promise<void>;
  onAddSection: (data: any) => Promise<void>;
  isUpdating: boolean;
}

export const SectionContentManager = ({
  title,
  description,
  sections,
  isLoading,
  onUpdateSection,
  onAddSection,
  isUpdating
}: SectionContentManagerProps) => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSectionData, setNewSectionData] = useState({
    title: '',
    section_key: '',
    content: '{}',
    sort_order: 0
  });

  const handleAddSection = async () => {
    try {
      const content = JSON.parse(newSectionData.content);
      
      await onAddSection({
        title: newSectionData.title,
        section_key: newSectionData.section_key,
        content: content,
        sort_order: newSectionData.sort_order,
        is_active: true
      });
      
      toast({
        title: 'Success',
        description: 'New section added successfully!',
      });
      
      setIsAddDialogOpen(false);
      setNewSectionData({ title: '', section_key: '', content: '{}', sort_order: 0 });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add new section. Please check your JSON format.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Section
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New {title.split(' ')[0]} Section</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="new_title">Section Title</Label>
                  <Input
                    id="new_title"
                    value={newSectionData.title}
                    onChange={(e) => setNewSectionData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Quick Links"
                  />
                </div>
                <div>
                  <Label htmlFor="new_section_key">Section Key</Label>
                  <Input
                    id="new_section_key"
                    value={newSectionData.section_key}
                    onChange={(e) => setNewSectionData(prev => ({ ...prev, section_key: e.target.value }))}
                    placeholder="e.g. quick_links"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="new_content">Content (JSON)</Label>
                <Textarea
                  id="new_content"
                  value={newSectionData.content}
                  onChange={(e) => setNewSectionData(prev => ({ ...prev, content: e.target.value }))}
                  rows={8}
                  className="font-mono text-sm"
                  placeholder='{"links": [{"label": "Home", "url": "/"}]}'
                />
              </div>
              <Button onClick={handleAddSection} className="w-full">
                Add Section
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">Loading content...</div>
      ) : (
        <div className="grid gap-6">
          {sections?.map((section) => (
            <ContentSectionCard
              key={section.id}
              section={section}
              onUpdate={onUpdateSection}
              isUpdating={isUpdating}
            />
          ))}
        </div>
      )}
    </div>
  );
};

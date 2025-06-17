import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Settings, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentSection {
  id: number;
  title: string | null;
  section_key: string;
  content: any;
  sort_order: number | null;
  is_active: boolean | null;
}

interface EnhancedContentEditorProps {
  title: string;
  description: string;
  sections: ContentSection[];
  isLoading: boolean;
  onUpdateSection: (sectionId: number, data: any) => Promise<void>;
  onAddSection: (data: any) => Promise<void>;
  onDeleteSection?: (sectionId: number) => Promise<void>;
  isUpdating: boolean;
}

export const EnhancedContentEditor = ({
  title,
  description,
  sections,
  isLoading,
  onUpdateSection,
  onAddSection,
  onDeleteSection,
  isUpdating
}: EnhancedContentEditorProps) => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [newSectionData, setNewSectionData] = useState({
    title: '',
    section_key: '',
    content: {},
    sort_order: 0
  });

  // Predefined templates for common section types
  const sectionTemplates = {
    company_info: {
      title: 'Company Info',
      content: {
        description: 'Your company description here',
        social_links: [
          { platform: 'facebook', url: '#' },
          { platform: 'twitter', url: '#' },
          { platform: 'linkedin', url: '#' }
        ]
      }
    },
    quick_links: {
      title: 'Quick Links',
      content: {
        links: [
          { label: 'Home', url: '/' },
          { label: 'Services', url: '/services' },
          { label: 'About', url: '/about' },
          { label: 'Contact', url: '/contact' }
        ]
      }
    },
    services: {
      title: 'Services',
      content: {
        items: [
          'Fuel Station Construction',
          'Dispenser Installation',
          'Maintenance Services',
          'Consulting'
        ]
      }
    },
    contact_info: {
      title: 'Contact Info',
      content: {
        address: '123 Business Street, City, State 12345',
        phone: '+1 (555) 123-4567',
        email: 'info@company.com'
      }
    },
    legal_links: {
      title: 'Legal',
      content: {
        links: [
          { label: 'Privacy Policy', url: '/privacy' },
          { label: 'Terms of Service', url: '/terms' }
        ]
      }
    }
  };

  const handleAddSection = async () => {
    try {
      await onAddSection({
        title: newSectionData.title,
        section_key: newSectionData.section_key,
        content: newSectionData.content,
        sort_order: newSectionData.sort_order,
        is_active: true
      });
      
      toast({
        title: 'Success',
        description: 'New section added successfully!',
      });
      
      setIsAddDialogOpen(false);
      setNewSectionData({ title: '', section_key: '', content: {}, sort_order: 0 });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add new section.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateSection = async (sectionId: number) => {
    try {
      await onUpdateSection(sectionId, editData);
      toast({
        title: 'Success',
        description: 'Section updated successfully!',
      });
      setEditingSection(null);
      setEditData({});
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update section.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteSection = async (sectionId: number) => {
    if (!onDeleteSection) return;
    
    try {
      await onDeleteSection(sectionId);
      toast({
        title: 'Success',
        description: 'Section deleted successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete section.',
        variant: 'destructive',
      });
    }
  };

  const startEditing = (section: ContentSection) => {
    setEditingSection(section.id);
    setEditData({
      title: section.title,
      content: section.content,
      is_active: section.is_active
    });
  };

  const useTemplate = (templateKey: string) => {
    const template = sectionTemplates[templateKey as keyof typeof sectionTemplates];
    if (template) {
      setNewSectionData(prev => ({
        ...prev,
        title: template.title,
        section_key: templateKey,
        content: template.content
      }));
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading content...</div>;
  }

  return (
    <Card className="border-t-4 border-t-blue-600">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-600" />
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Section
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Section</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Quick Templates</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Object.keys(sectionTemplates).map((key) => (
                      <Button
                        key={key}
                        variant="outline"
                        size="sm"
                        onClick={() => useTemplate(key)}
                        className="text-xs"
                      >
                        {sectionTemplates[key as keyof typeof sectionTemplates].title}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="new_title">Section Title</Label>
                    <Input
                      id="new_title"
                      value={newSectionData.title}
                      onChange={(e) => setNewSectionData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g. Contact Info"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new_section_key">Section Key</Label>
                    <Input
                      id="new_section_key"
                      value={newSectionData.section_key}
                      onChange={(e) => setNewSectionData(prev => ({ ...prev, section_key: e.target.value }))}
                      placeholder="e.g. contact_info"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="new_content">Content (JSON)</Label>
                  <Textarea
                    id="new_content"
                    value={JSON.stringify(newSectionData.content, null, 2)}
                    onChange={(e) => {
                      try {
                        const content = JSON.parse(e.target.value);
                        setNewSectionData(prev => ({ ...prev, content }));
                      } catch {
                        // Invalid JSON, but keep typing
                      }
                    }}
                    rows={8}
                    className="font-mono text-sm"
                  />
                </div>
                
                <Button onClick={handleAddSection} className="w-full" disabled={isUpdating}>
                  {isUpdating ? 'Adding...' : 'Add Section'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sections?.map((section) => (
            <Card key={section.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{section.title || section.section_key}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {section.section_key}
                      </Badge>
                      <Badge variant={section.is_active ? 'default' : 'secondary'} className="text-xs">
                        {section.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEditing(section)}
                      disabled={editingSection === section.id}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {onDeleteSection && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Section</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this section? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteSection(section.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {editingSection === section.id ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={editData.title || ''}
                        onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Content (JSON)</Label>
                      <Textarea
                        value={JSON.stringify(editData.content || {}, null, 2)}
                        onChange={(e) => {
                          try {
                            const content = JSON.parse(e.target.value);
                            setEditData(prev => ({ ...prev, content }));
                          } catch {
                            // Invalid JSON, but keep typing
                          }
                        }}
                        rows={8}
                        className="font-mono text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleUpdateSection(section.id)}
                        disabled={isUpdating}
                        className="flex items-center gap-2"
                      >
                        <Save className="h-4 w-4" />
                        {isUpdating ? 'Saving...' : 'Save'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditingSection(null);
                          setEditData({});
                        }}
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 dark:bg-slate-900 rounded p-4">
                    <pre className="text-sm overflow-x-auto">
                      {JSON.stringify(section.content, null, 2)}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          {sections?.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No sections found. Add your first section to get started.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Plus } from 'lucide-react';
import { usePageSections, useUpdatePageSection, useCreatePageSection } from '@/hooks/usePageContent';
import { Tables } from '@/integrations/supabase/types';
import { toast } from '@/components/ui/use-toast';
import SectionForm from './SectionForm';

const PageSectionManager = () => {
  const [editingSection, setEditingSection] = useState<Tables<'page_sections'> | null>(null);
  const [isNewSectionOpen, setIsNewSectionOpen] = useState(false);

  const { data: sections, isLoading: sectionsLoading } = usePageSections();
  const updateSection = useUpdatePageSection();
  const createSection = useCreatePageSection();

  const [sectionForm, setSectionForm] = useState({
    page_name: '',
    section_key: '',
    title: '',
    subtitle: '',
    description: '',
    image_url: '',
    content: {},
    is_active: true,
    sort_order: 0
  });

  const handleSectionSubmit = () => {
    if (editingSection) {
      updateSection.mutate(
        { id: editingSection.id, data: sectionForm },
        {
          onSuccess: () => {
            toast({ title: "Section updated successfully" });
            setEditingSection(null);
          },
          onError: (error) => {
            toast({ title: "Error updating section", description: error.message, variant: "destructive" });
          }
        }
      );
    } else {
      createSection.mutate(sectionForm, {
        onSuccess: () => {
          toast({ title: "Section created successfully" });
          setIsNewSectionOpen(false);
          resetSectionForm();
        },
        onError: (error) => {
          toast({ title: "Error creating section", description: error.message, variant: "destructive" });
        }
      });
    }
  };

  const resetSectionForm = () => {
    setSectionForm({
      page_name: '',
      section_key: '',
      title: '',
      subtitle: '',
      description: '',
      image_url: '',
      content: {},
      is_active: true,
      sort_order: 0
    });
  };

  const editSection = (section: Tables<'page_sections'>) => {
    setEditingSection(section);
    setSectionForm({
      page_name: section.page_name,
      section_key: section.section_key,
      title: section.title || '',
      subtitle: section.subtitle || '',
      description: section.description || '',
      image_url: section.image_url || '',
      content: section.content || {},
      is_active: section.is_active || true,
      sort_order: section.sort_order || 0
    });
  };

  if (sectionsLoading) {
    return <div>Loading sections...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Page Content</h3>
        <Dialog open={isNewSectionOpen} onOpenChange={setIsNewSectionOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetSectionForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Section
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Section</DialogTitle>
            </DialogHeader>
            <SectionForm 
              form={sectionForm}
              setForm={setSectionForm}
              onSubmit={handleSectionSubmit}
              submitText="Create Section"
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {sections?.map((section) => (
          <Card key={section.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-base">
                  {section.page_name} - {section.section_key}
                </CardTitle>
                <Badge variant={section.is_active ? 'default' : 'secondary'}>
                  {section.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <Button variant="outline" size="sm" onClick={() => editSection(section)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </CardHeader>
            <CardContent>
              {editingSection?.id === section.id ? (
                <SectionForm 
                  form={sectionForm}
                  setForm={setSectionForm}
                  onSubmit={handleSectionSubmit}
                  onCancel={() => setEditingSection(null)}
                  submitText="Save"
                  showCancel
                />
              ) : (
                <div className="space-y-2">
                  <p className="font-medium">{section.title}</p>
                  <p className="text-sm text-muted-foreground">{section.subtitle}</p>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                  {section.image_url && (
                    <p className="text-sm text-muted-foreground">Image: {section.image_url}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PageSectionManager;

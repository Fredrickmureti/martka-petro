
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Save, Plus, Image, Type } from 'lucide-react';
import { usePageBackgrounds, usePageSections, useUpdatePageBackground, useUpdatePageSection, useCreatePageBackground, useCreatePageSection } from '@/hooks/usePageContent';
import { Tables } from '@/integrations/supabase/types';
import { toast } from '@/components/ui/use-toast';

const PageContentManager = () => {
  const [editingBackground, setEditingBackground] = useState<Tables<'page_backgrounds'> | null>(null);
  const [editingSection, setEditingSection] = useState<Tables<'page_sections'> | null>(null);
  const [isNewBackgroundOpen, setIsNewBackgroundOpen] = useState(false);
  const [isNewSectionOpen, setIsNewSectionOpen] = useState(false);

  const { data: backgrounds, isLoading: backgroundsLoading } = usePageBackgrounds();
  const { data: sections, isLoading: sectionsLoading } = usePageSections();
  
  const updateBackground = useUpdatePageBackground();
  const updateSection = useUpdatePageSection();
  const createBackground = useCreatePageBackground();
  const createSection = useCreatePageSection();

  const [backgroundForm, setBackgroundForm] = useState({
    page_name: '',
    section_key: '',
    image_url: '',
    overlay_opacity: 0.7,
    is_active: true
  });

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

  const pageOptions = [
    { value: 'home', label: 'Home Page' },
    { value: 'about', label: 'About Page' },
    { value: 'support', label: 'Support Page' },
    { value: 'careers', label: 'Careers Page' },
  ];

  const sectionOptions = [
    { value: 'hero', label: 'Hero Section' },
    { value: 'services', label: 'Services Section' },
    { value: 'about', label: 'About Section' },
    { value: 'projects', label: 'Projects Section' },
  ];

  const handleBackgroundSubmit = () => {
    if (editingBackground) {
      updateBackground.mutate(
        { id: editingBackground.id, data: backgroundForm },
        {
          onSuccess: () => {
            toast({ title: "Background updated successfully" });
            setEditingBackground(null);
          },
          onError: (error) => {
            toast({ title: "Error updating background", description: error.message, variant: "destructive" });
          }
        }
      );
    } else {
      createBackground.mutate(backgroundForm, {
        onSuccess: () => {
          toast({ title: "Background created successfully" });
          setIsNewBackgroundOpen(false);
          resetBackgroundForm();
        },
        onError: (error) => {
          toast({ title: "Error creating background", description: error.message, variant: "destructive" });
        }
      });
    }
  };

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

  const resetBackgroundForm = () => {
    setBackgroundForm({
      page_name: '',
      section_key: '',
      image_url: '',
      overlay_opacity: 0.7,
      is_active: true
    });
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

  const editBackground = (background: Tables<'page_backgrounds'>) => {
    setEditingBackground(background);
    setBackgroundForm({
      page_name: background.page_name,
      section_key: background.section_key,
      image_url: background.image_url || '',
      overlay_opacity: background.overlay_opacity || 0.7,
      is_active: background.is_active || true
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

  if (backgroundsLoading || sectionsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="backgrounds" className="space-y-6">
        <TabsList>
          <TabsTrigger value="backgrounds">Background Images</TabsTrigger>
          <TabsTrigger value="content">Page Content</TabsTrigger>
        </TabsList>

        <TabsContent value="backgrounds" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Background Images</h3>
            <Dialog open={isNewBackgroundOpen} onOpenChange={setIsNewBackgroundOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetBackgroundForm}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Background
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Background</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Page</Label>
                    <Select value={backgroundForm.page_name} onValueChange={(value) => setBackgroundForm({...backgroundForm, page_name: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select page" />
                      </SelectTrigger>
                      <SelectContent>
                        {pageOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Section</Label>
                    <Select value={backgroundForm.section_key} onValueChange={(value) => setBackgroundForm({...backgroundForm, section_key: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectionOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Background Image URL</Label>
                    <Input
                      value={backgroundForm.image_url}
                      onChange={(e) => setBackgroundForm({...backgroundForm, image_url: e.target.value})}
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  <div>
                    <Label>Overlay Opacity</Label>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={backgroundForm.overlay_opacity}
                      onChange={(e) => setBackgroundForm({...backgroundForm, overlay_opacity: parseFloat(e.target.value)})}
                    />
                  </div>
                  <Button onClick={handleBackgroundSubmit} className="w-full">
                    Create Background
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {backgrounds?.map((background) => (
              <Card key={background.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-base">
                      {background.page_name} - {background.section_key}
                    </CardTitle>
                    <Badge variant={background.is_active ? 'default' : 'secondary'}>
                      {background.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => editBackground(background)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </CardHeader>
                <CardContent>
                  {editingBackground?.id === background.id ? (
                    <div className="space-y-4">
                      <div>
                        <Label>Background Image URL</Label>
                        <Input
                          value={backgroundForm.image_url}
                          onChange={(e) => setBackgroundForm({...backgroundForm, image_url: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Overlay Opacity</Label>
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          max="1"
                          value={backgroundForm.overlay_opacity}
                          onChange={(e) => setBackgroundForm({...backgroundForm, overlay_opacity: parseFloat(e.target.value)})}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleBackgroundSubmit}>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" onClick={() => setEditingBackground(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Image: {background.image_url || 'Not set'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Opacity: {background.overlay_opacity}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
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
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Page</Label>
                      <Select value={sectionForm.page_name} onValueChange={(value) => setSectionForm({...sectionForm, page_name: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select page" />
                        </SelectTrigger>
                        <SelectContent>
                          {pageOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Section</Label>
                      <Select value={sectionForm.section_key} onValueChange={(value) => setSectionForm({...sectionForm, section_key: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                        <SelectContent>
                          {sectionOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={sectionForm.title}
                      onChange={(e) => setSectionForm({...sectionForm, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Subtitle</Label>
                    <Input
                      value={sectionForm.subtitle}
                      onChange={(e) => setSectionForm({...sectionForm, subtitle: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={sectionForm.description}
                      onChange={(e) => setSectionForm({...sectionForm, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Content Image URL</Label>
                    <Input
                      value={sectionForm.image_url}
                      onChange={(e) => setSectionForm({...sectionForm, image_url: e.target.value})}
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  <Button onClick={handleSectionSubmit} className="w-full">
                    Create Section
                  </Button>
                </div>
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
                    <div className="space-y-4">
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={sectionForm.title}
                          onChange={(e) => setSectionForm({...sectionForm, title: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Subtitle</Label>
                        <Input
                          value={sectionForm.subtitle}
                          onChange={(e) => setSectionForm({...sectionForm, subtitle: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={sectionForm.description}
                          onChange={(e) => setSectionForm({...sectionForm, description: e.target.value})}
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label>Content Image URL</Label>
                        <Input
                          value={sectionForm.image_url}
                          onChange={(e) => setSectionForm({...sectionForm, image_url: e.target.value})}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleSectionSubmit}>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" onClick={() => setEditingSection(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PageContentManager;

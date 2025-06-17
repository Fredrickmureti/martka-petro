import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import { useSupportPageContent } from '@/hooks/useSupportPage';
import { useSupportContentSections, useCreateSupportContentSection, useUpdateSupportContentSection, useDeleteSupportContentSection } from '@/hooks/useSupportContentSections';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import PageContentManager from './components/PageContentManager';

const ManageSupport = () => {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [sectionData, setSectionData] = useState<any>({});
  const [editingContentSection, setEditingContentSection] = useState<number | null>(null);
  const [contentSectionData, setContentSectionData] = useState<any>({});

  const { data: content, isLoading } = useSupportPageContent();
  const { data: contentSections, isLoading: isLoadingContentSections } = useSupportContentSections();
  const queryClient = useQueryClient();

  const updateSectionMutation = useMutation({
    mutationFn: async ({ sectionKey, data }: { sectionKey: string; data: any }) => {
      const { error } = await supabase
        .from('support_page_content')
        .upsert({
          section_key: sectionKey,
          title: data.title,
          description: data.description,
          content: data.content,
          is_active: data.is_active
        }, {
          onConflict: 'section_key'
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supportPageContent'] });
      toast({
        title: "Success",
        description: "Section updated successfully",
      });
      setEditingSection(null);
      setSectionData({});
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update section: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  const createContentSectionMutation = useCreateSupportContentSection();
  const updateContentSectionMutation = useUpdateSupportContentSection();
  const deleteContentSectionMutation = useDeleteSupportContentSection();

  const handleEdit = (sectionKey: string, currentData: any) => {
    setEditingSection(sectionKey);
    setSectionData({
      title: currentData?.title || '',
      description: currentData?.description || '',
      content: currentData?.content || {},
      is_active: currentData?.is_active ?? true
    });
  };

  const handleSave = () => {
    if (!editingSection) return;
    
    updateSectionMutation.mutate({
      sectionKey: editingSection,
      data: sectionData
    });
  };

  const handleCancel = () => {
    setEditingSection(null);
    setSectionData({});
  };

  const updateContentField = (field: string, value: any) => {
    setSectionData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value
      }
    }));
  };

  const handleEditContentSection = (id: number, currentData: any) => {
    setEditingContentSection(id);
    setContentSectionData({
      title: currentData.title || '',
      content: currentData.content || '',
      section_type: currentData.section_type || 'info',
      icon: currentData.icon || 'Info',
      background_color: currentData.background_color || 'bg-white',
      text_color: currentData.text_color || 'text-gray-900',
      is_active: currentData.is_active ?? true,
      sort_order: currentData.sort_order || 0
    });
  };

  const handleSaveContentSection = () => {
    if (editingContentSection === -1) {
      // Create new section
      createContentSectionMutation.mutate(contentSectionData, {
        onSuccess: () => {
          toast({ title: "Success", description: "Content section created successfully" });
          setEditingContentSection(null);
          setContentSectionData({});
        },
        onError: (error) => {
          toast({ title: "Error", description: `Failed to create section: ${error.message}`, variant: 'destructive' });
        }
      });
    } else if (editingContentSection) {
      // Update existing section
      updateContentSectionMutation.mutate({ id: editingContentSection, section: contentSectionData }, {
        onSuccess: () => {
          toast({ title: "Success", description: "Content section updated successfully" });
          setEditingContentSection(null);
          setContentSectionData({});
        },
        onError: (error) => {
          toast({ title: "Error", description: `Failed to update section: ${error.message}`, variant: 'destructive' });
        }
      });
    }
  };

  const handleDeleteContentSection = (id: number) => {
    if (confirm('Are you sure you want to delete this content section?')) {
      deleteContentSectionMutation.mutate(id, {
        onSuccess: () => {
          toast({ title: "Success", description: "Content section deleted successfully" });
        },
        onError: (error) => {
          toast({ title: "Error", description: `Failed to delete section: ${error.message}`, variant: 'destructive' });
        }
      });
    }
  };

  const handleAddNewContentSection = () => {
    setEditingContentSection(-1);
    setContentSectionData({
      title: '',
      content: '',
      section_type: 'info',
      icon: 'Info',
      background_color: 'bg-white',
      text_color: 'text-gray-900',
      is_active: true,
      sort_order: (contentSections?.length || 0) + 1
    });
  };

  const sections = [
    { key: 'hero', name: 'Hero Section' },
    { key: 'help_section', name: 'Help Section' },
    { key: 'faq_section', name: 'FAQ Section' },
    { key: 'downloads_section', name: 'Downloads Section' },
    { key: 'contact_section', name: 'Contact Section' },
    { key: 'resources_section', name: 'Resources Section' },
    { key: 'community_section', name: 'Community Section' },
    { key: 'emergency_section', name: 'Emergency Section' }
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Support Page Content</h1>
      </div>

      <Tabs defaultValue="sections" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sections">Page Sections</TabsTrigger>
          <TabsTrigger value="content-sections">Content Sections</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="space-y-6">
          <div className="grid gap-6">
            {sections.map((section) => {
              const sectionContent = content?.[section.key];
              const isEditing = editingSection === section.key;

              return (
                <Card key={section.key} className="relative">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{section.name}</CardTitle>
                      <Badge variant={sectionContent?.is_active ? 'default' : 'secondary'}>
                        {sectionContent?.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isEditing ? (
                        <>
                          <Button onClick={handleSave} size="sm" disabled={updateSectionMutation.isPending}>
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                          <Button onClick={handleCancel} variant="outline" size="sm">
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button 
                          onClick={() => handleEdit(section.key, sectionContent)} 
                          variant="outline" 
                          size="sm"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={sectionData.is_active}
                            onCheckedChange={(checked) => setSectionData(prev => ({ ...prev, is_active: checked }))}
                          />
                          <Label>Active</Label>
                        </div>
                        
                        <div>
                          <Label htmlFor={`title-${section.key}`}>Title</Label>
                          <Input
                            id={`title-${section.key}`}
                            value={sectionData.title || ''}
                            onChange={(e) => setSectionData(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Enter section title"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`description-${section.key}`}>Description</Label>
                          <Textarea
                            id={`description-${section.key}`}
                            value={sectionData.description || ''}
                            onChange={(e) => setSectionData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Enter section description"
                            rows={3}
                          />
                        </div>

                        {section.key === 'contact_section' && (
                          <div className="space-y-4 border-t pt-4">
                            <h4 className="font-semibold">Contact Information</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <Label>Subtitle</Label>
                                <Input
                                  value={sectionData.content?.subtitle || ''}
                                  onChange={(e) => updateContentField('subtitle', e.target.value)}
                                  placeholder="Contact subtitle"
                                />
                              </div>
                              <div>
                                <Label>Phone</Label>
                                <Input
                                  value={sectionData.content?.phone || ''}
                                  onChange={(e) => updateContentField('phone', e.target.value)}
                                  placeholder="Phone number"
                                />
                              </div>
                              <div>
                                <Label>Email</Label>
                                <Input
                                  value={sectionData.content?.email || ''}
                                  onChange={(e) => updateContentField('email', e.target.value)}
                                  placeholder="Email address"
                                />
                              </div>
                              <div>
                                <Label>Hours</Label>
                                <Input
                                  value={sectionData.content?.hours || ''}
                                  onChange={(e) => updateContentField('hours', e.target.value)}
                                  placeholder="Support hours"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Title:</span> {sectionContent?.title || 'Not set'}
                        </div>
                        <div>
                          <span className="font-medium">Description:</span> {sectionContent?.description || 'Not set'}
                        </div>
                        {sectionContent?.content && Object.keys(sectionContent.content).length > 0 && (
                          <div>
                            <span className="font-medium">Additional Content:</span>
                            <pre className="text-sm bg-slate-100 dark:bg-slate-800 p-2 rounded mt-1 overflow-auto">
                              {JSON.stringify(sectionContent.content, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="content-sections" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Manageable Content Sections</h2>
            <Button onClick={handleAddNewContentSection}>
              <Plus className="h-4 w-4 mr-2" />
              Add Content Section
            </Button>
          </div>

          <div className="grid gap-6">
            {isLoadingContentSections ? (
              <div>Loading content sections...</div>
            ) : (
              contentSections?.map((section) => {
                const isEditing = editingContentSection === section.id;

                return (
                  <Card key={section.id} className="relative">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <Badge variant={section.is_active ? 'default' : 'secondary'}>
                          {section.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Badge variant="outline">{section.section_type}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isEditing ? (
                          <>
                            <Button onClick={handleSaveContentSection} size="sm">
                              <Save className="h-4 w-4 mr-2" />
                              Save
                            </Button>
                            <Button 
                              onClick={() => {
                                setEditingContentSection(null);
                                setContentSectionData({});
                              }} 
                              variant="outline" 
                              size="sm"
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button 
                              onClick={() => handleEditContentSection(section.id, section)} 
                              variant="outline" 
                              size="sm"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button 
                              onClick={() => handleDeleteContentSection(section.id)} 
                              variant="destructive" 
                              size="sm"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={contentSectionData.is_active}
                              onCheckedChange={(checked) => setContentSectionData(prev => ({ ...prev, is_active: checked }))}
                            />
                            <Label>Active</Label>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label>Title</Label>
                              <Input
                                value={contentSectionData.title || ''}
                                onChange={(e) => setContentSectionData(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="Enter section title"
                              />
                            </div>
                            <div>
                              <Label>Sort Order</Label>
                              <Input
                                type="number"
                                value={contentSectionData.sort_order || 0}
                                onChange={(e) => setContentSectionData(prev => ({ ...prev, sort_order: parseInt(e.target.value) }))}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label>Content</Label>
                            <Textarea
                              value={contentSectionData.content || ''}
                              onChange={(e) => setContentSectionData(prev => ({ ...prev, content: e.target.value }))}
                              placeholder="Enter section content"
                              rows={4}
                            />
                          </div>

                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <Label>Section Type</Label>
                              <Select
                                value={contentSectionData.section_type}
                                onValueChange={(value) => setContentSectionData(prev => ({ ...prev, section_type: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="info">Info</SelectItem>
                                  <SelectItem value="tip">Tip</SelectItem>
                                  <SelectItem value="warning">Warning</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Icon</Label>
                              <Select
                                value={contentSectionData.icon}
                                onValueChange={(value) => setContentSectionData(prev => ({ ...prev, icon: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Info">Info</SelectItem>
                                  <SelectItem value="Lightbulb">Lightbulb</SelectItem>
                                  <SelectItem value="AlertTriangle">Alert Triangle</SelectItem>
                                  <SelectItem value="Zap">Zap</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Background Color</Label>
                              <Select
                                value={contentSectionData.background_color}
                                onValueChange={(value) => setContentSectionData(prev => ({ ...prev, background_color: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="bg-white">White</SelectItem>
                                  <SelectItem value="bg-blue-50">Light Blue</SelectItem>
                                  <SelectItem value="bg-green-50">Light Green</SelectItem>
                                  <SelectItem value="bg-yellow-50">Light Yellow</SelectItem>
                                  <SelectItem value="bg-red-50">Light Red</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-muted-foreground">{section.content}</p>
                          <div className="flex gap-2 text-sm text-muted-foreground">
                            <span>Icon: {section.icon}</span>
                            <span>•</span>
                            <span>Order: {section.sort_order}</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            )}

            {/* Add new content section form */}
            {editingContentSection === -1 && (
              <Card className="relative border-dashed">
                <CardHeader>
                  <CardTitle className="text-lg">Add New Content Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={contentSectionData.is_active}
                      onCheckedChange={(checked) => setContentSectionData(prev => ({ ...prev, is_active: checked }))}
                    />
                    <Label>Active</Label>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={contentSectionData.title || ''}
                        onChange={(e) => setContentSectionData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter section title"
                      />
                    </div>
                    <div>
                      <Label>Sort Order</Label>
                      <Input
                        type="number"
                        value={contentSectionData.sort_order || 0}
                        onChange={(e) => setContentSectionData(prev => ({ ...prev, sort_order: parseInt(e.target.value) }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Content</Label>
                    <Textarea
                      value={contentSectionData.content || ''}
                      onChange={(e) => setContentSectionData(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Enter section content"
                      rows={4}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label>Section Type</Label>
                      <Select
                        value={contentSectionData.section_type}
                        onValueChange={(value) => setContentSectionData(prev => ({ ...prev, section_type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="tip">Tip</SelectItem>
                          <SelectItem value="warning">Warning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Icon</Label>
                      <Select
                        value={contentSectionData.icon}
                        onValueChange={(value) => setContentSectionData(prev => ({ ...prev, icon: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Info">Info</SelectItem>
                          <SelectItem value="Lightbulb">Lightbulb</SelectItem>
                          <SelectItem value="AlertTriangle">Alert Triangle</SelectItem>
                          <SelectItem value="Zap">Zap</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Background Color</Label>
                      <Select
                        value={contentSectionData.background_color}
                        onValueChange={(value) => setContentSectionData(prev => ({ ...prev, background_color: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bg-white">White</SelectItem>
                          <SelectItem value="bg-blue-50">Light Blue</SelectItem>
                          <SelectItem value="bg-green-50">Light Green</SelectItem>
                          <SelectItem value="bg-yellow-50">Light Yellow</SelectItem>
                          <SelectItem value="bg-red-50">Light Red</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={handleSaveContentSection}>
                      <Save className="h-4 w-4 mr-2" />
                      Create Section
                    </Button>
                    <Button 
                      onClick={() => {
                        setEditingContentSection(null);
                        setContentSectionData({});
                      }} 
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Page Content & Background Management</CardTitle>
            </CardHeader>
            <CardContent>
              <PageContentManager />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageSupport;

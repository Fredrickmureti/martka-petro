
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import { useSupportPageContent } from '@/hooks/useSupportPage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import PageContentManager from './components/PageContentManager';

const ManageSupport = () => {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [sectionData, setSectionData] = useState<any>({});

  const { data: content, isLoading } = useSupportPageContent();
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

                        {/* Special content fields based on section */}
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

                        {section.key === 'resources_section' && (
                          <div className="space-y-4 border-t pt-4">
                            <h4 className="font-semibold">Resources</h4>
                            <div>
                              <Label>Subtitle</Label>
                              <Input
                                value={sectionData.content?.subtitle || ''}
                                onChange={(e) => updateContentField('subtitle', e.target.value)}
                                placeholder="Resources subtitle"
                              />
                            </div>
                            <div>
                              <Label>Features (comma-separated)</Label>
                              <Textarea
                                value={sectionData.content?.features?.join(', ') || ''}
                                onChange={(e) => updateContentField('features', e.target.value.split(', ').filter(Boolean))}
                                placeholder="Feature 1, Feature 2, Feature 3"
                                rows={2}
                              />
                            </div>
                          </div>
                        )}

                        {section.key === 'community_section' && (
                          <div className="space-y-4 border-t pt-4">
                            <h4 className="font-semibold">Community Links</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <Label>Subtitle</Label>
                                <Input
                                  value={sectionData.content?.subtitle || ''}
                                  onChange={(e) => updateContentField('subtitle', e.target.value)}
                                  placeholder="Community subtitle"
                                />
                              </div>
                              <div>
                                <Label>Forum URL</Label>
                                <Input
                                  value={sectionData.content?.forum_url || ''}
                                  onChange={(e) => updateContentField('forum_url', e.target.value)}
                                  placeholder="/community"
                                />
                              </div>
                              <div>
                                <Label>Events URL</Label>
                                <Input
                                  value={sectionData.content?.events_url || ''}
                                  onChange={(e) => updateContentField('events_url', e.target.value)}
                                  placeholder="/events"
                                />
                              </div>
                              <div>
                                <Label>Newsletter URL</Label>
                                <Input
                                  value={sectionData.content?.newsletter_url || ''}
                                  onChange={(e) => updateContentField('newsletter_url', e.target.value)}
                                  placeholder="/newsletter"
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

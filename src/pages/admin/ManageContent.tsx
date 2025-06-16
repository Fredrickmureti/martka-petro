
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Settings, Image, Edit } from 'lucide-react';
import { 
  useHeaderContent, 
  useFooterContent, 
  useAboutContent,
  useUpdateHeaderContent,
  useUpdateFooterContent,
  useUpdateAboutContent,
  useAddFooterSection,
  useAddAboutSection
} from '@/hooks/useContentManagement';
import ContentSectionCard from './components/ContentSectionCard';

const ManageContent = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('header');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSectionData, setNewSectionData] = useState({
    title: '',
    section_key: '',
    content: '{}',
    sort_order: 0
  });

  const { data: headerContent, isLoading: isLoadingHeader } = useHeaderContent();
  const { data: footerContent, isLoading: isLoadingFooter } = useFooterContent();
  const { data: aboutContent, isLoading: isLoadingAbout } = useAboutContent();

  const updateHeaderMutation = useUpdateHeaderContent();
  const updateFooterMutation = useUpdateFooterContent();
  const updateAboutMutation = useUpdateAboutContent();
  const addFooterSectionMutation = useAddFooterSection();
  const addAboutSectionMutation = useAddAboutSection();

  const handleUpdateHeader = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await updateHeaderMutation.mutateAsync({
        company_name: formData.get('company_name') as string,
        logo_url: formData.get('logo_url') as string || null,
      });
      
      toast({
        title: 'Success',
        description: 'Header content updated successfully! Changes will appear on the site immediately.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update header content',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateFooterSection = async (sectionId: number, data: any) => {
    try {
      await updateFooterMutation.mutateAsync({
        id: sectionId,
        content: data
      });
      
      toast({
        title: 'Success',
        description: 'Footer section updated successfully! Changes will appear on the site immediately.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update footer section',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateAboutSection = async (sectionId: number, data: any) => {
    try {
      await updateAboutMutation.mutateAsync({
        id: sectionId,
        content: data
      });
      
      toast({
        title: 'Success',
        description: 'About section updated successfully! Changes will appear on the site immediately.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update about section',
        variant: 'destructive',
      });
    }
  };

  const handleAddSection = async () => {
    try {
      const content = JSON.parse(newSectionData.content);
      
      if (activeTab === 'footer') {
        await addFooterSectionMutation.mutateAsync({
          title: newSectionData.title,
          section_key: newSectionData.section_key,
          content: content,
          sort_order: newSectionData.sort_order,
          is_active: true
        });
      } else if (activeTab === 'about') {
        await addAboutSectionMutation.mutateAsync({
          title: newSectionData.title,
          section_key: newSectionData.section_key,
          content: content,
          sort_order: newSectionData.sort_order,
          is_active: true
        });
      }
      
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
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8 text-blue-600" />
            Manage Website Content
          </h1>
          <p className="text-muted-foreground">Update header, footer, and about page content. Changes reflect immediately on the website.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="header" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Header & Logo
          </TabsTrigger>
          <TabsTrigger value="footer" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Footer Sections
          </TabsTrigger>
          <TabsTrigger value="about" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            About Page
          </TabsTrigger>
        </TabsList>

        <TabsContent value="header">
          <Card className="border-t-4 border-t-blue-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5 text-blue-600" />
                Header Content & Branding
              </CardTitle>
              <CardDescription>Manage your company name and logo that appears in the website header.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingHeader ? (
                <div className="text-center py-8">Loading header content...</div>
              ) : (
                <form onSubmit={handleUpdateHeader} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="company_name">Company Name</Label>
                      <Input
                        id="company_name"
                        name="company_name"
                        defaultValue={headerContent?.company_name || ''}
                        placeholder="Enter company name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="logo_url">Logo URL</Label>
                      <Input
                        id="logo_url"
                        name="logo_url"
                        type="url"
                        defaultValue={headerContent?.logo_url || ''}
                        placeholder="https://example.com/logo.png"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Leave empty to use default logo</p>
                    </div>
                  </div>
                  
                  {headerContent?.logo_url && (
                    <div>
                      <Label>Current Logo Preview</Label>
                      <div className="mt-2 p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                        <img 
                          src={headerContent.logo_url} 
                          alt="Current logo" 
                          className="h-12 w-auto"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <Button type="submit" disabled={updateHeaderMutation.isPending} className="w-full md:w-auto">
                    {updateHeaderMutation.isPending ? 'Updating...' : 'Update Header Content'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="footer">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Footer Sections</h2>
                <p className="text-muted-foreground">Manage footer content sections and add new ones.</p>
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
                    <DialogTitle>Add New Footer Section</DialogTitle>
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
            
            {isLoadingFooter ? (
              <div className="text-center py-8">Loading footer content...</div>
            ) : (
              <div className="grid gap-6">
                {footerContent?.map((section) => (
                  <ContentSectionCard
                    key={section.id}
                    section={section}
                    onUpdate={handleUpdateFooterSection}
                    isUpdating={updateFooterMutation.isPending}
                  />
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="about">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">About Page Sections</h2>
                <p className="text-muted-foreground">Manage about page content sections and add new ones.</p>
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
                    <DialogTitle>Add New About Section</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="new_title_about">Section Title</Label>
                        <Input
                          id="new_title_about"
                          value={newSectionData.title}
                          onChange={(e) => setNewSectionData(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g. Our Mission"
                        />
                      </div>
                      <div>
                        <Label htmlFor="new_section_key_about">Section Key</Label>
                        <Input
                          id="new_section_key_about"
                          value={newSectionData.section_key}
                          onChange={(e) => setNewSectionData(prev => ({ ...prev, section_key: e.target.value }))}
                          placeholder="e.g. mission"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="new_content_about">Content (JSON)</Label>
                      <Textarea
                        id="new_content_about"
                        value={newSectionData.content}
                        onChange={(e) => setNewSectionData(prev => ({ ...prev, content: e.target.value }))}
                        rows={8}
                        className="font-mono text-sm"
                        placeholder='{"title": "Our Mission", "content": "Your mission statement here"}'
                      />
                    </div>
                    <Button onClick={handleAddSection} className="w-full">
                      Add Section
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {isLoadingAbout ? (
              <div className="text-center py-8">Loading about content...</div>
            ) : (
              <div className="grid gap-6">
                {aboutContent?.map((section) => (
                  <ContentSectionCard
                    key={section.id}
                    section={section}
                    onUpdate={handleUpdateAboutSection}
                    isUpdating={updateAboutMutation.isPending}
                  />
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ManageContent;

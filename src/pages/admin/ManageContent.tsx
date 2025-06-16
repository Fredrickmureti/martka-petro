
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  useHeaderContent, 
  useFooterContent, 
  useAboutContent,
  useUpdateHeaderContent,
  useUpdateFooterContent,
  useUpdateAboutContent
} from '@/hooks/useContentManagement';

const ManageContent = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('header');

  const { data: headerContent, isLoading: isLoadingHeader } = useHeaderContent();
  const { data: footerContent, isLoading: isLoadingFooter } = useFooterContent();
  const { data: aboutContent, isLoading: isLoadingAbout } = useAboutContent();

  const updateHeaderMutation = useUpdateHeaderContent();
  const updateFooterMutation = useUpdateFooterContent();
  const updateAboutMutation = useUpdateAboutContent();

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
        description: 'Header content updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update header content',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateFooterSection = async (sectionId: number, formData: FormData) => {
    try {
      const content = JSON.parse(formData.get('content') as string);
      
      await updateFooterMutation.mutateAsync({
        id: sectionId,
        content: {
          title: formData.get('title') as string,
          content: content,
        }
      });
      
      toast({
        title: 'Success',
        description: 'Footer section updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update footer section',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateAboutSection = async (sectionId: number, formData: FormData) => {
    try {
      const content = JSON.parse(formData.get('content') as string);
      
      await updateAboutMutation.mutateAsync({
        id: sectionId,
        content: {
          title: formData.get('title') as string,
          content: content,
        }
      });
      
      toast({
        title: 'Success',
        description: 'About section updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update about section',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Website Content</h1>
          <p className="text-muted-foreground">Update header, footer, and about page content.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="header">Header</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
          <TabsTrigger value="about">About Page</TabsTrigger>
        </TabsList>

        <TabsContent value="header">
          <Card>
            <CardHeader>
              <CardTitle>Header Content</CardTitle>
              <CardDescription>Manage company name and logo in the header.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingHeader ? (
                <div className="text-center py-8">Loading header content...</div>
              ) : (
                <form onSubmit={handleUpdateHeader} className="space-y-4">
                  <div>
                    <Label htmlFor="company_name">Company Name</Label>
                    <Input
                      id="company_name"
                      name="company_name"
                      defaultValue={headerContent?.company_name || ''}
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
                  </div>
                  <Button type="submit" disabled={updateHeaderMutation.isPending}>
                    {updateHeaderMutation.isPending ? 'Updating...' : 'Update Header'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="footer">
          <div className="space-y-6">
            {isLoadingFooter ? (
              <div className="text-center py-8">Loading footer content...</div>
            ) : (
              footerContent?.map((section) => (
                <Card key={section.id}>
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>Section: {section.section_key}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        handleUpdateFooterSection(section.id, formData);
                      }}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor={`title_${section.id}`}>Title</Label>
                        <Input
                          id={`title_${section.id}`}
                          name="title"
                          defaultValue={section.title || ''}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`content_${section.id}`}>Content (JSON)</Label>
                        <Textarea
                          id={`content_${section.id}`}
                          name="content"
                          defaultValue={JSON.stringify(section.content, null, 2)}
                          rows={8}
                          className="font-mono text-sm"
                          required
                        />
                      </div>
                      <Button type="submit" disabled={updateFooterMutation.isPending}>
                        {updateFooterMutation.isPending ? 'Updating...' : 'Update Section'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="about">
          <div className="space-y-6">
            {isLoadingAbout ? (
              <div className="text-center py-8">Loading about content...</div>
            ) : (
              aboutContent?.map((section) => (
                <Card key={section.id}>
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>Section: {section.section_key}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        handleUpdateAboutSection(section.id, formData);
                      }}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor={`title_${section.id}`}>Title</Label>
                        <Input
                          id={`title_${section.id}`}
                          name="title"
                          defaultValue={section.title || ''}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`content_${section.id}`}>Content (JSON)</Label>
                        <Textarea
                          id={`content_${section.id}`}
                          name="content"
                          defaultValue={JSON.stringify(section.content, null, 2)}
                          rows={8}
                          className="font-mono text-sm"
                          required
                        />
                      </div>
                      <Button type="submit" disabled={updateAboutMutation.isPending}>
                        {updateAboutMutation.isPending ? 'Updating...' : 'Update Section'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ManageContent;

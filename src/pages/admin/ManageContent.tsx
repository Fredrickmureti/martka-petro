import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Image, Edit, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  useFooterContent, 
  useAboutContent,
  useUpdateFooterContent,
  useUpdateAboutContent,
  useAddFooterSection,
  useAddAboutSection,
  useDeleteFooterSection,
  useDeleteAboutSection,
  useSupportPageContent,
  useUpdateSupportPageContent
} from '@/hooks/useContentManagement';
import { HeaderContentManager } from './components/content/HeaderContentManager';
import { UserFriendlyContentManager } from './components/content/UserFriendlyContentManager';
import ContentSectionCard from './components/ContentSectionCard';
import { Skeleton } from '@/components/ui/skeleton';

const ManageContent = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('header');

  const { data: footerContent, isLoading: isLoadingFooter, error: footerError } = useFooterContent();
  const { data: aboutContent, isLoading: isLoadingAbout, error: aboutError } = useAboutContent();
  const { data: supportContent, isLoading: isLoadingSupport, error: supportError } = useSupportPageContent();

  const updateFooterMutation = useUpdateFooterContent();
  const updateAboutMutation = useUpdateAboutContent();
  const updateSupportMutation = useUpdateSupportPageContent();
  const addFooterSectionMutation = useAddFooterSection();
  const addAboutSectionMutation = useAddAboutSection();
  const deleteFooterSectionMutation = useDeleteFooterSection();
  const deleteAboutSectionMutation = useDeleteAboutSection();

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

  const handleUpdateSupportSection = async (sectionKey: string, data: any) => {
    try {
      await updateSupportMutation.mutateAsync({
        sectionKey,
        data
      });
      
      toast({
        title: 'Success',
        description: 'Support section updated successfully! Changes will appear on the site immediately.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update support section',
        variant: 'destructive',
      });
    }
  };

  const handleAddFooterSection = async (data: any) => {
    try {
      await addFooterSectionMutation.mutateAsync(data);
      toast({
        title: 'Success',
        description: 'Footer section added successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add footer section',
        variant: 'destructive',
      });
    }
  };

  const handleAddAboutSection = async (data: any) => {
    try {
      await addAboutSectionMutation.mutateAsync(data);
      toast({
        title: 'Success',
        description: 'About section added successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add about section',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteFooterSection = async (sectionId: number) => {
    try {
      await deleteFooterSectionMutation.mutateAsync(sectionId);
      toast({
        title: 'Success',
        description: 'Footer section deleted successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete footer section',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteAboutSection = async (sectionId: number) => {
    try {
      await deleteAboutSectionMutation.mutateAsync(sectionId);
      toast({
        title: 'Success',
        description: 'About section deleted successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete about section',
        variant: 'destructive',
      });
    }
  };

  // Show loading state for the entire page if any critical data is loading
  if (isLoadingFooter || isLoadingAbout || isLoadingSupport) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Settings className="h-8 w-8 text-blue-600" />
              Manage Website Content
            </h1>
            <p className="text-muted-foreground">Loading content...</p>
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  // Show error state if there are any errors
  if (footerError || aboutError || supportError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Settings className="h-8 w-8 text-red-600" />
              Manage Website Content
            </h1>
            <p className="text-red-500">Error loading content. Please try refreshing the page.</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">
            There was an error loading the content sections. Please check your database connection and try again.
          </p>
          {footerError && <p className="text-sm text-red-600 mt-2">Footer: {footerError.message}</p>}
          {aboutError && <p className="text-sm text-red-600 mt-2">About: {aboutError.message}</p>}
          {supportError && <p className="text-sm text-red-600 mt-2">Support: {supportError.message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8 text-blue-600" />
            Manage Website Content
          </h1>
          <p className="text-muted-foreground">Update header, footer, about page, and support content. Changes reflect immediately on the website.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
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
          <TabsTrigger value="support" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Support Page
          </TabsTrigger>
        </TabsList>

        <TabsContent value="header">
          <HeaderContentManager />
        </TabsContent>

        <TabsContent value="footer">
          <UserFriendlyContentManager
            title="Footer Sections"
            description="Manage footer content sections including company info, quick links, services, and contact information. Use the intuitive forms or switch to JSON mode for advanced editing."
            sections={footerContent || []}
            isLoading={false}
            onUpdateSection={handleUpdateFooterSection}
            onAddSection={handleAddFooterSection}
            onDeleteSection={handleDeleteFooterSection}
            isUpdating={updateFooterMutation.isPending || addFooterSectionMutation.isPending || deleteFooterSectionMutation.isPending}
          />
        </TabsContent>

        <TabsContent value="about">
          <UserFriendlyContentManager
            title="About Page Sections"
            description="Manage about page content sections. Create and organize content sections to tell your company's story effectively using easy-to-use forms."
            sections={aboutContent || []}
            isLoading={false}
            onUpdateSection={handleUpdateAboutSection}
            onAddSection={handleAddAboutSection}
            onDeleteSection={handleDeleteAboutSection}
            isUpdating={updateAboutMutation.isPending || addAboutSectionMutation.isPending || deleteAboutSectionMutation.isPending}
          />
        </TabsContent>

        <TabsContent value="support">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Support Page Content</h2>
              <p className="text-muted-foreground">
                Manage support page sections with beautiful previews. See exactly how your content will appear on the website.
              </p>
            </div>
            
            <div className="space-y-8">
              {supportContent && Object.keys(supportContent).length > 0 ? (
                Object.entries(supportContent).map(([key, section]: [string, any]) => (
                  <ContentSectionCard
                    key={section.id}
                    section={{
                      id: section.id,
                      title: section.title,
                      section_key: section.section_key,
                      content: section.content,
                      is_active: section.is_active
                    }}
                    onUpdate={(id, data) => handleUpdateSupportSection(section.section_key, data)}
                    isUpdating={updateSupportMutation.isPending}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No Support Content Found</h3>
                  <p className="text-sm">Support page content will be displayed here once it's available in the database.</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageContent;

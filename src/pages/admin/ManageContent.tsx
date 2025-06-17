
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Image, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  useFooterContent, 
  useAboutContent,
  useUpdateFooterContent,
  useUpdateAboutContent,
  useAddFooterSection,
  useAddAboutSection,
  useDeleteFooterSection,
  useDeleteAboutSection
} from '@/hooks/useContentManagement';
import { HeaderContentManager } from './components/content/HeaderContentManager';
import { EnhancedContentEditor } from './components/content/EnhancedContentEditor';

const ManageContent = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('header');

  const { data: footerContent, isLoading: isLoadingFooter } = useFooterContent();
  const { data: aboutContent, isLoading: isLoadingAbout } = useAboutContent();

  const updateFooterMutation = useUpdateFooterContent();
  const updateAboutMutation = useUpdateAboutContent();
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
          <HeaderContentManager />
        </TabsContent>

        <TabsContent value="footer">
          <EnhancedContentEditor
            title="Footer Sections"
            description="Manage footer content sections including company info, quick links, services, and contact information. You can add, edit, and delete sections as needed."
            sections={footerContent || []}
            isLoading={isLoadingFooter}
            onUpdateSection={handleUpdateFooterSection}
            onAddSection={handleAddFooterSection}
            onDeleteSection={handleDeleteFooterSection}
            isUpdating={updateFooterMutation.isPending || addFooterSectionMutation.isPending || deleteFooterSectionMutation.isPending}
          />
        </TabsContent>

        <TabsContent value="about">
          <EnhancedContentEditor
            title="About Page Sections"
            description="Manage about page content sections. Create and organize content sections to tell your company's story effectively."
            sections={aboutContent || []}
            isLoading={isLoadingAbout}
            onUpdateSection={handleUpdateAboutSection}
            onAddSection={handleAddAboutSection}
            onDeleteSection={handleDeleteAboutSection}
            isUpdating={updateAboutMutation.isPending || addAboutSectionMutation.isPending || deleteAboutSectionMutation.isPending}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ManageContent;

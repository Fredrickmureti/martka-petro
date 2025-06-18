
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
import { ContentManagementHeader } from './components/content/ContentManagementHeader';
import { ContentLoadingState } from './components/content/ContentLoadingState';
import { ContentErrorState } from './components/content/ContentErrorState';
import { ContentManagementTabs } from './components/content/ContentManagementTabs';

const ManageContent = () => {
  const { toast } = useToast();

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
    return <ContentLoadingState />;
  }

  // Show error state if there are any errors
  if (footerError || aboutError || supportError) {
    return (
      <ContentErrorState 
        footerError={footerError}
        aboutError={aboutError}
        supportError={supportError}
      />
    );
  }

  const isUpdating = updateFooterMutation.isPending || 
                     addFooterSectionMutation.isPending || 
                     deleteFooterSectionMutation.isPending ||
                     updateAboutMutation.isPending || 
                     addAboutSectionMutation.isPending || 
                     deleteAboutSectionMutation.isPending;

  return (
    <div className="space-y-6">
      <ContentManagementHeader 
        title="Manage Website Content"
        description="Update header, footer, about page, and support content. Changes reflect immediately on the website."
      />

      <ContentManagementTabs
        footerContent={footerContent}
        aboutContent={aboutContent}
        supportContent={supportContent}
        onUpdateFooterSection={handleUpdateFooterSection}
        onUpdateAboutSection={handleUpdateAboutSection}
        onUpdateSupportSection={handleUpdateSupportSection}
        onAddFooterSection={handleAddFooterSection}
        onAddAboutSection={handleAddAboutSection}
        onDeleteFooterSection={handleDeleteFooterSection}
        onDeleteAboutSection={handleDeleteAboutSection}
        isUpdating={isUpdating}
        updateSupportMutation={updateSupportMutation}
      />
    </div>
  );
};

export default ManageContent;

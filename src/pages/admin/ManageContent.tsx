
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
import { cn } from '@/lib/utils';

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
        title: 'Neural Network Updated',
        description: 'Footer section synchronized successfully! Changes propagated across all nodes.',
      });
    } catch (error) {
      toast({
        title: 'System Error',
        description: 'Failed to update footer section. Neural network disruption detected.',
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
        title: 'Data Matrix Synchronized',
        description: 'About section updated successfully! Information cascade initiated.',
      });
    } catch (error) {
      toast({
        title: 'System Error',
        description: 'Failed to update about section. Database connection unstable.',
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
        title: 'Support Protocol Updated',
        description: 'Support section modified successfully! System protocols refreshed.',
      });
    } catch (error) {
      toast({
        title: 'Protocol Error',
        description: 'Failed to update support section. System maintenance required.',
        variant: 'destructive',
      });
    }
  };

  const handleAddFooterSection = async (data: any) => {
    try {
      await addFooterSectionMutation.mutateAsync(data);
      toast({
        title: 'New Node Created',
        description: 'Footer section added to neural network successfully!',
      });
    } catch (error) {
      toast({
        title: 'Creation Failed',
        description: 'Failed to add footer section. Network capacity exceeded.',
        variant: 'destructive',
      });
    }
  };

  const handleAddAboutSection = async (data: any) => {
    try {
      await addAboutSectionMutation.mutateAsync(data);
      toast({
        title: 'Matrix Expanded',
        description: 'About section integrated into data structure successfully!',
      });
    } catch (error) {
      toast({
        title: 'Integration Error',
        description: 'Failed to add about section. Data matrix overflow detected.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteFooterSection = async (sectionId: number) => {
    try {
      await deleteFooterSectionMutation.mutateAsync(sectionId);
      toast({
        title: 'Node Removed',
        description: 'Footer section deleted from neural network. System recalibrated.',
      });
    } catch (error) {
      toast({
        title: 'Deletion Error',
        description: 'Failed to delete footer section. Network protection protocol active.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteAboutSection = async (sectionId: number) => {
    try {
      await deleteAboutSectionMutation.mutateAsync(sectionId);
      toast({
        title: 'Data Purged',
        description: 'About section removed from matrix. Memory banks optimized.',
      });
    } catch (error) {
      toast({
        title: 'Purge Failed',
        description: 'Failed to delete about section. Critical data protection engaged.',
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
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800",
      "relative overflow-hidden"
    )}>
      {/* Neural network background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-400/20 rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Connection lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-transparent via-blue-400/30 to-transparent h-px"
            style={{
              left: '0%',
              right: '0%',
              top: `${(i + 1) * 12}%`,
              transform: `rotate(${Math.random() * 6 - 3}deg)`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 space-y-8 p-6">
        <ContentManagementHeader 
          title="Neural Content Matrix"
          description="Advanced content management system. Real-time synchronization across all network nodes."
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
    </div>
  );
};

export default ManageContent;

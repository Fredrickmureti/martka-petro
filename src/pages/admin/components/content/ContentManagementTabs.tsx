
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserFriendlyContentManager } from './UserFriendlyContentManager';
import { EnhancedContentEditor } from './EnhancedContentEditor';
import { SupportPageManager } from './SupportPageManager';

interface ContentManagementTabsProps {
  footerContent: any;
  aboutContent: any;
  supportContent: any;
  onUpdateFooterSection: (sectionId: number, data: any) => Promise<void>;
  onUpdateAboutSection: (sectionId: number, data: any) => Promise<void>;
  onUpdateSupportSection: (sectionKey: string, data: any) => Promise<void>;
  onAddFooterSection: (data: any) => Promise<void>;
  onAddAboutSection: (data: any) => Promise<void>;
  onDeleteFooterSection: (sectionId: number) => Promise<void>;
  onDeleteAboutSection: (sectionId: number) => Promise<void>;
  isUpdating: boolean;
  updateSupportMutation: any;
}

export const ContentManagementTabs = ({
  footerContent,
  aboutContent,
  supportContent,
  onUpdateFooterSection,
  onUpdateAboutSection,
  onUpdateSupportSection,
  onAddFooterSection,
  onAddAboutSection,
  onDeleteFooterSection,
  onDeleteAboutSection,
  isUpdating,
  updateSupportMutation
}: ContentManagementTabsProps) => {
  return (
    <Tabs defaultValue="footer" className="space-y-8">
      <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 backdrop-blur-sm border border-blue-400/20">
        <TabsTrigger 
          value="footer" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300"
        >
          Footer Matrix
        </TabsTrigger>
        <TabsTrigger 
          value="about" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300"
        >
          About Portal
        </TabsTrigger>
        <TabsTrigger 
          value="support" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300"
        >
          Support Network
        </TabsTrigger>
      </TabsList>

      <TabsContent value="footer" className="space-y-6">
        <UserFriendlyContentManager
          title="Footer Content Matrix"
          description="Manage footer sections with intelligent form-based editing or advanced JSON configuration."
          sections={footerContent || []}
          isLoading={false}
          onUpdateSection={onUpdateFooterSection}
          onAddSection={onAddFooterSection}
          onDeleteSection={onDeleteFooterSection}
          isUpdating={isUpdating}
        />
      </TabsContent>

      <TabsContent value="about" className="space-y-6">
        <UserFriendlyContentManager
          title="About Page Content Portal"
          description="Configure about page sections with user-friendly forms or technical JSON editing capabilities."
          sections={aboutContent || []}
          isLoading={false}
          onUpdateSection={onUpdateAboutSection}
          onAddSection={onAddAboutSection}
          onDeleteSection={onDeleteAboutSection}
          isUpdating={isUpdating}
        />
      </TabsContent>

      <TabsContent value="support" className="space-y-6">
        <SupportPageManager
          supportContent={supportContent}
          onUpdateSection={onUpdateSupportSection}
          isUpdating={updateSupportMutation.isPending}
        />
      </TabsContent>
    </Tabs>
  );
};

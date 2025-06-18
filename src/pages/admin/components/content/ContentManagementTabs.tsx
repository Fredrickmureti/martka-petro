
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Image, Edit, MessageSquare } from 'lucide-react';
import { HeaderContentManager } from './HeaderContentManager';
import { UserFriendlyContentManager } from './UserFriendlyContentManager';
import ContentSectionCard from '../ContentSectionCard';

interface ContentManagementTabsProps {
  footerContent: any[];
  aboutContent: any[];
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
  const [activeTab, setActiveTab] = useState('header');

  return (
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
          onUpdateSection={onUpdateFooterSection}
          onAddSection={onAddFooterSection}
          onDeleteSection={onDeleteFooterSection}
          isUpdating={isUpdating}
        />
      </TabsContent>

      <TabsContent value="about">
        <UserFriendlyContentManager
          title="About Page Sections"
          description="Manage about page content sections. Create and organize content sections to tell your company's story effectively using easy-to-use forms."
          sections={aboutContent || []}
          isLoading={false}
          onUpdateSection={onUpdateAboutSection}
          onAddSection={onAddAboutSection}
          onDeleteSection={onDeleteAboutSection}
          isUpdating={isUpdating}
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
                  onUpdate={(id, data) => onUpdateSupportSection(section.section_key, data)}
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
  );
};

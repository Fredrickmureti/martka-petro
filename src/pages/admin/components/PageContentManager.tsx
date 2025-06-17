
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BackgroundImageManager from './BackgroundImageManager';
import PageSectionManager from './PageSectionManager';

const PageContentManager = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="backgrounds" className="space-y-6">
        <TabsList>
          <TabsTrigger value="backgrounds">Background Images</TabsTrigger>
          <TabsTrigger value="content">Page Content</TabsTrigger>
        </TabsList>

        <TabsContent value="backgrounds" className="space-y-6">
          <BackgroundImageManager />
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <PageSectionManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PageContentManager;

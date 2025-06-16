
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tables } from '@/integrations/supabase/types';
import { CareersContentManager } from './components/careers/CareersContentManager';
import { CareersCardsManager } from './components/careers/CareersCardsManager';

const ManageCareers = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Tables<'careers_cards'> | null>(null);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Careers Content</h1>
          <p className="text-muted-foreground">Manage careers page content, benefits, and statistics.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="content">Page Content</TabsTrigger>
          <TabsTrigger value="cards">Cards & Benefits</TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <CareersContentManager />
        </TabsContent>

        <TabsContent value="cards">
          <CareersCardsManager 
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            editingCard={editingCard}
            setEditingCard={setEditingCard}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ManageCareers;

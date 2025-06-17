
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit3, Code, Settings, Plus } from 'lucide-react';
import { CompanyInfoEditor } from './editors/CompanyInfoEditor';
import { QuickLinksEditor } from './editors/QuickLinksEditor';
import { ServicesListEditor } from './editors/ServicesListEditor';
import { ContactInfoEditor } from './editors/ContactInfoEditor';
import { RawJsonEditor } from '../form/json-editor/RawJsonEditor';

interface ContentSection {
  id: number;
  title: string | null;
  section_key: string;
  content: any;
  sort_order: number | null;
  is_active: boolean | null;
}

interface UserFriendlyContentManagerProps {
  title: string;
  description: string;
  sections: ContentSection[];
  isLoading: boolean;
  onUpdateSection: (sectionId: number, data: any) => Promise<void>;
  onAddSection: (data: any) => Promise<void>;
  onDeleteSection?: (sectionId: number) => Promise<void>;
  isUpdating: boolean;
}

export const UserFriendlyContentManager = ({
  title,
  description,
  sections,
  isLoading,
  onUpdateSection,
  onAddSection,
  onDeleteSection,
  isUpdating
}: UserFriendlyContentManagerProps) => {
  const [editingMode, setEditingMode] = useState<{[key: number]: 'form' | 'json'}>({});

  const getSectionEditor = (section: ContentSection) => {
    const mode = editingMode[section.id] || 'form';
    
    if (mode === 'json') {
      return (
        <RawJsonEditor
          label="Content (JSON)"
          value={JSON.stringify(section.content, null, 2)}
          onChange={(value) => {
            try {
              const content = JSON.parse(value);
              onUpdateSection(section.id, { content });
            } catch (error) {
              // Handle JSON parse error
            }
          }}
        />
      );
    }

    const handleSave = (data: any) => {
      onUpdateSection(section.id, { content: data });
    };

    switch (section.section_key) {
      case 'company_info':
        return (
          <CompanyInfoEditor
            data={section.content || { description: '', social_links: [] }}
            onSave={handleSave}
            isLoading={isUpdating}
          />
        );
      case 'quick_links':
        return (
          <QuickLinksEditor
            data={section.content || { links: [] }}
            onSave={handleSave}
            isLoading={isUpdating}
          />
        );
      case 'services':
        return (
          <ServicesListEditor
            data={section.content || { items: [] }}
            onSave={handleSave}
            isLoading={isUpdating}
          />
        );
      case 'contact_info':
        return (
          <ContactInfoEditor
            data={section.content || { address: '', phone: '', email: '' }}
            onSave={handleSave}
            isLoading={isUpdating}
          />
        );
      default:
        return (
          <RawJsonEditor
            label="Content (JSON)"
            value={JSON.stringify(section.content, null, 2)}
            onChange={(value) => {
              try {
                const content = JSON.parse(value);
                onUpdateSection(section.id, { content });
              } catch (error) {
                // Handle JSON parse error
              }
            }}
          />
        );
    }
  };

  const toggleEditingMode = (sectionId: number) => {
    setEditingMode(prev => ({
      ...prev,
      [sectionId]: prev[sectionId] === 'json' ? 'form' : 'json'
    }));
  };

  const addNewSection = () => {
    // For simplicity, let's create a basic company_info section
    onAddSection({
      title: 'New Section',
      section_key: 'new_section',
      content: {},
      sort_order: sections.length,
      is_active: true
    });
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading content...</div>;
  }

  return (
    <Card className="border-t-4 border-t-blue-600">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-600" />
              {title}
            </CardTitle>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <Button onClick={addNewSection} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Section
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sections?.map((section) => (
            <Card key={section.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{section.title || section.section_key}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {section.section_key}
                      </Badge>
                      <Badge variant={section.is_active ? 'default' : 'secondary'} className="text-xs">
                        {section.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleEditingMode(section.id)}
                    >
                      {editingMode[section.id] === 'json' ? (
                        <>
                          <Edit3 className="h-4 w-4 mr-1" />
                          Form View
                        </>
                      ) : (
                        <>
                          <Code className="h-4 w-4 mr-1" />
                          JSON View
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {getSectionEditor(section)}
              </CardContent>
            </Card>
          ))}
          
          {sections?.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No sections found. Add your first section to get started.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

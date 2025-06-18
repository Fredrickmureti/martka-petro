
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit3, Code, Settings, Plus } from 'lucide-react';
import { CompanyInfoEditor } from './editors/CompanyInfoEditor';
import { QuickLinksEditor } from './editors/QuickLinksEditor';
import { ServicesListEditor } from './editors/ServicesListEditor';
import { ContactInfoEditor } from './editors/ContactInfoEditor';
import { AboutMainEditor } from './editors/AboutMainEditor';
import { GenericTextEditor } from './editors/GenericTextEditor';
import { RawJsonEditor } from '../form/json-editor/RawJsonEditor';
import { cn } from '@/lib/utils';

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
              console.error('Invalid JSON:', error);
            }
          }}
        />
      );
    }

    const handleSave = (data: any) => {
      onUpdateSection(section.id, { content: data });
    };

    // Form view - different editors based on section type
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
      case 'main_about':
      case 'about_main':
        return (
          <AboutMainEditor
            data={section.content || {}}
            onSave={handleSave}
            isLoading={isUpdating}
          />
        );
      case 'mission':
      case 'vision':
      case 'values':
      case 'history':
      case 'team':
        return (
          <GenericTextEditor
            data={section.content || {}}
            onSave={handleSave}
            isLoading={isUpdating}
          />
        );
      default:
        return (
          <GenericTextEditor
            data={section.content || {}}
            onSave={handleSave}
            isLoading={isUpdating}
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
    onAddSection({
      title: 'New Section',
      section_key: 'new_section',
      content: {},
      sort_order: sections.length,
      is_active: true
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-slate-700 rounded w-1/4 mx-auto mb-4"></div>
          <div className="h-3 bg-slate-600 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <Card className={cn(
      "border-t-4 border-t-blue-600 relative overflow-hidden",
      "bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm shadow-2xl"
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
      
      <CardHeader className="relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2 text-white">
              <Settings className="h-5 w-5 text-blue-600" />
              {title}
            </CardTitle>
            <p className="text-slate-400">{description}</p>
          </div>
          <Button 
            onClick={addNewSection} 
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="h-4 w-4" />
            Add Section
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="space-y-6">
          {sections?.map((section) => (
            <Card key={section.id} className={cn(
              "relative overflow-hidden border-0 bg-gradient-to-br from-slate-900/60 to-slate-800/60",
              "backdrop-blur-sm hover:shadow-xl transition-all duration-300"
            )}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 to-purple-500/3" />
              
              <CardHeader className="pb-3 relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-white">{section.title || section.section_key}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs bg-slate-800/50 border-blue-400/30 text-blue-300">
                        <Code className="w-3 h-3 mr-1" />
                        {section.section_key}
                      </Badge>
                      <Badge 
                        variant={section.is_active ? 'default' : 'secondary'} 
                        className={cn(
                          "text-xs",
                          section.is_active 
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white" 
                            : "bg-slate-600 text-slate-300"
                        )}
                      >
                        {section.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleEditingMode(section.id)}
                      className="bg-slate-800/50 border-slate-600 hover:bg-slate-700/50 text-slate-300 hover:text-white"
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
              
              <CardContent className="relative z-10">
                {getSectionEditor(section)}
              </CardContent>
            </Card>
          ))}
          
          {sections?.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No sections found. Add your first section to get started.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

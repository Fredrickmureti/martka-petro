
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit3, Code, Settings, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RawJsonEditor } from '../form/json-editor/RawJsonEditor';
import { cn } from '@/lib/utils';

interface SupportPageManagerProps {
  supportContent: any;
  onUpdateSection: (sectionKey: string, data: any) => Promise<void>;
  isUpdating: boolean;
}

export const SupportPageManager = ({
  supportContent,
  onUpdateSection,
  isUpdating
}: SupportPageManagerProps) => {
  const [editingMode, setEditingMode] = useState<{[key: string]: 'form' | 'json'}>({});
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const supportSections = [
    { key: 'hero', name: 'Hero Section', description: 'Main banner and welcome message' },
    { key: 'help_section', name: 'Help Section', description: 'General help and guidance' },
    { key: 'faq_section', name: 'FAQ Section', description: 'Frequently asked questions' },
    { key: 'downloads_section', name: 'Downloads Section', description: 'File downloads and resources' },
    { key: 'contact_section', name: 'Contact Section', description: 'Contact information and details' },
    { key: 'resources_section', name: 'Resources Section', description: 'Additional resources and links' },
    { key: 'community_section', name: 'Community Section', description: 'Community engagement content' },
    { key: 'emergency_section', name: 'Emergency Section', description: 'Emergency contact and procedures' }
  ];

  const startEditing = (sectionKey: string) => {
    setEditingSection(sectionKey);
    const currentData = supportContent?.[sectionKey] || {};
    setFormData({
      title: currentData.title || '',
      description: currentData.description || '',
      subtitle: currentData.content?.subtitle || '',
      phone: currentData.content?.phone || '',
      email: currentData.content?.email || '',
      hours: currentData.content?.hours || '',
      address: currentData.content?.address || '',
      is_active: currentData.is_active ?? true
    });
  };

  const saveSection = async () => {
    if (!editingSection) return;
    
    const updateData: any = {
      title: formData.title,
      description: formData.description,
      is_active: formData.is_active,
      content: {}
    };

    // Add specific content fields based on section type
    if (editingSection === 'contact_section') {
      updateData.content = {
        subtitle: formData.subtitle,
        phone: formData.phone,
        email: formData.email,
        hours: formData.hours,
        address: formData.address
      };
    }

    await onUpdateSection(editingSection, updateData);
    setEditingSection(null);
    setFormData({});
  };

  const toggleEditingMode = (sectionKey: string) => {
    setEditingMode(prev => ({
      ...prev,
      [sectionKey]: prev[sectionKey] === 'json' ? 'form' : 'json'
    }));
  };

  const getSectionEditor = (sectionKey: string, sectionData: any) => {
    const mode = editingMode[sectionKey] || 'form';
    
    if (mode === 'json') {
      return (
        <RawJsonEditor
          label="Section Configuration (JSON)"
          value={JSON.stringify(sectionData || {}, null, 2)}
          onChange={(value) => {
            try {
              const parsedData = JSON.parse(value);
              onUpdateSection(sectionKey, parsedData);
            } catch (error) {
              console.error('Invalid JSON:', error);
            }
          }}
        />
      );
    }

    // Form view
    if (editingSection === sectionKey) {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Section Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter section title"
              />
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter section description"
              rows={3}
            />
          </div>

          {sectionKey === 'contact_section' && (
            <div className="space-y-4 border-t pt-4">
              <h4 className="font-semibold text-blue-300">Contact Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                    placeholder="Contact subtitle"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <Label htmlFor="hours">Hours</Label>
                  <Input
                    id="hours"
                    value={formData.hours}
                    onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))}
                    placeholder="Support hours"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button onClick={saveSection} disabled={isUpdating}>
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button variant="outline" onClick={() => setEditingSection(null)}>
              Cancel
            </Button>
          </div>
        </div>
      );
    }

    // Display view
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-blue-300">Title:</span>
            <p className="text-slate-300">{sectionData?.title || 'Not set'}</p>
          </div>
          <div>
            <span className="font-medium text-blue-300">Status:</span>
            <Badge variant={sectionData?.is_active ? 'default' : 'secondary'} className="ml-2">
              {sectionData?.is_active ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>
        
        <div>
          <span className="font-medium text-blue-300">Description:</span>
          <p className="text-slate-300 text-sm mt-1">{sectionData?.description || 'Not set'}</p>
        </div>

        {sectionData?.content && Object.keys(sectionData.content).length > 0 && (
          <div>
            <span className="font-medium text-blue-300">Additional Content:</span>
            <div className="bg-slate-900/50 rounded-lg p-3 mt-2">
              {Object.entries(sectionData.content).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-slate-400 capitalize">{key.replace('_', ' ')}:</span>
                  <span className="text-slate-300">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="border-t-4 border-t-purple-600">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-purple-600" />
              Support Page Network
            </CardTitle>
            <p className="text-muted-foreground">Configure support page sections with user-friendly forms or technical JSON editing.</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {supportSections.map((section) => {
            const sectionData = supportContent?.[section.key];
            
            return (
              <Card key={section.key} className={cn(
                "relative overflow-hidden border-0 bg-gradient-to-br from-slate-900/80 to-slate-800/80",
                "backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500"
              )}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5" />
                
                <CardHeader className="pb-3 relative z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-white flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                          <Eye className="h-4 w-4 text-white" />
                        </div>
                        {section.name}
                      </CardTitle>
                      <p className="text-slate-400 text-sm mt-1">{section.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs bg-slate-800/50 border-purple-400/30 text-purple-300">
                          <Code className="w-3 h-3 mr-1" />
                          {section.key}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleEditingMode(section.key)}
                        className="bg-slate-800/50 border-slate-600 hover:bg-slate-700/50"
                      >
                        {editingMode[section.key] === 'json' ? (
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
                      {editingSection !== section.key && editingMode[section.key] !== 'json' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEditing(section.key)}
                          className="bg-slate-800/50 border-slate-600 hover:bg-slate-700/50"
                        >
                          <Edit3 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  {getSectionEditor(section.key, sectionData)}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};


import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentSection {
  id: number;
  title: string;
  section_key: string;
  content: any;
  is_active: boolean;
  sort_order: number;
}

interface UserFriendlyContentEditorProps {
  title: string;
  description: string;
  sections: ContentSection[];
  isLoading: boolean;
  onUpdateSection: (sectionId: number, data: any) => Promise<void>;
  onAddSection: (data: any) => Promise<void>;
  isUpdating: boolean;
}

export const UserFriendlyContentEditor = ({
  title,
  description,
  sections,
  isLoading,
  onUpdateSection,
  onAddSection,
  isUpdating
}: UserFriendlyContentEditorProps) => {
  const { toast } = useToast();
  const [editingSection, setEditingSection] = useState<number | null>(null);
  const [isAddingSection, setIsAddingSection] = useState(false);
  
  const [editData, setEditData] = useState({
    title: '',
    section_key: '',
    links: [] as { label: string; url: string }[],
    text_content: '',
    contact_info: [] as { type: string; value: string }[]
  });

  const [newSectionData, setNewSectionData] = useState({
    title: '',
    section_key: '',
    type: 'links' as 'links' | 'text' | 'contact'
  });

  const parseContentForEditing = (content: any) => {
    const links = content?.links || [];
    const text_content = content?.text || content?.description || '';
    const contact_info = content?.contact || content?.info || [];
    
    return { links, text_content, contact_info };
  };

  const startEditing = (section: ContentSection) => {
    setEditingSection(section.id);
    const parsed = parseContentForEditing(section.content);
    setEditData({
      title: section.title,
      section_key: section.section_key,
      ...parsed
    });
  };

  const cancelEditing = () => {
    setEditingSection(null);
    setEditData({
      title: '',
      section_key: '',
      links: [],
      text_content: '',
      contact_info: []
    });
  };

  const saveSection = async () => {
    if (!editingSection) return;
    
    const content: any = {};
    
    if (editData.links.length > 0) {
      content.links = editData.links.filter(link => link.label && link.url);
    }
    
    if (editData.text_content) {
      content.text = editData.text_content;
    }
    
    if (editData.contact_info.length > 0) {
      content.contact = editData.contact_info.filter(info => info.type && info.value);
    }

    try {
      await onUpdateSection(editingSection, {
        title: editData.title,
        section_key: editData.section_key,
        content: content
      });
      
      toast({
        title: 'Success',
        description: 'Section updated successfully!',
      });
      
      setEditingSection(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update section',
        variant: 'destructive',
      });
    }
  };

  const addLink = () => {
    setEditData(prev => ({
      ...prev,
      links: [...prev.links, { label: '', url: '' }]
    }));
  };

  const removeLink = (index: number) => {
    setEditData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const updateLink = (index: number, field: 'label' | 'url', value: string) => {
    setEditData(prev => ({
      ...prev,
      links: prev.links.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const addContactInfo = () => {
    setEditData(prev => ({
      ...prev,
      contact_info: [...prev.contact_info, { type: '', value: '' }]
    }));
  };

  const removeContactInfo = (index: number) => {
    setEditData(prev => ({
      ...prev,
      contact_info: prev.contact_info.filter((_, i) => i !== index)
    }));
  };

  const updateContactInfo = (index: number, field: 'type' | 'value', value: string) => {
    setEditData(prev => ({
      ...prev,
      contact_info: prev.contact_info.map((info, i) => 
        i === index ? { ...info, [field]: value } : info
      )
    }));
  };

  const addNewSection = async () => {
    const content: any = {};
    
    if (newSectionData.type === 'links') {
      content.links = [];
    } else if (newSectionData.type === 'text') {
      content.text = '';
    } else if (newSectionData.type === 'contact') {
      content.contact = [];
    }

    try {
      await onAddSection({
        title: newSectionData.title,
        section_key: newSectionData.section_key,
        content: content,
        sort_order: sections.length,
        is_active: true
      });
      
      toast({
        title: 'Success',
        description: 'New section added successfully!',
      });
      
      setIsAddingSection(false);
      setNewSectionData({ title: '', section_key: '', type: 'links' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add new section',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading content...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Button onClick={() => setIsAddingSection(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Section
        </Button>
      </div>

      {isAddingSection && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg">Add New Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Section Title</Label>
                <Input
                  value={newSectionData.title}
                  onChange={(e) => setNewSectionData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Quick Links"
                />
              </div>
              <div>
                <Label>Section Key</Label>
                <Input
                  value={newSectionData.section_key}
                  onChange={(e) => setNewSectionData(prev => ({ ...prev, section_key: e.target.value }))}
                  placeholder="e.g. quick_links"
                />
              </div>
            </div>
            <div>
              <Label>Section Type</Label>
              <select 
                className="w-full p-2 border rounded-md"
                value={newSectionData.type}
                onChange={(e) => setNewSectionData(prev => ({ ...prev, type: e.target.value as any }))}
              >
                <option value="links">Links Section</option>
                <option value="text">Text Content</option>
                <option value="contact">Contact Information</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button onClick={addNewSection}>Add Section</Button>
              <Button variant="outline" onClick={() => setIsAddingSection(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid gap-6">
        {sections?.map((section) => (
          <Card key={section.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base">{section.title}</CardTitle>
                <Badge variant={section.is_active ? 'default' : 'secondary'}>
                  {section.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              {editingSection === section.id ? (
                <div className="flex gap-2">
                  <Button size="sm" onClick={saveSection} disabled={isUpdating}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={cancelEditing}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button size="sm" variant="outline" onClick={() => startEditing(section)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {editingSection === section.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Section Title</Label>
                      <Input
                        value={editData.title}
                        onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Section Key</Label>
                      <Input
                        value={editData.section_key}
                        onChange={(e) => setEditData(prev => ({ ...prev, section_key: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Links Section */}
                  {(section.content?.links || editData.links.length > 0) && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Links</Label>
                        <Button size="sm" variant="outline" onClick={addLink}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Link
                        </Button>
                      </div>
                      {editData.links.map((link, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <Input
                            placeholder="Link text"
                            value={link.label}
                            onChange={(e) => updateLink(index, 'label', e.target.value)}
                          />
                          <Input
                            placeholder="URL"
                            value={link.url}
                            onChange={(e) => updateLink(index, 'url', e.target.value)}
                          />
                          <Button size="sm" variant="outline" onClick={() => removeLink(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Text Content */}
                  {(section.content?.text || section.content?.description) && (
                    <div>
                      <Label>Text Content</Label>
                      <Textarea
                        value={editData.text_content}
                        onChange={(e) => setEditData(prev => ({ ...prev, text_content: e.target.value }))}
                        rows={4}
                      />
                    </div>
                  )}

                  {/* Contact Information */}
                  {(section.content?.contact || section.content?.info || editData.contact_info.length > 0) && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Contact Information</Label>
                        <Button size="sm" variant="outline" onClick={addContactInfo}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Info
                        </Button>
                      </div>
                      {editData.contact_info.map((info, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <Input
                            placeholder="Type (e.g. phone, email)"
                            value={info.type}
                            onChange={(e) => updateContactInfo(index, 'type', e.target.value)}
                          />
                          <Input
                            placeholder="Value"
                            value={info.value}
                            onChange={(e) => updateContactInfo(index, 'value', e.target.value)}
                          />
                          <Button size="sm" variant="outline" onClick={() => removeContactInfo(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm"><strong>Key:</strong> {section.section_key}</p>
                  {section.content?.links && (
                    <div>
                      <p className="text-sm font-medium">Links:</p>
                      <ul className="text-sm text-muted-foreground list-disc list-inside">
                        {section.content.links.map((link: any, index: number) => (
                          <li key={index}>{link.label}: {link.url}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {(section.content?.text || section.content?.description) && (
                    <div>
                      <p className="text-sm font-medium">Content:</p>
                      <p className="text-sm text-muted-foreground">{section.content.text || section.content.description}</p>
                    </div>
                  )}
                  {(section.content?.contact || section.content?.info) && (
                    <div>
                      <p className="text-sm font-medium">Contact Info:</p>
                      <ul className="text-sm text-muted-foreground list-disc list-inside">
                        {(section.content.contact || section.content.info).map((info: any, index: number) => (
                          <li key={index}>{info.type}: {info.value}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

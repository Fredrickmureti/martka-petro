
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Save } from 'lucide-react';

interface QuickLink {
  label: string;
  url: string;
}

interface QuickLinksData {
  links: QuickLink[];
}

interface QuickLinksEditorProps {
  data: QuickLinksData;
  onSave: (data: QuickLinksData) => void;
  isLoading?: boolean;
}

export const QuickLinksEditor = ({ data, onSave, isLoading }: QuickLinksEditorProps) => {
  const [links, setLinks] = useState<QuickLink[]>(data.links || []);

  const addLink = () => {
    setLinks([...links, { label: '', url: '' }]);
  };

  const updateLink = (index: number, field: keyof QuickLink, value: string) => {
    const updated = [...links];
    updated[index] = { ...updated[index], [field]: value };
    setLinks(updated);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave({
      links: links.filter(link => link.label && link.url)
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Navigation Links</Label>
            <Button type="button" onClick={addLink} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add Link
            </Button>
          </div>
          
          {links.map((link, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1">
                <Label>Label</Label>
                <Input
                  value={link.label}
                  onChange={(e) => updateLink(index, 'label', e.target.value)}
                  placeholder="e.g. Home, About, Services"
                />
              </div>
              <div className="flex-1">
                <Label>URL</Label>
                <Input
                  value={link.url}
                  onChange={(e) => updateLink(index, 'url', e.target.value)}
                  placeholder="/home, /about, /services"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeLink(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          {links.length === 0 && (
            <p className="text-muted-foreground text-sm">No links added yet.</p>
          )}
        </div>

        <Button onClick={handleSave} disabled={isLoading} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Quick Links'}
        </Button>
      </CardContent>
    </Card>
  );
};

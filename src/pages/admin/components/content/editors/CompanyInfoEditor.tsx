
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Save } from 'lucide-react';

interface SocialLink {
  platform: string;
  url: string;
}

interface CompanyInfoData {
  description: string;
  social_links: SocialLink[];
}

interface CompanyInfoEditorProps {
  data: CompanyInfoData;
  onSave: (data: CompanyInfoData) => void;
  isLoading?: boolean;
}

export const CompanyInfoEditor = ({ data, onSave, isLoading }: CompanyInfoEditorProps) => {
  const [description, setDescription] = useState(data.description || '');
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(data.social_links || []);

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: '', url: '' }]);
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    const updated = [...socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    setSocialLinks(updated);
  };

  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave({
      description,
      social_links: socialLinks.filter(link => link.platform && link.url)
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="description">Company Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your company description..."
            rows={4}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Social Media Links</Label>
            <Button type="button" onClick={addSocialLink} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add Link
            </Button>
          </div>
          
          {socialLinks.map((link, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1">
                <Label>Platform</Label>
                <Input
                  value={link.platform}
                  onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                  placeholder="e.g. facebook, twitter, linkedin"
                />
              </div>
              <div className="flex-1">
                <Label>URL</Label>
                <Input
                  value={link.url}
                  onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeSocialLink(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          {socialLinks.length === 0 && (
            <p className="text-muted-foreground text-sm">No social links added yet.</p>
          )}
        </div>

        <Button onClick={handleSave} disabled={isLoading} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Company Info'}
        </Button>
      </CardContent>
    </Card>
  );
};


import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Edit, Plus, Settings } from 'lucide-react';

interface ContentSectionCardProps {
  section: {
    id: number;
    title: string;
    section_key: string;
    content: any;
    is_active: boolean;
  };
  onUpdate: (id: number, data: any) => void;
  isUpdating: boolean;
}

const ContentSectionCard = ({ section, onUpdate, isUpdating }: ContentSectionCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: section.title || '',
    content: JSON.stringify(section.content, null, 2)
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedContent = JSON.parse(formData.content);
      onUpdate(section.id, {
        title: formData.title,
        content: parsedContent,
      });
      setIsEditing(false);
    } catch (error) {
      alert('Invalid JSON format. Please check your content structure.');
    }
  };

  const handleCancel = () => {
    setFormData({
      title: section.title || '',
      content: JSON.stringify(section.content, null, 2)
    });
    setIsEditing(false);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-600" />
              {section.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {section.section_key}
              </Badge>
              <Badge variant={section.is_active ? "default" : "secondary"} className="text-xs">
                {section.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor={`title_${section.id}`}>Section Title</Label>
              <Input
                id={`title_${section.id}`}
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter section title"
                required
              />
            </div>
            
            <div>
              <Label htmlFor={`content_${section.id}`}>Content (JSON Format)</Label>
              <Textarea
                id={`content_${section.id}`}
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={12}
                className="font-mono text-sm"
                placeholder="Enter valid JSON content"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Content must be in valid JSON format. Check your syntax carefully.
              </p>
            </div>
            
            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={isUpdating} className="flex-1">
                {isUpdating ? 'Updating...' : 'Save Changes'}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Current Content Preview:</h4>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-md p-3 text-sm">
                <pre className="whitespace-pre-wrap text-xs overflow-x-auto">
                  {JSON.stringify(section.content, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentSectionCard;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save } from 'lucide-react';

interface BackgroundFormProps {
  form: {
    page_name: string;
    section_key: string;
    image_url: string;
    overlay_opacity: number;
    is_active: boolean;
  };
  setForm: (form: any) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  submitText: string;
  showCancel?: boolean;
}

const BackgroundForm: React.FC<BackgroundFormProps> = ({
  form,
  setForm,
  onSubmit,
  onCancel,
  submitText,
  showCancel = false
}) => {
  const pageOptions = [
    { value: 'home', label: 'Home Page' },
    { value: 'about', label: 'About Page' },
    { value: 'support', label: 'Support Page' },
    { value: 'careers', label: 'Careers Page' },
  ];

  const sectionOptions = [
    { value: 'hero', label: 'Hero Section' },
    { value: 'services', label: 'Services Section' },
    { value: 'about', label: 'About Section' },
    { value: 'projects', label: 'Projects Section' },
  ];

  return (
    <div className="space-y-4">
      <div>
        <Label>Page</Label>
        <Select value={form.page_name} onValueChange={(value) => setForm({...form, page_name: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select page" />
          </SelectTrigger>
          <SelectContent>
            {pageOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Section</Label>
        <Select value={form.section_key} onValueChange={(value) => setForm({...form, section_key: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select section" />
          </SelectTrigger>
          <SelectContent>
            {sectionOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Background Image URL</Label>
        <Input
          value={form.image_url}
          onChange={(e) => setForm({...form, image_url: e.target.value})}
          placeholder="https://images.unsplash.com/..."
        />
      </div>
      <div>
        <Label>Overlay Opacity</Label>
        <Input
          type="number"
          step="0.1"
          min="0"
          max="1"
          value={form.overlay_opacity}
          onChange={(e) => setForm({...form, overlay_opacity: parseFloat(e.target.value)})}
        />
      </div>
      <div className="flex space-x-2">
        <Button onClick={onSubmit} className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          {submitText}
        </Button>
        {showCancel && onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default BackgroundForm;

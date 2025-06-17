
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save } from 'lucide-react';

interface SectionFormProps {
  form: {
    page_name: string;
    section_key: string;
    title: string;
    subtitle: string;
    description: string;
    image_url: string;
    content: any;
    is_active: boolean;
    sort_order: number;
  };
  setForm: (form: any) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  submitText: string;
  showCancel?: boolean;
}

const SectionForm: React.FC<SectionFormProps> = ({
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
    <div className="space-y-4 max-h-96 overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
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
      </div>
      <div>
        <Label>Title</Label>
        <Input
          value={form.title}
          onChange={(e) => setForm({...form, title: e.target.value})}
        />
      </div>
      <div>
        <Label>Subtitle</Label>
        <Input
          value={form.subtitle}
          onChange={(e) => setForm({...form, subtitle: e.target.value})}
        />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={form.description}
          onChange={(e) => setForm({...form, description: e.target.value})}
          rows={3}
        />
      </div>
      <div>
        <Label>Content Image URL</Label>
        <Input
          value={form.image_url}
          onChange={(e) => setForm({...form, image_url: e.target.value})}
          placeholder="https://images.unsplash.com/..."
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

export default SectionForm;

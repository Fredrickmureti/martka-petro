
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';

interface ContactInfoData {
  address: string;
  phone: string;
  email: string;
}

interface ContactInfoEditorProps {
  data: ContactInfoData;
  onSave: (data: ContactInfoData) => void;
  isLoading?: boolean;
}

export const ContactInfoEditor = ({ data, onSave, isLoading }: ContactInfoEditorProps) => {
  const [formData, setFormData] = useState<ContactInfoData>({
    address: data.address || '',
    phone: data.phone || '',
    email: data.email || ''
  });

  const updateField = (field: keyof ContactInfoData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => updateField('address', e.target.value)}
            placeholder="Enter your business address..."
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="info@company.com"
          />
        </div>

        <Button onClick={handleSave} disabled={isLoading} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Contact Info'}
        </Button>
      </CardContent>
    </Card>
  );
};

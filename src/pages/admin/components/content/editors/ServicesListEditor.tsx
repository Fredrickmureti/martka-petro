
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Save } from 'lucide-react';

interface ServicesData {
  items: string[];
}

interface ServicesListEditorProps {
  data: ServicesData;
  onSave: (data: ServicesData) => void;
  isLoading?: boolean;
}

export const ServicesListEditor = ({ data, onSave, isLoading }: ServicesListEditorProps) => {
  const [services, setServices] = useState<string[]>(data.items || []);

  const addService = () => {
    setServices([...services, '']);
  };

  const updateService = (index: number, value: string) => {
    const updated = [...services];
    updated[index] = value;
    setServices(updated);
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave({
      items: services.filter(service => service.trim())
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Services List</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Services</Label>
            <Button type="button" onClick={addService} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add Service
            </Button>
          </div>
          
          {services.map((service, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                value={service}
                onChange={(e) => updateService(index, e.target.value)}
                placeholder="Enter service name..."
                className="flex-1"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeService(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          {services.length === 0 && (
            <p className="text-muted-foreground text-sm">No services added yet.</p>
          )}
        </div>

        <Button onClick={handleSave} disabled={isLoading} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Services'}
        </Button>
      </CardContent>
    </Card>
  );
};


import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface SpecificationItem {
  key: string;
  value: string;
}

interface SpecificationsEditorProps {
  items: SpecificationItem[];
  onUpdateItem: (index: number, item: SpecificationItem) => void;
  onRemoveItem: (index: number) => void;
  onAddItem: () => void;
}

export const SpecificationsEditor = ({
  items,
  onUpdateItem,
  onRemoveItem,
  onAddItem,
}: SpecificationsEditorProps) => {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <Card key={index}>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`spec-key-${index}`}>Specification Name</Label>
                <Input
                  id={`spec-key-${index}`}
                  value={item.key}
                  onChange={(e) => onUpdateItem(index, { ...item, key: e.target.value })}
                  placeholder="e.g., Dimensions, Weight, Material"
                />
              </div>
              <div>
                <Label htmlFor={`spec-value-${index}`}>Value</Label>
                <div className="flex gap-2">
                  <Input
                    id={`spec-value-${index}`}
                    value={item.value}
                    onChange={(e) => onUpdateItem(index, { ...item, value: e.target.value })}
                    placeholder="e.g., 10 x 5 x 3 inches, 2.5 kg"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => onRemoveItem(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Button
        type="button"
        variant="outline"
        onClick={onAddItem}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Specification
      </Button>
    </div>
  );
};

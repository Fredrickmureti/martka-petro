
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Edit3, Check, X } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  type: 'array' | 'object' | 'documents' | 'gallery_images';
  label: string;
  placeholder?: string;
}

export const JsonEditor = ({ value, onChange, type, label, placeholder }: JsonEditorProps) => {
  const [items, setItems] = useState<any[]>([]);
  const [isRawMode, setIsRawMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    try {
      if (value && value.trim()) {
        const parsed = JSON.parse(value);
        setItems(Array.isArray(parsed) ? parsed : []);
      } else {
        setItems([]);
      }
    } catch {
      setItems([]);
      setIsRawMode(true);
    }
  }, [value]);

  const updateValue = (newItems: any[]) => {
    setItems(newItems);
    onChange(JSON.stringify(newItems, null, 2));
  };

  const addItem = () => {
    let newItem;
    switch (type) {
      case 'array':
        newItem = '';
        break;
      case 'documents':
        newItem = { name: '', type: 'datasheet', url: '' };
        break;
      case 'gallery_images':
        newItem = { url: '', alt: '' };
        break;
      default:
        newItem = {};
    }
    updateValue([...items, newItem]);
  };

  const removeItem = (index: number) => {
    updateValue(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, newItem: any) => {
    const newItems = [...items];
    newItems[index] = newItem;
    updateValue(newItems);
    setEditingIndex(null);
  };

  if (isRawMode) {
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>{label}</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsRawMode(false)}
          >
            <Edit3 className="h-4 w-4 mr-1" />
            Visual Editor
          </Button>
        </div>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={8}
          className="font-mono text-sm"
        />
      </div>
    );
  }

  const renderArrayEditor = () => (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2 items-center">
          <Input
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder={`Item ${index + 1}`}
            className="flex-1"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => removeItem(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );

  const renderDocumentsEditor = () => (
    <div className="space-y-3">
      {items.map((item, index) => (
        <Card key={index}>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label>Document Name</Label>
                <Input
                  value={item.name || ''}
                  onChange={(e) => updateItem(index, { ...item, name: e.target.value })}
                  placeholder="e.g., Product Datasheet"
                />
              </div>
              <div>
                <Label>Type</Label>
                <Input
                  value={item.type || ''}
                  onChange={(e) => updateItem(index, { ...item, type: e.target.value })}
                  placeholder="e.g., datasheet, manual"
                />
              </div>
              <div>
                <Label>URL</Label>
                <Input
                  value={item.url || ''}
                  onChange={(e) => updateItem(index, { ...item, url: e.target.value })}
                  placeholder="https://example.com/doc.pdf"
                />
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeItem(index)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderGalleryImagesEditor = () => (
    <div className="space-y-3">
      {items.map((item, index) => (
        <Card key={index}>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label>Image URL</Label>
                <Input
                  value={item.url || ''}
                  onChange={(e) => updateItem(index, { ...item, url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <Label>Alt Text</Label>
                <Input
                  value={item.alt || ''}
                  onChange={(e) => updateItem(index, { ...item, alt: e.target.value })}
                  placeholder="Description of the image"
                />
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeItem(index)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsRawMode(true)}
          >
            <Edit3 className="h-4 w-4 mr-1" />
            JSON Mode
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addItem}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Item
          </Button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
          <p>No items added yet. Click "Add Item" to get started.</p>
        </div>
      ) : (
        <>
          {type === 'array' && renderArrayEditor()}
          {type === 'documents' && renderDocumentsEditor()}
          {type === 'gallery_images' && renderGalleryImagesEditor()}
        </>
      )}
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { JsonEditorHeader } from './json-editor/JsonEditorHeader';
import { RawJsonEditor } from './json-editor/RawJsonEditor';
import { ArrayEditor } from './json-editor/ArrayEditor';
import { DocumentsEditor } from './json-editor/DocumentsEditor';
import { GalleryImagesEditor } from './json-editor/GalleryImagesEditor';
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
  };

  if (isRawMode) {
    return (
      <div className="space-y-4">
        <JsonEditorHeader
          label={label}
          isRawMode={isRawMode}
          onToggleRawMode={() => setIsRawMode(false)}
          onAddItem={addItem}
        />
        <RawJsonEditor
          label=""
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <JsonEditorHeader
        label={label}
        isRawMode={isRawMode}
        onToggleRawMode={() => setIsRawMode(true)}
        onAddItem={addItem}
      />

      {items.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
          <p>No items added yet. Click "Add Item" to get started.</p>
        </div>
      ) : (
        <>
          {type === 'array' && (
            <ArrayEditor
              items={items}
              onUpdateItem={(index, value) => updateItem(index, value)}
              onRemoveItem={removeItem}
            />
          )}
          {type === 'documents' && (
            <DocumentsEditor
              items={items}
              onUpdateItem={updateItem}
              onRemoveItem={removeItem}
            />
          )}
          {type === 'gallery_images' && (
            <GalleryImagesEditor
              items={items}
              onUpdateItem={updateItem}
              onRemoveItem={removeItem}
            />
          )}
        </>
      )}
    </div>
  );
};

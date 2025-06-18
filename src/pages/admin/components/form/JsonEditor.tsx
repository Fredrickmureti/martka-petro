
import React, { useState, useEffect } from 'react';
import { JsonEditorHeader } from './json-editor/JsonEditorHeader';
import { RawJsonEditor } from './json-editor/RawJsonEditor';
import { ArrayEditor } from './json-editor/ArrayEditor';
import { DocumentsEditor } from './json-editor/DocumentsEditor';
import { GalleryImagesEditor } from './json-editor/GalleryImagesEditor';
import { SpecificationsEditor } from './json-editor/SpecificationsEditor';
import { VideoEditor } from './json-editor/VideoEditor';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  type: 'array' | 'object' | 'documents' | 'gallery_images' | 'specifications' | 'videos';
  label: string;
  placeholder?: string;
}

export const JsonEditor = ({ value, onChange, type, label, placeholder }: JsonEditorProps) => {
  const [items, setItems] = useState<any[]>([]);
  const [specificationItems, setSpecificationItems] = useState<{key: string; value: string}[]>([]);
  const [isRawMode, setIsRawMode] = useState(false);

  useEffect(() => {
    try {
      if (value && value.trim()) {
        const parsed = JSON.parse(value);
        if (type === 'specifications') {
          // Convert object to key-value pairs for form editing
          const specs = Object.entries(parsed).map(([key, value]) => ({
            key,
            value: String(value)
          }));
          setSpecificationItems(specs);
        } else {
          setItems(Array.isArray(parsed) ? parsed : []);
        }
      } else {
        if (type === 'specifications') {
          setSpecificationItems([]);
        } else {
          setItems([]);
        }
      }
    } catch {
      if (type === 'specifications') {
        setSpecificationItems([]);
      } else {
        setItems([]);
      }
      setIsRawMode(true);
    }
  }, [value, type]);

  const updateValue = (newItems: any[]) => {
    setItems(newItems);
    onChange(JSON.stringify(newItems, null, 2));
  };

  const updateSpecifications = (newSpecs: {key: string; value: string}[]) => {
    setSpecificationItems(newSpecs);
    // Convert key-value pairs back to object
    const specsObject = newSpecs.reduce((acc, spec) => {
      if (spec.key.trim()) {
        acc[spec.key] = spec.value;
      }
      return acc;
    }, {} as Record<string, string>);
    onChange(JSON.stringify(specsObject, null, 2));
  };

  const addItem = () => {
    if (type === 'specifications') {
      updateSpecifications([...specificationItems, { key: '', value: '' }]);
    } else {
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
        case 'videos':
          newItem = { url: '', alt: '', type: 'video' };
          break;
        default:
          newItem = {};
      }
      updateValue([...items, newItem]);
    }
  };

  const removeItem = (index: number) => {
    if (type === 'specifications') {
      updateSpecifications(specificationItems.filter((_, i) => i !== index));
    } else {
      updateValue(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, newItem: any) => {
    if (type === 'specifications') {
      const newSpecs = [...specificationItems];
      newSpecs[index] = newItem;
      updateSpecifications(newSpecs);
    } else {
      const newItems = [...items];
      newItems[index] = newItem;
      updateValue(newItems);
    }
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

  const hasItems = type === 'specifications' ? specificationItems.length > 0 : items.length > 0;

  return (
    <div className="space-y-4">
      <JsonEditorHeader
        label={label}
        isRawMode={isRawMode}
        onToggleRawMode={() => setIsRawMode(true)}
        onAddItem={addItem}
      />

      {!hasItems ? (
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
          {type === 'videos' && (
            <VideoEditor
              items={items}
              onUpdateItem={updateItem}
              onRemoveItem={removeItem}
              onAddItem={addItem}
            />
          )}
          {type === 'specifications' && (
            <SpecificationsEditor
              items={specificationItems}
              onUpdateItem={updateItem}
              onRemoveItem={removeItem}
              onAddItem={addItem}
            />
          )}
        </>
      )}
    </div>
  );
};


import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Trash2 } from 'lucide-react';

interface GalleryImage {
  url?: string;
  alt?: string;
}

interface GalleryImagesEditorProps {
  items: GalleryImage[];
  onUpdateItem: (index: number, item: GalleryImage) => void;
  onRemoveItem: (index: number) => void;
}

export const GalleryImagesEditor = ({ items, onUpdateItem, onRemoveItem }: GalleryImagesEditorProps) => {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <Card key={index}>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label>Image URL</Label>
                <Input
                  value={item.url || ''}
                  onChange={(e) => onUpdateItem(index, { ...item, url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <Label>Alt Text</Label>
                <Input
                  value={item.alt || ''}
                  onChange={(e) => onUpdateItem(index, { ...item, alt: e.target.value })}
                  placeholder="Description of the image"
                />
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => onRemoveItem(index)}
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
};

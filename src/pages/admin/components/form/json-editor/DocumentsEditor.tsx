
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Trash2 } from 'lucide-react';

interface Document {
  name?: string;
  type?: string;
  url?: string;
}

interface DocumentsEditorProps {
  items: Document[];
  onUpdateItem: (index: number, item: Document) => void;
  onRemoveItem: (index: number) => void;
}

export const DocumentsEditor = ({ items, onUpdateItem, onRemoveItem }: DocumentsEditorProps) => {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <Card key={index}>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label>Document Name</Label>
                <Input
                  value={item.name || ''}
                  onChange={(e) => onUpdateItem(index, { ...item, name: e.target.value })}
                  placeholder="e.g., Product Datasheet"
                />
              </div>
              <div>
                <Label>Type</Label>
                <Input
                  value={item.type || ''}
                  onChange={(e) => onUpdateItem(index, { ...item, type: e.target.value })}
                  placeholder="e.g., datasheet, manual"
                />
              </div>
              <div>
                <Label>URL</Label>
                <Input
                  value={item.url || ''}
                  onChange={(e) => onUpdateItem(index, { ...item, url: e.target.value })}
                  placeholder="https://example.com/doc.pdf"
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

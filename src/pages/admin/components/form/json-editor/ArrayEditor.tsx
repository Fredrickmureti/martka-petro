
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';

interface ArrayEditorProps {
  items: string[];
  onUpdateItem: (index: number, value: string) => void;
  onRemoveItem: (index: number) => void;
}

export const ArrayEditor = ({ items, onUpdateItem, onRemoveItem }: ArrayEditorProps) => {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2 items-center">
          <Input
            value={item}
            onChange={(e) => onUpdateItem(index, e.target.value)}
            placeholder={`Item ${index + 1}`}
            className="flex-1"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => onRemoveItem(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

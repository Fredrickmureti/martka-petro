
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, Edit3 } from 'lucide-react';

interface JsonEditorHeaderProps {
  label: string;
  isRawMode: boolean;
  onToggleRawMode: () => void;
  onAddItem: () => void;
}

export const JsonEditorHeader = ({ label, isRawMode, onToggleRawMode, onAddItem }: JsonEditorHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onToggleRawMode}
        >
          <Edit3 className="h-4 w-4 mr-1" />
          {isRawMode ? 'Visual Editor' : 'JSON Mode'}
        </Button>
        {!isRawMode && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddItem}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Item
          </Button>
        )}
      </div>
    </div>
  );
};

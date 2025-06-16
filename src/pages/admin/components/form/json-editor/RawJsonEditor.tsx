
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface RawJsonEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const RawJsonEditor = ({ label, value, onChange, placeholder }: RawJsonEditorProps) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={8}
        className="font-mono text-sm"
      />
    </div>
  );
};


import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImagePreviewProps {
  url: string;
  alt?: string;
  onRemove?: () => void;
  className?: string;
}

export const ImagePreview = ({ url, alt = "Preview", onRemove, className = "" }: ImagePreviewProps) => {
  if (!url) return null;

  return (
    <div className={`relative group rounded-lg overflow-hidden border bg-muted/50 ${className}`}>
      <img
        src={url}
        alt={alt}
        className="w-full h-full object-cover transition-all duration-200 group-hover:scale-105"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/placeholder.svg';
        }}
      />
      {onRemove && (
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onRemove}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

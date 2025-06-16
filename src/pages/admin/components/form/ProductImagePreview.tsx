
import { useState, useEffect } from 'react';
import { ImagePreview } from './ImagePreview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductImagePreviewProps {
  imageUrl: string;
  galleryJson: string;
}

export const ProductImagePreview = ({ imageUrl, galleryJson }: ProductImagePreviewProps) => {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    try {
      if (galleryJson && galleryJson.trim()) {
        const parsed = JSON.parse(galleryJson);
        if (Array.isArray(parsed)) {
          setGalleryImages(parsed.filter(url => typeof url === 'string' && url.trim()));
        }
      } else {
        setGalleryImages([]);
      }
    } catch {
      setGalleryImages([]);
    }
  }, [galleryJson]);

  if (!imageUrl && galleryImages.length === 0) {
    return null;
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Image Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {imageUrl && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Main Image</p>
            <ImagePreview
              url={imageUrl}
              alt="Product main image"
              className="aspect-video max-w-xs"
            />
          </div>
        )}
        
        {galleryImages.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Gallery Images ({galleryImages.length})</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {galleryImages.map((url, index) => (
                <ImagePreview
                  key={index}
                  url={url}
                  alt={`Gallery image ${index + 1}`}
                  className="aspect-square"
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

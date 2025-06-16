
import { useState, useEffect } from 'react';
import { ImagePreview } from '../components/form/ImagePreview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProjectImagePreviewProps {
  heroImageUrl: string;
  galleryImagesJson: string;
}

interface GalleryImage {
  url: string;
  alt: string;
}

export const ProjectImagePreview = ({ heroImageUrl, galleryImagesJson }: ProjectImagePreviewProps) => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    try {
      if (galleryImagesJson && galleryImagesJson.trim()) {
        const parsed = JSON.parse(galleryImagesJson);
        if (Array.isArray(parsed)) {
          const validImages = parsed.filter(img => 
            img && typeof img === 'object' && 
            typeof img.url === 'string' && 
            img.url.trim()
          );
          setGalleryImages(validImages);
        }
      } else {
        setGalleryImages([]);
      }
    } catch {
      setGalleryImages([]);
    }
  }, [galleryImagesJson]);

  if (!heroImageUrl && galleryImages.length === 0) {
    return null;
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Image Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {heroImageUrl && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Hero Image</p>
            <ImagePreview
              url={heroImageUrl}
              alt="Project hero image"
              className="aspect-video max-w-xs"
            />
          </div>
        )}
        
        {galleryImages.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Gallery Images ({galleryImages.length})</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {galleryImages.map((image, index) => (
                <div key={index} className="space-y-1">
                  <ImagePreview
                    url={image.url}
                    alt={image.alt || `Gallery image ${index + 1}`}
                    className="aspect-square"
                  />
                  {image.alt && (
                    <p className="text-xs text-muted-foreground truncate px-1">
                      {image.alt}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

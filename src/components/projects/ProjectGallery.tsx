import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProjectImage } from '@/types/project';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ProjectGalleryProps {
  images: ProjectImage[];
}

const ProjectGallery = ({ images }: ProjectGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'All Images' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'technical', label: 'Technical' },
    { id: 'progress', label: 'Progress' }
  ];

  const filteredImages = activeFilter === 'all' 
    ? images 
    : images.filter(img => img.type === activeFilter);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = images.indexOf(filteredImages[selectedImage]);

    if (direction === 'prev') {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
      setSelectedImage(images.indexOf(filteredImages[prevIndex]));
    } else {
      const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
      setSelectedImage(images.indexOf(filteredImages[nextIndex]));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Project Gallery</h2>
        
        <div className="flex gap-2">
          {filters.map(filter => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className={activeFilter === filter.id ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredImages.map((image, index) => {
          const originalIndex = images.indexOf(image);
          return (
            <Card 
              key={index} 
              className="overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300"
              onClick={() => setSelectedImage(originalIndex)}
            >
              <div className="relative">
                <img 
                  src={image.url} 
                  alt={image.alt}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white text-sm">{image.alt}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full h-full max-h-[90vh] p-0">
          {selectedImage !== null && images[selectedImage] && (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={() => navigateImage('prev')}
              >
                <ChevronLeft size={24} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={() => navigateImage('next')}
              >
                <ChevronRight size={24} />
              </Button>
              
              <img 
                src={images[selectedImage].url}
                alt={images[selectedImage].alt}
                className="max-w-full max-h-full object-contain"
              />
              
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4">
                <p className="text-white">{images[selectedImage].alt}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectGallery;

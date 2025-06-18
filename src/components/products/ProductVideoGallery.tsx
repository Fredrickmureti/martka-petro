
import { useState } from 'react';
import { Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface VideoItem {
  url: string;
  alt: string;
  type?: 'video' | 'youtube' | 'vimeo';
}

interface ProductVideoGalleryProps {
  videos: VideoItem[];
}

const ProductVideoGallery = ({ videos }: ProductVideoGalleryProps) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  if (!videos || videos.length === 0) return null;

  const getEmbedUrl = (video: VideoItem) => {
    if (video.type === 'youtube') {
      const videoId = video.url.includes('watch?v=') 
        ? video.url.split('watch?v=')[1]?.split('&')[0]
        : video.url.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (video.type === 'vimeo') {
      const videoId = video.url.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return video.url;
  };

  const getThumbnail = (video: VideoItem) => {
    if (video.type === 'youtube') {
      const videoId = video.url.includes('watch?v=') 
        ? video.url.split('watch?v=')[1]?.split('&')[0]
        : video.url.split('/').pop();
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return null;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {videos.map((video, index) => {
          const thumbnail = getThumbnail(video);
          
          return (
            <div 
              key={index} 
              className="relative bg-gray-100 rounded-lg overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow"
              onClick={() => setSelectedVideo(video)}
            >
              {thumbnail ? (
                <div className="relative aspect-video">
                  <img 
                    src={thumbnail}
                    alt={video.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-50 transition-colors">
                    <Play className="w-12 h-12 text-white" fill="currentColor" />
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="w-12 h-12 mx-auto mb-2" fill="currentColor" />
                    <p className="text-sm">{video.alt}</p>
                  </div>
                </div>
              )}
              <div className="p-3">
                <p className="text-sm font-medium text-gray-900 line-clamp-2">{video.alt}</p>
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl w-full p-0">
          {selectedVideo && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 bg-black bg-opacity-50 text-white hover:bg-opacity-75"
                onClick={() => setSelectedVideo(null)}
              >
                <X className="w-4 h-4" />
              </Button>
              
              <div className="aspect-video">
                {selectedVideo.type === 'youtube' || selectedVideo.type === 'vimeo' ? (
                  <iframe
                    src={getEmbedUrl(selectedVideo)}
                    className="w-full h-full"
                    allowFullScreen
                    title={selectedVideo.alt}
                  />
                ) : (
                  <video
                    src={selectedVideo.url}
                    className="w-full h-full"
                    controls
                    autoPlay
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg">{selectedVideo.alt}</h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductVideoGallery;

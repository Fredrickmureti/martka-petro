
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, Upload, Link } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUpload } from '@/components/ui/file-upload';

interface VideoItem {
  url: string;
  alt: string;
  type?: 'video' | 'youtube' | 'vimeo';
}

interface VideoEditorProps {
  items: VideoItem[];
  onUpdateItem: (index: number, item: VideoItem) => void;
  onRemoveItem: (index: number) => void;
  onAddItem: () => void;
}

export const VideoEditor = ({
  items,
  onUpdateItem,
  onRemoveItem,
  onAddItem,
}: VideoEditorProps) => {
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoAlt, setNewVideoAlt] = useState('');

  const handleUpload = (urls: string[]) => {
    urls.forEach(url => {
      const newItem: VideoItem = {
        url,
        alt: newVideoAlt || 'Project Video',
        type: 'video'
      };
      onAddItem();
      // Update the last added item
      setTimeout(() => {
        onUpdateItem(items.length, newItem);
      }, 0);
    });
    setNewVideoAlt('');
  };

  const handleUrlAdd = () => {
    if (newVideoUrl) {
      let videoType: VideoItem['type'] = 'video';
      if (newVideoUrl.includes('youtube.com') || newVideoUrl.includes('youtu.be')) {
        videoType = 'youtube';
      } else if (newVideoUrl.includes('vimeo.com')) {
        videoType = 'vimeo';
      }

      const newItem: VideoItem = {
        url: newVideoUrl,
        alt: newVideoAlt || 'Project Video',
        type: videoType
      };
      onAddItem();
      // Update the last added item
      setTimeout(() => {
        onUpdateItem(items.length, newItem);
      }, 0);
      setNewVideoUrl('');
      setNewVideoAlt('');
    }
  };

  const getVideoPreview = (item: VideoItem) => {
    if (item.type === 'youtube') {
      const videoId = item.url.includes('watch?v=') 
        ? item.url.split('watch?v=')[1]?.split('&')[0]
        : item.url.split('/').pop();
      return (
        <iframe
          width="300"
          height="169"
          src={`https://www.youtube.com/embed/${videoId}`}
          className="rounded"
          allowFullScreen
          title={item.alt}
        />
      );
    } else if (item.type === 'vimeo') {
      const videoId = item.url.split('/').pop();
      return (
        <iframe
          width="300"
          height="169"
          src={`https://player.vimeo.com/video/${videoId}`}
          className="rounded"
          allowFullScreen
          title={item.alt}
        />
      );
    } else {
      return (
        <video
          width="300"
          height="169"
          controls
          className="rounded"
        >
          <source src={item.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <Card key={index}>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`video-url-${index}`}>Video URL</Label>
                  <Input
                    id={`video-url-${index}`}
                    value={item.url}
                    onChange={(e) => onUpdateItem(index, { ...item, url: e.target.value })}
                    placeholder="Video URL or file path"
                  />
                </div>
                <div>
                  <Label htmlFor={`video-alt-${index}`}>Description</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`video-alt-${index}`}
                      value={item.alt}
                      onChange={(e) => onUpdateItem(index, { ...item, alt: e.target.value })}
                      placeholder="Video description"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => onRemoveItem(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              {item.url && (
                <div className="mt-2">
                  {getVideoPreview(item)}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Card>
        <CardContent className="pt-4">
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">
                <Upload className="w-4 h-4 mr-2" />
                Upload Video
              </TabsTrigger>
              <TabsTrigger value="url">
                <Link className="w-4 h-4 mr-2" />
                Video URL
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="mt-4">
              <div className="space-y-3">
                <Input
                  value={newVideoAlt}
                  onChange={(e) => setNewVideoAlt(e.target.value)}
                  placeholder="Video description"
                />
                <FileUpload
                  onUpload={handleUpload}
                  multiple={true}
                  folder="project-videos"
                  accept="video/*"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="url" className="mt-4 space-y-3">
              <Input
                value={newVideoUrl}
                onChange={(e) => setNewVideoUrl(e.target.value)}
                placeholder="YouTube, Vimeo, or direct video URL"
              />
              <Input
                value={newVideoAlt}
                onChange={(e) => setNewVideoAlt(e.target.value)}
                placeholder="Video description"
              />
              <Button type="button" onClick={handleUrlAdd} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Video
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

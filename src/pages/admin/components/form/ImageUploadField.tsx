
import { useState, useEffect } from 'react';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/ui/file-upload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Link } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
  folder?: string;
  multiple?: boolean;
}

export const ImageUploadField = ({
  label,
  value,
  onChange,
  description,
  folder = 'images',
  multiple = false
}: ImageUploadFieldProps) => {
  const [urlInput, setUrlInput] = useState(value || '');

  useEffect(() => {
    setUrlInput(value || '');
  }, [value]);

  const handleUpload = (urls: string[]) => {
    if (multiple) {
      onChange(JSON.stringify(urls));
    } else {
      onChange(urls[0] || '');
    }
  };

  const handleUrlSubmit = () => {
    onChange(urlInput);
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="url">
              <Link className="w-4 h-4 mr-2" />
              URL
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="mt-4">
            <FileUpload
              onUpload={handleUpload}
              multiple={multiple}
              folder={folder}
              accept="image/*"
            />
          </TabsContent>
          
          <TabsContent value="url" className="mt-4 space-y-3">
            <div className="flex gap-2">
              <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <Button type="button" onClick={handleUrlSubmit}>
                Set URL
              </Button>
            </div>
            {value && (
              <img src={value} alt="Preview" className="max-w-xs h-auto rounded-lg" />
            )}
          </TabsContent>
        </Tabs>
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};


import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface UploadedFile {
  url: string;
  name: string;
  size: number;
}

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFile = async (file: File, folder: string = ''): Promise<string | null> => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        toast.error(`Upload failed: ${error.message}`);
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(data.path);

      setUploadProgress(100);
      toast.success('File uploaded successfully!');
      return publicUrl;
    } catch (error) {
      toast.error('Upload failed');
      return null;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const uploadMultipleFiles = async (files: FileList, folder: string = ''): Promise<UploadedFile[]> => {
    const uploadPromises = Array.from(files).map(async (file) => {
      const url = await uploadFile(file, folder);
      return url ? { url, name: file.name, size: file.size } : null;
    });

    const results = await Promise.all(uploadPromises);
    return results.filter((result): result is UploadedFile => result !== null);
  };

  return {
    uploadFile,
    uploadMultipleFiles,
    isUploading,
    uploadProgress
  };
};


-- Update the project-videos bucket to allow video MIME types
UPDATE storage.buckets 
SET allowed_mime_types = ARRAY[
  'video/mp4',
  'video/mpeg',
  'video/quicktime',
  'video/x-msvideo',
  'video/webm',
  'video/ogg'
]
WHERE id = 'project-videos';

-- Also increase the file size limit for videos (100MB)
UPDATE storage.buckets 
SET file_size_limit = 104857600
WHERE id = 'project-videos';

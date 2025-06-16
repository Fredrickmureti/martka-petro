
-- Create storage bucket for uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'uploads', 
  'uploads', 
  true, 
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Create policy to allow public access to uploaded files
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');

-- Create policy to allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'uploads' AND auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update their uploads
CREATE POLICY "Users can update uploads" ON storage.objects FOR UPDATE 
USING (bucket_id = 'uploads' AND auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete their uploads
CREATE POLICY "Users can delete uploads" ON storage.objects FOR DELETE 
USING (bucket_id = 'uploads' AND auth.role() = 'authenticated');

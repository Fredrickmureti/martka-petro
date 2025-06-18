
-- Add project_videos column to projects table to store video information
ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_videos jsonb DEFAULT '[]'::jsonb;

-- Create storage bucket for project videos if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-videos', 'project-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for project videos bucket
CREATE POLICY "Anyone can view project videos" ON storage.objects
FOR SELECT USING (bucket_id = 'project-videos');

CREATE POLICY "Authenticated users can upload project videos" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'project-videos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update project videos" ON storage.objects
FOR UPDATE USING (bucket_id = 'project-videos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete project videos" ON storage.objects
FOR DELETE USING (bucket_id = 'project-videos' AND auth.role() = 'authenticated');

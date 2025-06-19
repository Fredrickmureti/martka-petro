
-- Add videos column to products table to store video information
ALTER TABLE products ADD COLUMN IF NOT EXISTS videos jsonb DEFAULT '[]'::jsonb;

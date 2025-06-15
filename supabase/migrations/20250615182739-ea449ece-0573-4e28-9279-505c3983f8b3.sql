
-- Add business_hours column to the locations table
ALTER TABLE public.locations
ADD COLUMN business_hours TEXT NULL;

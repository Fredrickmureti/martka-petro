
ALTER TABLE public.locations
ADD COLUMN map_embed_url TEXT NULL,
ADD COLUMN latitude NUMERIC NULL,
ADD COLUMN longitude NUMERIC NULL,
ADD COLUMN map_image_url TEXT NULL;

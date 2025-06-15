
-- Create a table for product categories
CREATE TABLE public.product_categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Alter the existing products table to add new fields and link to categories
ALTER TABLE public.products
  ADD COLUMN price TEXT,
  ADD COLUMN rating NUMERIC(2, 1),
  ADD COLUMN gallery JSONB,
  ADD COLUMN features JSONB,
  ADD COLUMN popular BOOLEAN DEFAULT FALSE,
  ADD COLUMN in_stock BOOLEAN DEFAULT TRUE,
  ADD COLUMN manufacturer TEXT,
  ADD COLUMN warranty TEXT,
  ADD COLUMN documents JSONB,
  ADD COLUMN category_id BIGINT REFERENCES public.product_categories(id) ON DELETE SET NULL,
  DROP COLUMN category;

-- Enable Row Level Security for the new and modified tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;

-- Add policies to allow public read access, necessary for the main website
CREATE POLICY "Allow public read access to products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public read access to product categories" ON public.product_categories FOR SELECT USING (true);

-- Add policies to give admins full control over products and categories
CREATE POLICY "Allow admin all access to products" ON public.products FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Allow admin all access to product categories" ON public.product_categories FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));


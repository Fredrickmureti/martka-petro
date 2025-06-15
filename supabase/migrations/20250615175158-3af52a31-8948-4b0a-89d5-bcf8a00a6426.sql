
-- Create table for manageable page content
CREATE TABLE public.page_content (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    page TEXT NOT NULL,
    element_id TEXT NOT NULL,
    content JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (page, element_id)
);
COMMENT ON TABLE public.page_content IS 'Stores editable content for various pages.';

-- Alter locations table to add headquarters flag and gallery
ALTER TABLE public.locations
ADD COLUMN is_headquarters BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN gallery JSONB;
COMMENT ON COLUMN public.locations.is_headquarters IS 'Flags if the location is the main headquarters.';
COMMENT ON COLUMN public.locations.gallery IS 'A JSON array of image URLs for the location gallery.';

-- Create table for generic contact items (phone, email, hours)
CREATE TABLE public.contact_items (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    icon TEXT,
    details JSONB,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
COMMENT ON TABLE public.contact_items IS 'Stores generic contact information like phone numbers, emails, and business hours.';

-- Alter contact_messages table to add fields from contact form
ALTER TABLE public.contact_messages
ADD COLUMN phone TEXT,
ADD COLUMN company TEXT,
ADD COLUMN service_id INT REFERENCES public.services(id) ON DELETE SET NULL;

-- Enable Row Level Security for new and existing tables
-- This will restrict write access to administrators.
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read page content" ON public.page_content FOR SELECT USING (true);
CREATE POLICY "Admins can manage page content" ON public.page_content FOR ALL USING (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read locations" ON public.locations FOR SELECT USING (true);
CREATE POLICY "Admins can manage locations" ON public.locations FOR ALL USING (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.contact_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read contact items" ON public.contact_items FOR SELECT USING (true);
CREATE POLICY "Admins can manage contact items" ON public.contact_items FOR ALL USING (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a contact message" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage contact messages" ON public.contact_messages FOR ALL USING (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admins can manage services" ON public.services FOR ALL USING (public.has_role(auth.uid(), 'admin'));


-- Seed initial data for the new tables to match current contact page
INSERT INTO public.page_content (page, element_id, content) VALUES
('contact', 'hero', '{"title_part1": "Get In", "title_part2": "Touch", "description": "Ready to discuss your fuel infrastructure project? We''re here to help you every step of the way."}'),
('contact', 'form_title', '{"text": "Send Us a Message"}'),
('contact', 'info_title', '{"text": "Contact Information"}'),
('contact', 'map_title', '{"title": "Visit Our Headquarters", "description": "Located in the heart of Houston''s energy district"}'),
('contact', 'immediate_assistance', '{"title": "Need Immediate Assistance?", "description": "For urgent technical support or emergency services, contact us directly."}');

INSERT INTO public.contact_items (title, icon, details, sort_order) VALUES
('Phone', 'Phone', '["+1 (555) 123-4567", "+1 (555) 123-4568 (Emergency)"]', 1),
('Email', 'Mail', '["info@martkapetroleum.com", "support@martkapetroleum.com"]', 2),
('Business Hours', 'Clock', '["Mon - Fri: 8:00 AM - 6:00 PM", "Emergency: 24/7 Available"]', 3);

-- Set a default headquarters if one doesn't exist
INSERT INTO public.locations (name, address, city, country, phone, email, is_headquarters)
SELECT 'Headquarters', '123 Petroleum Plaza, Energy District', 'Houston, TX 77002', 'USA', '+1 (555) 123-4567', 'info@martkapetroleum.com', true
WHERE NOT EXISTS (SELECT 1 FROM public.locations WHERE is_headquarters = true);

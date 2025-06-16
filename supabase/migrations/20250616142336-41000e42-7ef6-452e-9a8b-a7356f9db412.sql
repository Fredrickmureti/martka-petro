
-- Create table for page backgrounds
CREATE TABLE public.page_backgrounds (
  id SERIAL PRIMARY KEY,
  page_name VARCHAR(50) NOT NULL,
  section_key VARCHAR(50) NOT NULL,
  image_url TEXT,
  overlay_opacity DECIMAL(3,2) DEFAULT 0.7,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(page_name, section_key)
);

-- Create table for page content sections
CREATE TABLE public.page_sections (
  id SERIAL PRIMARY KEY,
  page_name VARCHAR(50) NOT NULL,
  section_key VARCHAR(50) NOT NULL,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  content JSONB,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(page_name, section_key)
);

-- Insert default backgrounds for existing sections
INSERT INTO public.page_backgrounds (page_name, section_key, image_url, overlay_opacity) VALUES
('home', 'hero', 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81', 0.7),
('home', 'services', 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', 0.9),
('home', 'about', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05', 0.8),
('home', 'projects', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', 0.8),
('about', 'hero', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05', 0.8),
('support', 'hero', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5', 0.7),
('careers', 'hero', 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21', 0.8);

-- Insert default content for existing sections
INSERT INTO public.page_sections (page_name, section_key, title, subtitle, description, content, image_url) VALUES
('home', 'hero', 'Advanced Petroleum Infrastructure Solutions', 'Leading provider of cutting-edge petroleum equipment and infrastructure solutions for the energy sector worldwide.', NULL, '{}', NULL),
('home', 'services', 'Comprehensive Petroleum Solutions', 'End-to-end petroleum infrastructure services for your business needs', NULL, 
  '{"badge": "Our Services", "service1Title": "Equipment Installation", "service1Description": "Professional installation of petroleum equipment and infrastructure", "service2Title": "Maintenance & Support", "service2Description": "Ongoing maintenance and technical support for optimal performance", "service3Title": "Consulting Services", "service3Description": "Expert consulting for petroleum infrastructure projects"}', NULL),
('home', 'about', 'About Martka Petroleum', 'We are a leading provider of petroleum infrastructure solutions with years of experience in the industry. Our commitment to quality and innovation drives us to deliver exceptional results for our clients worldwide.', NULL, 
  '{"location": "Global Operations", "employees": "Expert Team"}', '/placeholder.svg'),
('about', 'hero', 'About Martka Petroleum', 'Leading the way in petroleum infrastructure solutions with innovation, expertise, and commitment to excellence.', NULL, '{}', NULL),
('support', 'hero', 'Support Center', 'Get the help you need with our comprehensive support resources and expert assistance.', NULL, '{}', NULL),
('careers', 'hero', 'Join Our Team', 'Build your career with us and be part of innovative petroleum infrastructure projects worldwide.', NULL, '{}', NULL);

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_page_backgrounds_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION update_page_sections_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_page_backgrounds_updated_at_trigger
    BEFORE UPDATE ON public.page_backgrounds
    FOR EACH ROW
    EXECUTE FUNCTION update_page_backgrounds_updated_at();

CREATE TRIGGER update_page_sections_updated_at_trigger
    BEFORE UPDATE ON public.page_sections
    FOR EACH ROW
    EXECUTE FUNCTION update_page_sections_updated_at();

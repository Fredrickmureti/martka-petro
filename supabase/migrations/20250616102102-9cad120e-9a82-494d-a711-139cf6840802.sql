
-- Create table for header content (company name and logo)
CREATE TABLE public.header_content (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL DEFAULT 'Martka Petroleum',
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Create table for footer content
CREATE TABLE public.footer_content (
  id SERIAL PRIMARY KEY,
  section_key VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255),
  content JSONB,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Create table for about page content
CREATE TABLE public.about_content (
  id SERIAL PRIMARY KEY,
  section_key VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255),
  content JSONB,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Add trigger for updated_at columns
CREATE TRIGGER update_header_content_updated_at
    BEFORE UPDATE ON public.header_content
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_footer_content_updated_at
    BEFORE UPDATE ON public.footer_content
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_about_content_updated_at
    BEFORE UPDATE ON public.about_content
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial header data
INSERT INTO public.header_content (company_name, logo_url) 
VALUES ('Martka Petroleum', NULL);

-- Insert initial footer data
INSERT INTO public.footer_content (section_key, title, content, sort_order) VALUES
('company_info', 'Company Info', '{
  "description": "World-class fuel solutions including construction of fuel stations, installation of dispensers, and petroleum infrastructure consulting.",
  "social_links": [
    {"platform": "facebook", "url": "#"},
    {"platform": "twitter", "url": "#"},
    {"platform": "linkedin", "url": "#"}
  ]
}', 1),
('quick_links', 'Quick Links', '{
  "links": [
    {"label": "Home", "url": "/"},
    {"label": "Our Services", "url": "/services"},
    {"label": "Projects", "url": "/projects"},
    {"label": "About Us", "url": "/about"},
    {"label": "Careers", "url": "/careers"}
  ]
}', 2),
('services', 'Services', '{
  "items": [
    "Fuel Station Construction",
    "Dispenser Installation",
    "Computer Kit & POS Systems",
    "Maintenance Services",
    "Infrastructure Design"
  ]
}', 3),
('contact_info', 'Contact Info', '{
  "address": "123 Petroleum Plaza, Energy District, Houston, TX 77002",
  "phone": "+1 (555) 123-4567",
  "email": "info@martkapetroleum.com"
}', 4),
('legal_links', 'Legal', '{
  "links": [
    {"label": "Privacy Policy", "url": "/privacy"},
    {"label": "Terms of Service", "url": "/terms"}
  ]
}', 5);

-- Insert initial about content data
INSERT INTO public.about_content (section_key, title, content, sort_order) VALUES
('hero', 'Hero Section', '{
  "title": "About Martka Petroleum",
  "subtitle": "Leading the Future of Energy Infrastructure",
  "description": "With over two decades of experience in petroleum infrastructure, we deliver world-class solutions for fuel stations, dispensers, and comprehensive energy systems."
}', 1),
('mission', 'Our Mission', '{
  "title": "Our Mission",
  "content": "To provide innovative, reliable, and sustainable petroleum infrastructure solutions that power communities and drive economic growth across the globe."
}', 2),
('vision', 'Our Vision', '{
  "title": "Our Vision", 
  "content": "To be the world''s most trusted partner in petroleum infrastructure development, setting new standards for quality, safety, and environmental responsibility."
}', 3),
('values', 'Our Values', '{
  "title": "Our Values",
  "items": [
    {"title": "Excellence", "description": "We strive for perfection in every project we undertake."},
    {"title": "Innovation", "description": "We embrace cutting-edge technology and forward-thinking solutions."},
    {"title": "Integrity", "description": "We conduct business with honesty, transparency, and ethical practices."},
    {"title": "Sustainability", "description": "We are committed to environmentally responsible practices."}
  ]
}', 4),
('stats', 'Company Statistics', '{
  "items": [
    {"number": "500+", "label": "Projects Completed"},
    {"number": "25+", "label": "Years Experience"},
    {"number": "50+", "label": "Expert Team Members"},
    {"number": "98%", "label": "Client Satisfaction"}
  ]
}', 5);

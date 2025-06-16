
-- Create table for careers page content sections
CREATE TABLE public.careers_content (
  id SERIAL PRIMARY KEY,
  section_key VARCHAR(100) NOT NULL UNIQUE,
  title TEXT,
  description TEXT,
  content JSONB,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create table for careers benefits/culture cards
CREATE TABLE public.careers_cards (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  value TEXT, -- For stats like "25+", "95%"
  unit TEXT, -- For units like "Years in Business", "Employee Satisfaction"
  card_type VARCHAR(50) DEFAULT 'benefit', -- 'benefit', 'culture', 'stat'
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Update support_options table to include contact information and action URLs
ALTER TABLE public.support_options 
ADD COLUMN IF NOT EXISTS contact_info JSONB,
ADD COLUMN IF NOT EXISTS action_url TEXT,
ADD COLUMN IF NOT EXISTS action_type VARCHAR(50) DEFAULT 'link'; -- 'phone', 'whatsapp', 'link', 'email'

-- Create table for document management
CREATE TABLE public.documents (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type VARCHAR(10) NOT NULL,
  file_size VARCHAR(20),
  category VARCHAR(50) DEFAULT 'general',
  is_public BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Insert initial data for careers content
INSERT INTO public.careers_content (section_key, title, description, content) VALUES
('hero', 'Join Our Team', 'Build your career with the industry leader in petroleum infrastructure. We''re looking for passionate professionals to join our growing team.', '{"cta_buttons": [{"text": "View Open Positions", "type": "primary"}, {"text": "Learn About Culture", "type": "secondary"}]}'),
('why_work', 'Why Work With Us?', 'Competitive benefits and a culture that values your growth', '{}'),
('culture', 'Our Culture & Values', 'At Martka Petroleum, we believe our people are our greatest asset. We foster an environment where innovation thrives, collaboration is valued, and every team member has the opportunity to grow and succeed.', '{"values": ["Innovation-driven environment with cutting-edge technology", "Collaborative team culture with open communication", "Commitment to safety and environmental responsibility", "Opportunities to work on industry-leading projects", "Diverse and inclusive workplace", "Strong community involvement and volunteer programs"]}'),
('cta', 'Ready to Start Your Career?', 'Don''t see the perfect position? We''re always looking for talented individuals to join our team. Send us your resume and let''s talk.', '{"buttons": [{"text": "Submit General Application", "type": "primary"}, {"text": "Contact HR Team", "type": "secondary"}]}');

-- Insert initial data for careers cards
INSERT INTO public.careers_cards (title, description, icon, card_type, sort_order) VALUES
('Competitive Compensation', 'Market-leading salaries with performance bonuses and profit sharing opportunities.', 'DollarSign', 'benefit', 1),
('Comprehensive Benefits', 'Full health, dental, vision insurance plus 401(k) matching and life insurance.', 'Award', 'benefit', 2),
('Work-Life Balance', 'Flexible schedules, remote work options, and generous PTO policy.', 'Clock', 'benefit', 3),
('Professional Development', 'Ongoing training, certification support, and career advancement opportunities.', 'Users', 'benefit', 4);

INSERT INTO public.careers_cards (title, value, unit, card_type, sort_order) VALUES
('Years in Business', '25+', 'Years in Business', 'stat', 1),
('Team Members', '150+', 'Team Members', 'stat', 2),
('Employee Satisfaction', '95%', 'Employee Satisfaction', 'stat', 3),
('Glassdoor Rating', '4.8', 'Glassdoor Rating', 'stat', 4);

-- Insert initial data for updated support options with contact info
UPDATE public.support_options SET 
  contact_info = '{"phone": "+1 (555) 123-4567"}',
  action_url = 'tel:+15551234567',
  action_type = 'phone'
WHERE title LIKE '%Phone%' OR title LIKE '%Call%';

UPDATE public.support_options SET 
  contact_info = '{"whatsapp": "+1 (555) 123-4567"}',
  action_url = 'https://wa.me/15551234567',
  action_type = 'whatsapp'
WHERE title LIKE '%Chat%' OR title LIKE '%WhatsApp%';

UPDATE public.support_options SET 
  action_url = '/documents',
  action_type = 'link'
WHERE title LIKE '%Documentation%' OR title LIKE '%Docs%';

-- Insert sample documents
INSERT INTO public.documents (title, description, file_name, file_url, file_type, file_size, category) VALUES
('Installation Manual', 'Complete guide for fuel dispenser installation', 'installation-manual.pdf', '/docs/installation-manual.pdf', 'PDF', '2.5 MB', 'manuals'),
('Safety Guidelines', 'Safety protocols for petroleum infrastructure', 'safety-guidelines.pdf', '/docs/safety-guidelines.pdf', 'PDF', '1.8 MB', 'safety'),
('Product Catalog', 'Complete catalog of our petroleum equipment', 'product-catalog.pdf', '/docs/product-catalog.pdf', 'PDF', '5.2 MB', 'products'),
('Warranty Information', 'Warranty terms and conditions', 'warranty-info.pdf', '/docs/warranty-info.pdf', 'PDF', '850 KB', 'legal');

-- Create trigger for updating careers_content updated_at
CREATE OR REPLACE FUNCTION update_careers_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER careers_content_updated_at
    BEFORE UPDATE ON public.careers_content
    FOR EACH ROW
    EXECUTE FUNCTION update_careers_content_updated_at();

-- Create trigger for updating careers_cards updated_at  
CREATE OR REPLACE FUNCTION update_careers_cards_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER careers_cards_updated_at
    BEFORE UPDATE ON public.careers_cards
    FOR EACH ROW
    EXECUTE FUNCTION update_careers_cards_updated_at();

-- Create trigger for updating documents updated_at
CREATE OR REPLACE FUNCTION update_documents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER documents_updated_at
    BEFORE UPDATE ON public.documents
    FOR EACH ROW
    EXECUTE FUNCTION update_documents_updated_at();

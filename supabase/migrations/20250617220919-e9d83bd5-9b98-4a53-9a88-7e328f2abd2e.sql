
-- Create table for support page additional content sections
CREATE TABLE public.support_content_sections (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    section_type VARCHAR(50) DEFAULT 'info',
    icon VARCHAR(50),
    background_color VARCHAR(20) DEFAULT 'bg-white',
    text_color VARCHAR(20) DEFAULT 'text-gray-900',
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.support_content_sections ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can read support content sections" 
    ON public.support_content_sections 
    FOR SELECT 
    USING (is_active = true);

CREATE POLICY "Admins can manage support content sections" 
    ON public.support_content_sections 
    FOR ALL 
    USING (public.has_role(auth.uid(), 'admin'));

-- Insert some initial content sections
INSERT INTO public.support_content_sections (title, content, section_type, icon, sort_order) VALUES
('Quick Support Tips', 'Before contacting support, try restarting your equipment and checking all connections. Many issues can be resolved with these simple steps.', 'tip', 'Lightbulb', 1),
('Emergency Protocols', 'For critical fuel system emergencies, immediately shut off all valves and contact our 24/7 emergency line. Safety is our top priority.', 'warning', 'AlertTriangle', 2);


-- Add missing content sections for Support page
INSERT INTO support_page_content (section_key, title, description, content, is_active) VALUES
('contact_section', 'Need More Help?', 'Still have questions? Our support team is here to help you.', '{"subtitle": "Contact our dedicated support team for personalized assistance", "phone": "+1-800-SUPPORT", "email": "support@martkapetroleumcom", "hours": "24/7 Support Available"}', true),
('resources_section', 'Additional Resources', 'Explore our comprehensive library of resources and documentation.', '{"subtitle": "Access technical guides, training materials, and industry insights", "features": ["Technical Documentation", "Video Tutorials", "Best Practices Guide", "Industry Updates"]}', true),
('community_section', 'Community Support', 'Join our community of petroleum industry professionals.', '{"subtitle": "Connect with experts and peers in our professional community", "forum_url": "/community", "events_url": "/events", "newsletter_url": "/newsletter"}', true)
ON CONFLICT (section_key) DO UPDATE SET
title = EXCLUDED.title,
description = EXCLUDED.description,
content = EXCLUDED.content,
updated_at = timezone('utc'::text, now());

-- Add page content for background sections across different pages
INSERT INTO page_content (page, element_id, content) VALUES
('home', 'hero_background', '{"image_url": "https://images.unsplash.com/photo-1605810230434-7631ac76ec81", "overlay_opacity": 0.7}'),
('home', 'services_background', '{"image_url": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", "overlay_opacity": 0.1}'),
('home', 'projects_background', '{"image_url": "https://images.unsplash.com/photo-1519389950473-47ba0277781c", "overlay_opacity": 0.05}'),
('home', 'about_background', '{"image_url": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05", "overlay_opacity": 0.3}'),
('services', 'hero_background', '{"image_url": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", "overlay_opacity": 0.8}'),
('projects', 'hero_background', '{"image_url": "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", "overlay_opacity": 0.7}'),
('support', 'hero_background', '{"image_url": "https://images.unsplash.com/photo-1498050108023-c5249f4df085", "overlay_opacity": 0.8}'),
('careers', 'hero_background', '{"image_url": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", "overlay_opacity": 0.7}'),
('contact', 'hero_background', '{"image_url": "https://images.unsplash.com/photo-1527576539890-dfa815648363", "overlay_opacity": 0.8}'),
('contact', 'headquarters_background', '{"image_url": "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a", "overlay_opacity": 0.2}')
ON CONFLICT (page, element_id) DO UPDATE SET
content = EXCLUDED.content,
updated_at = timezone('utc'::text, now());

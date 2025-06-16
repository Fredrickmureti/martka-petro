
-- Create a comprehensive services table with all the service data from the website
DROP TABLE IF EXISTS services CASCADE;

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  image_url TEXT,
  icon VARCHAR(100),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Insert the current service data from the website
INSERT INTO services (title, description, features, image_url, icon, sort_order) VALUES
(
  'Fuel Station Construction',
  'Complete fuel station construction from ground up with modern, efficient designs that maximize operational efficiency and customer experience.',
  '["Site preparation and excavation", "Underground storage tank installation", "Canopy and building construction", "Safety system integration", "Environmental compliance"]'::jsonb,
  'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop',
  'Building',
  1
),
(
  'Fuel Dispenser Installation',
  'Professional installation of state-of-the-art fuel dispensers with advanced payment systems and monitoring capabilities.',
  '["Multi-product dispensers", "EMV payment integration", "Real-time monitoring", "Preventive maintenance", "Compliance certification"]'::jsonb,
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
  'Zap',
  2
),
(
  'Computer Kit & POS Systems',
  'Advanced point-of-sale systems and computer kits designed specifically for fuel station operations and convenience stores.',
  '["Integrated POS solutions", "Inventory management", "Sales reporting", "Customer loyalty programs", "Cloud-based analytics"]'::jsonb,
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
  'Settings',
  3
),
(
  'Maintenance & Advisory Services',
  '24/7 maintenance services and expert consulting to ensure optimal performance and regulatory compliance of your fuel infrastructure.',
  '["Preventive maintenance", "Emergency repairs", "Compliance auditing", "Performance optimization", "Equipment upgrades"]'::jsonb,
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
  'Wrench',
  4
),
(
  'Custom Fuel Infrastructure Design',
  'Tailored infrastructure solutions designed to meet specific operational requirements and environmental conditions.',
  '["Site analysis and planning", "Custom engineering solutions", "Environmental impact assessment", "Regulatory approval assistance", "Project management"]'::jsonb,
  'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=400&fit=crop',
  'Shield',
  5
),
(
  'Technical Support & Training',
  'Comprehensive support services including operator training, technical documentation, and ongoing assistance.',
  '["Operator training programs", "Technical documentation", "Remote diagnostics", "Software updates", "Best practices consulting"]'::jsonb,
  'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop',
  'Headphones',
  6
);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_services_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_services_updated_at_trigger
    BEFORE UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION update_services_updated_at();

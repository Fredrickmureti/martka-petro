
-- Seed product categories, will not overwrite existing categories with the same slug
INSERT INTO public.product_categories (name, slug, description, icon) VALUES
('Fuel Dispensers', 'fuel-dispensers', 'Advanced fuel dispensing solutions for retail and commercial use.', 'gas-pump'),
('POS Systems', 'pos-systems', 'Point-of-sale systems for managing fuel and convenience store sales.', 'credit-card'),
('Underground Storage Tanks', 'ust', 'Secure and compliant underground tanks for fuel storage.', 'database-zap'),
('Canopy and Lighting', 'canopy-lighting', 'LED lighting and canopy solutions for a bright and safe forecourt.', 'lightbulb')
ON CONFLICT (slug) DO NOTHING;

-- Seed products, but only if the products table is empty
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.products) THEN
    INSERT INTO public.products (name, description, price, category_id, manufacturer, in_stock, image_url, popular, rating, features, specifications, gallery, documents)
    VALUES
    (
      'Wayne Ovation Fuel Dispenser',
      'The Wayne Ovation fuel dispenser is a retail petroleum dispenser that offers flexibility in a scalable design. It features a modern look, user-friendly interface, and supports various payment options.',
      '12500.00',
      (SELECT id from public.product_categories where slug = 'fuel-dispensers'),
      'Wayne Fueling Systems',
      true,
      'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop',
      true,
      4.8,
      '["Multiple fuel grades", "EMV-compliant payment", "Large color display", "iX Pay Secure Payment"]'::jsonb,
      '{"Flow Rate": "10 GPM", "Hose Configuration": "Up to 5 per side", "Display": "15.6 inch touchscreen"}'::jsonb,
      '[]'::jsonb,
      '[]'::jsonb
    ),
    (
      'Verifone Commander',
      'The most common POS system for gas stations, offering robust features for fuel and C-store management. It integrates seamlessly with various pumps and payment networks.',
      '4500.00',
      (SELECT id from public.product_categories where slug = 'pos-systems'),
      'Verifone',
      true,
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
      true,
      4.5,
      '["Centralized site management", "Advanced security features", "Loyalty program integration", "Extensive reporting"]'::jsonb,
      '{"Processor": "Intel", "Memory": "8GB RAM", "Storage": "128GB SSD"}'::jsonb,
      '[]'::jsonb,
      '[]'::jsonb
    ),
    (
      'Fiberglass Double-Wall UST',
      'A 10,000-gallon fiberglass double-wall underground storage tank for maximum corrosion resistance and environmental protection. Ideal for all fuel types.',
      '25000.00',
      (SELECT id from public.product_categories where slug = 'ust'),
      'Containment Solutions',
      false,
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
      false,
      4.9,
      '["Corrosion-resistant fiberglass", "Secondary containment", "Leak detection monitoring port"]'::jsonb,
      '{"Capacity": "10,000 Gallons", "Diameter": "10 ft", "Material": "Fiberglass Reinforced Plastic"}'::jsonb,
      '[]'::jsonb,
      '[]'::jsonb
    ),
    (
      'LSI Scottsdale LED Canopy Light',
      'Energy-efficient and high-performance LED canopy lighting. Provides uniform illumination, enhancing safety and appearance of your fuel station.',
      '350.00',
      (SELECT id from public.product_categories where slug = 'canopy-lighting'),
      'LSI Industries',
      true,
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
      false,
      4.7,
      '["Low energy consumption", "Long lifespan (100,000+ hours)", "Multiple optics options", "Easy installation"]'::jsonb,
      '{"Lumens": "16,000 - 24,000", "Color Temperature": "5000K", "Voltage": "120-277V"}'::jsonb,
      '[]'::jsonb,
      '[]'::jsonb
    );
  END IF;
END $$;

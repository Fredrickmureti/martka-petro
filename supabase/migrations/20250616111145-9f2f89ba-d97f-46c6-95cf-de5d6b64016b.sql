
-- First, let's populate the careers table with the existing data from the website
INSERT INTO careers (title, department, location, type, description, is_active) VALUES
('Senior Petroleum Engineer', 'Engineering', 'Houston, TX', 'Full-time', 'Lead complex fuel infrastructure projects and provide technical expertise for advanced petroleum systems.', true),
('Field Service Technician', 'Operations', 'Dallas, TX', 'Full-time', 'Perform installation, maintenance, and repair of fuel dispensers and related equipment.', true),
('Project Manager', 'Project Management', 'Austin, TX', 'Full-time', 'Oversee fuel station construction projects from planning through completion, ensuring quality and timeline adherence.', true),
('Sales Representative', 'Sales', 'San Antonio, TX', 'Full-time', 'Develop new business relationships and manage existing accounts in the petroleum industry.', true),
('Environmental Compliance Specialist', 'Compliance', 'Houston, TX', 'Full-time', 'Ensure all projects meet environmental regulations and maintain compliance documentation.', true),
('Software Developer', 'Technology', 'Remote', 'Full-time', 'Develop and maintain fuel management software systems and IoT solutions.', true);

-- Add missing columns to careers table for better management
ALTER TABLE careers ADD COLUMN IF NOT EXISTS salary_range text;
ALTER TABLE careers ADD COLUMN IF NOT EXISTS experience_required text;
ALTER TABLE careers ADD COLUMN IF NOT EXISTS requirements jsonb;
ALTER TABLE careers ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT timezone('utc'::text, now());

-- Update existing records with additional data
UPDATE careers SET 
  salary_range = '$95,000 - $120,000',
  experience_required = '5+ years',
  requirements = '["Bachelor''s in Petroleum/Chemical Engineering", "5+ years fuel infrastructure experience", "Professional Engineering license preferred", "Project management skills"]'
WHERE title = 'Senior Petroleum Engineer';

UPDATE careers SET 
  salary_range = '$55,000 - $70,000',
  experience_required = '2+ years',
  requirements = '["Technical certification or equivalent experience", "Experience with fuel equipment", "Valid driver''s license", "Ability to work in various weather conditions"]'
WHERE title = 'Field Service Technician';

UPDATE careers SET 
  salary_range = '$80,000 - $100,000',
  experience_required = '3+ years',
  requirements = '["Bachelor''s degree preferred", "PMP certification a plus", "3+ years construction project management", "Strong communication skills"]'
WHERE title = 'Project Manager';

UPDATE careers SET 
  salary_range = '$60,000 - $90,000 + Commission',
  experience_required = '2+ years',
  requirements = '["Sales experience in B2B environment", "Knowledge of petroleum industry preferred", "Strong relationship building skills", "Travel required"]'
WHERE title = 'Sales Representative';

UPDATE careers SET 
  salary_range = '$65,000 - $85,000',
  experience_required = '3+ years',
  requirements = '["Environmental Science or related degree", "Knowledge of EPA regulations", "Experience with environmental compliance", "Attention to detail"]'
WHERE title = 'Environmental Compliance Specialist';

UPDATE careers SET 
  salary_range = '$75,000 - $95,000',
  experience_required = '3+ years',
  requirements = '["Computer Science degree or equivalent", "Experience with React/Node.js", "IoT/embedded systems knowledge a plus", "Problem-solving skills"]'
WHERE title = 'Software Developer';

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_careers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_careers_updated_at_trigger
    BEFORE UPDATE ON careers
    FOR EACH ROW
    EXECUTE FUNCTION update_careers_updated_at();

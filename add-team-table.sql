-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Allow public read access to team_members"
ON team_members FOR SELECT
TO public
USING (true);

-- Allow INSERT for all (since we're using server-side API)
CREATE POLICY "Allow insert to team_members"
ON team_members FOR INSERT
TO public
WITH CHECK (true);

-- Allow UPDATE for all
CREATE POLICY "Allow update to team_members"
ON team_members FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Allow DELETE for all
CREATE POLICY "Allow delete to team_members"
ON team_members FOR DELETE
TO public
USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_team_members_updated_at 
    BEFORE UPDATE ON team_members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional - can be removed if you want to add from admin panel only)
INSERT INTO team_members (name, role, image_url, display_order) VALUES
('Dr. Amanda Foster', 'Founder & CEO', '/professional-woman-ceo-portrait-business.jpg', 1),
('Prof. James Wilson', 'Head of Curriculum', '/professional-man-professor-educator-portrait.jpg', 2),
('Sarah Martinez', 'Director of Programs', '/professional-woman-director.png', 3),
('David Kim', 'Lead Robotics Instructor', '/professional-man-robotics-engineer-portrait.jpg', 4);

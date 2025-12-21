-- Run this SQL in your Supabase SQL Editor to set up the database

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT,
  amount DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_responses table
CREATE TABLE IF NOT EXISTS contact_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create banners table (separate from schools)
CREATE TABLE IF NOT EXISTS banners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
-- Removed row-level security statements as they are not supported in Oracle SQL
-- ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE events ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE contact_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
-- Oracle SQL does not support CREATE POLICY statements.
-- These statements are specific to PostgreSQL/Supabase and should be implemented
-- using Oracle-compatible security mechanisms or handled at the application level.
-- The following policy creation statements have been commented out for compatibility.

-- CREATE POLICY "Public read access for schools"
--   ON schools FOR SELECT
--   USING (true);

-- CREATE POLICY "Public read access for events"
--   ON events FOR SELECT
--   USING (true);

-- CREATE POLICY "Public read access for gallery"
--   ON gallery FOR SELECT
--   USING (true);

-- CREATE POLICY "Public insert access for contacts"
--   ON contact_responses FOR INSERT
--   WITH CHECK (true);

-- CREATE POLICY "Admin full access for schools"
--   ON schools FOR ALL
--   USING (auth.role() = 'authenticated')
--   WITH CHECK (auth.role() = 'authenticated');

-- CREATE POLICY "Admin full access for events"
--   ON events FOR ALL
--   USING (auth.role() = 'authenticated')
--   WITH CHECK (auth.role() = 'authenticated');

-- CREATE POLICY "Admin full access for gallery"
--   ON gallery FOR ALL
--   USING (auth.role() = 'authenticated')
--   WITH CHECK (auth.role() = 'authenticated');

-- CREATE POLICY "Admin full access for contacts"
--   ON contact_responses FOR ALL
--   USING (auth.role() = 'authenticated')
--   WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Anyone can read banners"
  ON banners FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert banners"
  ON banners FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can delete banners"
  ON banners FOR DELETE
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_schools_created ON schools(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_created ON gallery(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contact_responses(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created ON contact_responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_banners_created ON banners(created_at DESC);

-- Add banner column to schools table
ALTER TABLE schools ADD COLUMN IF NOT EXISTS banner_url TEXT;

-- Note: Create storage buckets in Supabase Dashboard Storage section:
-- 1. school-logos (public)
-- 2. event-images (public)
-- 3. gallery-images (public)
-- Storage policies will be created automatically when you create the buckets
-- Make sure to set them as public for read access

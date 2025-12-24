-- Enable RLS on all public tables
-- Run this in your Supabase SQL Editor

-- Enable RLS on schools table
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;

-- Enable RLS on events table
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Enable RLS on gallery table
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Enable RLS on contact_responses table
ALTER TABLE contact_responses ENABLE ROW LEVEL SECURITY;

-- Enable RLS on event_registrations table
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- Enable RLS on team table (if exists)
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'team' AND table_schema = 'public') THEN
    ALTER TABLE team ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Enable RLS on banners table (if exists)
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'banners' AND table_schema = 'public') THEN
    ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Enable RLS on videos table (if exists)
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'videos' AND table_schema = 'public') THEN
    ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Now add missing policies for event_registrations
DROP POLICY IF EXISTS "Anyone can read registrations" ON event_registrations;
DROP POLICY IF EXISTS "Anyone can insert registrations" ON event_registrations;
DROP POLICY IF EXISTS "Anyone can update registrations" ON event_registrations;
DROP POLICY IF EXISTS "Anyone can delete registrations" ON event_registrations;

CREATE POLICY "Anyone can read registrations"
  ON event_registrations FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert registrations"
  ON event_registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update registrations"
  ON event_registrations FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete registrations"
  ON event_registrations FOR DELETE
  USING (true);

-- Verify all tables have RLS enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

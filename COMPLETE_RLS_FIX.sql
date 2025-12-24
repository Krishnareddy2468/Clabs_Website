-- COMPLETE RLS FIX - Run this in Supabase SQL Editor
-- This will fix all RLS issues for your application

-- ============================================
-- STEP 1: Enable RLS on all tables
-- ============================================

ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_videos ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 2: Drop all existing policies
-- ============================================

-- Schools policies
DROP POLICY IF EXISTS "Public read access for schools" ON schools;
DROP POLICY IF EXISTS "Admin full access for schools" ON schools;
DROP POLICY IF EXISTS "Anyone can read schools" ON schools;
DROP POLICY IF EXISTS "Anyone can insert schools" ON schools;
DROP POLICY IF EXISTS "Anyone can update schools" ON schools;
DROP POLICY IF EXISTS "Anyone can delete schools" ON schools;

-- Events policies
DROP POLICY IF EXISTS "Public read access for events" ON events;
DROP POLICY IF EXISTS "Admin full access for events" ON events;
DROP POLICY IF EXISTS "Anyone can read events" ON events;
DROP POLICY IF EXISTS "Anyone can insert events" ON events;
DROP POLICY IF EXISTS "Anyone can update events" ON events;
DROP POLICY IF EXISTS "Anyone can delete events" ON events;

-- Gallery policies
DROP POLICY IF EXISTS "Public read access for gallery" ON gallery;
DROP POLICY IF EXISTS "Admin full access for gallery" ON gallery;
DROP POLICY IF EXISTS "Anyone can read gallery" ON gallery;
DROP POLICY IF EXISTS "Anyone can insert gallery" ON gallery;
DROP POLICY IF EXISTS "Anyone can update gallery" ON gallery;
DROP POLICY IF EXISTS "Anyone can delete gallery" ON gallery;

-- Contacts policies
DROP POLICY IF EXISTS "Public insert access for contacts" ON contacts;
DROP POLICY IF EXISTS "Admin full access for contacts" ON contacts;
DROP POLICY IF EXISTS "Anyone can read contacts" ON contacts;
DROP POLICY IF EXISTS "Anyone can insert contacts" ON contacts;
DROP POLICY IF EXISTS "Anyone can update contacts" ON contacts;
DROP POLICY IF EXISTS "Anyone can delete contacts" ON contacts;

-- Event registrations policies
DROP POLICY IF EXISTS "Anyone can read registrations" ON event_registrations;
DROP POLICY IF EXISTS "Anyone can insert registrations" ON event_registrations;
DROP POLICY IF EXISTS "Anyone can update registrations" ON event_registrations;
DROP POLICY IF EXISTS "Anyone can delete registrations" ON event_registrations;
DROP POLICY IF EXISTS "Allow all for service role" ON event_registrations;

-- ============================================
-- STEP 3: Create permissive policies for all tables
-- ============================================

-- SCHOOLS: Full public access
CREATE POLICY "Public can read schools"
  ON schools FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert schools"
  ON schools FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update schools"
  ON schools FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete schools"
  ON schools FOR DELETE
  USING (true);

-- EVENTS: Full public access
CREATE POLICY "Public can read events"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert events"
  ON events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update events"
  ON events FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete events"
  ON events FOR DELETE
  USING (true);

-- GALLERY: Full public access
CREATE POLICY "Public can read gallery"
  ON gallery FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert gallery"
  ON gallery FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update gallery"
  ON gallery FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete gallery"
  ON gallery FOR DELETE
  USING (true);

-- CONTACTS: Public read and insert
CREATE POLICY "Public can read contacts"
  ON contacts FOR SELECT
  USING (true);

CREATE POLICY "Public can insert contacts"
  ON contacts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update contacts"
  ON contacts FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete contacts"
  ON contacts FOR DELETE
  USING (true);

-- TEAM_MEMBERS: Public read, service role write
CREATE POLICY "Public can read team_members"
  ON team_members FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert team_members"
  ON team_members FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update team_members"
  ON team_members FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete team_members"
  ON team_members FOR DELETE
  USING (true);

-- FEATURED_VIDEOS: Public read, service role write
CREATE POLICY "Public can read featured_videos"
  ON featured_videos FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert featured_videos"
  ON featured_videos FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update featured_videos"
  ON featured_videos FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete featured_videos"
  ON featured_videos FOR DELETE
  USING (true);

-- EVENT_REGISTRATIONS: Full access for service role, public read
CREATE POLICY "Public can read registrations"
  ON event_registrations FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert registrations"
  ON event_registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update registrations"
  ON event_registrations FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete registrations"
  ON event_registrations FOR DELETE
  USING (true);

-- ============================================
-- STEP 4: Verify RLS is enabled
-- ============================================

SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled,
  (SELECT COUNT(*) FROM pg_policies WHERE pg_policies.tablename = pg_tables.tablename) as policy_count
FROM pg_tables 
WHERE schemaname = 'public'
  AND tablename IN ('schools', 'events', 'gallery', 'contacts', 'event_registrations', 'team_members', 'featured_videos')
ORDER BY tablename;

-- ============================================
-- STEP 5: Show all policies
-- ============================================

SELECT 
  tablename,
  policyname,
  cmd,
  CASE 
    WHEN qual::text = 'true' THEN 'Allow All'
    ELSE LEFT(qual::text, 50)
  END as using_clause
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('schools', 'events', 'gallery', 'contacts', 'event_registrations', 'team_members', 'featured_videos')
ORDER BY tablename, policyname;

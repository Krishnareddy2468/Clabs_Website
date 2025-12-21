-- Run this SQL in Supabase SQL Editor to fix RLS policies

-- First, drop all existing policies
DROP POLICY IF EXISTS "Public read access for schools" ON schools;
DROP POLICY IF EXISTS "Admin full access for schools" ON schools;
DROP POLICY IF EXISTS "Public read access for events" ON events;
DROP POLICY IF EXISTS "Admin full access for events" ON events;
DROP POLICY IF EXISTS "Public read access for gallery" ON gallery;
DROP POLICY IF EXISTS "Admin full access for gallery" ON gallery;
DROP POLICY IF EXISTS "Public insert access for contacts" ON contact_responses;
DROP POLICY IF EXISTS "Admin full access for contacts" ON contact_responses;

-- Schools: Allow public read, allow all operations for everyone (no auth required)
CREATE POLICY "Anyone can read schools"
  ON schools FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert schools"
  ON schools FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update schools"
  ON schools FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete schools"
  ON schools FOR DELETE
  USING (true);

-- Events: Allow public read, allow all operations for everyone
CREATE POLICY "Anyone can read events"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert events"
  ON events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update events"
  ON events FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete events"
  ON events FOR DELETE
  USING (true);

-- Gallery: Allow public read, allow all operations for everyone
CREATE POLICY "Anyone can read gallery"
  ON gallery FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert gallery"
  ON gallery FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update gallery"
  ON gallery FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete gallery"
  ON gallery FOR DELETE
  USING (true);

-- Contact Responses: Allow public read and insert, allow all for everyone
CREATE POLICY "Anyone can read contacts"
  ON contact_responses FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert contacts"
  ON contact_responses FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update contacts"
  ON contact_responses FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete contacts"
  ON contact_responses FOR DELETE
  USING (true);

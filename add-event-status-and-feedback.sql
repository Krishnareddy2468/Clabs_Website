-- Add event status and feedback functionality
-- Run this in your Supabase SQL Editor

-- Step 1: Add status column to events table
-- Note: If column already exists, this will error - that's okay, just continue
ALTER TABLE events ADD COLUMN status TEXT DEFAULT 'upcoming';
ALTER TABLE events ADD CONSTRAINT events_status_check CHECK (status IN ('upcoming', 'ongoing', 'completed'));

-- Step 2: Create event_feedback table
CREATE TABLE IF NOT EXISTS event_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_event_feedback_event_id ON event_feedback(event_id);
CREATE INDEX IF NOT EXISTS idx_event_feedback_created_at ON event_feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);

-- Step 4: Enable Row Level Security for event_feedback
ALTER TABLE event_feedback ENABLE ROW LEVEL SECURITY;

-- Step 5: Create policies for event_feedback
-- Public can insert feedback (for completed events)
CREATE POLICY "Public can submit event feedback"
  ON event_feedback FOR INSERT
  WITH CHECK (true);

-- Public can read feedback
CREATE POLICY "Public read access for event feedback"
  ON event_feedback FOR SELECT
  USING (true);

-- Admin can manage all feedback
CREATE POLICY "Admin full access for event feedback"
  ON event_feedback FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Step 6: Create function to automatically update event status based on date
CREATE OR REPLACE FUNCTION update_event_status()
RETURNS void AS $$
BEGIN
  -- Update to 'ongoing' if event date is today
  UPDATE events
  SET status = 'ongoing'
  WHERE date::date = CURRENT_DATE
  AND status = 'upcoming';

  -- Update to 'completed' if event date has passed
  UPDATE events
  SET status = 'completed'
  WHERE date::date < CURRENT_DATE
  AND status IN ('upcoming', 'ongoing');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 7: Create a scheduled function call (you'll need to set this up in Supabase Dashboard > Database > Cron Jobs)
-- This is just a comment to remind you to add a cron job:
-- Run: SELECT cron.schedule('update-event-status', '0 * * * *', 'SELECT update_event_status()');
-- This runs every hour to update event statuses

-- Step 8: Run initial status update
SELECT update_event_status();

-- Step 9: Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON event_feedback TO anon, authenticated;
GRANT SELECT ON events TO anon, authenticated;

-- Note: After running this SQL in Supabase, you should also set up a cron job
-- to run update_event_status() periodically (e.g., every hour)

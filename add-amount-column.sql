-- Add the amount column to events table
ALTER TABLE events ADD COLUMN IF NOT EXISTS amount DECIMAL(10, 2) DEFAULT 0;

-- Verify the column was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'events';

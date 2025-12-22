-- Add seats columns to events table
BEGIN
  -- Add total_seats column if it does not exist
  IF NOT EXISTS (SELECT 1 FROM user_tab_columns WHERE table_name = 'EVENTS' AND column_name = 'TOTAL_SEATS') THEN
    EXECUTE IMMEDIATE 'ALTER TABLE events ADD total_seats INTEGER DEFAULT 100';
  END IF;

  -- Add available_seats column if it does not exist
  IF NOT EXISTS (SELECT 1 FROM user_tab_columns WHERE table_name = 'EVENTS' AND column_name = 'AVAILABLE_SEATS') THEN
    EXECUTE IMMEDIATE 'ALTER TABLE events ADD available_seats INTEGER DEFAULT 100';
  END IF;
END;
/

-- Create event_registrations table to track all registrations
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  
  -- Student Information
  student_name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  school_college TEXT NOT NULL,
  class TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  aadhaar_number TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  
  -- Payment Information
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  amount_paid DECIMAL(10, 2) NOT NULL DEFAULT 0,
  payment_status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'failed'
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_payment_status ON event_registrations(payment_status);
CREATE INDEX IF NOT EXISTS idx_event_registrations_mobile ON event_registrations(mobile_number);

-- Enable RLS
-- Oracle SQL does not support ENABLE ROW LEVEL SECURITY. 
-- Consider implementing security policies using Virtual Private Database (VPD) or Fine-Grained Access Control (FGAC) if needed.
-- This line has been removed.

-- Allow anyone to insert registrations
-- Oracle SQL does not support CREATE POLICY. Consider implementing security policies using Virtual Private Database (VPD) or Fine-Grained Access Control (FGAC) if needed.

-- Create function to automatically decrement available_seats
CREATE OR REPLACE FUNCTION decrement_event_seats()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.payment_status = 'completed' AND (OLD.payment_status IS NULL OR OLD.payment_status != 'completed') THEN
    UPDATE events
    SET available_seats = GREATEST(available_seats - 1, 0)
    WHERE id = NEW.event_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-decrement seats on successful payment
CREATE TRIGGER trigger_decrement_seats
AFTER INSERT OR UPDATE ON event_registrations
FOR EACH ROW
EXECUTE FUNCTION decrement_event_seats();

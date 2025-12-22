-- Fix database structure: Remove old contact_responses table and ensure proper tables exist

-- 1. Drop the old contact_responses table (no longer needed)
DROP TABLE IF EXISTS contact_responses CASCADE;

-- 2. Ensure event_registrations table exists with correct structure
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  student_name VARCHAR(255) NOT NULL,
  father_name VARCHAR(255),
  school_college VARCHAR(255),
  class VARCHAR(50),
  mobile_number VARCHAR(20) NOT NULL,
  aadhaar_number VARCHAR(20),
  city VARCHAR(100),
  state VARCHAR(100),
  razorpay_order_id VARCHAR(255),
  razorpay_payment_id VARCHAR(255),
  amount_paid DECIMAL(10, 2) DEFAULT 0,
  payment_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Ensure contacts table exists with correct structure  
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_created_at ON event_registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_event_registrations_payment_status ON event_registrations(payment_status);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- 5. Enable RLS on both tables
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policies for event_registrations (service role access)
DROP POLICY IF EXISTS "Allow all for service role" ON event_registrations;
CREATE POLICY "Allow all for service role"
  ON event_registrations
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 7. Create RLS policies for contacts (service role access)
DROP POLICY IF EXISTS "Allow all for service role" ON contacts;
CREATE POLICY "Allow all for service role"
  ON contacts
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 8. Create trigger to decrement available seats after successful payment
CREATE OR REPLACE FUNCTION decrement_event_seats()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.payment_status = 'completed' THEN
    UPDATE events
    SET available_seats = available_seats - 1
    WHERE id = NEW.event_id
    AND available_seats > 0;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS trigger_decrement_seats ON event_registrations;
CREATE TRIGGER trigger_decrement_seats
  AFTER INSERT ON event_registrations
  FOR EACH ROW
  WHEN (NEW.payment_status = 'completed')
  EXECUTE FUNCTION decrement_event_seats();

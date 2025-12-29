-- Sync available_seats with actual registration counts for all events
-- Run this to fix any discrepancies between stored seats and actual registrations

-- Update available_seats for all events based on actual completed registrations
UPDATE events
SET available_seats = total_seats - COALESCE(
  (
    SELECT COUNT(*)
    FROM event_registrations
    WHERE event_registrations.event_id = events.id
    AND event_registrations.payment_status = 'completed'
  ), 
  0
)
WHERE id IN (SELECT DISTINCT id FROM events);

-- Verify the results
SELECT 
  e.id,
  e.title,
  e.total_seats,
  e.available_seats as stored_available_seats,
  COUNT(er.id) FILTER (WHERE er.payment_status = 'completed') as completed_registrations,
  e.total_seats - COUNT(er.id) FILTER (WHERE er.payment_status = 'completed') as calculated_available_seats,
  CASE 
    WHEN e.available_seats = e.total_seats - COUNT(er.id) FILTER (WHERE er.payment_status = 'completed') 
    THEN '✓ Synced' 
    ELSE '✗ Mismatch' 
  END as status
FROM events e
LEFT JOIN event_registrations er ON e.id = er.event_id
GROUP BY e.id, e.title, e.total_seats, e.available_seats
ORDER BY e.date DESC;

-- Add check constraint to prevent negative seats (optional safety measure)
ALTER TABLE events 
DROP CONSTRAINT IF EXISTS check_available_seats_non_negative;

ALTER TABLE events 
ADD CONSTRAINT check_available_seats_non_negative 
CHECK (available_seats >= 0);

-- Add check constraint to prevent available_seats > total_seats
ALTER TABLE events 
DROP CONSTRAINT IF EXISTS check_available_seats_valid;

ALTER TABLE events 
ADD CONSTRAINT check_available_seats_valid 
CHECK (available_seats <= total_seats);

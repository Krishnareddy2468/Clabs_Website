# Event Registrations Setup Guide

## Database Setup

Run this SQL script in your Supabase SQL Editor to set up event registrations:

### Steps:

1. **Open Supabase Dashboard**
   - Go to https://app.supabase.com
   - Select your project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "+ New query"

3. **Run the Migration**
   - Copy the contents of `add-event-registrations.sql`
   - Paste into the SQL editor
   - Click "Run" or press Cmd/Ctrl + Enter

4. **Verify Setup**
   - Go to "Table Editor"
   - You should see:
     - `events` table now has `total_seats` and `available_seats` columns
     - New `event_registrations` table

## What This Adds

### Events Table Updates:
- `total_seats` - Maximum number of seats for the event
- `available_seats` - Number of seats still available

### New Event Registrations Table:
- Stores all student registration data
- Tracks payment information
- Links to events table
- Automatically decrements available seats on successful payment

### Features:

✅ **Admin Dashboard:**
- Create events with seat limits
- View all registrations under Events → Registrations
- See seat availability in real-time
- Export registrations to CSV
- Track revenue and payment status

✅ **Frontend:**
- Shows available seats on event cards
- Visual indicators (green/orange/red) for seat availability
- Disables registration when event is full
- Updates in real-time after payments

✅ **Payment Integration:**
- Automatically saves registration after successful payment
- Decrements available seats using database trigger
- Stores payment IDs for tracking
- Supports both paid and free events

## Testing

### 1. Update Existing Events
After running the migration, existing events will have default values:
- `total_seats: 100`
- `available_seats: 100`

You can update them manually or delete and recreate.

### 2. Create New Event
- Go to Admin → Events → Create Event
- Set the number of seats
- Create the event

### 3. Test Registration
- Go to homepage
- Find the event
- Click "Register for Event"
- Complete payment
- Check Admin → Events → Registrations
- Verify seats decreased

## Troubleshooting

### Seats not decreasing?
- Check if the trigger was created: `trigger_decrement_seats`
- Verify payment_status is set to 'completed'

### Can't see registrations?
- Check RLS policies are enabled
- Make sure you're logged in as admin
- Verify data was inserted into event_registrations table

### Registration failing?
- Check browser console for errors
- Verify Supabase connection
- Check if event_id exists in events table

## Manual Seat Update

If you need to manually adjust seats:

```sql
UPDATE events
SET available_seats = 50
WHERE id = 'your-event-id';
```

## Reset Registrations for Testing

```sql
-- WARNING: This deletes all registrations
DELETE FROM event_registrations;

-- Reset seats for all events
UPDATE events
SET available_seats = total_seats;
```

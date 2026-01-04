# Event Status and Feedback Feature - Setup Guide

## Overview
This implementation adds automatic event status management (upcoming, ongoing, completed) and a feedback system for completed events.

## Database Setup

### Step 1: Run the SQL Migration
Execute the SQL file in your Supabase SQL Editor:
- File: `add-event-status-and-feedback.sql`
- This will:
  - Add `status` column to the `events` table
  - Create `event_feedback` table
  - Set up Row Level Security policies
  - Create a function to auto-update event statuses

### Step 2: Set Up Automated Status Updates (Optional but Recommended)
In Supabase Dashboard:
1. Go to **Database** → **Cron Jobs** (or use pg_cron extension)
2. Create a new cron job to run hourly:
   ```sql
   SELECT cron.schedule(
     'update-event-status',
     '0 * * * *',  -- Run every hour
     'SELECT update_event_status()'
   );
   ```

Alternatively, the status is automatically updated when events are fetched via the API.

## Features Implemented

### 1. Event Status Management
- **Upcoming**: Events with dates in the future
- **Ongoing**: Events happening today
- **Completed**: Events that have passed

Status is automatically calculated and updated based on the event date.

### 2. Feedback System

#### Frontend (User-facing):
- **Hero Page** (`components/home/upcoming-events.tsx`):
  - Shows event status badges (Upcoming, Ongoing, Completed)
  - For completed events: "Share Your Feedback" button
  - For upcoming events: "Register for Event" button
  - For ongoing events: "Event In Progress" (registration disabled)

#### Feedback Form (`components/home/event-feedback-modal.tsx`):
- Collects:
  - Name
  - Email
  - Phone (optional)
  - Star rating (1-5)
  - Feedback text
- Only available for completed events

#### Admin Panel (`app/admin/events/page.tsx`):
- Status column in events table
- Feedback icon (💬) for completed events
- Click to view all feedback for an event
- Display feedback with:
  - Name, email, phone
  - Star rating
  - Feedback text
  - Submission date/time
  - Delete option

### 3. API Endpoints

**Event Feedback API** (`app/api/events/feedback/route.ts`):
- `GET /api/events/feedback?event_id={id}` - Fetch feedback for an event
- `POST /api/events/feedback` - Submit new feedback
- `DELETE /api/events/feedback?id={id}` - Delete feedback (admin only)

**Events API** (Updated `app/api/events/route.ts`):
- Automatically calculates and updates event status on fetch
- Returns status with each event

## Testing the Feature

### 1. Create Test Events
Create events with different dates to test all statuses:
- Past date → Status: Completed
- Today's date → Status: Ongoing
- Future date → Status: Upcoming

### 2. Test Feedback Flow
1. Navigate to homepage
2. Find a completed event in the carousel
3. Click "Share Your Feedback"
4. Fill out the form and submit
5. Go to Admin → Events
6. Click the feedback icon (💬) on the completed event
7. Verify feedback appears

### 3. Verify Status Updates
- Events automatically update status when viewed
- Or manually run: `SELECT update_event_status();` in Supabase

## Database Schema

### Events Table (Modified)
```sql
events (
  id UUID PRIMARY KEY,
  title TEXT,
  description TEXT,
  date DATE,
  location TEXT,
  image_url TEXT,
  amount DECIMAL,
  total_seats INTEGER,
  status TEXT DEFAULT 'upcoming',  -- NEW COLUMN
  created_at TIMESTAMP
)
```

### Event Feedback Table (New)
```sql
event_feedback (
  id UUID PRIMARY KEY,
  event_id UUID REFERENCES events(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  rating INTEGER CHECK (1-5),
  feedback TEXT NOT NULL,
  created_at TIMESTAMP
)
```

## UI/UX Changes

### Home Page
- ✅ Event status badges with icons
- ✅ Different button actions based on status
- ✅ Disabled registration for ongoing events
- ✅ Feedback form for completed events

### Admin Panel
- ✅ Status column in events table
- ✅ Feedback viewer modal
- ✅ Feedback management (view/delete)
- ✅ Star rating display
- ✅ Organized feedback cards

## Next Steps

1. **Run the SQL migration** in Supabase
2. **Test with sample events** at different dates
3. **(Optional) Set up cron job** for automated status updates
4. **Customize styling** if needed to match your brand

## Troubleshooting

### Status Not Updating
- Check if the SQL function `update_event_status()` exists
- Manually run: `SELECT update_event_status();`
- Check browser console for API errors

### Feedback Not Showing
- Verify RLS policies are correctly set in Supabase
- Check if the event status is 'completed'
- Check browser console for errors

### Can't Submit Feedback
- Ensure event status is 'completed'
- Verify all required fields are filled
- Check API endpoint is accessible

## Files Modified/Created

**New Files:**
- `add-event-status-and-feedback.sql`
- `app/api/events/feedback/route.ts`
- `components/home/event-feedback-modal.tsx`

**Modified Files:**
- `app/api/events/route.ts`
- `components/home/upcoming-events.tsx`
- `app/admin/events/page.tsx`

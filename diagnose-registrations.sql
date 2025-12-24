-- Diagnostic queries to check event registrations issue
-- Run these in Supabase SQL Editor

-- 1. Check if RLS is enabled on event_registrations
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename = 'event_registrations';

-- 2. Check what policies exist on event_registrations
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'event_registrations';

-- 3. Check recent registrations
SELECT 
  id,
  event_id,
  student_name,
  mobile_number,
  razorpay_payment_id,
  payment_status,
  created_at
FROM event_registrations
ORDER BY created_at DESC
LIMIT 10;

-- 4. Check if there are any failed payment records in contacts
SELECT 
  id,
  name,
  phone,
  LEFT(message, 100) as message_preview,
  created_at
FROM contact_responses
WHERE message LIKE '%Event Registration%'
ORDER BY created_at DESC
LIMIT 10;

-- 5. Check table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'event_registrations'
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- 6. Check if there are any triggers that might be failing
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE event_object_table = 'event_registrations';

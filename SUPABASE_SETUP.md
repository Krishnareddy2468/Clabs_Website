# Supabase Database Setup Guide

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign up with GitHub (recommended)
3. Create a new organization (or use existing)

## Step 2: Create a New Project

1. Click "New Project"
2. Enter project details:
   - **Name**: clabs-website
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free
3. Click "Create new project" (takes ~2 minutes)

## Step 3: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## Step 4: Configure Environment Variables

1. Open `.env.local` in your project
2. Replace the placeholder values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 5: Set Up Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the entire contents of `supabase-setup.sql`
4. Paste into the SQL editor
5. Click "Run" (or press Cmd/Ctrl + Enter)

You should see: "Success. No rows returned"

## Step 6: Verify Tables Created

1. Go to **Table Editor** in Supabase dashboard
2. You should see two tables:
   - `events`
   - `gallery_images`

## Step 7: Enable Storage (Optional - for image uploads)

1. Go to **Storage** in Supabase dashboard
2. Click "Create a new bucket"
3. Name it: `gallery`
4. Make it **Public**
5. Click "Create bucket"

## Step 8: Restart Your Dev Server

```bash
npm run dev
```

## Testing the Connection

1. Go to your admin dashboard: `http://localhost:3000/admin`
2. Login with: admin / clabs2025
3. Try creating an event or uploading an image
4. Check Supabase **Table Editor** to see the data

## Troubleshooting

**Can't connect to database?**
- Check `.env.local` has correct URL and key
- Restart dev server after adding .env.local
- Check Supabase project is running (not paused)

**Permission errors?**
- Make sure RLS policies were created correctly
- Check SQL editor for any errors when running setup script

**Need help?**
- Supabase docs: https://supabase.com/docs
- Discord: https://discord.supabase.com

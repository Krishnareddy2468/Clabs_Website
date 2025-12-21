# 🔧 IMPORTANT: Fix Your Supabase Configuration

## ❌ Current Issue

Your `NEXT_PUBLIC_SUPABASE_ANON_KEY` is incorrect. You're using a "publishable" key, but you need the **"anon public"** key.

## ✅ How to Fix

### Step 1: Get the Correct Key

1. Go to your Supabase project: https://app.supabase.com/project/ohvrashlwkrqfjoswoic/settings/api
2. Look for the section **"Project API keys"**
3. Find the key labeled **"anon" "public"** (NOT "publishable")
4. It should be a VERY LONG token that starts with `eyJ...`
5. Click the copy button

### Step 2: Update .env.local

Replace the current key in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...your_very_long_key_here
```

### Step 3: Create Database Tables

1. Go to https://app.supabase.com/project/ohvrashlwkrqfjoswoic/sql
2. Click **"+ New query"**
3. Copy ALL contents from `supabase-setup.sql`
4. Paste into the SQL editor
5. Click **"Run"** (or press Cmd+Enter)
6. You should see: "Success. No rows returned"

### Step 4: Verify Tables Created

1. Go to https://app.supabase.com/project/ohvrashlwkrqfjoswoic/editor
2. You should see two tables:
   - ✅ **events**
   - ✅ **gallery_images**

### Step 5: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

### Step 6: Test

1. Open http://localhost:3000/admin
2. Login: admin / clabs2025
3. Try creating an event
4. Go to your Supabase Table Editor to verify data was saved

---

## 🎯 Quick Checklist

- [ ] Get correct "anon public" key from Supabase (starts with eyJ...)
- [ ] Update .env.local with the correct key
- [ ] Run supabase-setup.sql in Supabase SQL Editor
- [ ] Verify tables appear in Table Editor
- [ ] Restart npm run dev
- [ ] Test admin dashboard

---

## 📝 What the Correct Key Looks Like

❌ **WRONG** (publishable key):
```
sb_publishable_uHGaRlMF62BdIol3LDwUHQ_YTo1IHqs
```

✅ **CORRECT** (anon public key):
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9odnJhc2hsd2tycWZqb3N3b2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM...
```
(continues for ~500+ characters)

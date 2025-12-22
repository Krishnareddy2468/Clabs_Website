# Razorpay Payment Integration - Troubleshooting Guide

## Common Issues and Solutions

### 1. "Failed to initiate payment" Error

#### Possible Causes:

**A. Missing or Invalid Razorpay Keys**
- Check if `.env.local` has both keys:
  ```env
  NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
  RAZORPAY_KEY_SECRET=xxxxx
  ```
- **Important**: Live keys (`rzp_live_`) require completed KYC in Razorpay dashboard
- For testing, use Test keys (`rzp_test_`)

**B. Razorpay Script Not Loaded**
- Open browser console (F12)
- Check for errors related to Razorpay
- Verify script is loaded: Type `window.Razorpay` in console - should not be `undefined`

**C. Server Not Restarted After Environment Changes**
- After adding/changing `.env.local`, you MUST restart the dev server:
  ```bash
  # Stop the server (Ctrl+C)
  # Then restart:
  npm run dev
  ```

**D. Using Live Keys Without KYC**
- Live Razorpay keys require:
  - Completed business KYC verification
  - Activated payment methods
  - Bank account verification
- **Solution**: Use Test keys for development

**E. Invalid Amount**
- Amount must be greater than 0
- Check browser console for the exact error message

### 2. How to Get Test Keys

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Switch to **Test Mode** (toggle in top-left)
3. Go to Settings → API Keys
4. Generate Test Keys
5. Use keys starting with `rzp_test_`

### 3. Test Card Details (Test Mode Only)

- **Card**: 4111 1111 1111 1111
- **CVV**: Any 3 digits (e.g., 123)
- **Expiry**: Any future date (e.g., 12/25)
- **Name**: Any name

### 4. How to Debug

**Step 1: Check Browser Console**
```
1. Right-click → Inspect (or F12)
2. Go to Console tab
3. Try to register for an event
4. Look for red error messages
```

**Step 2: Check Network Tab**
```
1. Open Network tab in browser DevTools
2. Filter by "Fetch/XHR"
3. Click "Proceed to Payment"
4. Look for /api/razorpay/create-order request
5. Check if it returns 200 OK or error
6. Click on the request → Preview/Response to see error details
```

**Step 3: Check Server Logs**
```
Look at your terminal where npm run dev is running
Check for error messages when you click the button
```

### 5. Environment Variable Checklist

Your `.env.local` should have:
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_HERE
RAZORPAY_KEY_SECRET=YOUR_SECRET_HERE
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Important Notes:**
- No spaces around `=`
- No quotes around values
- `NEXT_PUBLIC_` prefix is required for client-side access
- File must be named `.env.local` exactly
- File must be in the root directory

### 6. Quick Test

Open browser console and run:
```javascript
console.log(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID)
```

Should show your key. If it shows `undefined`, environment variable is not loaded.

### 7. Still Not Working?

1. **Kill all Node processes:**
   ```bash
   # macOS/Linux:
   killall node
   
   # Windows:
   taskkill /F /IM node.exe
   ```

2. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   ```

3. **Restart dev server:**
   ```bash
   npm run dev
   ```

4. **Hard refresh browser:**
   - Windows/Linux: Ctrl + Shift + R
   - macOS: Cmd + Shift + R

### 8. Switching from Live to Test Keys

If you're using live keys but haven't completed KYC:

1. Go to Razorpay Dashboard
2. Toggle to **Test Mode** (top-left corner)
3. Settings → API Keys → Generate Test Key
4. Replace in `.env.local`:
   ```env
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_NEW_KEY
   RAZORPAY_KEY_SECRET=NEW_SECRET
   ```
5. Restart server
6. Clear browser cache

### 9. Verify Integration

After fixing, you should see:
1. Click "Proceed to Payment"
2. Razorpay modal opens immediately
3. Payment options appear (Card, UPI, etc.)
4. You can complete test payment
5. Success message appears

### 10. Get Specific Error

Check the updated code - it now logs specific errors:
- Browser console shows: "Order creation failed: [specific error]"
- Server logs show: "Error details: [full error from Razorpay]"

Share these error messages if you need more help!

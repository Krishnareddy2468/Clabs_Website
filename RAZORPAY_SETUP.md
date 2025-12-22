# Razorpay Integration Setup

This project uses Razorpay for event registration payments.

## Required Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Getting Razorpay API Keys

1. **Sign up for Razorpay**
   - Visit [https://razorpay.com/](https://razorpay.com/)
   - Create an account or log in

2. **Get API Keys**
   - Go to Settings → API Keys
   - Generate Test/Live Keys
   - Copy the `Key ID` and `Key Secret`

3. **Test Mode vs Live Mode**
   - Test Mode: Use test API keys for development
   - Live Mode: Use live API keys for production

## Installing Razorpay Package

Run the following command to install the Razorpay SDK:

```bash
npm install razorpay
# or
pnpm add razorpay
# or
yarn add razorpay
```

## Testing Razorpay Integration

### Test Card Details (Test Mode)
- **Card Number**: 4111 1111 1111 1111
- **CVV**: Any 3 digits
- **Expiry**: Any future date

### UPI Test
- **UPI ID**: success@razorpay

### Netbanking Test
- Select any bank and use "success" for success or "failure" for failure

## How It Works

1. User fills the event registration form
2. When clicking "Proceed to Payment", a Razorpay order is created
3. Razorpay checkout modal opens with payment options
4. After successful payment, the payment is verified
5. Registration data is stored with payment details
6. User sees success message

## Features

- ✅ Secure payment processing
- ✅ Multiple payment methods (Cards, UPI, Netbanking, Wallets)
- ✅ Payment verification using signature
- ✅ Automatic registration data storage
- ✅ Free event handling (skips payment for ₹0 events)
- ✅ Mobile-responsive payment modal

## API Routes

- **Create Order**: `/api/razorpay/create-order`
  - Creates a Razorpay order with event details
  
- **Verify Payment**: `/api/razorpay/verify-payment`
  - Verifies payment signature
  - Stores registration data

## Security

- ✅ Payment signature verification
- ✅ Server-side API key storage
- ✅ HTTPS required for production
- ✅ Order validation before payment

## Production Deployment

Before going live:

1. Switch to Live API keys in Razorpay dashboard
2. Update `.env.local` with live keys
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain
4. Complete KYC verification in Razorpay
5. Enable required payment methods
6. Test thoroughly with small amounts

## Troubleshooting

### "Razorpay is not defined"
- Ensure the Razorpay script is loaded in layout.tsx
- Check browser console for script loading errors

### Payment verification failed
- Verify RAZORPAY_KEY_SECRET is correct
- Check if payment was successful in Razorpay dashboard
- Review server logs for errors

### Order creation failed
- Verify API keys are set correctly
- Check if Razorpay account is active
- Ensure amount is greater than 0

## Support

For Razorpay specific issues:
- Documentation: [https://razorpay.com/docs/](https://razorpay.com/docs/)
- Support: [https://razorpay.com/support/](https://razorpay.com/support/)

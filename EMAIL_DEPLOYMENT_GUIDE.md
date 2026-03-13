# Email Configuration Guide for Deployment

## Problem
Emails are not sending in the deployed version (Vercel/production).

## Root Cause
Environment variables are not configured in the deployment platform.

## Solution

### Step 1: Add Environment Variables to Vercel

1. Go to your Vercel project: https://vercel.com/dashboard
2. Select your project (Apply Solo Germany)
3. Go to **Settings > Environment Variables**
4. Add the following variables:

```
MONGODB_URI=mongodb+srv://newsomil1229_db_user:okWDiTpFcHf7dChA@cluster0.gjn5j3r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

RAZORPAY_KEY_ID=rzp_test_S44Z7lInjZTkGO

RAZORPAY_KEY_SECRET=5Ba4YSXDlVHlTTu2dYcewsGD

NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_S44Z7lInjZTkGO

SMTP_HOST=smtp.gmail.com

SMTP_PORT=587

SMTP_USER=applysolo30@gmail.com

SMTP_PASS=jrjy uybb swxw ypoc

SMTP_FROM="Apply Solo Germany" <applysolo30@gmail.com>

BOOK_DRIVE_LINK=https://drive.google.com/drive/folders/1hJ8YBllOHiTQGnWaUBjFh1KLjimG-YBr?usp=drive_link
```

⚠️ **IMPORTANT:** Do NOT include quotation marks around the values when adding to Vercel.

### Step 2: Verify Gmail Configuration

Ensure your Gmail account has:
1. **Two-Factor Authentication enabled** (required for app passwords)
2. **App Password generated** (not your regular Gmail password)

To get/create an App Password:
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer" (or your device)
3. Generate a new app password
4. Copy and paste it as `SMTP_PASS`

### Step 3: Redeploy

After adding the environment variables:
1. Push your code to GitHub/your repository
2. Vercel will automatically redeploy with new environment variables
3. Or manually trigger deployment in Vercel dashboard

### Step 4: Test Email Sending

1. Test the contact form at `/contact`
2. Submit a test contact form
3. Check Vercel logs: **Deployments > Production > Logs**

## Troubleshooting

If emails still don't work:

### Check Vercel Logs
1. Go to your Vercel project
2. Click "Deployments"
3. Select the latest deployment
4. Go to "Logs" tab
5. Look for email-related errors

### Common Issues

**Issue: "Error: querySrv ECONNREFUSED"**
- This is a MongoDB connection error, not email
- Check MONGODB_URI variable

**Issue: "SMTP Authentication Failed"**
- Verify SMTP_USER and SMTP_PASS are correct
- Ensure you're using an App Password (not regular Gmail password)
- Check that 2FA is enabled on Gmail account

**Issue: "Connection Timeout"**
- Gmail SMTP might be blocked by your network/firewall
- Try using Gmail App Password instead of regular password

**Issue: "Email sent but not received"**
- Check spam/junk folder
- Verify the recipient email address is correct
- Check if your email domain is being flagged

## Email Endpoints

The following endpoints send emails:

1. **Contact Form**: `/api/contact` (POST)
   - Sends to admin AND user confirmation
   
2. **Payment Success**: `/api/checkout/verify` (POST)
   - Sends book link via `sendBookEmail()`
   
3. **Welcome Email**: `/api/auth/signup` (if exists)
   - Welcome email for new users

## Files Modified

- `lib/email.ts` - Added SMTP verification and logging
- `app/api/contact/route.ts` - Added email error handling
- `app/api/checkout/verify/route.ts` - Added email logging
- `.env.production` - Documentation of required variables

## Next Steps

1. Add all environment variables to Vercel
2. Redeploy your application
3. Test email functionality
4. Check Vercel logs for any errors
5. Verify emails are being received

If issues persist, check the Vercel logs with detailed error messages.

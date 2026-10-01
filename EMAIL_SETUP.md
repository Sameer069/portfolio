# Email Setup Guide

Your contact form is now configured to send emails to **sameerdas0907@gmail.com** using Gmail SMTP.

## Setup Steps:

### 1. Get Gmail App Password

Since you're using Gmail, you need to create an **App Password** (not your regular password):

1. **Enable 2-Step Verification:**
   - Go to: https://myaccount.google.com/security
   - Scroll to "2-Step Verification"
   - Follow the steps to enable it

2. **Create App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Click "Generate"
   - Copy the 16-character password (example: `abcd efgh ijkl mnop`)

### 2. Update .env.local File

Open `.env.local` and replace `your-app-password-here` with your App Password:

```env
EMAIL_USER=sameerdas0907@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
EMAIL_TO=sameerdas0907@gmail.com
```

**Important:** 
- Remove spaces from the app password when pasting
- Don't commit `.env.local` to Git (already in .gitignore)

### 3. Restart Development Server

After updating `.env.local`:

```bash
# Stop the server (Ctrl + C)
# Start it again
npm run dev
```

### 4. Test the Contact Form

1. Go to the Contact section on your portfolio
2. Fill in the form
3. Click "Send Message"
4. Check your Gmail inbox (sameerdas0907@gmail.com)

## Email Features:

✅ **Beautiful HTML Email** with your brand colors
✅ **Reply-To** automatically set to sender's email
✅ **Indian Timezone** (Asia/Kolkata) for timestamps
✅ **Professional formatting** with sender details
✅ **Error handling** with fallback message

## Troubleshooting:

### "Invalid Credentials" Error
- Make sure you're using an **App Password**, not your regular Gmail password
- Remove any spaces from the app password
- Ensure 2-Step Verification is enabled

### Email Not Sending
- Check the browser console (F12) for errors
- Verify `.env.local` file is in the root directory
- Restart the dev server after changing `.env.local`

### Gmail Blocking
- Gmail might block "less secure" apps initially
- Use App Passwords (as described above)
- Check https://myaccount.google.com/lesssecureapps (should be N/A if using App Password)

## Production Deployment:

When deploying to Vercel/Netlify:

1. Add environment variables in the dashboard:
   - `EMAIL_USER=sameerdas0907@gmail.com`
   - `EMAIL_PASS=your-app-password`
   - `EMAIL_TO=sameerdas0907@gmail.com`

2. Never commit `.env.local` to Git

## Alternative Services:

If Gmail doesn't work, consider:
- **Resend** (https://resend.com) - Free 100 emails/day
- **SendGrid** (https://sendgrid.com) - Free 100 emails/day
- **EmailJS** (https://www.emailjs.com) - Client-side, no backend needed

---

**Your email is now ready!** 📧

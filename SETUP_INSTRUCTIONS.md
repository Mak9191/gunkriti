# EduOverseaz Contact Form Setup Instructions

## Email Form Configuration

Your contact form is now configured to send emails to **kamaan523@gmail.com**

## Setup Steps

### 1. Generate Gmail App Password

Since you're using Gmail (kamaan523@gmail.com), you need to create an **App Password** for security:

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Enable **2-Step Verification** (if not already enabled)
4. Once 2FA is enabled, go back to Security
5. Scroll down to "How you sign in to Google"
6. Click on **App passwords**
7. Select **Mail** and **Other (Custom name)**
8. Enter "EduOverseaz Website" as the name
9. Click **Generate**
10. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

### 2. Update the .env File

Open the `.env` file in your project and replace `YOUR_GMAIL_APP_PASSWORD_HERE` with the app password you just generated:

```
SMTP_PASS=abcdefghijklmnop
```

**Important:** Remove the spaces from the app password when you paste it.

### 3. Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

This will install:
- express (web server)
- nodemailer (email sending)
- cors (cross-origin requests)
- dotenv (environment variables)

### 4. Start the Server

Run the following command:

```bash
npm start
```

You should see:
```
✅ SMTP connection established. Ready to send emails.
🚀 Email service listening on port 3000
```

### 5. Test the Contact Form

1. Open [contact.html](contact.html) in your browser
2. Right-click and select "Open with Live Server" (if using VS Code)
3. Or simply open the file: `file:///path/to/contact.html`
4. Fill out the form and click "Send Message"
5. Check **kamaan523@gmail.com** for the test email

## How It Works

1. **Contact Form** ([contact.html](contact.html)) - Users fill out the form
2. **Frontend JavaScript** - Sends form data to your backend API
3. **Express Server** ([server.js](server.js)) - Receives the form submission
4. **Nodemailer** - Sends email using Gmail SMTP
5. **Email Delivered** - You receive the inquiry at kamaan523@gmail.com

## Deployment (Production)

When deploying to a live server:

### Option 1: Using Your Hosting Provider

1. Upload all files to your hosting provider
2. Set environment variables in your hosting control panel
3. Update the API endpoint in [contact.html](contact.html) line 402:
   ```javascript
   const INQUIRY_API_ENDPOINT = 'https://yourdomain.com/api/inquiry';
   ```

### Option 2: Using Separate Backend (Recommended)

Deploy the backend separately on services like:
- **Heroku** (free tier available)
- **Railway** (free tier available)
- **Render** (free tier available)
- **Vercel** or **Netlify** with serverless functions

Then update the API endpoint to point to your deployed backend.

## Troubleshooting

### "SMTP configuration error"
- Check that your Gmail App Password is correct in `.env`
- Make sure there are no spaces in the password
- Verify 2-Step Verification is enabled on your Google account

### "Unable to send email"
- Check your internet connection
- Verify the SMTP settings are correct
- Make sure the server is running (`npm start`)

### Form submission shows error
- Check browser console for errors (F12 → Console)
- Verify the backend server is running
- Check CORS settings if testing from a different domain

### Email not received
- Check your spam/junk folder
- Verify INQUIRY_RECIPIENT email is correct in `.env`
- Check server logs for errors

## Security Notes

- ✅ `.env` file is now in `.gitignore` - won't be committed to Git
- ✅ Never share your App Password publicly
- ✅ Use environment variables for production deployment
- ✅ Consider using a dedicated email service (SendGrid, Mailgun) for production

## Contact

For any issues, check the console logs or contact the developer.

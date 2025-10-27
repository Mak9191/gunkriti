# Production Deployment Guide for EduOverseaz

## ✅ Your Credentials Are Secure

Your `.env` file is protected by `.gitignore` and will NEVER be uploaded to GitHub or any public repository.

---

## 🚀 Deployment Options

### Option 1: Railway.app (Recommended - Easiest)

**Why Railway?**
- ✅ Free 500 hours/month
- ✅ Automatic deployments from GitHub
- ✅ Easy environment variable setup
- ✅ Automatic HTTPS

**Steps:**

1. **Create Account**
   - Go to https://railway.app/
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `gunkriti` repository

3. **Add Environment Variables**
   - Click on your project → "Variables"
   - Add each variable from your `.env` file:
     ```
     PORT=3000
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=587
     SMTP_SECURE=false
     SMTP_USER=kamaan523@gmail.com
     SMTP_PASS=kiui cwtw gxxi fitq
     INQUIRY_RECIPIENT=kamaan523@gmail.com
     CORS_ORIGIN=https://eduoverseaz.com
     ```

4. **Deploy**
   - Railway will auto-deploy
   - You'll get a URL like: `https://gunkriti-production.up.railway.app`

5. **Update Your Website**
   - Update the API endpoint in `contact.html` line 402:
   ```javascript
   const INQUIRY_API_ENDPOINT = 'https://gunkriti-production.up.railway.app/api/inquiry';
   ```

---

### Option 2: Render.com (Also Free)

**Steps:**

1. **Create Account**
   - Go to https://render.com/
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Name: `eduoverseaz-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Add Environment Variables**
   - Scroll down to "Environment Variables"
   - Add all variables from your `.env` file

4. **Deploy**
   - Click "Create Web Service"
   - You'll get a URL like: `https://eduoverseaz-backend.onrender.com`

5. **Update Contact Form**
   - Change API endpoint to your Render URL

---

### Option 3: Traditional Hosting (cPanel/Shared Hosting)

If you already have web hosting (like GoDaddy, Hostinger, Bluehost):

1. **Requirements:**
   - SSH access
   - Node.js support
   - Terminal access

2. **Upload Files:**
   - Upload all files EXCEPT `.env` via FTP
   - Create `.env` file directly on server using File Manager or SSH

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Start Server:**
   ```bash
   npm start
   ```

5. **Keep Running:**
   - Use `pm2` to keep server running:
   ```bash
   npm install -g pm2
   pm2 start server.js
   pm2 startup
   pm2 save
   ```

---

## 🔒 Security Checklist for Production

### ✅ Already Protected:
- [x] `.env` file is in `.gitignore`
- [x] Using App Password instead of real Gmail password
- [x] CORS configured for specific domains
- [x] Input validation in server

### 🔐 Additional Security Recommendations:

1. **Update CORS for Production Only:**
   ```javascript
   CORS_ORIGIN=https://eduoverseaz.com,https://www.eduoverseaz.com
   ```

2. **Add Rate Limiting (Optional but Recommended):**
   Install rate limiting:
   ```bash
   npm install express-rate-limit
   ```

   Add to `server.js` after line 35:
   ```javascript
   import rateLimit from 'express-rate-limit';

   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 5, // 5 requests per IP
     message: { error: 'Too many requests, please try again later.' }
   });

   app.use('/api/inquiry', limiter);
   ```

3. **Use Environment-Specific Settings:**
   - Development: Allow localhost
   - Production: Only allow your domain

4. **Monitor Your Email:**
   - Check for unusual activity
   - You can revoke the App Password anytime at: https://myaccount.google.com/apppasswords

5. **Backup Strategy:**
   - Keep a local backup of your `.env` file
   - Store it securely (password manager like 1Password, LastPass, or Bitwarden)

---

## 📧 Alternative Email Services (For High Volume)

If you expect more than 500 emails/day, consider:

### SendGrid (Recommended)
- Free: 100 emails/day
- Paid: $19.95/month for 50,000 emails
- Better deliverability
- Email tracking and analytics

### Mailgun
- Free: 5,000 emails/month
- More reliable for transactional emails

### AWS SES
- Very cheap: $0.10 per 1,000 emails
- Requires AWS account

---

## 🧪 Testing Production Setup

After deployment:

1. **Test the Form:**
   - Submit a test inquiry
   - Check email delivery
   - Check spam folder

2. **Test Error Handling:**
   - Submit empty form
   - Check error messages

3. **Monitor Logs:**
   - Check server logs for errors
   - Most platforms provide log viewing

---

## 🆘 Troubleshooting Production

### Email Not Sending
1. Check environment variables are set correctly
2. Verify Gmail App Password is correct (no spaces)
3. Check server logs for SMTP errors
4. Test SMTP connection: https://www.smtper.net/

### CORS Errors
1. Update CORS_ORIGIN to include your production domain
2. Restart the server after changes
3. Clear browser cache

### Server Crashes
1. Check Node.js version compatibility
2. Review server logs
3. Verify all dependencies are installed

---

## 📊 Recommended Setup for EduOverseaz

**For Your Use Case (Educational Consultancy):**

1. **Backend:** Railway.app (Free tier is perfect for your volume)
2. **Frontend:** Deploy HTML files to:
   - GitHub Pages (Free, but doesn't support your own domain easily)
   - Netlify (Free, supports custom domain)
   - Vercel (Free, supports custom domain)
   - Your existing hosting (if you have one)

3. **Domain Setup:**
   - Keep your frontend on `https://eduoverseaz.com`
   - Backend on Railway: `https://eduoverseaz-api.up.railway.app`
   - Or use subdomain: `api.eduoverseaz.com` → Railway

---

## 💰 Cost Estimate

**Option 1 (Free):**
- Railway: FREE (500 hrs/month = always on)
- Total: **$0/month**

**Option 2 (Paid - More Professional):**
- Railway/Render: $5-7/month
- Custom domain: $10-15/year
- Total: **~$7-10/month**

---

## 🎯 Quick Start Commands

Deploy to Railway (after setup):
```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

Railway will auto-deploy!

---

## 📱 Support

If you need help deploying:
1. Check Railway/Render documentation
2. Check server logs for specific errors
3. Test locally first with `npm start`

---

**Your email credentials are safe! They will never be exposed if you follow these guidelines.**

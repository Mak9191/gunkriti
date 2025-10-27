# Custom Domain Email Setup Guide
## Using harnish@eduoverseaz.com

## ✅ DONE: Receiving Emails

I've already updated your configuration to **receive** inquiry emails at:
- **harnish@eduoverseaz.com** ✅

All contact form submissions will now be sent to this email address.

---

## 📧 Option: Send FROM harnish@eduoverseaz.com (Professional Look)

If you also want emails to appear **FROM** harnish@eduoverseaz.com instead of kamaan523@gmail.com, follow the guide below based on where your email is hosted.

---

## Where is harnish@eduoverseaz.com Hosted?

First, identify your email hosting provider:

### Option A: Google Workspace (Gmail for Business)
**If you use Google Workspace (previously G Suite)**

### Option B: cPanel/Web Hosting Email
**If your email comes with your web hosting (GoDaddy, Hostinger, Bluehost, etc.)**

### Option C: Microsoft 365 (Outlook)
**If you use Microsoft 365 for business email**

### Option D: Other Email Providers
**Zoho Mail, ProtonMail, etc.**

---

## 🔧 Setup Instructions by Provider

### Option A: Google Workspace (Gmail for Business)

**Requirements:**
- Google Workspace account (paid, ~$6/month)
- Domain ownership verified

**Steps:**

1. **Enable IMAP in Google Workspace:**
   - Go to admin.google.com
   - Apps → Google Workspace → Gmail
   - Enable IMAP for your organization

2. **Create App Password:**
   - Sign in to harnish@eduoverseaz.com at https://myaccount.google.com/security
   - Enable 2-Step Verification
   - Go to App passwords
   - Generate password for "Mail"

3. **Update .env:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=harnish@eduoverseaz.com
   SMTP_PASS=your_16_char_app_password
   INQUIRY_RECIPIENT=harnish@eduoverseaz.com
   ```

4. **Restart Server:**
   ```bash
   npm start
   ```

**Pros:**
- ✅ Easy setup (same as Gmail)
- ✅ Reliable delivery
- ✅ Professional appearance

**Cons:**
- ❌ Costs $6-12/month per user

---

### Option B: cPanel/Web Hosting Email

**Most Common Hosting Providers:**
- GoDaddy, Hostinger, Bluehost, SiteGround, Namecheap, etc.

**Steps:**

1. **Find SMTP Settings:**
   - Login to your hosting cPanel
   - Go to "Email Accounts" or "Email Settings"
   - Find SMTP server details (usually in "Configure Email Client" or "Email Setup")

2. **Common SMTP Settings:**
   ```
   SMTP Host: mail.yourdomain.com  (or smtp.yourdomain.com)
   SMTP Port: 587 or 465
   Username: harnish@eduoverseaz.com
   Password: Your email password
   Security: TLS (587) or SSL (465)
   ```

3. **Update .env:**
   ```env
   # For TLS (Port 587)
   SMTP_HOST=mail.eduoverseaz.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=harnish@eduoverseaz.com
   SMTP_PASS=your_email_password
   INQUIRY_RECIPIENT=harnish@eduoverseaz.com
   ```

   OR

   ```env
   # For SSL (Port 465)
   SMTP_HOST=mail.eduoverseaz.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=harnish@eduoverseaz.com
   SMTP_PASS=your_email_password
   INQUIRY_RECIPIENT=harnish@eduoverseaz.com
   ```

4. **Provider-Specific SMTP Settings:**

   **GoDaddy:**
   ```
   SMTP_HOST=smtpout.secureserver.net
   SMTP_PORT=465
   SMTP_SECURE=true
   ```

   **Hostinger:**
   ```
   SMTP_HOST=smtp.hostinger.com
   SMTP_PORT=587
   SMTP_SECURE=false
   ```

   **Bluehost:**
   ```
   SMTP_HOST=mail.yourdomain.com
   SMTP_PORT=465
   SMTP_SECURE=true
   ```

   **Namecheap:**
   ```
   SMTP_HOST=mail.privateemail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   ```

5. **Test Configuration:**
   ```bash
   npm start
   ```

**Pros:**
- ✅ Free (included with hosting)
- ✅ Professional domain email

**Cons:**
- ⚠️ May have sending limits (500-1000/day)
- ⚠️ Can be flagged as spam if not configured properly

---

### Option C: Microsoft 365 (Outlook)

**If you use Microsoft 365 Business**

1. **Enable SMTP Authentication:**
   - Go to admin.microsoft.com
   - Users → Active users → Select user
   - Mail tab → Manage email apps
   - Enable "Authenticated SMTP"

2. **Update .env:**
   ```env
   SMTP_HOST=smtp.office365.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=harnish@eduoverseaz.com
   SMTP_PASS=your_microsoft_password
   INQUIRY_RECIPIENT=harnish@eduoverseaz.com
   ```

3. **Restart Server:**
   ```bash
   npm start
   ```

**Pros:**
- ✅ Professional
- ✅ Good deliverability
- ✅ Includes Office apps

**Cons:**
- ❌ Costs $6-12.50/month per user

---

### Option D: Other Providers

**Zoho Mail:**
```env
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=harnish@eduoverseaz.com
SMTP_PASS=your_zoho_password
```

**SendGrid (Recommended for High Volume):**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
```

**Mailgun:**
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@yourdomain.com
SMTP_PASS=your_mailgun_password
```

---

## 🎯 Recommendation for EduOverseaz

### Current Setup (Already Configured) ✅
```
Send FROM: kamaan523@gmail.com (via Gmail)
Send TO: harnish@eduoverseaz.com
```

**Benefits:**
- ✅ 100% Free
- ✅ Reliable Gmail infrastructure
- ✅ Works immediately
- ✅ You receive inquiries at your professional email

**This is perfect for most small businesses!**

---

### Professional Setup (Optional Upgrade)

If you want emails to show **FROM: harnish@eduoverseaz.com**:

**Recommended Option:**
1. **Use Google Workspace** ($6/month)
   - Most reliable
   - Best deliverability
   - Professional appearance

2. **Or use your existing web hosting email** (Free)
   - Check your hosting provider's SMTP settings
   - Follow Option B above

---

## 🧪 How to Find Your Current Email Hosting

Run this command to check where eduoverseaz.com email is hosted:

```bash
nslookup -type=MX eduoverseaz.com
```

**Results will show:**
- **Google (gmail.com or googlemail.com)**: You have Google Workspace
- **Your hosting provider**: You use web hosting email
- **outlook.com or office365.com**: You have Microsoft 365
- **Other**: Zoho, SendGrid, etc.

---

## 📊 Cost Comparison

| Option | Cost | Reliability | Professional | Setup |
|--------|------|-------------|--------------|-------|
| Current (Gmail → Custom) | FREE ✅ | Excellent | Good | ✅ Done |
| Google Workspace | $6/mo | Excellent | Excellent | Easy |
| Web Hosting Email | FREE ✅ | Good | Excellent | Medium |
| Microsoft 365 | $6/mo | Excellent | Excellent | Easy |
| SendGrid | $15/mo | Excellent | Excellent | Medium |

---

## 🔍 Check Your Current Setup

To verify where harnish@eduoverseaz.com is hosted, try:

1. **Send a test email TO harnish@eduoverseaz.com**
   - Can you receive it?
   - Where do you check it? (Gmail, cPanel webmail, Outlook, etc.)

2. **Try to SEND an email FROM harnish@eduoverseaz.com**
   - What email client do you use?
   - This will tell us which provider you're using

---

## 🆘 Need Help?

**Tell me:**
1. Where do you currently check emails for harnish@eduoverseaz.com?
   - Gmail website?
   - Outlook?
   - Your hosting provider's webmail?
   - Email client (Apple Mail, Outlook app)?

2. Do you have Google Workspace or regular web hosting email?

3. Can you send emails from harnish@eduoverseaz.com currently?

This will help me give you exact SMTP settings!

---

## ✅ Current Status

**What's Working Now:**
- ✅ Contact form sends to: **harnish@eduoverseaz.com**
- ✅ Emails sent via: kamaan523@gmail.com (Gmail SMTP)
- ✅ Professional recipient address
- ✅ Free forever
- ✅ Reliable delivery

**When customer receives email:**
- FROM: EduOverseaz Website <kamaan523@gmail.com>
- TO: harnish@eduoverseaz.com
- REPLY-TO: [Customer's email] (so you can reply directly)

This is a perfectly professional setup! The only visible difference would be the FROM address in your inbox.

---

**Want to upgrade to send FROM harnish@eduoverseaz.com? Let me know your email hosting provider!**

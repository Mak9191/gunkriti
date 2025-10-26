import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

dotenv.config();

const {
  PORT = 3000,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE = 'false',
  SMTP_USER,
  SMTP_PASS,
  INQUIRY_RECIPIENT,
  CORS_ORIGIN
} = process.env;

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !INQUIRY_RECIPIENT) {
  console.error('❌ Missing required SMTP configuration. Check your environment variables.');
  process.exit(1);
}

const app = express();

const corsOrigins = CORS_ORIGIN
  ? CORS_ORIGIN.split(',').map(origin => origin.trim())
  : ['http://localhost:5501', 'http://127.0.0.1:5501', 'http://localhost:3000'];

app.use(cors({
  origin: corsOrigins,
  methods: ['POST', 'OPTIONS'],
}));

app.use(express.json());

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: SMTP_SECURE === 'true',
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

transporter.verify()
  .then(() => console.log('✅ SMTP connection established. Ready to send emails.'))
  .catch((error) => {
    console.error('❌ SMTP configuration error:', error.message);
    process.exit(1);
  });

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/inquiry', async (req, res) => {
  const { name, email, phone, country, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const mailText = [
    'You have received a new inquiry from the EduOverseaz website.',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not provided'}`,
    `Preferred Country: ${country || 'Not provided'}`,
    '',
    'Message:',
    message,
    '',
    '---',
    'This message was sent automatically by the EduOverseaz website.'
  ].join('\n');

  try {
    await transporter.sendMail({
      from: `"EduOverseaz Website" <${SMTP_USER}>`,
      to: INQUIRY_RECIPIENT,
      replyTo: email,
      subject: `New Inquiry from ${name}`,
      text: mailText
    });

    res.status(200).json({ message: 'Inquiry sent successfully.' });
  } catch (error) {
    console.error('❌ Failed to send inquiry email:', error);
    res.status(500).json({ error: 'Unable to send email at this time.' });
  }
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((error, _req, res, _next) => {
  console.error('Unexpected error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Email service listening on port ${PORT}`);
});

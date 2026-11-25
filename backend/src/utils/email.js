import nodemailer from 'nodemailer'

export function emailIsConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.NOTIFICATION_EMAIL)
}

export async function notifyPortfolioOwner(message) {
  if (!emailIsConfigured()) return { sent: false, reason: 'not_configured' }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.NOTIFICATION_EMAIL,
    replyTo: message.email,
    subject: `Portfolio contact: ${message.subject}`,
    text: `Name: ${message.name}\nEmail: ${message.email}\nSubject: ${message.subject}\n\n${message.message}`,
  })
  return { sent: true }
}

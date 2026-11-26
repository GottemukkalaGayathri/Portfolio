import nodemailer from 'nodemailer'

function resendIsConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL)
}

function smtpIsConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.NOTIFICATION_EMAIL)
}

export function emailIsConfigured() {
  return resendIsConfigured() || smtpIsConfigured()
}

async function sendViaResend(mail) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || 'Portfolio Contact <onboarding@resend.dev>',
      to: [mail.to],
      reply_to: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
    }),
  })

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new Error(`Resend API error (${response.status}): ${body || response.statusText}`)
  }
}

async function sendViaSmtp(mail) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: mail.to,
    replyTo: mail.replyTo,
    subject: mail.subject,
    text: mail.text,
  })
}

export async function notifyPortfolioOwner(message) {
  if (!emailIsConfigured()) return { sent: false, reason: 'not_configured' }

  const mail = {
    to: process.env.NOTIFICATION_EMAIL,
    replyTo: message.email,
    subject: `Portfolio contact: ${message.subject}`,
    text: `Name: ${message.name}\nEmail: ${message.email}\nSubject: ${message.subject}\n\n${message.message}`,
  }

  if (resendIsConfigured()) {
    await sendViaResend(mail)
    return { sent: true, provider: 'resend' }
  }

  await sendViaSmtp(mail)
  return { sent: true, provider: 'smtp' }
}

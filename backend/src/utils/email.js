import nodemailer from 'nodemailer'

const env = (key) => (process.env[key] || '').trim()

function resendIsConfigured() {
  return Boolean(env('RESEND_API_KEY') && env('NOTIFICATION_EMAIL'))
}

function smtpIsConfigured() {
  return Boolean(env('SMTP_HOST') && env('SMTP_USER') && env('SMTP_PASS') && env('NOTIFICATION_EMAIL'))
}

export function getEmailProvider() {
  if (resendIsConfigured()) return 'resend'
  if (smtpIsConfigured()) return 'smtp'
  return 'none'
}

export function emailIsConfigured() {
  return getEmailProvider() !== 'none'
}

async function sendViaResend(mail) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env('RESEND_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env('RESEND_FROM') || 'Portfolio Contact <onboarding@resend.dev>',
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
    host: env('SMTP_HOST'),
    port: Number(env('SMTP_PORT') || 587),
    secure: env('SMTP_SECURE') === 'true',
    family: 4,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: { user: env('SMTP_USER'), pass: env('SMTP_PASS') },
  })

  await transporter.sendMail({
    from: env('SMTP_FROM') || env('SMTP_USER'),
    to: mail.to,
    replyTo: mail.replyTo,
    subject: mail.subject,
    text: mail.text,
  })
}

export async function notifyPortfolioOwner(message) {
  const provider = getEmailProvider()
  if (provider === 'none') return { sent: false, reason: 'not_configured' }

  const mail = {
    to: env('NOTIFICATION_EMAIL'),
    replyTo: message.email,
    subject: `Portfolio contact: ${message.subject}`,
    text: `Name: ${message.name}\nEmail: ${message.email}\nSubject: ${message.subject}\n\n${message.message}`,
  }

  if (provider === 'resend') {
    await sendViaResend(mail)
    return { sent: true, provider }
  }

  await sendViaSmtp(mail)
  return { sent: true, provider }
}

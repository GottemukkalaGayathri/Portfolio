import ContactMessage from '../models/ContactMessage.js'
import { getEmailProvider, notifyPortfolioOwner } from '../utils/email.js'
import mongoose from 'mongoose'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const limits = { name: 80, email: 254, subject: 120, message: 5000 }
const requirements = { name: 2, email: 5, subject: 3, message: 10 }

export async function createContactMessage(req, res, next) {
  const input = {}
  for (const field of Object.keys(limits)) {
    if (typeof req.body?.[field] !== 'string') return res.status(400).json({ message: `Please provide a valid ${field}.` })
    input[field] = req.body[field].trim()
    if (input[field].length < requirements[field]) return res.status(400).json({ message: `${field[0].toUpperCase()}${field.slice(1)} must be at least ${requirements[field]} characters.` })
    if (input[field].length > limits[field]) return res.status(400).json({ message: `${field[0].toUpperCase()}${field.slice(1)} must be ${limits[field]} characters or fewer.` })
  }
  input.email = input.email.toLowerCase()
  if (!emailPattern.test(input.email)) return res.status(400).json({ message: 'Please provide a valid email address.' })
  if (mongoose.connection.readyState !== 1) return res.status(503).json({ message: 'The contact form is temporarily unavailable. Please email me directly.' })
  try {
    const savedMessage = await ContactMessage.create(input)
    try {
      const notification = await notifyPortfolioOwner(savedMessage)
      if (!notification.sent) {
        return res.status(201).json({
          message: 'Your message was saved, but email notifications are not configured yet. Please email me directly for now.',
          emailSent: false,
        })
      }
      return res.status(201).json({ message: 'Thanks for reaching out. Your message has been sent.', emailSent: true })
    } catch (error) {
      console.error(`Contact email notification failed (${getEmailProvider()}):`, error.message)
      return res.status(201).json({
        message: 'Your message was saved, but the email notification could not be sent. Please email me directly for now.',
        emailSent: false,
      })
    }
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(400).json({ message: 'Please check the contact form fields and try again.' })
    return next(error)
  }
}

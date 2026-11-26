import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import contactRoutes from './routes/contactRoutes.js'

const normalizeOrigin = (origin) => origin.trim().replace(/\/+$/, '')

const app = express()
app.set('trust proxy', 1)

const origins = [...new Set([
  'http://localhost:5173',
  'https://portfolio-63u8.onrender.com',
  ...(process.env.CLIENT_ORIGIN || '').split(',').map(normalizeOrigin).filter(Boolean),
])]

app.disable('x-powered-by')

app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Gayathri Portfolio API is running!'
  })
})

app.use(helmet())
app.use(cors({ origin: (origin, callback) => {
  if (!origin || origins.includes('*') || origins.includes(origin)) return callback(null, true)
  return callback(new Error('Origin is not allowed by CORS.'))
} }))
app.use(express.json({ limit: '20kb' }))

app.get('/api/health', (_req, res) => res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'unavailable' }))
app.use('/api/contact', contactRoutes)
app.use((_req, res) => res.status(404).json({ message: 'The requested endpoint was not found.' }))
app.use((error, _req, res, _next) => {
  console.error(error.message)
  if (error.message === 'Origin is not allowed by CORS.') return res.status(403).json({ message: 'This origin is not allowed to make requests.' })
  if (error.type === 'entity.parse.failed') return res.status(400).json({ message: 'Request body must contain valid JSON.' })
  if (error.type === 'entity.too.large') return res.status(413).json({ message: 'Request body is too large.' })
  return res.status(500).json({ message: 'Something went wrong. Please try again later.' })
})

export default app

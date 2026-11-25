import 'dotenv/config'
import app from './app.js'
import { connectDatabase } from './config/database.js'

const port = Number(process.env.PORT || 5000)

try {
  await connectDatabase()
} catch (error) {
  console.error('MongoDB connection failed:', error.message)
}

app.listen(port, () => console.log(`Portfolio API listening on port ${port}`))

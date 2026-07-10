import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import authRoutes from './routes/authRoutes.js'
import { errorHandler } from './middleware/errorMiddleware.js'

const app = express()

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
  })
)

// Body parsing middleware
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ limit: '16kb', extended: true }))

// Cookie parsing
app.use(cookieParser())

// Logging
app.use(morgan('dev'))

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' })
})

// API Routes
app.use('/api/auth', authRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// Error handling middleware (must be last)
app.use(errorHandler)

export default app

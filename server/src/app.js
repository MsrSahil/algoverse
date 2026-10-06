import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import authRoutes from './routes/authRoutes.js'
import progressRoutes from './routes/progressRoutes.js'
import favoriteRoutes from './routes/favoriteRoutes.js'
import { errorHandler } from './middleware/errorMiddleware.js'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

const app = express()
app.set('trust proxy', 1)

const allowedOrigins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : ['http://localhost:5173'];

// CORS configuration
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200
  })
)

// Security middleware
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
app.use(limiter)

// Body parsing middleware
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ limit: '16kb', extended: true }))

// Cookie parsing
app.use(cookieParser())

// Logging
app.use(morgan('dev'))

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/progress', progressRoutes)
app.use('/api/favorites', favoriteRoutes)

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

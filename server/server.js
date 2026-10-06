import dotenv from 'dotenv'
dotenv.config()

import app from './src/app.js'
import connectDB from './src/config/db.js'

const requiredEnvVars = ['PORT', 'MONGO_URI', 'JWT_SECRET', 'JWT_REFRESH_SECRET', 'CLIENT_URL', 'NODE_ENV'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(`FATAL ERROR: Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
  })
}).catch((err) => {
  console.log('Failed to connect to database:', err)
  process.exit(1)
})

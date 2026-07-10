import dotenv from 'dotenv'
dotenv.config()

import app from './src/app.js'
import connectDB from './src/config/db.js'

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
  })
}).catch((err) => {
  console.log('Failed to connect to database:', err)
  process.exit(1)
})

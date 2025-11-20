import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/users.js'
import applicationRoutes from './routes/applications.js'
import courseRoutes from './routes/courses.js'
import authRoutes from './routes/auth.js'
import messageRoutes from './routes/messages.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('.'))

// Root route
app.get('/', (req, res) => {
  res.sendFile('./index.html', { root: '.' })
})

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/university_db'

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB')
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error)
    console.log('⚠️  Running in fallback mode (localStorage)')
  })

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/applications', applicationRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/messages', messageRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' 
  })
})

// Fees API (existing)
app.get('/api/fees/university1', (req, res) => {
  res.json({
    courses: [
      { name: 'B.Tech Computer Science', annual: '₹2,20,000', total: '₹8,80,000' },
      { name: 'B.Tech Mechanical', annual: '₹2,00,000', total: '₹8,00,000' },
      { name: 'B.Tech Civil', annual: '₹2,00,000', total: '₹8,00,000' },
      { name: 'B.Tech Electronics', annual: '₹2,10,000', total: '₹8,40,000' },
      { name: 'MBA', annual: '₹3,00,000', total: '₹6,00,000' },
      { name: 'BBA', annual: '₹1,50,000', total: '₹4,50,000' },
      { name: 'BCA', annual: '₹1,20,000', total: '₹3,60,000' },
      { name: 'MCA', annual: '₹1,80,000', total: '₹3,60,000' },
      { name: 'BA LLB', annual: '₹1,80,000', total: '₹9,00,000' },
      { name: 'BBA LLB', annual: '₹2,00,000', total: '₹10,00,000' }
    ]
  })
})

app.get('/api/fees/university2', (req, res) => {
  res.json({
    courses: [
      { name: 'B.Tech AI', annual: '₹2,50,000', total: '₹10,00,000' },
      { name: 'B.Tech Data Science', annual: '₹2,50,000', total: '₹10,00,000' },
      { name: 'B.Tech Robotics', annual: '₹2,40,000', total: '₹9,60,000' },
      { name: 'B.Tech Electrical', annual: '₹2,20,000', total: '₹8,80,000' },
      { name: 'B.Tech Chemical', annual: '₹2,20,000', total: '₹8,80,000' },
      { name: 'MBA', annual: '₹3,50,000', total: '₹7,00,000' },
      { name: 'BBA', annual: '₹1,80,000', total: '₹5,40,000' },
      { name: 'BCA', annual: '₹1,50,000', total: '₹4,50,000' },
      { name: 'MCA', annual: '₹2,00,000', total: '₹4,00,000' },
      { name: 'B.Arch', annual: '₹2,80,000', total: '₹14,00,000' },
      { name: 'B.Des', annual: '₹2,60,000', total: '₹13,00,000' },
      { name: 'B.Pharm', annual: '₹2,00,000', total: '₹8,00,000' }
    ]
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})


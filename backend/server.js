import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import errorHandler from './middleware/errorHandler.js'

// Load environment variables
dotenv.config()

// Connect to databases & external services
connectDB()
connectCloudinary()

const app = express()

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// Static asset directories
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/assets', express.static(path.join(__dirname, '../frontend/src/assets')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/images', express.static(path.join(__dirname, 'uploads/foods')))

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'GoldFork Food Delivery Server is running',
    timestamp: new Date().toISOString()
  })
})

// Route Imports
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import foodRoutes from './routes/foodRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import wishlistRoutes from './routes/wishlistRoutes.js'
import couponRoutes from './routes/couponRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import addressRoutes from './routes/addressRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import contactRoutes from './routes/contactRoutes.js'

// Mount Project API Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/users', userRoutes)
app.use('/api/food', foodRoutes)
app.use('/api/products', foodRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/wishlist', wishlistRoutes)
app.use('/api/coupon', couponRoutes)
app.use('/api/coupons', couponRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/review', reviewRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/address', addressRoutes)
app.use('/api/notification', notificationRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/analytics', dashboardRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/contact', contactRoutes)

// 404 Route Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  })
})

// Error Handler Middleware
app.use(errorHandler)

// Start Server
const PORT = process.env.PORT || 4000
const server = app.listen(PORT, () => {
  console.log(`\n✅ GoldFork Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`API Health: http://localhost:${PORT}/api/health\n`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err)
  server.close(() => process.exit(1))
})

export default app

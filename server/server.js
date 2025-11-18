import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import connectCloudinary from './configs/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import courseRouter from './routes/courseRoute.js'
import tagRouter from './routes/tagRoute.js'
import recommendedRouter from './routes/recommendationRoute.js'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger.js'
import dotenv from "dotenv"

// Loading environment variables
dotenv.config()

// Connect to database
await connectDB()

// Connect to Cloudinary
await connectCloudinary()

// Initialize Express
const app = express()

// Middlewares
app.use(cors())
app.use(clerkMiddleware())

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    persistAuthorization: true,
  },
}))

// Routes
app.get('/', (req, res) => res.send("API Working"))
app.post('/clerk', express.raw({ type: 'application/json' }), clerkWebhooks)
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)
app.use('/api/educator', express.json(), educatorRouter)
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)
app.use('/api/tag', express.json(), tagRouter)
app.use('/api/recommendation', express.json(), recommendedRouter)

// Port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
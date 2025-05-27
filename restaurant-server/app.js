import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/connect.js'
import { errorHandlerMiddleware } from './middlewares/error-handler.js'
import { notFound } from './middlewares/not-found.js'
import { headers } from './middlewares/headers.js'
import authRouter from './routes/auth.js'
import restaurantRouter from './routes/restaurant.js'
import { seedDatabase } from './helpers/seed.js'
import reservationRouter from './routes/reservations.js'
import { authenticate } from './middlewares/auth.js'
import cors from 'cors'

dotenv.config()
const app = express()

app.use(cors())
//basic middlewares
app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/restaurant', restaurantRouter)
app.use('/api/v1/reservation', authenticate, reservationRouter)

app.use(notFound)
app.use(headers)
app.use(errorHandlerMiddleware)

app.listen(process.env.PORT || 4000, '0.0.0.0',async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    seedDatabase()
    console.log(`Server runs at port ${process.env.PORT || 4000}!!!`)
  } catch (error) {
    console.log(error)
  }
})

import express from 'express'
import { getAllRestaurants } from '../controllers/restaurant.js'
import { authenticate } from '../middlewares/auth.js'

const router = express.Router()

router.get('/get-all-restaurant', authenticate, getAllRestaurants)

export default router

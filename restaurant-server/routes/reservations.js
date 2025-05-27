import express from 'express'
import { ReservationController } from '../controllers/reservations.js'
import { isReservationExists } from '../middlewares/is-reservation-exists.js'
import { isRestaurantExists } from '../middlewares/is-restaurant-exists.js'

const router = express.Router()
const controller = new ReservationController()
// bind method binds the req and res object to the controllers methods
router.post(
  '/create-reservation',
  isRestaurantExists,
  controller.create.bind(controller)
)
router.patch(
  '/update-reservation/:id',
  isReservationExists,
  isRestaurantExists,
  controller.update.bind(controller)
)
router.delete(
  '/delete-reservation/:id',
  isReservationExists,
  controller.delete.bind(controller)
)
router.get('/get-by-user', controller.getByUserId.bind(controller))

export default router

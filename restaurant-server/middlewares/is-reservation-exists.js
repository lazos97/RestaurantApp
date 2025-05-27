import { BadRequest } from '../errors/bad-request.js'
import Reservation from '../models/Reservations.js'
import { NotFound } from '../errors/not-found.js'
import mongoose from 'mongoose'

export const isReservationExists = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) throw new BadRequest('Provide reservation id')
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequest('Invalid reservation ID format')

    const reservation = await Reservation.findById(id)
    if (!reservation) throw new NotFound('No reservation found!')

    next()
  } catch (error) {
    next(error)
  }
}

import { BadRequest } from '../errors/bad-request.js'
import { NotFound } from '../errors/not-found.js'
import mongoose from 'mongoose'
import Restaurant from '../models/Restaurant.js'

export const isRestaurantExists = async (req, res, next) => {
  try {
    const { restaurantId } = req.body

    if (!restaurantId) throw new BadRequest('Provide restaurant id')
    if (!mongoose.Types.ObjectId.isValid(restaurantId))
      throw new BadRequest('Invalid restaurant ID format')

    const restaurant = await Restaurant.findById(restaurantId)
    if (!restaurant) throw new NotFound('No restaurant found!')

    next()
  } catch (error) {
    next(error)
  }
}

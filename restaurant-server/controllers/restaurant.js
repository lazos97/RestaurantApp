import Restaurant from '../models/Restaurant.js'

export const getAllRestaurants = async (req, res, next) => {
  const restaurants = await Restaurant.find()
  res.status(200).json({ restaurants })
}

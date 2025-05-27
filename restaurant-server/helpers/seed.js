import { restaurants } from '../config/restaurant.js'
import Restaurant from '../models/Restaurant.js'

export const seedDatabase = async () => {
  try {
    const exists = await Restaurant.countDocuments()
    console.log('Total restaurants found:', exists)

    if (exists) {
      console.log('Restaurants already inserted!')
      return
    }

    await Restaurant.insertMany(restaurants)
    console.log('New restaurants added ')
  } catch (error) {
    console.error('Something went wrong ', error)
  }
}

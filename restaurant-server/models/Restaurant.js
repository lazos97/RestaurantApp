import mongoose, { Schema } from 'mongoose'

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide restaurant name.']
    },
    location: {
      type: String,
      required: [true, 'Please provide location.']
    },
    description: {
      type: String,
      required: [true, 'Please provide description.']
    }
  },
  { timestamps: true }
)

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export default Restaurant

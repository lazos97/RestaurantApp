import mongoose, { Schema } from 'mongoose'
import {
  isValidDateFormat,
  isValidTime,
  isValidPeopleCount
} from '../helpers/validators.js'

const reservationSchema = new Schema(
  {
    date: {
      type: String,
      required: [true, 'Please provide reservation date.'],
      validate: {
        validator: isValidDateFormat,
        message: props => `${props.value} is not a valid date!`
      }
    },
    time: {
      type: String,
      required: [true, 'Please provide reservation time.'],
      validate: {
        validator: isValidTime,
        message: props => `${props.value} is not a valid time!`
      }
    },
    peopleCount: {
      type: Number,
      required: [true, 'Please provide number of people.'],
      validate: {
        validator: isValidPeopleCount,
        message: props =>
          `${props.value} is not a valid people count! (must be 1-8)`
      }
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user.']
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: [true, 'Please provide restaurant.']
    }
  },
  { timestamps: true }
)

const Reservation = mongoose.model('Reservation', reservationSchema)

export default Reservation

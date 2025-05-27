import Reservation from '../models/Reservations.js'

export class ReservationService {
  config
  populateUser
  populateRestaurant
  select

  constructor() {
    this.config = { new: true, runValidators: true }
    this.populateUser = {
      path: 'userId',
      select: 'name'
    }
    this.populateRestaurant = {
      path: 'restaurantId',
      select: 'name location'
    }
    this.select = '-createdAt -updatedAt -__v'
  }

  async createReservation(data) {
    const reservation = new Reservation(data)
    await reservation.save()

    if (!reservation) throw new Error('Failed to create reservation')

    const { _id } = reservation

    return await this.getSingleReservation(_id)
  }

  async updateReservation(id, data) {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      data,
      this.config
    )

    if (!updatedReservation) throw new Error('Reservation not found')

    const { _id } = updatedReservation

    return await this.getSingleReservation(_id)
  }

  async deleteReservation(id) {
    await Reservation.findByIdAndDelete(id)
  }

  async getSingleReservation(id) {
    return await Reservation.findById(id)
      .populate(this.populateUser)
      .populate(this.populateRestaurant)
      .select(this.select)
  }

  async getReservationsByUserId(userId) {
    const reservations = await Reservation.find({ userId })
      .populate(this.populateUser)
      .populate(this.populateRestaurant)
      .select(this.select)
    return reservations
  }
}

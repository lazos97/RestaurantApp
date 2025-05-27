import { ReservationService } from '../services/reservations.js'

export class ReservationController {
  service

  constructor() {
    this.service = new ReservationService()
  }

  async update(req, res, next) {
    try {
      const { body } = req
      const { id } = req.params
      const reservation = await this.service.updateReservation(id, body)
      res.status(200).json(reservation)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const { body, currentUser } = req
      const { userId } = currentUser
      const reservation = await this.service.createReservation({
        ...body,
        userId
      })
      res.status(201).json({ reservation })
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params
      await this.service.deleteReservation(id)
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  }

  async getByUserId(req, res, next) {
    try {
      const { currentUser } = req
      const { userId } = currentUser
      const reservations = await this.service.getReservationsByUserId(
        userId
      )
      res.status(200).json({ reservations })
    } catch (error) {
      next(error)
    }
  }
}

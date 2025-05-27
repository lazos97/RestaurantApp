import { AuthService } from '../services/auth.js'

export class AuthController {
  service
  constructor() {
    this.service = new AuthService()
  }

  async register(req, res, next) {
    try {
      const { body } = req
      const { user, token } = await this.service.register(body)
      res.status(201).json({ user, token })
    } catch (error) {
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      const { body } = req
      const { user, token } = await this.service.login(body)
      res.status(200).json({ user, token })
    } catch (error) {
      next(error)
    }
  }

  async logout(req, res) {
    const proccess = this.service.logout()
    res.status(200).json({ message: proccess })
  }
}
